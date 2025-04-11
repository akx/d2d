import React from "react";
import { ErrorTransformResult } from "../types";

export const ErrorDisplay = ({ result: { error, phase } }: { result: ErrorTransformResult }) => (
  <div className="p-2 text-red-700">
    <h2 className="text-xl font-bold">
      {error.name || "Error"} in {phase}
    </h2>
    {error.message && <div className="font-bold py-2">{error.message}</div>}
    {error.stack ? <div className="p-2 whitespace-pre overflow-auto">{error.stack}</div> : <b>{error.toString()}</b>}
  </div>
);
