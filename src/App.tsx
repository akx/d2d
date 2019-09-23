import React from "react";
import toml from "toml";
import yaml from "js-yaml";
import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/toml/toml";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/display/placeholder";

const theme = "solarized light";

const sourceConverters: { [key: string]: (data: any) => any } = {
  json: JSON.parse,
  toml: toml.parse,
  yaml: yaml.safeLoad,
  text: data => data,
};

const destinationConverters: { [key: string]: (data: any) => string } = {
  "json-compact": JSON.stringify,
  json: data => JSON.stringify(data, null, 2),
  yaml: yaml.safeDump,
  text: data => "" + data,
};

const App: React.FC = () => {
  const [source, setSource] = React.useState("");
  const [sourceType, setSourceType] = React.useState("text");
  const [destType, setDestType] = React.useState("text");
  const [transform, setTransform] = React.useState("");
  const result = React.useMemo(
    () => {
      try {
        const input = sourceConverters[sourceType](source);
        let data = input;
        if (transform.trim().length) {
          eval(transform);
        }
        const output = destinationConverters[destType](data);
        return { error: null, output };
      } catch (error) {
        return { error, output: null };
      }
    },
    [sourceType, source, transform, destType],
  );
  return (
    <main>
      <section style={{ flex: 2 }}>
        <select value={sourceType} onChange={e => setSourceType(e.target.value)}>
          {Object.keys(sourceConverters).map(conv => (
            <option value={conv}>{conv}</option>
          ))}
        </select>
        <ControlledCodeMirror
          className="code-editor"
          value={source}
          options={{
            mode: sourceType,
            theme,
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setSource(value);
          }}
        />
      </section>
      <section style={{ flex: 1 }}>
        <ControlledCodeMirror
          className="code-editor"
          value={transform}
          options={{
            mode: "javascript",
            theme,
            lineNumbers: true,
            placeholder: "// feel free to modify `data` using JavaScript here",
          }}
          onBeforeChange={(editor, data, value) => {
            setTransform(value);
          }}
        />
      </section>
      <section style={{ flex: 2 }}>
        <select value={destType} onChange={e => setDestType(e.target.value)}>
          {Object.keys(destinationConverters).map(conv => (
            <option value={conv}>{conv}</option>
          ))}
        </select>
        <ControlledCodeMirror
          value={result.error ? `ERROR:\n${result.error}` : result.output || ""}
          className="code-editor"
          options={{
            mode: sourceType,
            theme,
            lineNumbers: true,
            readOnly: true,
          }}
          onBeforeChange={(editor, data, value) => {}}
        />
      </section>
    </main>
  );
};

export default App;
