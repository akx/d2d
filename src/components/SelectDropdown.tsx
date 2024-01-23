import React from "react";
import { Dropdown, DropdownItemProps } from "semantic-ui-react";

interface SelectDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  nameMap: Record<string, string>;
  descriptionMap?: Record<string, string>;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  nameMap,
  descriptionMap,
}) => {
  const onClick = (event: any, props: DropdownItemProps) => {
    onChange(props.name);
    event.preventDefault();
  };
  return (
    <Dropdown
      item
      text={`${label}: ${nameMap[value] || value}`}
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
            text={nameMap[item] || item}
            description={descriptionMap ? descriptionMap[item] : undefined}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
