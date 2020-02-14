import React from "react";
import Editor from "../Editor";
import { codeTheme } from "../consts";
import { Styleable } from "../types";

interface TransformProps extends Styleable {
  transform: string;
  onChangeTransform: (s: string) => void;
}

const TRANSFORM_PLACEHOLDER = `
// Feel free to modify \`data\` using JavaScript here.
// * Lodash is available as \`_\`
// ** e.g. \`_.reverse(data)\`
// * Ramda is available as \`R\`
// ** e.g. \`data = R.reverse(data)\`
`.trim();
export const TransformBox: React.FC<TransformProps> = ({ transform, onChangeTransform, style }) => (
  <div className="codebox-wrapper" style={style}>
    <Editor
      value={transform}
      options={{
        mode: "javascript",
        theme: codeTheme,
        lineNumbers: true,
        placeholder: TRANSFORM_PLACEHOLDER,
      }}
      onChange={onChangeTransform}
    />
  </div>
);
