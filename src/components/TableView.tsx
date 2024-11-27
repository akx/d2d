import React from "react";
import { ErrorDisplay } from "./ErrorDisplay";
import Loadable from "react-loadable";
import { CellInfo } from "react-table";

const LoadableTable = Loadable({
  loader: () => import("react-table"),
  loading: () => <div>Loading table</div>,
});

const CellRenderer = ({ value }: CellInfo) => {
  if (typeof value === "object") {
    try {
      value = JSON.stringify(value);
    } catch (error) {
      value = `<unrenderable: ${error}>`;
    }
  }
  return <>{value}</>;
};

function getColumns(dataArray: any[]): string[] {
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

// eslint-disable-next-line react/display-name
export const TableView = React.memo(({ data }: { data: any }) => {
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
    return (
      <LoadableTable
        data={dataArray}
        columns={columnOrder.map((col) => ({ accessor: col, Header: col, Cell: CellRenderer }))}
      />
    );
  } catch (error) {
    return <ErrorDisplay result={{ phase: "output", error, type: "error" }} />;
  }
});
