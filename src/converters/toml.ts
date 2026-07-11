// A small, dependency-free TOML emitter with a few readability heuristics:
//
//   * strings that span multiple lines are emitted as `'''` / `"""` "longstrings"
//     when that can be done without lossy escaping,
//   * nested tables are expanded into `[header]` / `[[array]]` sections up to a
//     configurable depth, then collapse into inline `{ }` / `[ ]` tables, and
//   * keys are quoted only when they cannot be written bare.
//
// `null` / `undefined` values have no TOML representation and are dropped from
// tables (TOML has no null); encountering one inside an array is an error, since
// dropping it would silently change the array's length.

export interface TomlStringifyOptions {
  /**
   * Deepest table-nesting level still written as `[header]` / `[[array-of-tables]]`
   * sections. Tables nested deeper collapse into inline `{ }` / `[ ]` tables.
   * Depth 1 is the root object's own keys. Default: `Infinity` (fully expanded).
   */
  flattenDepth?: number;
  /** Emit `'''` / `"""` longstrings for multi-line values when possible. Default: `true`. */
  multilineStrings?: boolean;
  /** Soft line width; inline arrays wider than this wrap across lines. Default: `80`. */
  width?: number;
  /** Indent unit used when wrapping arrays. Default: two spaces. */
  indent?: string;
}

const BARE_KEY = /^[A-Za-z0-9_-]+$/;
// Every control char (0x00–0x1F and DEL); a single-line basic string escapes them all.
// eslint-disable-next-line no-control-regex -- matching control chars is the point here
const ANY_CONTROL = /[\u0000-\u001f\u007f]/;
// Control chars a literal string may NOT hold: everything below 0x20 except tab (0x09) and
// newline (0x0a), plus DEL. This also rules out a bare carriage return.
// eslint-disable-next-line no-control-regex -- matching control chars is the point here
const LITERAL_FORBIDDEN = /[\u0000-\u0008\u000b-\u001f\u007f]/;

function isArrayLike(v: unknown): v is unknown[] | Set<unknown> {
  return Array.isArray(v) || v instanceof Set;
}

function isTableLike(v: unknown): boolean {
  if (v === null || typeof v !== "object") return false;
  return !Array.isArray(v) && !(v instanceof Set) && !(v instanceof Date);
}

function asArray(v: unknown[] | Set<unknown>): unknown[] {
  return v instanceof Set ? [...v] : v;
}

/** Own key/value pairs of a table, dropping nullish, function and symbol values. */
function tableEntries(v: object): [string, unknown][] {
  const raw: [string, unknown][] =
    v instanceof Map ? [...v.entries()].map(([k, val]) => [String(k), val]) : Object.entries(v);
  return raw.filter(
    ([, val]) => val !== null && val !== undefined && typeof val !== "function" && typeof val !== "symbol",
  );
}

function controlEscape(ch: string): string {
  switch (ch) {
    case "\b":
      return "\\b";
    case "\t":
      return "\\t";
    case "\n":
      return "\\n";
    case "\f":
      return "\\f";
    case "\r":
      return "\\r";
    default:
      return "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0");
  }
}

type ValueKind = "scalar" | "inlineArray" | "inlineTable" | "table" | "arrayTable";

class TomlWriter {
  private readonly flattenDepth: number;
  private readonly multilineStrings: boolean;
  private readonly width: number;
  private readonly indent: string;
  private readonly seen = new Set<object>();
  private lines: string[] = [];

  constructor(options: TomlStringifyOptions = {}) {
    this.flattenDepth = options.flattenDepth ?? Infinity;
    this.multilineStrings = options.multilineStrings ?? true;
    this.width = options.width ?? 80;
    this.indent = options.indent ?? "  ";
  }

  stringify(data: unknown): string {
    const root = data instanceof Map ? Object.fromEntries(data) : data;
    if (!isTableLike(root)) {
      const what = isArrayLike(root) ? "an array" : `a ${root === null ? "null" : typeof root}`;
      throw new Error(`TOML documents must have a table (object) at the top level, but got ${what}.`);
    }
    this.emitTable(root as object, [], 0, false);
    const out = this.lines.join("\n").replace(/^\n+|\n+$/g, "");
    return out ? out + "\n" : "";
  }

