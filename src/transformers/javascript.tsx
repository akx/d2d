/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transformer } from "../types";
import lodash from "lodash";
import * as ramda from "ramda";

export const javascriptTransform: Transformer = {
  transform(inputs, transform) {
    const data = inputs[0];
    const data1 = inputs[0];
    const data2 = inputs[1];
    if (transform.trim().length) {
      const _ = lodash;
      const R = ramda;
      eval(transform);  
    }
    return data;
  },
};
