import { DestConverterName, destinationConverters, SourceConverterName, sourceConverters } from "./converters";
import { transformers } from "./transformers";
import { SourceConverter, TransformResult } from "./types";
import { StaticSourceInfo } from "./sources";

export function doTransform(
  sources: StaticSourceInfo[],
  transform: string,
  transformType: string,
  destType: string,
): TransformResult {
  const inputs: any[] = [];
  for (let index = 0; index < sources.length; index++) {
    const source = sources[index]!;
    try {
      const converter = sourceConverters[source.type as SourceConverterName];
      inputs.push((converter as SourceConverter)(source.source));
    } catch (error) {
      return { error, type: "error", phase: "input", index };
    }
  }
  let data;
  try {
    data = transformers[transformType]!.transform(inputs, transform);
  } catch (error) {
    return { error, type: "error", phase: "transform" };
  }
  try {
    return destinationConverters[destType as DestConverterName](data);
  } catch (error) {
    return { error, type: "error", phase: "output" };
  }
}
