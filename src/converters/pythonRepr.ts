export class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

type PythonLiteral = string | number | boolean | null | PythonList | PythonDict | PythonTuple | PythonSet;

type PythonList = PythonLiteral[];
type PythonDict = { [key: string]: PythonLiteral };
type PythonTuple = PythonLiteral[];
type PythonSet = Set<PythonLiteral>;

class PythonReprParser {
  private readonly input: string;
  private pos: number;
  private readonly allowTrailingData: boolean;

  constructor(input: string, allowTrailingData: boolean = true) {
    this.input = input.trim();
    this.pos = 0;
    this.allowTrailingData = allowTrailingData;
  }

  parse(): PythonLiteral {
    this.skipWhitespace();
    const result = this.parseValue();

    if (!this.allowTrailingData) {
      this.skipWhitespace();
      if (this.pos !== this.input.length) {
        throw new ParseError("Unexpected tokens at end of input");
      }
    }

    return result;
  }

  parseMultiple(): PythonLiteral[] {
    const results: PythonLiteral[] = [];
    while (this.pos < this.input.length) {
      results.push(this.parse());
      this.skipWhitespace();
    }
    return results;
  }

  private parseValue(): PythonLiteral {
    this.skipWhitespace();

    const char = this.input[this.pos];

    if (char === '"' || char === "'") return this.parseString();
    if (char === "-" || this.isDigit(char)) return this.parseNumber();
    if (char === "N" && this.input.slice(this.pos, this.pos + 4) === "None") return this.parseNone();
    if (char === "T" && this.input.slice(this.pos, this.pos + 4) === "True") return this.parseBoolean(true);
    if (char === "F" && this.input.slice(this.pos, this.pos + 5) === "False") return this.parseBoolean(false);
    if (char === "[") return this.parseList();
    if (char === "{") return this.parseDictOrSet();
    if (char === "(") return this.parseTuple();

    throw new ParseError(`Unexpected token: ${char}`);
  }

  private parseString(): string {
    const quote = this.input[this.pos];
    this.pos++;

    let result = "";
    let escaped = false;

    while (this.pos < this.input.length) {
      const char = this.input[this.pos];

      if (escaped) {
        switch (char) {
          case "n":
            result += "\n";
            break;
          case "r":
            result += "\r";
            break;
          case "t":
            result += "\t";
            break;
          case "\\":
            result += "\\";
            break;
          case '"':
            result += '"';
            break;
          case "'":
            result += "'";
            break;
          case "u": {
            const hex = this.input.slice(this.pos + 1, this.pos + 5);
            const code = parseInt(hex, 16);
            if (isNaN(code)) {
              throw new ParseError(`Invalid unicode escape: \\u${hex}`);
            }
            result += String.fromCharCode(code);
            this.pos += 4;
            break;
          }
          default:
            result += "\\" + char;
        }
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        this.pos++;
        return result;
      } else {
        result += char;
      }

      this.pos++;
    }

    throw new ParseError("Unterminated string");
  }

  private parseNumber(): number {
    const start = this.pos;

    // Handle sign
    if (this.input[this.pos] === "-") {
      this.pos++;
    }

    // Integer part
    while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
      this.pos++;
    }

