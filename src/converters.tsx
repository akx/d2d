import { dsvFormat } from "d3-dsv";
import toml from "toml";
import yaml from "js-yaml";
import { DestinationConverter, SourceConverter, StringTransformResult } from "./types";
import { tableConverter } from "./TableView";
import { xlsxConverter } from "./XlsxView";

const csv = dsvFormat(",");
const scsv = dsvFormat(";");
const tsv = dsvFormat("\t");

export const sourceConverters: { [key: string]: SourceConverter } = {
  csv: csv.parse,
  json: JSON.parse,
  scsv: scsv.parse,
  text: data => data,
  toml: toml.parse,
  tsv: tsv.parse,
  yaml: yaml.safeLoad,
};

const stringTransform = (fn: (data: any) => string) => (data: any) =>
  ({ value: fn(data), type: "string" } as StringTransformResult);

export const destinationConverters: { [key: string]: DestinationConverter } = {
  "json-compact": stringTransform(JSON.stringify),
  csv: stringTransform(csv.format),
  scsv: stringTransform(scsv.format),
  json: stringTransform(data => JSON.stringify(data, null, 2)),
  text: stringTransform(data => "" + data),
  tsv: stringTransform(tsv.format),
  yaml: stringTransform(yaml.safeDump),
  table: tableConverter,
  xlsx: xlsxConverter,
};

export const prettyNames: { [key: string]: string } = {
  "json-compact": "JSON (compact)",
  csv: "CSV",
  json: "JSON",
  scsv: "SCSV",
  table: "Table",
  text: "Text",
  toml: "TOML",
  tsv: "TSV",
  xlsx: "XLS/XLSX",
  yaml: "YAML",
};

export const prettyDescriptions: { [key: string]: string } = {
  csv: "Comma-separated values",
  scsv: "Semicolon-separated values",
  tsv: "Tab-separated values",
};
