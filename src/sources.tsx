import { Setter, TransformResult } from "./types";
import React from "react";
import { sourceSamples } from "./samples";
import { SourceBox } from "./components/SourceBox";
import { doTransform } from "./core";
import { SourceConverterName } from "./converters";

export interface StaticSourceInfo {
  source: string;
  type: string;
}

export interface SourceInfo extends StaticSourceInfo {
  loadSample: () => void;
  setSource: Setter<string>;
  setType: Setter<string>;
}

export function useSource(): SourceInfo {
  const [type, setType] = React.useState("yaml");
  const [source, setSource] = React.useState("");
  const loadSample = React.useCallback(() => {
    setSource(sourceSamples[type as SourceConverterName] ?? "");
  }, [type, setSource]);
  return {
    type,
    setType,
    source,
    setSource,
    loadSample,
  };
}

export function getSourceBoxFor(sourceInfo: SourceInfo, label?: string, key?: string) {
  return (
    <SourceBox
      source={sourceInfo.source}
      sourceType={sourceInfo.type}
      onChangeSource={sourceInfo.setSource}
      onChangeSourceType={sourceInfo.setType}
      onLoadSample={sourceInfo.loadSample}
      label={label}
      key={key}
    />
  );
}

export function useTransformResult(sources: SourceInfo[], transform: string, transformType: string, destType: string) {
  const nSources = sources.length;
  const resultMemoDeps = [nSources, transform, transformType, destType];
  const sourceInfos: StaticSourceInfo[] = [];
  for (const { source, type } of sources) {
    resultMemoDeps.push(source);
    resultMemoDeps.push(type);
    sourceInfos.push({ source, type });
  }
  const result: TransformResult = React.useMemo(
    () => doTransform(sourceInfos, transform, transformType, destType),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    resultMemoDeps,
  );
  return result;
}
