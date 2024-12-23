import { SourceConverterName } from "./converters";

const yaml = `
- A: One
  B: Two
  C: Three
- A: Two
  B: Four
  C: Five
- A: Three
  B: Six
  C: Seven
`.trim();

const toml = `# This is a TOML document.
title = "TOML Example"
[owner]
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00 # First class dates`;

const tsv = `A\tB\tC
One\tTwo\tThree
Two\tFour\tFive
Three\tSix\tSeven`;

const jsonData = [
  {
    A: "One",
    B: "Two",
    C: "Three",
  },
  {
    A: "Two",
    B: "Four",
    C: "Five",
  },
  {
    A: "Three",
    B: "Six",
    C: "Seven",
  },
];

const json = JSON.stringify(jsonData, null, 2);

const scsv = `"A","B","C"
"One","Two","Three"
"Two","Four","Five"
"Three","Six","Seven"`;

const csv = `A,B,C
One,Two,Three
Two,Four,Five
Three,Six,Seven`;

const pythonLiteral = `["a", {"b": (1, 2)}, {3, 4, 5}]`;
const json5 = `{koo:'poo'/*bla*/,}`;

export const sourceSamples: Record<SourceConverterName, string> = {
  csv,
  json,
  json5,
  jsonl5: `${json5}\n${json5}`,
  jsonl: `${json}\n${json}`,
  lines: "Hello\nWorld\n# Octothorpe comments are ignored, as are blank lines:\n\n\n\nHernekeitto",
  pythonLiteral,
  pythonLiterals: `${pythonLiteral}\n${pythonLiteral}`,
  scsv,
  text: "Some arbitrary text",
  toml,
  tsv,
  yaml,
  yamlMulti: `${yaml}\n---\n${yaml}`,
};
