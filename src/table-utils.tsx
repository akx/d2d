export function getColumns(dataArray: any[]) {
  const columnOrder: string[] = [];
  const columnSet = new Set<string>();
  dataArray.forEach(
    (datum) =>
      datum &&
      Object.keys(datum as object).forEach((column) => {
        if (!columnSet.has(column)) {
          columnOrder.push(column);
          columnSet.add(column);
        }
      }),
  );
  return columnOrder;
}
