import React from "react";
import Editor from "./Editor";
import { codeTheme } from "../consts";
import { Setter, Styleable } from "../types";
import { SelectDropdown } from "./SelectDropdown";
import { prettyTransformNames, transformers } from "../transformers";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export interface TransformSourceProps {
  transform: string;
  onChangeTransform: Setter<string>;
}

export interface TransformTypeProps {
  transformType: string;
  onChangeTransformType: Setter<string>;
}

interface TransformProps extends TransformTypeProps, TransformSourceProps, Styleable {
  nSources: number;
}

const TOOLS_INFO = `
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

export const TransformBox: React.FC<TransformProps> = ({
  transform,
  transformType,
  onChangeTransform,
  onChangeTransformType,
  nSources,
  style,
}) => {
  const transformer = transformers[transformType];
  const ErrorFallback = React.useCallback(
    ({ error, resetErrorBoundary }: FallbackProps) => {
      return (
        <div>
          <p>
            The editor failed to render. The error message we got was "<b>{error.message}</b>".
          </p>
          <p>
            You can either change the transform type to something that's compatible with your data, or click below to
            reset your transform code.
          </p>
          <button
            type="button"
            className="btn"
            onClick={() => {
              onChangeTransform("");
              resetErrorBoundary();
            }}
          >
            Reset transform
          </button>
        </div>
      );
    },
    [onChangeTransform],
  );

  if (!transformer) {
    return <div className="alert alert-warning">The transform type "{transformType}" is not supported.</div>;
  }
  const editor = transformer.getEditor ? (
    transformer.getEditor(transform, onChangeTransform, nSources)
  ) : (
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
  );

  return (
    <div className="codebox-wrapper" style={style}>
      <div className="flex items-center gap-2 border-b border-gray-200">
        <SelectDropdown
          className="p-2"
          label="Language"
          value={transformType}
          options={Object.keys(transformers)}
          onChange={onChangeTransformType}
          nameMap={prettyTransformNames}
        />
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>{editor}</ErrorBoundary>
    </div>
  );
};
