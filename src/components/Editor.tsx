import { EditorConfiguration } from "codemirror";
import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import React from "react";
import { Checkbox } from "../widgets";
import { toast } from "react-hot-toast";
import { longValueThreshold } from "../consts";
import { FaCopy } from "react-icons/fa";

interface EditorProps {
  value: string;
  options: Partial<EditorConfiguration>;
  onChange: (newValue: string) => void;
}

export default function Editor({ value, options, onChange }: EditorProps) {
  const [lineWrapping, setLineWrapping] = React.useState(false);
  const [plainEditor, setPlainEditor] = React.useState(!!(value && value.length > longValueThreshold));
  const handleCopy = () =>
    navigator.clipboard.writeText(value).then(
      () => toast.success(`Copied ${value.length} characters.`),
      () => toast.error("Copy failed."),
    );
  const placeholder = typeof options.placeholder === "string" ? options.placeholder : undefined;
  return (
    <div className="flex flex-col grow">
      <div className="flex grow">
        {plainEditor ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="font-mono p-2"
          />
        ) : (
          <ControlledCodeMirror
            className="code-editor"
            value={value}
            options={{ ...options, lineWrapping }}
            onBeforeChange={(_editor, _data, value) => onChange(value)}
          />
        )}
      </div>
      <div className="*:p-1.5 flex gap-1 border-y border-zinc-200 @container overflow-x-clip">
        <button type="button" className="hover:bg-zinc-50 cursor-pointer" onClick={handleCopy}>
          <FaCopy className="inline" /> <span className="hidden @min-sm:inline">Copy</span>
        </button>
        <Checkbox label="Wrap Lines" shortLabel="Wrap" checked={lineWrapping} onChange={setLineWrapping} />
        <Checkbox label="Plain Editor" shortLabel="Plain" checked={plainEditor} onChange={setPlainEditor} />
      </div>
    </div>
  );
}
