import React from "react";
import { doTransform } from "./core";
import { MainLayout, TransformResult } from "./types";
import SplitPane from "react-split-pane";
import { TransformBox } from "./components/TransformBox";
import { DestBox } from "./components/DestBox";
import { Toolbar } from "./components/Toolbar";
import createPersistedState from "use-persisted-state";
import { SemanticToastContainer } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import { getSourceBoxFor, useSource } from "./sources";

const useLayoutState = createPersistedState("d2d-layout");
const useTransformState = createPersistedState("d2d-transform");

const App: React.FC = () => {
  const [nSources, setNSources] = React.useState(1);
  const [destType, setDestType] = React.useState("json");
  const [transform, setTransform] = useTransformState("");
  const [layout, setLayout] = useLayoutState(MainLayout.ThreeColumns);
  const source1 = useSource();
  const source2 = useSource();
  const result: TransformResult = React.useMemo(() => doTransform([source1, source2], transform, destType), [
    source1,
    source2,
    transform,
    destType,
  ]);
  let mainContent: React.ReactNode;
  const source1Box = getSourceBoxFor(source1, nSources > 1 ? "Input 1" : undefined);
  const source2Box = nSources > 1 ? getSourceBoxFor(source2, "Input 2") : null;
  const sourceBoxes =
    nSources === 1 ? (
      source1Box
    ) : (
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        {source1Box}
        {source2Box}
      </div>
    );
  const transformBox = <TransformBox transform={transform} onChangeTransform={setTransform} nSources={nSources} />;
  const destBox = <DestBox destType={destType} result={result} />;
  switch (layout) {
    case MainLayout.ThreeColumns:
    default:
      mainContent = (
        <SplitPane split="vertical" defaultSize="35%">
          {sourceBoxes}
          <SplitPane split="vertical" defaultSize="40%">
            {transformBox}
            {destBox}
          </SplitPane>
        </SplitPane>
      );
      break;
    case MainLayout.BottomCode:
      mainContent = (
        <SplitPane split="horizontal" defaultSize="80%">
          <SplitPane split="vertical" defaultSize="50%">
            {sourceBoxes}
            {destBox}
          </SplitPane>
          {transformBox}
        </SplitPane>
      );
      break;
    case MainLayout.NoCode:
      mainContent = (
        <SplitPane split="vertical" defaultSize="50%">
          {sourceBoxes}
          {destBox}
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
