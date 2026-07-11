import React from "react";
import { ConverterOptionValues, MainLayout } from "./types";
import { Toolbar } from "./components/Toolbar";
import { createPersistedState } from "./hooks/usePersistedState";
import { useSource, useTransformResult } from "./sources";
import { MainContentPane } from "./components/MainContentPane";
import { converterOptionSpecs, DestConverterName, defaultOptionValues } from "./converters";

const [usePersistedState] = createPersistedState("d2d", localStorage);

const App: React.FC = () => {
  const [nSources, setNSources] = React.useState(1);
  const [destType, setDestType] = usePersistedState("dest-type", "json");
  const [transform, setTransform] = usePersistedState("transform", "");
  const [transformType, setTransformType] = usePersistedState("transform-type", "javascript");
  const [layout, setLayout] = usePersistedState("layout", MainLayout.ThreeColumns);
  const [destOptionsByType, setDestOptionsByType] = usePersistedState<Record<string, ConverterOptionValues>>(
    "dest-options",
    {},
  );

  const optionsSpec = converterOptionSpecs[destType as DestConverterName];
  const destOptions = React.useMemo(
    () => ({ ...(optionsSpec ? defaultOptionValues(optionsSpec) : {}), ...destOptionsByType[destType] }),
    [optionsSpec, destOptionsByType, destType],
  );
  const setDestOption = React.useCallback(
    (key: string, value: string | number | boolean) => {
      setDestOptionsByType((prev) => ({ ...prev, [destType]: { ...prev[destType], [key]: value } }));
    },
    [setDestOptionsByType, destType],
  );

  const source1 = useSource();
  const source2 = useSource();
  const source3 = useSource();
  const sources = [source1, source2, source3].slice(0, nSources);
  const result = useTransformResult(sources, transform, transformType, destType, destOptions);
  return (
    <>
      <Toolbar
        nSources={nSources}
        setNSources={setNSources}
        destType={destType}
        setDestType={setDestType}
        destOptions={destOptions}
        setDestOption={setDestOption}
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
