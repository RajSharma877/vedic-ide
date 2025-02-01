import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { parseVedicCode } from "./interpreter/vedicParser";

const VedicIDE = () => {
  const [code, setCode] = useState(
    "प्रारंभ\n  गणना x = 5 + 10\n  मुद्रण(x)\nसमाप्त"
  );
  const [output, setOutput] = useState("");

  const executeCode = () => {
    try {
      const jsCode = parseVedicCode(code);

      let logOutput = "";

      const originalLog = console.log;
      console.log = (message) => {
        logOutput += message + "\n"; // Store logs in a variable
      };

      eval(jsCode); // Execute the converted JS code

      console.log = originalLog; // Restore console.log after execution
      setOutput(logOutput || "No output");
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Editor Section */}
      <div style={{ flex: 1, borderRight: "1px solid #ccc" }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />
        <button
          onClick={executeCode}
          style={{
            width: "100%",
            padding: "10px",
            background: "#333",
            color: "white",
          }}
        >
          Run
        </button>
      </div>

      {/* Output Section */}
      <div
        style={{
          flex: 0.5,
          padding: "20px",
          background: "#222",
          color: "white",
        }}
      >
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default VedicIDE;
