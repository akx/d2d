import { Setter } from "./types";
import React from "react";
import { sourceSamples } from "./samples";
import { SourceBox, SourceBoxProps } from "./components/SourceBox";

export interface SourceInfo {
  loadSample: () => void;
  setSource: Setter<string>;
  setType: Setter<string>;
  source: string;
  type: string;
}

export function useSource(): SourceInfo {
  const [type, setType] = React.useState("yaml");
  const [source, setSource] = React.useState("");
  const loadSample = React.useCallback(() => {
    setSource(sourceSamples[type]);
  }, [type, setSource]);
  return {
    type,
    setType,
    source,
    setSource,
    loadSample,
  };
}

export function getSourceBoxFor(sourceInfo: SourceInfo, label?: string) {
  const sourceBoxProps: SourceBoxProps = {
    source: sourceInfo.source,
    sourceType: sourceInfo.type,
    onChangeSource: sourceInfo.setSource,
    onChangeSourceType: sourceInfo.setType,
    onLoadSample: sourceInfo.loadSample,
    label,
  };
  return <SourceBox {...sourceBoxProps} />;
}