  /** Decide how a value nested at `depth` should be rendered. */
  private classify(value: unknown, depth: number): ValueKind {
    if (isArrayLike(value)) {
      const arr = asArray(value);
      if (arr.length > 0 && depth <= this.flattenDepth && arr.every(isTableLike)) {
        return "arrayTable";
      }
      return "inlineArray";
    }
    if (isTableLike(value)) {
      if (tableEntries(value as object).length === 0) return "inlineTable"; // {} has no header form
      return depth <= this.flattenDepth ? "table" : "inlineTable";
    }
    return "scalar";
  }

  private enter(obj: object) {
    if (this.seen.has(obj)) throw new Error("Cannot serialize circular structure to TOML.");
    this.seen.add(obj);
  }

  private leave(obj: object) {
    this.seen.delete(obj);
  }

  /** Blank line before a new section, but never a leading blank. */
  private blankBeforeSection() {
    if (this.lines.length && this.lines[this.lines.length - 1] !== "") this.lines.push("");
  }

  private emitTable(obj: object, path: string[], depth: number, isArrayElement: boolean) {
    this.enter(obj);
    const entries = tableEntries(obj);
    const inline: [string, unknown][] = [];
    const sections: [string, unknown, ValueKind][] = [];
    for (const [key, value] of entries) {
      const kind = this.classify(value, depth + 1);
      if (kind === "table" || kind === "arrayTable") sections.push([key, value, kind]);
      else inline.push([key, value]);
    }

    // An array element always needs its `[[...]]` marker. A regular table needs a
    // header only when it has direct values to scope; a table that holds nothing
    // but sub-tables lets those sub-tables' `[a.b]` headers imply it.
    const needHeader = isArrayElement || (path.length > 0 && (inline.length > 0 || sections.length === 0));
    if (needHeader) {
      this.blankBeforeSection();
      const header = path.map(formatKey).join(".");
      this.lines.push(isArrayElement ? `[[${header}]]` : `[${header}]`);
    }

    for (const [key, value] of inline) {
      this.lines.push(`${formatKey(key)} = ${this.formatInline(value, "", "block")}`);
    }

    for (const [key, value, kind] of sections) {
      const childPath = [...path, key];
      if (kind === "table") {
        this.emitTable(value as object, childPath, depth + 1, false);
      } else {
        for (const element of asArray(value as unknown[] | Set<unknown>)) {
          this.emitTable(element as object, childPath, depth + 1, true);
        }
      }
    }
    this.leave(obj);
  }

  /** Render a value inline (as the right-hand side of `key =`, or an array element). */
  private formatInline(value: unknown, baseIndent: string, context: "block" | "inline"): string {
    if (isArrayLike(value)) return this.formatArray(asArray(value), baseIndent, context);
    if (isTableLike(value)) return this.formatInlineTable(value as object, baseIndent);
    return this.formatScalar(value, context);
  }

  private formatInlineTable(obj: object, baseIndent: string): string {
    this.enter(obj);
    const entries = tableEntries(obj);
    const body = entries.map(([k, v]) => `${formatKey(k)} = ${this.formatInline(v, baseIndent, "inline")}`);
    this.leave(obj);
    return body.length ? `{ ${body.join(", ")} }` : "{}";
  }

