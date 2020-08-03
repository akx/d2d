import { Transformer } from "../types";
import React from "react";
import { TransformSourceProps } from "../components/TransformBox";
import { Button, Input } from "semantic-ui-react";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";

interface TemRule {
  match: string;
  replace: string;
}

interface TemState {
  rules: TemRule[];
}

const TemEditor: React.FC<TransformSourceProps> = ({ transform, onChangeTransform }) => {
  let state: TemState = { rules: [] };
  if (transform.trim()) {
    try {
      state = JSON.parse(transform) as TemState;
    } catch (e) {
      throw new Error(`Invalid Tem state: ${e}`);
    }
  }

  const updateTransform = () => onChangeTransform(JSON.stringify(state));

  const handleAddRule = () => {
    state.rules.push({ match: "", replace: "" });
    updateTransform();
  };

  const editRule = (index: number, field: "match" | "replace", value: string) => {
    const rule = state.rules[index];
    if (rule) {
      rule[field] = value;
    }
    updateTransform();
  };

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [field, indexStr] = event.target.name.split("_");
    const index = parseInt(indexStr, 10);
    if (Number.isNaN(index)) return;
    switch (field) {
      case "match":
      case "replace":
        editRule(index, field, event.target.value);
    }
  };

  const deleteRule = (index: number) => {
    if (Number.isNaN(index)) return;
    state.rules.splice(index, 1);
    updateTransform();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Match</th>
          <th>Replacement</th>
          <th style={{ width: "1px" }} />
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th colSpan={3}>
            <Button onClick={handleAddRule}>Add Rule</Button>
          </th>
        </tr>
      </tfoot>
      <tbody>
        {state.rules.map((r, i) => (
          <tr key={i}>
            <td>
              <Input
                fluid
                placeholder="Match regexp"
                name={`match_${i}`}
                value={r.match}
                onChange={handleChangeEvent}
              />
            </td>
            <td>
              <Input
                fluid
                placeholder="Replacement"
                name={`replace_${i}`}
                value={r.replace}
                onChange={handleChangeEvent}
              />
            </td>
            <td>
              <Button icon negative onClick={() => deleteRule(i)}>
                <Icon name="trash" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

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
  getEditor(transform, onChangeTransform): React.ReactChild {
    return <TemEditor transform={transform} onChangeTransform={onChangeTransform} />;
  },
};
