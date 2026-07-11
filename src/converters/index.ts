import { dsvFormat } from "d3-dsv";
import toml from "toml";
import YAML from "yaml";
import json5 from "json5";

import { ConverterOptionValues, DestinationConverter, SourceConverter, StringTransformResult } from "../types";
import { stringify as tomlStringify } from "./toml";
import { renderMarkdownTable } from "../markdownTable";
import { pythonReprParse, pythonReprParseMultiple, pythonReprStringify } from "./pythonRepr";
import { tableConverter } from "./table";
import { xlsxConverter } from "./xlsx";
import { parseXML, toDefaultXML, toPrettyXML, xmlToJsObject } from "./xml";

const csv = dsvFormat(",");
const scsv = dsvFormat(";");
const tsv = dsvFormat("\t");

function parseLines(data: string) {
  return data.split("\n").filter((s: string) => {
    s = s.trimStart();
    return s && !s.startsWith("#");
  });
}

export const sourceConverters = {
  csv: csv.parse,
  json: JSON.parse,
  jsonl: (data) => parseLines(data).map((r) => JSON.parse(r)),
  json5: json5.parse,
  jsonl5: (data) => parseLines(data).map((r) => json5.parse(r)),
  scsv: scsv.parse,
  text: (data) => data,
  lines: parseLines,
  toml: toml.parse,
  tsv: tsv.parse,
  xml: parseXML,
  yaml: YAML.parse,
  yamlMulti: (s) => YAML.parseAllDocuments(s).map((d) => d.toJSON()),
  pythonLiteral: pythonReprParse,
  pythonLiterals: pythonReprParseMultiple,
} as const satisfies Record<string, SourceConverter>;

type StringTransformFn = (data: any, options?: ConverterOptionValues) => string;

const stringTransform = (fn: StringTransformFn) => (data: any, options?: ConverterOptionValues) =>
  ({ value: fn(data, options), type: "string" }) as StringTransformResult;

function maybeConvertXML(data: any) {
  if (data instanceof XMLDocument && data.firstElementChild) {
    data = xmlToJsObject(data.firstElementChild);
  }
  return data;
}

const stringTransformWithXMLIngestion = (fn: StringTransformFn) => (data: any, options?: ConverterOptionValues) =>
  ({ value: fn(maybeConvertXML(data), options), type: "string" }) as StringTransformResult;

function jsonReplacer(_key: string, value: any) {
  // Serialize sets as arrays
  if (value instanceof Set) {
    return Array.from(value);
  }
  // Serialize maps as objects
  if (value instanceof Map) {
    return Object.fromEntries(value);
  }
  return value;
}

export const destinationConverters = {
  "json-compact": stringTransformWithXMLIngestion((data) => JSON.stringify(data, jsonReplacer)),
  csv: stringTransform((data) => csv.format(data)),
  scsv: stringTransform((data) => scsv.format(data)),
  json: stringTransformWithXMLIngestion((data) => JSON.stringify(data, jsonReplacer, 2)),
  text: stringTransform((data) => "" + data),
  toml: stringTransformWithXMLIngestion((data, options) => tomlStringify(data, tomlOptionsFromValues(options))),
  tsv: stringTransform((data) => tsv.format(data)),
  yaml: stringTransformWithXMLIngestion((data) => YAML.stringify(data)),
  yamlMulti: stringTransform((data) => [...data].map((d) => YAML.stringify(d)).join("---\n")),
  markdownTable: stringTransform(renderMarkdownTable),
  table: tableConverter,
  xlsx: xlsxConverter,
  xmlDefault: stringTransform(toDefaultXML),
  xmlPretty: stringTransform(toPrettyXML),
  pythonLiteral: stringTransform(pythonReprStringify),
} as const satisfies Record<string, DestinationConverter>;

export type SourceConverterName = keyof typeof sourceConverters;
export type DestConverterName = keyof typeof destinationConverters;
export type ConverterName = SourceConverterName | DestConverterName;

export const converterPrettyNames: Record<ConverterName, string> = {
  "json-compact": "JSON (compact)",
  csv: "CSV",
  json: "JSON",
  jsonl: "JSON Lines",
  json5: "JSON5",
  jsonl5: "JSON5 Lines",
  lines: "Text lines",
  markdownTable: "Markdown (GFM) table",
  scsv: "SCSV",
  table: "Table",
  text: "Text",
  toml: "TOML",
  tsv: "TSV",
  xlsx: "XLS/XLSX",
  xml: "XML (DOM Document)",
  xmlDefault: "XML (default)",
  xmlPretty: "XML (pretty-printed)",
  yaml: "YAML",
  yamlMulti: "YAML (multiple documents)",
  pythonLiteral: "Python literal",
  pythonLiterals: "Python literals (multiple)",
};

export const converterDescriptions: Partial<Record<ConverterName, string>> = {
  csv: "Comma-separated values",
  json5: "Looser than JSON",
  jsonl5: "Looser than JSON Lines",
  jsonl: "Also known as NDJSON",
  lines: "Sans #comments and blanks",
  scsv: "Semicolon-separated values",
  tsv: "Tab-separated values",
};

// Declarative, per-destination knobs. The UI renders these generically and stores
// the chosen values, which are handed back to the converter at transform time.
export interface BooleanConverterOption {
  kind: "boolean";
  label: string;
  shortLabel?: string;
  default: boolean;
}
export interface SelectConverterOption {
  kind: "select";
  label: string;
  default: string;
  choices: { value: string; label: string; description?: string }[];
}
export type ConverterOption = BooleanConverterOption | SelectConverterOption;
export type ConverterOptionsSpec = Record<string, ConverterOption>;

export const converterOptionSpecs: Partial<Record<DestConverterName, ConverterOptionsSpec>> = {
  toml: {
    flattenDepth: {
      kind: "select",
      label: "Table nesting",
      default: "inf",
      choices: [
        { value: "1", label: "1 level", description: "Inline anything deeper" },
        { value: "2", label: "2 levels" },
        { value: "3", label: "3 levels" },
        { value: "4", label: "4 levels" },
        { value: "inf", label: "Unlimited", description: "Always use [table] headers" },
      ],
    },
    multilineStrings: {
      kind: "boolean",
      label: "Multi-line strings",
      shortLabel: "Multi-line",
      default: true,
    },
  },
};

/** Fill in a spec's defaults, producing a complete set of option values. */
export function defaultOptionValues(spec: ConverterOptionsSpec): ConverterOptionValues {
  return Object.fromEntries(Object.entries(spec).map(([key, opt]) => [key, opt.default]));
}

function tomlOptionsFromValues(options?: ConverterOptionValues) {
  const flattenDepth = options?.flattenDepth ?? "inf";
  return {
    flattenDepth: flattenDepth === "inf" ? Infinity : Number(flattenDepth),
    multilineStrings: options?.multilineStrings !== false,
  };
}
