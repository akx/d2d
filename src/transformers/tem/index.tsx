import { Transformer } from "../../types";
import React from "react";
import { TemRule, TemState } from "./types";
import { TemEditor } from "./TemEditor";

export const temTransform: Transformer = {
  transform(inputs, transform) {
    const rules: TemRule[] = (JSON.parse(transform) as TemState).rules;
    let data = Array.isArray(inputs[0]) ? inputs.map((s) => `${s}`).join("\n") : `${inputs[0]}`;
    rules.forEach((rule) => {
      if (!rule.match) return;
      const matchRe = new RegExp(rule.match, "gm");
      data = data.replace(matchRe, rule.replace);
    });
    return data;
  },
  getEditor(transform, onChangeTransform): React.ReactElement {
    return <TemEditor transform={transform} onChangeTransform={onChangeTransform} />;
  },
};
