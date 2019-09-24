import { DestinationConverter } from "./types";
import ErrorWrapper from "./ErrorWrapper";
import React from "react";
import { ErrorDisplay } from "./ErrorDisplay";
import { getColumns } from "./table-utils";
import Loadable from "react-loadable";

const LoadableTable = Loadable({
  loader: () => import("react-table"),
  loading: () => <div>Loading table</div>,
});

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
    return <LoadableTable data={dataArray} columns={columnOrder.map(col => ({ accessor: col, Header: col }))} />;
  } catch (error) {
    return <ErrorDisplay result={{ phase: "output", error, type: "error" }} />;
  }
});

export const tableConverter: DestinationConverter = data => ({
  error: null,
  type: "element",
  element: <ErrorWrapper render={() => <TableView data={data} />} />,
});
