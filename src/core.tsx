import { destinationConverters, sourceConverters } from "./converters";
import lodash from "lodash";
import * as ramda from "ramda";
import { TransformResult } from "./types";

export function doTransform(sourceType: string, source: string, transform: string, destType: string): TransformResult {
  let input;
  try {
    input = sourceConverters[sourceType](source);
  } catch (error) {
    return { error, type: "error", phase: "input" };
  }

  let data = input;
  if (transform.trim().length) {
    try {
      const _ = lodash; // eslint-disable-line
      const R = ramda; // eslint-disable-line
      eval(transform); // eslint-disable-line
    } catch (error) {
      return { error, type: "error", phase: "transform" };
    }
  }

  try {
    return destinationConverters[destType](data);
  } catch (error) {
    return { error, type: "error", phase: "output" };
  }
}
