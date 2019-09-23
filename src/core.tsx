import { destinationConverters, sourceConverters } from "./converters";
import lodash from "lodash";
import * as ramda from "ramda";

export interface TransformResult {
  output: string | null;
  error: string | null;
}

export function doTransform(sourceType: string, source: string, transform: string, destType: string) {
  try {
    const input = sourceConverters[sourceType](source);
    let data = input;
    if (transform.trim().length) {
      const _ = lodash; // eslint-disable-line
      const R = ramda; // eslint-disable-line
      eval(transform); // eslint-disable-line
    }
    const output = destinationConverters[destType](data);
    return { error: null, output };
  } catch (error) {
    return { error, output: null };
  }
}
