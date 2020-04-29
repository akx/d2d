import React from "react";

export interface BaseTransformResult {}

export interface ElementTransformResult extends BaseTransformResult {
  type: "element";
  element: React.ReactChild;
}

export interface StringTransformResult extends BaseTransformResult {
  type: "string";
  value: string;
}

export interface ErrorTransformResult extends BaseTransformResult {
  type: "error";
  error: Error;
  phase: "input" | "transform" | "output";
}

export type TransformResult = ElementTransformResult | StringTransformResult | ErrorTransformResult;
export type SourceConverter = (data: any) => any;
export type DestinationConverter<T = TransformResult> = (data: any) => T;

export interface Styleable {
  style?: React.CSSProperties;
}

export enum MainLayout {
  ThreeColumns = "threeColumns",
  BottomCode = "bottomCode",
  NoCode = "noCode",
}

export const layoutNames: { [layout in MainLayout]: string } = {
  [MainLayout.ThreeColumns]: "Three Columns",
  [MainLayout.BottomCode]: "Code on Bottom",
  [MainLayout.NoCode]: "No Code",
};
