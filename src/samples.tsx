export const sourceSamples: any = {
  "json-compact": 'json-compact',
  csv: 'A,B,C\nOne,Two,Three\nTwo,Four,Five\nThree,Six,Seven',
  scsv: '"A","B","C"\n"One","Two","Three"\n"Two","Four","Five"\n"Three","Six","Seven"',
  json: JSON.stringify([
    {
      "A": "One",
      "B": "Two",
      "C": "Three"
    },
    {
      "A": "Two",
      "B": "Four",
      "C": "Five"
    },
    {
      "A": "Three",
      "B": "Six",
      "C": "Seven"
    }
  ], null, 2),
  text: "text",
  tsv: 'A	B	C\nOne	Two	Three\nTwo	Four	Five\nThree	Six	Seven',
  yaml: '- A: One\n  B: Two\n  C: Three\n- A: Two\n  B: Four\n  C: Five\n- A: Three\n  B: Six\n  C: Seven',
  toml: '# This is a TOML document.\ntitle = "TOML Example"\n[owner]\nname = "Tom Preston-Werner"\ndob = 1979-05-27T07:32:00-08:00 # First class dates'
};
