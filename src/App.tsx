import React from "react";
import { MainLayout } from "./types";
import { Toolbar } from "./components/Toolbar";
import createPersistedState from "@plq/use-persisted-state";
import { useSource, useTransformResult } from "./sources";
import { MainContentPane } from "./components/MainContentPane";
import storage from "@plq/use-persisted-state/lib/storages/local-storage";
import { Toaster } from "react-hot-toast";

const [usePersistedState] = createPersistedState("d2d", storage);

const App: React.FC = () => {
  const [nSources, setNSources] = React.useState(1);
  const [destType, setDestType] = React.useState("json");
  const [transform, setTransform] = usePersistedState("transform", "");
  const [transformType, setTransformType] = usePersistedState("transform-type", "javascript");
  const [layout, setLayout] = usePersistedState("layout", MainLayout.ThreeColumns);
  const source1 = useSource();
  const source2 = useSource();
  const source3 = useSource();
  const sources = [source1, source2, source3].slice(0, nSources);
  const result = useTransformResult(sources, transform, transformType, destType);
  return (
    <>
      <Toaster position="top-right" />
      <Toolbar
        nSources={nSources}
        setNSources={setNSources}
        destType={destType}
        setDestType={setDestType}
        layout={layout}
        setLayout={setLayout}
      />
      <div className="relative flex-1">
        <MainContentPane
          sources={sources}
          transform={transform}
          transformType={transformType}
          onChangeTransform={setTransform}
          onChangeTransformType={setTransformType}
          destType={destType}
          result={result}
          layout={layout}
        />
      </div>
    </>
  );
};

export default App;
