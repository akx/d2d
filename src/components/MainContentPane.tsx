import React from "react";
import { getSourceBoxFor, SourceInfo } from "../sources";
import { TransformBox, TransformSourceProps, TransformTypeProps } from "./TransformBox";
import { DestBox } from "./DestBox";
import { MainLayout, TransformResult } from "../types";
import { Allotment } from "allotment";
import "allotment/dist/style.css";


interface MainContentPaneProps extends TransformTypeProps, TransformSourceProps {
  sources: SourceInfo[];
  destType: string;
  result: TransformResult;
  layout: MainLayout;
}

export const MainContentPane: React.FC<MainContentPaneProps> = ({
  sources,
  transform,
  onChangeTransform,
  onChangeTransformType,
  transformType,
  destType,
  result,
  layout,
}) => {
  const nSources = sources.length;
  const sourceBoxes = (
    <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", height: "100%" }}>
      {sources.map((s, i) => getSourceBoxFor(s, nSources > 1 ? `Input ${i + 1}` : undefined, `input-${i}`))}
    </div>
  );
  const transformBox = (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <TransformBox
        transform={transform}
        transformType={transformType}
        onChangeTransform={onChangeTransform}
        onChangeTransformType={onChangeTransformType}
        nSources={nSources}
      />
    </div>
  );
  const destBox =
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <DestBox destType={destType} result={result} />
    </div>;

  switch (layout) {
    case MainLayout.ThreeColumns:
    default:
      return (
        <Allotment key={MainLayout.ThreeColumns}>
          {sourceBoxes}
          {transformBox}
          {destBox}
        </Allotment>
      );
    case MainLayout.BottomCode:
      return (
        <Allotment vertical key={MainLayout.BottomCode}>
          <Allotment>
            {sourceBoxes}
            {destBox}
          </Allotment>
          {transformBox}
        </Allotment>
      );
    case MainLayout.NoCode:
      return (
        <Allotment key={MainLayout.NoCode}>
          {sourceBoxes}
          {destBox}
        </Allotment>
      );
  }
};
