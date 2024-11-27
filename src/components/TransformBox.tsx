import React from "react";
import Editor from "./Editor";
import { codeTheme } from "../consts";
import { Setter, Styleable } from "../types";
import { Button, Menu, Message } from "semantic-ui-react";
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
        <Message negative>
          <p>
            The editor failed to render. The error message we got was "<b>{error.message}</b>".
          </p>
          <p>
            You can either change the transform type to something that's compatible with your data, or click below to
            reset your transform code.
          </p>
          <Button
            onClick={() => {
              onChangeTransform("");
              resetErrorBoundary();
            }}
          >
            Reset transform
          </Button>
        </Message>
      );
    },
    [onChangeTransform],
  );

  if (!transformer) {
    return (
      <Message negative>
        <p>The transform type "{transformType}" is not supported.</p>
      </Message>
    );
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
      <Menu secondary size="small" style={{ margin: 0 }}>
        <SelectDropdown
          label="Language"
          value={transformType}
          options={Object.keys(transformers)}
          onChange={onChangeTransformType}
          nameMap={prettyTransformNames}
        />
      </Menu>
      <ErrorBoundary FallbackComponent={ErrorFallback}>{editor}</ErrorBoundary>
    </div>
  );
};
