import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import "react-table/react-table.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/toml/toml";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/display/placeholder";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
