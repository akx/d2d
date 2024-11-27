import { DestinationConverter } from "../types";
import { XlsxView } from "../components/XlsxView";
import React from "react";

export const xlsxConverter: DestinationConverter = (data) => ({
  error: null,
  type: "element",
  element: <XlsxView data={data} />,
});
