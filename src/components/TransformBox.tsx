import React from "react";
import Editor from "./Editor";
import { codeTheme } from "../consts";
import { Styleable } from "../types";

interface TransformProps extends Styleable {
  transform: string;
  nSources: number;
  onChangeTransform: (s: string) => void;
}

let TOOLS_INFO = `
// * Lodash is available as \`_\`
// ** e.g. \`_.reverse(data)\`
// * Ramda is available as \`R\`
// ** e.g. \`data = R.reverse(data)\`
`.trim();

const SINGLE_SOURCE_PLACEHOLDER = `
// Feel free to modify \`data\` using JavaScript here.
${TOOLS_INFO}
`.trim();

const MULTI_SOURCE_PLACEHOLDER = `
// Feel free to modify \`data\` using JavaScript here.
// Multiple sources are available:
// * as the \`inputs\` array
// * as \`data1\`, \`data2\`, ...
//
${TOOLS_INFO}
`.trim();

export const TransformBox: React.FC<TransformProps> = ({ transform, onChangeTransform, nSources, style }) => (
  <div className="codebox-wrapper" style={style}>
    <Editor
      value={transform}
      options={{
        mode: "javascript",
        theme: codeTheme,
        lineNumbers: true,
        placeholder: nSources > 1 ? MULTI_SOURCE_PLACEHOLDER : SINGLE_SOURCE_PLACEHOLDER,
      }}
      onChange={onChangeTransform}
    />
  </div>
);
