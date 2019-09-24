import { DestinationConverter } from "./types";
import ErrorWrapper from "./ErrorWrapper";
import ReactTable from "react-table";
import React from "react";
import { ErrorDisplay } from "./ErrorDisplay";

function getColumns(dataArray: any[]) {
  const columnOrder: string[] = [];
  const columnSet = new Set<string>();
  dataArray.forEach(
    datum =>
      datum &&
      Object.keys(datum as object).forEach(column => {
        if (!columnSet.has(column)) {
          columnOrder.push(column);
          columnSet.add(column);
        }
      }),
  );
  return columnOrder;
}

const TableView = React.memo(({ data }: { data: any }) => {
  try {
    const dataArray = Array.from(data);
    const columnOrder = getColumns(dataArray);
    if (!columnOrder.length) {
      return (
        <ErrorDisplay
          result={{
            phase: "output",
            error: new Error("Unable to figure out columns"),
            type: "error",
          }}
        />
      );
    }
    return <ReactTable data={dataArray} columns={columnOrder.map(col => ({ accessor: col, Header: col }))} />;
  } catch (error) {
    return <ErrorDisplay result={{ phase: "output", error, type: "error" }} />;
  }
});

export const tableConverter: DestinationConverter = data => ({
  error: null,
  type: "element",
  element: <ErrorWrapper render={() => <TableView data={data} />} />,
});
