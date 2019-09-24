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
}

export type TransformResult = ElementTransformResult | StringTransformResult | ErrorTransformResult;
