import { Styleable } from "../types";
import React from "react";
import { Dropdown, DropdownItemProps } from "semantic-ui-react";
import { prettyDescriptions, prettyNames } from "../converters";

interface ConverterSelectProps extends Styleable {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

export const ConverterSelect: React.FC<ConverterSelectProps> = ({ label, value, options, onChange, style }) => {
  const onClick = (event: any, props: DropdownItemProps) => {
    onChange(props.name);
    event.preventDefault();
  };
  return (
    <Dropdown
      item
      text={`${label}: ${prettyNames[value] || value}`}
      /* TODO: these have no effect :-/ */
      closeOnChange={false}
    >
      <Dropdown.Menu style={{ minWidth: "25em" }}>
        {options.map((item) => (
          <Dropdown.Item
            key={item}
            name={item}
            active={value === item}
            onClick={onClick}
            text={prettyNames[item] || item}
            description={prettyDescriptions[item]}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
