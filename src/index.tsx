import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "react-table/react-table.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/solarized.css";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/toml/toml";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/display/placeholder";

import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);
