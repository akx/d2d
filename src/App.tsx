import React from "react";
import toml from "toml";
import yaml from "js-yaml";
import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/toml/toml";

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
  const result = React.useMemo(
    () => {
      try {
        const input = sourceConverters[sourceType](source);
        const data = input; // TODO: add mogrification
        const output = destinationConverters[destType](data);
        return { error: null, output };
      } catch (error) {
        return { error, output: null };
      }
    },
    [source, sourceType, destType],
  );
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <select value={sourceType} onChange={e => setSourceType(e.target.value)}>
              {Object.keys(sourceConverters).map(conv => (
                <option value={conv}>{conv}</option>
              ))}
            </select>
            <ControlledCodeMirror
              value={source}
              options={{
                mode: sourceType,
                theme: "solarized",
                lineNumbers: true,
              }}
              onBeforeChange={(editor, data, value) => {
                setSource(value);
              }}
            />
          </td>
          <td>
            <select value={destType} onChange={e => setDestType(e.target.value)}>
              {Object.keys(destinationConverters).map(conv => (
                <option value={conv}>{conv}</option>
              ))}
            </select>
            <ControlledCodeMirror
              value={result.error ? `ERROR:\n${result.error}` : result.output || ""}
              options={{
                mode: sourceType,
                theme: "solarized",
                lineNumbers: true,
                readOnly: true,
              }}
              onBeforeChange={(editor, data, value) => {}}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default App;
