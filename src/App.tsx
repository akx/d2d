import React from "react";

import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import { destinationConverters, sourceConverters } from "./converters";
import { doTransform } from "./core";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { TransformResult } from "./types";

const dataTheme = "solarized light";
const codeTheme = "solarized dark";

interface Styleable {
  style?: React.CSSProperties;
}

interface SourceProps extends Styleable {
  source: string;
  sourceType: string;
  onChangeSource: (str: string) => void;
}

interface TransformProps extends Styleable {
  transform: string;
  onChangeTransform: (s: string) => void;
}

interface DestProps extends Styleable {
  destType: string;
  result: TransformResult;
}

interface ConverterSelectProps extends Styleable {
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

const ConverterSelect: React.FC<ConverterSelectProps> = ({ value, options, onChange, style }) => {
  const handleClick = (e: React.MouseEvent, { name }: MenuItemProps) => name && onChange(name);
  return (
    <Menu fluid size="mini" style={style}>
      {options.map(item => (
        <Menu.Item name={item} active={value === item} onClick={handleClick} />
      ))}
    </Menu>
  );
};

const SourceBox: React.FC<SourceProps> = ({ sourceType, source, onChangeSource, style }) => (
  <div className="codebox-wrapper" style={style}>
    <ControlledCodeMirror
      className="code-editor"
      value={source}
      options={{
        mode: sourceType,
        theme: dataTheme,
      }}
      onBeforeChange={(editor, data, value) => onChangeSource(value)}
    />
  </div>
);

const TransformBox: React.FC<TransformProps> = ({ transform, onChangeTransform, style }) => (
  <div className="codebox-wrapper" style={style}>
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
  </div>
);

const DestBox: React.FC<DestProps> = ({ destType, result, style }) => {
  let comp: React.ReactChild | null = null;
  switch (result.type) {
    case "element":
      comp = result.element;
      break;
    case "string":
      comp = (
        <ControlledCodeMirror
          value={result.value}
          className="code-editor"
          options={{
            mode: destType,
            theme: dataTheme,
            lineNumbers: true,
            readOnly: true,
          }}
          onBeforeChange={() => void 8}
        />
      );
      break;
    case "error":
      comp = <div>{result.error.toString()}</div>;
      break;
  }
  return (
    <div className="codebox-wrapper" style={style}>
      {comp}
    </div>
  );
};

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
      <div style={{ gridArea: "src-header" }}>
        <ConverterSelect value={sourceType} options={Object.keys(sourceConverters)} onChange={setSourceType} />
      </div>
      <div style={{ gridArea: "dest-header" }}>
        <ConverterSelect value={destType} options={Object.keys(destinationConverters)} onChange={setDestType} />
      </div>
      <TransformBox transform={transform} onChangeTransform={setTransform} style={{ gridArea: "xform-content" }} />
      <SourceBox
        source={source}
        sourceType={sourceType}
        onChangeSource={setSource}
        style={{ gridArea: "src-content" }}
      />
      <DestBox destType={destType} result={result} style={{ gridArea: "dest-content" }} />
    </>
  );
};

export default App;
