import React from "react";
import Editor from "./Editor";
import { dataTheme, longValueThreshold } from "../consts";
import { Setter, Styleable } from "../types";
import {
  converterDescriptions,
  ConverterName,
  converterPrettyNames,
  SourceConverterName,
  sourceConverters,
} from "../converters";
import { SelectDropdown } from "./SelectDropdown";

export interface SourceBoxProps extends Styleable {
  source: string;
  sourceType: string;
  onChangeSource: Setter<string>;
  onChangeSourceType: Setter<string>;
  onLoadSample: () => void;
  label?: string;
}

export const SourceBox: React.FC<SourceBoxProps> = ({
  sourceType,
  source,
  onChangeSource,
  onChangeSourceType,
  onLoadSample,
  style,
  label,
}) => {
  const [disablePlaceholder, setDisablePlaceholder] = React.useState(false);
  const clearData = React.useCallback(() => {
    setDisablePlaceholder(false);
    onChangeSource("");
  }, [setDisablePlaceholder, onChangeSource]);
  const editor =
    source.length > longValueThreshold && !disablePlaceholder ? (
      <div>
        <h1 className="text-2xl">Large Content</h1>
        <p>
          The length of this data is {source.length.toLocaleString()} characters.
          <br />
          Showing it may cause performance problems.
          <br />
        </p>
        <p>
          <button type="button" className="btn btn-primary" onClick={() => setDisablePlaceholder(true)}>
            Show it anyway
          </button>
          <button type="button" className="btn btn-warning" onClick={clearData}>
            Clear the data
          </button>
        </p>
      </div>
    ) : (
      <Editor
        value={source}
        options={{
          mode: sourceType,
          theme: dataTheme,
          lineNumbers: true,
          placeholder: `Paste, drop or type in ${converterPrettyNames[sourceType as SourceConverterName] || sourceType} data here.`,
        }}
        onChange={onChangeSource}
      />
    );
  return (
    <div className="codebox-wrapper" style={style}>
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-clip">
        {label ? <div className="font-bold">{label}</div> : null}
        <SelectDropdown
          className="p-2"
          label="Source Format"
          value={sourceType}
          options={Object.keys(sourceConverters)}
          onChange={onChangeSourceType}
          nameMap={converterPrettyNames}
          descriptionMap={converterDescriptions}
        />
        <button
          type="button"
          name="loadSample"
          className="hover:bg-gray-50 select-none p-2 cursor-pointer whitespace-nowrap"
          onClick={onLoadSample}
        >
          Load {converterPrettyNames[sourceType as ConverterName] || sourceType} Sample
        </button>
      </div>
      {editor}
    </div>
  );
};
