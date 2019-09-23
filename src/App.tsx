import React from "react";
import toml from "toml";
import yaml from "js-yaml";
import * as d3dsv from "d3-dsv";
import lodash from "lodash";
import * as ramda from "ramda";
import { Controlled as ControlledCodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/toml/toml";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/display/placeholder";

const dataTheme = "solarized light";
const codeTheme = "solarized dark";

const sourceConverters: { [key: string]: (data: any) => any } = {
  csv: d3dsv.csvParse,
  json: JSON.parse,
  text: data => data,
  toml: toml.parse,
  tsv: d3dsv.tsvParse,
  yaml: yaml.safeLoad,
};

const destinationConverters: { [key: string]: (data: any) => string } = {
  "json-compact": JSON.stringify,
  csv: d3dsv.csvFormat,
  json: data => JSON.stringify(data, null, 2),
  text: data => "" + data,
  tsv: d3dsv.tsvFormat,
  yaml: yaml.safeDump,
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
          const _ = lodash;
          const R = ramda;
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
    <>
      <section style={{ width: "40%" }}>
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
            theme: dataTheme,
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setSource(value);
          }}
        />
      </section>
      <section style={{ width: "20%" }}>
        <ControlledCodeMirror
          className="code-editor"
          value={transform}
          options={{
            mode: "javascript",
            theme: codeTheme,
            lineNumbers: true,
            placeholder: "// feel free to modify `data` using JavaScript here",
          }}
          onBeforeChange={(editor, data, value) => {
            setTransform(value);
          }}
        />
      </section>
      <section style={{ width: "40%" }}>
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
            theme: dataTheme,
            lineNumbers: true,
            readOnly: true,
          }}
          onBeforeChange={(editor, data, value) => {}}
        />
      </section>
    </>
  );
};

export default App;
