import { markdownTable } from "markdown-table";

function isArray(x: any): x is Array<any> {
  return Array.isArray(x);
}

export function prepareMarkdownTable(data: any): { data: Array<Array<any>>; align?: string[] } {
  if (!isArray(data) || data.length === 0) return { data: [] };
  if (isArray(data[0])) return { data }; // assume preformatted array-of-arrays
  const keys: string[] = [];
  const keySet: Set<string> = new Set();
  const possiblyNumberOnly: Set<string> = new Set();
  const notNumberOnly: Set<string> = new Set();
  for (const row of data) {
    for (const key of Object.keys(row)) {
      if (!keySet.has(key)) {
        keySet.add(key);
        keys.push(key);
        const isNumber = typeof row[key] === "number";
        if (isNumber) possiblyNumberOnly.add(key);
        else notNumberOnly.add(key);
      }
    }
  }
  const transformedRows = [[...keys]];
  for (const row of data) {
    transformedRows.push(keys.map((key) => row[key] ?? ""));
  }
  return {
    data: transformedRows,
    align: keys.map((key) => (possiblyNumberOnly.has(key) && !notNumberOnly.has(key) ? "r" : "")),
  };
}

export function renderMarkdownTable(input: any): string {
  const { data, align } = prepareMarkdownTable(input);
  return markdownTable(data, { align });
}
