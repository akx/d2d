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
import { Button, Menu, Message } from "semantic-ui-react";
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
        <Message>
          <Message.Header>Large Content</Message.Header>
          <p>
            The length of this data is {source.length.toLocaleString()} characters.
            <br />
            Showing it may cause performance problems.
            <br />
          </p>
          <p>
            <Button primary onClick={() => setDisablePlaceholder(true)}>
              Show it anyway
            </Button>
            <Button negative basic onClick={clearData}>
              Clear the data
            </Button>
          </p>
        </Message>
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
      <Menu secondary size="small" style={{ margin: 0 }}>
        {label ? <Menu.Item style={{ fontWeight: "bold" }}>{label}</Menu.Item> : null}
        <SelectDropdown
          label="Source Format"
          value={sourceType}
          options={Object.keys(sourceConverters)}
          onChange={onChangeSourceType}
          nameMap={converterPrettyNames}
          descriptionMap={converterDescriptions}
        />
        <Menu.Item name="loadSample" onClick={onLoadSample}>
          Load {converterPrettyNames[sourceType as ConverterName] || sourceType} Sample
        </Menu.Item>
      </Menu>
      {editor}
    </div>
  );
};
