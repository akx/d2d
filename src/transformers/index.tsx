import { Transformer } from "../types";
import { javascriptTransform } from "./javascript";

export const transformers: Record<string, Transformer> = {
  javascript: javascriptTransform,
};
export const prettyTransformNames: Record<string, string> = {
  javascript: "JavaScript",
};
