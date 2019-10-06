import { EditorConfiguration } from "codemirror";
import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import React from "react";
import { Button, Checkbox, Icon, Popup } from "semantic-ui-react";

interface EditorProps {
  value: string;
  options: Partial<EditorConfiguration>;
  onChange: (newValue: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, options, onChange }) => {
  const [lineWrapping, setLineWrapping] = React.useState(false);
  const [plainEditor, setPlainEditor] = React.useState(false);
  return (
    <>
      {plainEditor ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={options.placeholder} />
      ) : (
        <ControlledCodeMirror
          className="code-editor"
          value={value}
          options={{ ...options, lineWrapping }}
          onBeforeChange={(editor, data, value) => onChange(value)}
        />
      )}
      <Popup
        trigger={
          <Icon
            circular
            name="setting"
            style={{
              position: "absolute",
              right: "5px",
              bottom: "5px",
            }}
          />
        }
        hoverable
        plain
      >
        <Checkbox
          label="Wrap Lines"
          checked={lineWrapping}
          onChange={(event, data) => setLineWrapping(!!data.checked)}
        />
        <br />
        <Checkbox
          label="Plain Editor"
          checked={plainEditor}
          onChange={(event, data) => setPlainEditor(!!data.checked)}
        />
      </Popup>
    </>
  );
};

export default Editor;
