import { dsvFormat } from "d3-dsv";
import toml from "toml";
import * as tomlPatch from "toml-patch";
import YAML from "yaml";
import json5 from "json5";

import { DestinationConverter, SourceConverter, StringTransformResult } from "../types";
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

const stringTransform = (fn: (data: any) => string) => (data: any) =>
  ({ value: fn(data), type: "string" }) as StringTransformResult;

function maybeConvertXML(data: any) {
  if (data instanceof XMLDocument && data.firstElementChild) {
    data = xmlToJsObject(data.firstElementChild);
  }
  return data;
}

const stringTransformWithXMLIngestion = (fn: (data: any) => string) => (data: any) =>
  ({ value: fn(maybeConvertXML(data)), type: "string" }) as StringTransformResult;

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
  csv: stringTransform(csv.format),
  scsv: stringTransform(scsv.format),
  json: stringTransformWithXMLIngestion((data) => JSON.stringify(data, jsonReplacer, 2)),
  text: stringTransform((data) => "" + data),
  toml: stringTransformWithXMLIngestion(tomlPatch.stringify),
  tsv: stringTransform(tsv.format),
  yaml: stringTransformWithXMLIngestion(YAML.stringify),
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
