import React from "react";

import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import { destinationConverters, sourceConverters } from "./converters";
import { doTransform, TransformResult } from "./core";

const dataTheme = "solarized light";
const codeTheme = "solarized dark";

interface SourceProps {
  source: string;
  sourceType: string;
  onChangeSourceType: (str: string) => void;
  onChangeSource: (str: string) => void;
}

interface TransformProps {
  transform: string;
  onChangeTransform: (s: string) => void
}

interface DestProps {
  destType: string;
  onChangeDestType: (s: string) => void;
  result: TransformResult;
}

const SourceSettings: React.FC<SourceProps> = ({ sourceType, onChangeSourceType, source, onChangeSource }) => (
  <>
    <select value={sourceType} onChange={e => onChangeSourceType(e.target.value)}>
      {Object.keys(sourceConverters).map(conv => (
        <option value={conv}>{conv}</option>
      ))}
    </select>
    <ControlledCodeMirror
      className="code-editor"
      value={source}
      options={{
        mode: sourceType,
        theme: dataTheme,
      }}
      onBeforeChange={(editor, data, value) => onChangeSource(value)}
    />
  </>
);


const TransformSettings: React.FC<TransformProps> = ({ transform, onChangeTransform }) => (
  <ControlledCodeMirror
    className="code-editor"
    value={transform}
    options={{
      mode: "javascript",
      theme: codeTheme,
      lineNumbers: true,
      placeholder: "// feel free to modify `data` using JavaScript here",
    }}
    onBeforeChange={(editor, data, value) => onChangeTransform(value)}
  />
);

const DestSettings: React.FC<DestProps> = ({ destType, result, onChangeDestType }) => (
  <>
    <select value={destType} onChange={e => onChangeDestType(e.target.value)}>
      {Object.keys(destinationConverters).map(conv => (
        <option value={conv}>{conv}</option>
      ))}
    </select>
    <ControlledCodeMirror
      value={result.error ? `ERROR:\n${result.error}` : result.output || ""}
      className="code-editor"
      options={{
        mode: destType,
        theme: dataTheme,
        lineNumbers: true,
        readOnly: true,
      }}
      onBeforeChange={() => void 8}
    />
  </>
);

const App: React.FC = () => {
  const [source, setSource] = React.useState("");
  const [sourceType, setSourceType] = React.useState("text");
  const [destType, setDestType] = React.useState("text");
  const [transform, setTransform] = React.useState("");
  const result: TransformResult = React.useMemo(() => doTransform(sourceType, source, transform, destType), [
    sourceType,
    source,
    transform,
    destType,
  ]);
  return (
    <>
      <SourceSettings
        source={source}
        sourceType={sourceType}
        onChangeSourceType={setSourceType}
        onChangeSource={setSource}
      />
      <TransformSettings transform={transform} onChangeTransform={setTransform} />
      <DestSettings destType={destType} onChangeDestType={setDestType} result={result} />
    </>
  );
};

export default App;
