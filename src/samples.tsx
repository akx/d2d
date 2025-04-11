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

const xml = `
<?xml version="1.0" encoding="UTF-8"?> <contacts>
<person> <id>1</id> <name>Anna Virtanen</name>
<email>anna.virtanen@example.com</email>
<phone>0401234567</phone> <address>
<street>Keskuskatu 5</street> <city>Helsinki</city> <zip>00100</zip> </address> </person>
<person> <id>2</id> <name>Mikko Korhonen</name>
<email>mikko.k@example.com</email> <phone>0509876543</phone> <address>
<street>Asematie 10</street> <city>Turku</city> <zip>20100</zip> </address> </person> </contacts>
`.trim();

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
  xml,
  yaml,
  yamlMulti: `${yaml}\n---\n${yaml}`,
};
