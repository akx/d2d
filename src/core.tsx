/* eslint-disable @typescript-eslint/no-unused-vars */
import { destinationConverters, sourceConverters } from "./converters";
import lodash from "lodash";
import * as ramda from "ramda";
import { TransformResult } from "./types";
import { StaticSourceInfo } from "./sources";

function innerTransform(inputs: string[], transform: string): any {
  let data = inputs[0];
  let data1 = inputs[0];
  let data2 = inputs[1];
  if (transform.trim().length) {
    const _ = lodash; // eslint-disable-line
    const R = ramda; // eslint-disable-line
    eval(transform); // eslint-disable-line
  }
  return data;
}

export function doTransform(sources: StaticSourceInfo[], transform: string, destType: string): TransformResult {
  const inputs = [];
  for (let index = 0; index < sources.length; index++) {
    const source = sources[index];
    try {
      inputs.push(sourceConverters[source.type](source.source));
    } catch (error) {
      return { error, type: "error", phase: "input", index };
    }
  }
  let data;
  try {
    data = innerTransform(inputs, transform);
  } catch (error) {
    return { error, type: "error", phase: "transform" };
  }
  try {
    return destinationConverters[destType](data);
  } catch (error) {
    return { error, type: "error", phase: "output" };
  }
}
