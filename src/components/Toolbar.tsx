import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { destinationConverters } from "../converters";
import { layoutNames, MainLayout, Setter } from "../types";
import { ConverterSelect } from "./ConverterSelect";

interface ToolbarProps {
  destType: string;
  setDestType: Setter<string>;
  layout: MainLayout;
  setLayout: (layout: MainLayout) => void;
}

export const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { destType, setDestType, layout, setLayout } = props;
  return (
    <Menu fluid>
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
      <ConverterSelect
        label="Output Format"
        value={destType}
        options={Object.keys(destinationConverters)}
        onChange={setDestType}
      />
    </Menu>
  );
};
