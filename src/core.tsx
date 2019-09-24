import { destinationConverters, sourceConverters } from "./converters";
import lodash from "lodash";
import * as ramda from "ramda";
import { TransformResult } from "./types";

export function doTransform(sourceType: string, source: string, transform: string, destType: string): TransformResult {
  try {
    const input = sourceConverters[sourceType](source);
    let data = input;
    if (transform.trim().length) {
      const _ = lodash; // eslint-disable-line
      const R = ramda; // eslint-disable-line
      eval(transform); // eslint-disable-line
    }
    return destinationConverters[destType](data);
  } catch (error) {
    return { error, type: "error" };
  }
}
