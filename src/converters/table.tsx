import { DestinationConverter } from "../types";
import ErrorWrapper from "../components/ErrorWrapper";
import { TableView } from "../components/TableView";
import React from "react";

export const tableConverter: DestinationConverter = (data) => ({
  error: null,
  type: "element",
  element: <ErrorWrapper render={() => <TableView data={data} />} />,
});
