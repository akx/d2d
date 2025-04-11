import React from "react";
import { Dropdown } from "../widgets";
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

export function Toolbar({ destType, layout, setDestType, setLayout, nSources, setNSources }: ToolbarProps) {
  return (
    <div className="flex pe-4 items-center border-b border-gray-200">
      <div className="flex divide-x divide-gray-200 *:px-4 *:py-3">
        <Dropdown
          text={`Layout: ${layoutNames[layout] || layout}`}
          items={Object.entries(layoutNames).map(([id, name]) => ({
            id,
            name: id,
            active: layout === id,
            text: name,
            onClick: () => setLayout(id as MainLayout),
          }))}
        />
        <Dropdown
          text={`Sources: ${nSources}`}
          items={nSourcesOptions.map((n) => ({
            id: String(n),
            name: String(n),
            active: nSources === n,
            text: String(n),
            onClick: () => setNSources(n),
          }))}
        />
        <SelectDropdown
          label="Output Format"
          value={destType}
          options={Object.keys(destinationConverters)}
          onChange={setDestType}
          descriptionMap={converterDescriptions}
          nameMap={converterPrettyNames}
        />
      </div>
      <div className="grow" />
      <div>
        <b>d2d</b>&nbsp;by&nbsp;
        <a className="link" href="https://akx.github.io/">
          @akx
        </a>
        &nbsp;&middot;&nbsp;
        <a className="link" href="https://github.com/akx/d2d/">
          GitHub
        </a>
      </div>
    </div>
  );
}