  private formatArray(arr: unknown[], baseIndent: string, context: "block" | "inline"): string {
    if (arr.length === 0) return "[]";
    this.enter(arr);
    const inner = baseIndent + this.indent;
    const items = arr.map((el) => {
      if (el === null || el === undefined) {
        throw new Error("TOML arrays cannot contain null/undefined values.");
      }
      return this.formatInline(el, inner, context);
    });
    this.leave(arr);

    const oneLine = `[${items.join(", ")}]`;
    // An array nested in an inline table must stay on one line (its items are already
    // single-line there). Otherwise, wrap when it holds complex values, spans lines,
    // or would overflow the target width.
    if (context === "inline") return oneLine;
    const wrap =
      arr.some((el) => isArrayLike(el) || isTableLike(el)) ||
      items.some((it) => it.includes("\n")) ||
      baseIndent.length + oneLine.length > this.width;
    if (!wrap) return oneLine;
    return `[\n${items.map((it) => `${inner}${it},`).join("\n")}\n${baseIndent}]`;
  }

  private formatScalar(value: unknown, context: "block" | "inline"): string {
    switch (typeof value) {
      case "string":
        return this.formatString(value, context);
      case "number":
        return formatNumber(value);
      case "bigint":
        return value.toString();
      case "boolean":
        return value ? "true" : "false";
    }
    if (value instanceof Date) return formatDate(value);
    throw new Error(`Cannot represent value of type ${typeof value} in TOML.`);
  }

  private formatString(str: string, context: "block" | "inline"): string {
    const multiline = /[\r\n]/.test(str);
    // Keep strings inside inline tables on one line; a multi-line string there would
    // smuggle a newline between the `{ }` braces, which is valid but discouraged.
    if (this.multilineStrings && multiline && context !== "inline") {
      if (canLiteralMultiline(str)) return `'''\n${str}'''`;
      return `"""\n${escapeMultilineBasic(str)}"""`;
    }
    // Single line: a literal string avoids ugly escaping of backslashes/quotes.
    if (!multiline && !LITERAL_FORBIDDEN.test(str) && !str.includes("'") && /["\\]/.test(str)) {
      return `'${str}'`;
    }
    return `"${escapeBasic(str)}"`;
  }
}

function escapeBasic(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(new RegExp(ANY_CONTROL, "g"), controlEscape);
}

/**
 * Escape a string for a `"""` multi-line basic string: keep real newlines, escape
 * backslashes and other control chars, and never let the content form (or end with)
 * the `"""` delimiter.
 */
function escapeMultilineBasic(str: string): string {
  let out = "";
  let quoteRun = 0;
  for (const ch of str) {
    if (ch === "\\") {
      out += "\\\\";
      quoteRun = 0;
    } else if (ch === '"') {
      quoteRun += 1;
      if (quoteRun >= 3) {
        out += '\\"';
        quoteRun = 0;
      } else {
        out += '"';
      }
    } else {
      quoteRun = 0;
      if (ch === "\n" || ch === "\t") out += ch;
      else if (ANY_CONTROL.test(ch)) out += controlEscape(ch);
      else out += ch;
    }
  }
  // A trailing `"` would merge with the closing delimiter into `""""`.
  if (out.endsWith('"') && !out.endsWith('\\"')) out = out.slice(0, -1) + '\\"';
  return out;
}

function canLiteralMultiline(str: string): boolean {
  return !LITERAL_FORBIDDEN.test(str) && !str.includes("'''") && !str.endsWith("'");
}

function formatKey(key: string): string {
  if (BARE_KEY.test(key)) return key;
  if (!LITERAL_FORBIDDEN.test(key) && !key.includes("'") && /["\\]/.test(key)) return `'${key}'`;
  return `"${escapeBasic(key)}"`;
}

function formatNumber(n: number): string {
  if (Number.isNaN(n)) return "nan";
  if (n === Infinity) return "inf";
  if (n === -Infinity) return "-inf";
  const str = n.toString();
  if (Number.isInteger(n) && !/[eE]/.test(str)) return str; // plain integer
  return /[.eE]/.test(str) ? str : `${str}.0`; // keep it a valid TOML float
}

function formatDate(d: Date): string {
  if (Number.isNaN(d.getTime())) throw new Error("Cannot represent an invalid Date in TOML.");
  return d.toISOString().replace(/\.000Z$/, "Z");
}

export function stringify(data: unknown, options?: TomlStringifyOptions): string {
  return new TomlWriter(options).stringify(data);
}
