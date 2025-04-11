import { Transformer } from "../types";
import { javascriptTransform } from "./javascript";
import { temTransform } from "./tem";
import { xsltTransform } from "./xml";

export const transformers: Record<string, Transformer> = {
  javascript: javascriptTransform,
  xslt: xsltTransform,
  tem: temTransform,
};
export const prettyTransformNames: Record<string, string> = {
  javascript: "JavaScript",
  xslt: "XSLT",
  tem: "Tem String Replace",
};
