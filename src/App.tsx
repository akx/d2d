import React from "react";
import { sourceSamples } from "./samples";
import { doTransform } from "./core";
import { MainLayout, TransformResult } from "./types";
import SplitPane from "react-split-pane";
import { SourceBox, SourceBoxProps } from "./components/SourceBox";
import { TransformBox } from "./components/TransformBox";
import { DestBox } from "./components/DestBox";
import { Toolbar } from "./components/Toolbar";
import createPersistedState from "use-persisted-state";
import { SemanticToastContainer } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

const useLayoutState = createPersistedState("d2d-layout");
const useTransformState = createPersistedState("d2d-transform");

const App: React.FC = () => {
  const [nSources, setNSources] = React.useState(1);
  const [sourceType, setSourceType] = React.useState("yaml");
  const [source, setSource] = React.useState("");
  const loadSample = () => {
    setSource(sourceSamples[sourceType]);
  };
  const [destType, setDestType] = React.useState("json");
  const [transform, setTransform] = useTransformState("");
  const [layout, setLayout] = useLayoutState(MainLayout.ThreeColumns);
  const result: TransformResult = React.useMemo(() => doTransform(sourceType, source, transform, destType), [
    sourceType,
    source,
    transform,
    destType,
  ]);
  let mainContent: React.ReactNode;
  const sourceBoxProps: SourceBoxProps = {
    source,
    sourceType,
    onChangeSource: setSource,
    onChangeSourceType: setSourceType,
    onLoadSample: loadSample,
  };
  switch (layout) {
    case MainLayout.ThreeColumns:
    default:
      mainContent = (
        <SplitPane split="vertical" defaultSize="35%">
          <SourceBox {...sourceBoxProps} />
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
            <SourceBox {...sourceBoxProps} />
            <DestBox destType={destType} result={result} />
          </SplitPane>
          <TransformBox transform={transform} onChangeTransform={setTransform} />
        </SplitPane>
      );
      break;
    case MainLayout.NoCode:
      mainContent = (
        <SplitPane split="vertical" defaultSize="50%">
          <SourceBox {...sourceBoxProps} />
          <DestBox destType={destType} result={result} />
        </SplitPane>
      );
      break;
  }
  return (
    <>
      <div id="settings">
        <Toolbar
          nSources={nSources}
          setNSources={setNSources}
          destType={destType}
          setDestType={setDestType}
          layout={layout}
          setLayout={setLayout}
        />
      </div>
      <div id="main-panes">{mainContent}</div>
      <SemanticToastContainer position="top-right" />
    </>
  );
};

export default App;
