import React from "react";
import { sourceSamples } from "./samples";
import { doTransform } from "./core";
import { MainLayout, TransformResult } from "./types";
import SplitPane from "react-split-pane";
import { SourceBox } from "./components/SourceBox";
import { TransformBox } from "./components/TransformBox";
import { DestBox } from "./components/DestBox";
import { Toolbar } from "./components/Toolbar";
import createPersistedState from "use-persisted-state";

const useLayoutState = createPersistedState("d2d-layout");
const useTransformState = createPersistedState("d2d-transform");

const App: React.FC = () => {
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
  switch (layout) {
    case MainLayout.ThreeColumns:
    default:
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
        <Toolbar
          sourceType={sourceType}
          setSourceType={setSourceType}
          loadSample={loadSample}
          destType={destType}
          setDestType={setDestType}
          layout={layout}
          setLayout={setLayout}
        />
      </div>
      <div id="main-panes">{mainContent}</div>
    </>
  );
};

export default App;
