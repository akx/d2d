import React from "react";
import Editor from "./Editor";
import { dataTheme } from "../consts";
import { Styleable } from "../types";
import { prettyNames } from "../converters";

interface SourceProps extends Styleable {
  source: string;
  sourceType: string;
  onChangeSource: (str: string) => void;
}

export const SourceBox: React.FC<SourceProps> = ({ sourceType, source, onChangeSource, style }) => (
  <div className="codebox-wrapper" style={style}>
    <Editor
      value={source}
      options={{
        mode: sourceType,
        theme: dataTheme,
        lineNumbers: true,
        placeholder: `Paste or type in ${prettyNames[sourceType] || sourceType} data here.`,
      }}
      onChange={onChangeSource}
    />
  </div>
);
