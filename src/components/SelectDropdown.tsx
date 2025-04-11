import React from "react";
import { Dropdown } from "../widgets";
import type { ClassValue } from "clsx";

interface SelectDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  nameMap: Record<string, string>;
  descriptionMap?: Record<string, string>;
  className?: ClassValue;
}

export function SelectDropdown({
  label,
  value,
  options,
  onChange,
  nameMap,
  descriptionMap,
  className,
}: SelectDropdownProps) {
  return (
    <Dropdown
      className={className}
      text={`${label}: ${nameMap[value] || value}`}
      items={options.map((item) => ({
        id: item,
        name: item,
        active: value === item,
        onClick: () => onChange(item),
        text: nameMap[item] || item,
        description: descriptionMap?.[item],
      }))}
    />
  );
}
