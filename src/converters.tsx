import * as d3dsv from "d3-dsv";
import toml from "toml";
import yaml from "js-yaml";
import { DestinationConverter, SourceConverter, StringTransformResult } from "./types";
import React from "react";
import { tableConverter } from "./TableView";

export const sourceConverters: { [key: string]: SourceConverter } = {
  csv: d3dsv.csvParse,
  json: JSON.parse,
  text: data => data,
  toml: toml.parse,
  tsv: d3dsv.tsvParse,
  yaml: yaml.safeLoad,
};

const stringTransform = (fn: (data: any) => string) => (data: any) =>
  ({ value: fn(data), type: "string" } as StringTransformResult);

export const destinationConverters: { [key: string]: DestinationConverter } = {
  "json-compact": stringTransform(JSON.stringify),
  csv: stringTransform(d3dsv.csvFormat),
  json: stringTransform(data => JSON.stringify(data, null, 2)),
  text: stringTransform(data => "" + data),
  tsv: stringTransform(d3dsv.tsvFormat),
  yaml: stringTransform(yaml.safeDump),
  table: tableConverter,
};
