import React from "react";
import { ErrorTransformResult } from "../types";

export const ErrorDisplay = ({ result: { error, phase } }: { result: ErrorTransformResult }) => (
  <div className="error-result">
    <h2>
      {error.name || "Error"} in {phase}
    </h2>
    {error.message && <div className="error-message">{error.message}</div>}
    {error.stack ? <div className="error-stack">{error.stack}</div> : <b>{error.toString()}</b>}
  </div>
);
