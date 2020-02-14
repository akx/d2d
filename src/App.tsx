import React from "react";

import { destinationConverters, sourceConverters } from "./converters";
import { sourceSamples } from "./samples";
import { doTransform } from "./core";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { TransformResult } from "./types";
import { ErrorDisplay } from "./ErrorDisplay";
import SplitPane from "react-split-pane";
import Editor from "./Editor";

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
  onChangeSample?: () => void;
}

enum MainLayout {
  ThreeColumns,
  BottomCode,
}

const ConverterSelect: React.FC<ConverterSelectProps> = ({ value, options, onChange, style, onChangeSample }) => {
  const handleClick = (e: React.MouseEvent, { name }: MenuItemProps) => name && onChange(name);
  const handleSampleClick = () => {
    if (onChangeSample) {
      onChangeSample();
    }
  };
  return (
    <Menu fluid size="mini" style={style}>
      {options.map(item => (
        <Menu.Item name={item} active={value === item} onClick={handleClick} />
      ))}
      {onChangeSample ? (
        <Menu.Menu position="right">
          <Menu.Item name="Example" title="Use example data in the selected format" onClick={handleSampleClick} />
        </Menu.Menu>
      ) : null}
    </Menu>
  );
};

const SourceBox: React.FC<SourceProps> = ({ sourceType, source, onChangeSource, style }) => (
  <div className="codebox-wrapper" style={style}>
    <Editor
      value={source}
      options={{
        mode: sourceType,
        theme: dataTheme,
        lineNumbers: true,
        placeholder: `Paste or type in ${sourceType} data here.`,
      }}
      onChange={onChangeSource}
    />
  </div>
);

const TRANSFORM_PLACEHOLDER = `
// Feel free to modify \`data\` using JavaScript here.
// * Lodash is available as \`_\`
// ** e.g. \`_.reverse(data)\`
// * Ramda is available as \`R\`
// ** e.g. \`data = R.reverse(data)\`
`.trim();

const TransformBox: React.FC<TransformProps> = ({ transform, onChangeTransform, style }) => (
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

const DestBox: React.FC<DestProps> = ({ destType, result, style }) => {
  let comp: React.ReactChild | null = null;
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
            placeholder: `Output will appear here in ${destType}.`,
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

const App: React.FC = () => {
  const [sourceType, setSourceType] = React.useState("yaml");
  const [source, setSource] = React.useState("");
  const setSample = () => {
    setSource(sourceSamples[sourceType]);
  };
  const [destType, setDestType] = React.useState("json");
  const [transform, setTransform] = React.useState("");
  const [layout, setLayout] = React.useState(MainLayout.ThreeColumns);
  const result: TransformResult = React.useMemo(() => doTransform(sourceType, source, transform, destType), [
    sourceType,
    source,
    transform,
    destType,
  ]);
  let mainContent: React.ReactNode;
  switch (layout) {
    case MainLayout.ThreeColumns:
      mainContent = (
        <SplitPane split="vertical" defaultSize="35%">
          <SourceBox source={source} sourceType={sourceType} onChangeSource={setSource} />
          <SplitPane split="vertical" defaultSize="40%">
            <TransformBox transform={transform} onChangeTransform={setTransform} />
            <DestBox destType={destType} result={result} />
          </SplitPane>
        </SplitPane>
      );
      break;
    case MainLayout.BottomCode:
      mainContent = (
        <SplitPane split="horizontal" defaultSize="80%">
          <SplitPane split="vertical" defaultSize="50%">
            <SourceBox source={source} sourceType={sourceType} onChangeSource={setSource} />
            <DestBox destType={destType} result={result} />
          </SplitPane>
          <TransformBox transform={transform} onChangeTransform={setTransform} />
        </SplitPane>
      );
      break;
  }
  return (
    <>
      <div id="settings">
        <div>
          Input Format
          <ConverterSelect
            value={sourceType}
            options={Object.keys(sourceConverters)}
            onChange={setSourceType}
            onChangeSample={setSample}
          />
        </div>
        <div>
          Output Format
          <ConverterSelect value={destType} options={Object.keys(destinationConverters)} onChange={setDestType} />
        </div>
      </div>
      <div id="main-panes">{mainContent}</div>
    </>
  );
};

export default App;
