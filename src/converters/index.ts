import { dsvFormat } from "d3-dsv";
import toml from "toml";
import * as tomlPatch from "toml-patch";
import YAML from "yaml";

import { DestinationConverter, SourceConverter, StringTransformResult } from "../types";
import { renderMarkdownTable } from "../markdownTable";
import { pythonReprParse } from "./pythonRepr";
import { tableConverter } from "./table";
import { xlsxConverter } from "./xlsx";

const csv = dsvFormat(",");
const scsv = dsvFormat(";");
const tsv = dsvFormat("\t");

function parseLines(data: string) {
  return data.split("\n").filter((s: string) => {
    s = s.trimStart();
    return s && !s.startsWith("#");
  });
}

export const sourceConverters: { [key: string]: SourceConverter } = {
  csv: csv.parse,
  json: JSON.parse,
  jsonl: (data) => parseLines(data).map((r) => JSON.parse(r)),
  scsv: scsv.parse,
  text: (data) => data,
  lines: parseLines,
  toml: toml.parse,
  tsv: tsv.parse,
  yaml: YAML.parse,
  yamlMulti: (s) => YAML.parseAllDocuments(s).map((d) => d.toJSON()),
  pythonLiteral: pythonReprParse,
};

const stringTransform = (fn: (data: any) => string) => (data: any) =>
  ({ value: fn(data), type: "string" }) as StringTransformResult;

export const destinationConverters: { [key: string]: DestinationConverter } = {
  "json-compact": stringTransform(JSON.stringify),
  csv: stringTransform(csv.format),
  scsv: stringTransform(scsv.format),
  json: stringTransform((data) => JSON.stringify(data, null, 2)),
  text: stringTransform((data) => "" + data),
  toml: stringTransform(tomlPatch.stringify),
  tsv: stringTransform(tsv.format),
  yaml: stringTransform(YAML.stringify),
  yamlMulti: stringTransform((data) => [...data].map((d) => YAML.stringify(d)).join("---\n")),
  markdownTable: stringTransform(renderMarkdownTable),
  table: tableConverter,
  xlsx: xlsxConverter,
};

type ConverterName = keyof typeof sourceConverters | keyof typeof destinationConverters;

export const converterPrettyNames: Record<ConverterName, string> = {
  "json-compact": "JSON (compact)",
  csv: "CSV",
  json: "JSON",
  jsonl: "JSON Lines",
  lines: "Text lines",
  markdownTable: "Markdown (GFM) table",
  scsv: "SCSV",
  table: "Table",
  text: "Text",
  toml: "TOML",
  tsv: "TSV",
  xlsx: "XLS/XLSX",
  yaml: "YAML",
  yamlMulti: "YAML (multiple documents)",
  pythonLiteral: "Python literal",
};

export const converterDescriptions: Record<ConverterName, string> = {
  csv: "Comma-separated values",
  scsv: "Semicolon-separated values",
  tsv: "Tab-separated values",
  lines: "Sans #comments and blanks",
};
