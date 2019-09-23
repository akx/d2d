import * as d3dsv from "d3-dsv";
import toml from "toml";
import yaml from "js-yaml";

export const sourceConverters: { [key: string]: (data: any) => any } = {
  csv: d3dsv.csvParse,
  json: JSON.parse,
  text: data => data,
  toml: toml.parse,
  tsv: d3dsv.tsvParse,
  yaml: yaml.safeLoad,
};
export const destinationConverters: { [key: string]: (data: any) => string } = {
  "json-compact": JSON.stringify,
  csv: d3dsv.csvFormat,
  json: data => JSON.stringify(data, null, 2),
  text: data => "" + data,
  tsv: d3dsv.tsvFormat,
  yaml: yaml.safeDump,
};
