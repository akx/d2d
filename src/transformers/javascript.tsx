/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transformer } from "../types";
import lodash from "lodash";
import * as ramda from "ramda";

export const javascriptTransform: Transformer = {
  transform(inputs, transform) {
    let data = inputs[0];
    let data1 = inputs[0];
    let data2 = inputs[1];
    if (transform.trim().length) {
      const _ = lodash;
      const R = ramda;
      eval(transform);  // eslint-disable-line no-eval
    }
    return data;
  },
};
