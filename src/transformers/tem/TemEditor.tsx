import { TemState } from "./types";
import React from "react";
import { TransformSourceProps } from "../../components/TransformBox";
import { FaTrash } from "../../icons";

export function TemEditor({ transform, onChangeTransform }: TransformSourceProps) {
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
    const index = parseInt(indexStr ?? "", 10);
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
    <table className="mx-2">
      <thead>
        <tr>
          <th>Match</th>
          <th>Replacement</th>
          <th style={{ width: "1px" }} />
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th colSpan={3} className="py-2">
            <button className="btn" type="button" onClick={handleAddRule}>
              Add Rule
            </button>
          </th>
        </tr>
      </tfoot>
      <tbody>
        {state.rules.map((r, i) => (
          <tr key={i}>
            <td>
              <input
                className="input input-sm"
                placeholder="Match regexp"
                name={`match_${i}`}
                value={r.match}
                onChange={handleChangeEvent}
              />
            </td>
            <td>
              <input
                className="input input-sm"
                placeholder="Replacement"
                name={`replace_${i}`}
                value={r.replace}
                onChange={handleChangeEvent}
              />
            </td>
            <td>
              <button className="btn btn-sm" type="button" onClick={() => deleteRule(i)}>
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