    // Fractional part
    if (this.input[this.pos] === ".") {
      this.pos++;
      while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
        this.pos++;
      }
    }

    // Scientific notation
    if (this.input[this.pos] === "e" || this.input[this.pos] === "E") {
      this.pos++;
      if (this.input[this.pos] === "+" || this.input[this.pos] === "-") {
        this.pos++;
      }
      while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
        this.pos++;
      }
    }

    const numberStr = this.input.slice(start, this.pos);
    const number = Number(numberStr);

    if (isNaN(number)) {
      throw new ParseError(`Invalid number: ${numberStr}`);
    }

    return number;
  }

  private parseNone(): null {
    this.pos += 4;
    return null;
  }

  private parseBoolean(value: boolean): boolean {
    this.pos += value ? 4 : 5;
    return value;
  }

  private parseList(): PythonList {
    this.pos++; // Skip '['
    const list: PythonLiteral[] = [];

    while (this.pos < this.input.length && this.input[this.pos] !== "]") {
      this.skipWhitespace();

      if (list.length > 0) {
        this.expectChar(",", "to separate list items");
        this.skipWhitespace();

        // Handle trailing comma
        if (this.input[this.pos] === "]") break;
      }

      list.push(this.parseValue());
    }

    this.expectChar("]", "to close a list");
    return list;
  }

  private parseDictOrSet(): PythonLiteral {
    this.pos++; // Skip '{'
    this.skipWhitespace();

    // Empty dict/set
    if (this.input[this.pos] === "}") {
      this.pos++;
      return {};
    }

    const first = this.parseValue();
    this.skipWhitespace();

    // Check if it's a set or dict
    if (this.input[this.pos] === ":") {
      // It's a dictionary
      return this.parseDictContinue(first);
    } else {
      // It's a set
      return this.parseSetContinue(first);
    }
  }

  private parseDictContinue(firstKey: PythonLiteral): PythonDict {
    const dict: PythonDict = {};

    // Parse first key-value pair
    this.expectChar(":", "parsing a dict's first key-value pair");
    dict[String(firstKey)] = this.parseValue();

    while (this.pos < this.input.length && this.input[this.pos] !== "}") {
      this.skipWhitespace();
      this.expectChar(",", "separating dict items");
      this.skipWhitespace();

      // Handle trailing comma
      if (this.input[this.pos] === "}") break;

      const key = this.parseValue();
      this.expectChar(":", "parsing a dict's key-value pair");
      dict[String(key)] = this.parseValue();
    }

    this.expectChar("}", "to close a dict");
    return dict;
  }

  private parseSetContinue(firstElement: PythonLiteral): PythonSet {
    const set = new Set<PythonLiteral>();
    set.add(firstElement);

    while (this.pos < this.input.length && this.input[this.pos] !== "}") {
      this.skipWhitespace();
      this.expectChar(",", "to separate set items");
      this.skipWhitespace();

      // Handle trailing comma
      if (this.input[this.pos] === "}") break;

      set.add(this.parseValue());
    }

    this.expectChar("}", "to close a set");
    return set;
  }

  private parseTuple(): PythonTuple {
    this.pos++; // Skip '('
    const tuple: PythonLiteral[] = [];

    while (this.pos < this.input.length && this.input[this.pos] !== ")") {
      this.skipWhitespace();

      if (tuple.length > 0) {
        this.expectChar(",", "to separate tuple items");
        this.skipWhitespace();

        // Handle trailing comma
        if (this.input[this.pos] === ")") break;
      }

      tuple.push(this.parseValue());
    }

    this.expectChar(")", "to close a tuple");
    return tuple;
  }

  private skipWhitespace() {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos]!)) {
      this.pos++;
    }
  }

  private isDigit(char: string | undefined): boolean {
    return !!(char && /\d/.test(char));
  }

  private expectChar(expected: string, context: string = "") {
    const input = this.input[this.pos];
    if (input !== expected) {
      const prefix = `Expected '${expected}'` + (context ? ` ${context}` : "");
      throw new ParseError(`${prefix}, found '${input ?? "end of input"}'`);
    }
    this.pos++;
  }
}

class PythonReprDumper {
  private seen: Set<any>;

  constructor() {
    this.seen = new Set();
  }

  dump(obj: any): string {
    // Reset seen set for each top-level dump
    this.seen.clear();
    return this.dumpValue(obj);
  }

  private dumpValue(obj: any): string {
    // Check for circular references
    if (this.seen.has(obj)) {
      throw new Error(`Circular reference detected: ${obj}`);
    }

    // Handle null and undefined
    if (obj === null || obj === undefined) {
      return "None";
    }

    // Primitive types
    switch (typeof obj) {
      case "string":
        return this.dumpString(obj);
      case "number":
        return this.dumpNumber(obj);
      case "boolean":
        return obj ? "True" : "False";
    }

    // Mark this object as seen to detect circular references
    this.seen.add(obj);

    // Complex types
    if (Array.isArray(obj)) {
      return this.dumpList(obj);
    }

    if (obj instanceof Set) {
      return this.dumpSet(obj);
    }

    if (obj instanceof Map) {
      return this.dumpMap(obj);
    }

    if (typeof obj === "object") {
      return this.dumpDict(obj);
    }

    throw new Error(`Cannot represent object of type: ${typeof obj}`);
  }

  private dumpString(str: string): string {
    // Escape special characters and use single quotes (Python repr style)
    const escaped = str
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");
    return `'${escaped}'`;
  }

  private dumpNumber(num: number): string {
    // Special handling for NaN, Infinity, -Infinity
    if (Number.isNaN(num)) {
      return 'float("nan")';
    }
    if (!Number.isFinite(num)) {
      return num > 0 ? 'float("inf")' : 'float("-inf")';
    }
    return num.toString();
  }

  private dumpList(arr: any[]): string {
    const items = arr.map((item) => this.dumpValue(item));
    return `[${items.join(", ")}]`;
  }

  private dumpSet(set: Set<any>): string {
    const items = Array.from(set).map((item) => this.dumpValue(item));
    return `{${items.join(", ")}}`;
  }

  private dumpMap(map: Map<any, any>): string {
    const items = Array.from(map.entries()).map(([key, value]) => `${this.dumpValue(key)}: ${this.dumpValue(value)}`);
    return `{${items.join(", ")}}`;
  }

  private dumpDict(obj: Record<string, any>): string {
    // Exclude functions and symbols
    const items = Object.entries(obj)
      .filter(([_, value]) => typeof value !== "function" && typeof value !== "symbol")
      .map(([key, value]) => `${this.dumpString(key)}: ${this.dumpValue(value)}`);

    return `{${items.join(", ")}}`;
  }
}

export function pythonReprParse(input: string): PythonLiteral {
  return new PythonReprParser(input).parse();
}
export function pythonReprParseMultiple(input: string): PythonLiteral[] {
  return new PythonReprParser(input).parseMultiple();
}

export function pythonReprStringify(obj: any): string {
  return new PythonReprDumper().dump(obj);
}
