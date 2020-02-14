import React from "react";
import { Dropdown, DropdownItemProps, Menu } from "semantic-ui-react";
import { destinationConverters, prettyDescriptions, prettyNames, sourceConverters } from "../converters";
import { layoutNames, MainLayout, Styleable } from "../types";

interface ConverterSelectProps extends Styleable {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

const ConverterSelect: React.FC<ConverterSelectProps> = ({ label, value, options, onChange, style }) => {
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
        {options.map(item => (
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
type Setter<T> = (t: T) => void;

interface ToolbarProps {
  sourceType: string;
  setSourceType: Setter<string>;
  loadSample: () => void;
  destType: string;
  setDestType: Setter<string>;
  layout: MainLayout;
  setLayout: (layout: MainLayout) => void;
}

export const Toolbar: React.FC<ToolbarProps> = props => {
  const { sourceType, setSourceType, loadSample, destType, setDestType, layout, setLayout } = props;
  return (
    <Menu fluid secondary size="small">
      <ConverterSelect
        label="Source Format"
        value={sourceType}
        options={Object.keys(sourceConverters)}
        onChange={setSourceType}
      />
      <ConverterSelect
        label="Output Format"
        value={destType}
        options={Object.keys(destinationConverters)}
        onChange={setDestType}
      />
      <Menu.Menu position="right">
        <Menu.Item name="loadSample" onClick={loadSample}>
          Load {prettyNames[sourceType] || sourceType} Sample
        </Menu.Item>
        <Dropdown item text="Layout...">
          <Dropdown.Menu>
            {Object.entries(layoutNames).map(([id, name]) => (
              <Dropdown.Item
                key={id}
                name={id}
                active={layout === id}
                text={name}
                onClick={(event, { name }) => setLayout(name as MainLayout)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};
