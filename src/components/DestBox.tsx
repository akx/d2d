import React from "react";
import Editor from "./Editor";
import { dataTheme } from "../consts";
import { ErrorDisplay } from "./ErrorDisplay";
import { Styleable, TransformResult } from "../types";
import { ConverterName, converterPrettyNames } from "../converters";

interface DestProps extends Styleable {
  destType: string;
  result: TransformResult;
}

export const DestBox: React.FC<DestProps> = ({ destType, result, style }) => {
  let comp: React.ReactElement | string | number | null = null;
  switch (result.type) {
    case "element":
      comp = result.element;
      break;
    case "string":
      comp = (
        <Editor
          value={result.value}
          options={{
            mode: destType,
            theme: dataTheme,
            lineNumbers: true,
            readOnly: true,
            placeholder: `Output will appear here in ${converterPrettyNames[destType as ConverterName] || destType}.`,
          }}
          onChange={() => void 8}
        />
      );
      break;
    case "error":
      comp = <ErrorDisplay result={result} />;
      break;
  }
  return (
    <div className="codebox-wrapper" style={style}>
      {comp}
    </div>
  );
};
