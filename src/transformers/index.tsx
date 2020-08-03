import { Transformer } from "../types";
import { javascriptTransform } from "./javascript";
import { temTransform } from "./tem";

export const transformers: Record<string, Transformer> = {
  javascript: javascriptTransform,
  tem: temTransform,
};
export const prettyTransformNames: Record<string, string> = {
  javascript: "JavaScript",
  tem: "Tem String Replace",
};
