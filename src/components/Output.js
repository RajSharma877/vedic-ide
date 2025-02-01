import React from "react";

const Output = ({ output }) => {
  return (
    <div style={{ flex: 0.5, padding: "20px", background: "#222", color: "white" }}>
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
};

export default Output;
