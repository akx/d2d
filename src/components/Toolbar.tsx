import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { destinationConverters, converterDescriptions, converterPrettyNames } from "../converters";
import { layoutNames, MainLayout, Setter } from "../types";
import { SelectDropdown } from "./SelectDropdown";

interface ToolbarProps {
  destType: string;
  setDestType: Setter<string>;
  layout: MainLayout;
  setLayout: Setter<MainLayout>;
  nSources: number;
  setNSources: Setter<number>;
}

const nSourcesOptions = [1, 2, 3];

export const Toolbar: React.FC<ToolbarProps> = ({
  destType,
  layout,
  setDestType,
  setLayout,
  nSources,
  setNSources,
}) => {
  return (
    <Menu fluid>
      <Dropdown item text={`Layout: ${layoutNames[layout] || layout}`}>
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
      <Dropdown item text={`Sources: ${nSources}`}>
        <Dropdown.Menu>
          {nSourcesOptions.map((n) => (
            <Dropdown.Item key={n} name={n} active={nSources === n} text={n} onClick={() => setNSources(n)} />
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <SelectDropdown
        label="Output Format"
        value={destType}
        options={Object.keys(destinationConverters)}
        onChange={setDestType}
        descriptionMap={converterDescriptions}
        nameMap={converterPrettyNames}
      />
    </Menu>
  );
};
