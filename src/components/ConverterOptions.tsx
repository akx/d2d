import React from "react";
import { Checkbox } from "../widgets";
import { SelectDropdown } from "./SelectDropdown";
import { ConverterOptionsSpec } from "../converters";
import { ConverterOptionValues } from "../types";

interface ConverterOptionsProps {
  spec: ConverterOptionsSpec;
  values: ConverterOptionValues;
  onChange: (key: string, value: string | number | boolean) => void;
}

export function ConverterOptions({ spec, values, onChange }: ConverterOptionsProps) {
  return (
    <div className="@container flex items-center gap-4">
      {Object.entries(spec).map(([key, option]) => {
        if (option.kind === "boolean") {
          return (
            <Checkbox
              key={key}
              label={option.label}
              shortLabel={option.shortLabel ?? option.label}
              checked={Boolean(values[key] ?? option.default)}
              onChange={(checked) => onChange(key, checked)}
            />
          );
        }
        return (
          <SelectDropdown
            key={key}
            label={option.label}
            value={String(values[key] ?? option.default)}
            options={option.choices.map((c) => c.value)}
            onChange={(value) => onChange(key, value)}
            nameMap={Object.fromEntries(option.choices.map((c) => [c.value, c.label]))}
            descriptionMap={Object.fromEntries(
              option.choices.flatMap((c) => (c.description ? [[c.value, c.description]] : [])),
            )}
          />
        );
      })}
    </div>
  );
}
