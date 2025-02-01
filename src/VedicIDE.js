// import React, { useState } from "react";
// import Editor, { useMonaco } from "@monaco-editor/react";
// import { parseVedicCode } from "./interpreter/vedicParser";
// import { useEffect } from "react";

// const transliterationMap = {
//   a: "अ",
//   b: "ब",
//   c: "क",
//   d: "द",
//   e: "ए",
//   f: "फ",
//   g: "ग",
//   h: "ह",
//   i: "इ",
//   j: "ज",
//   k: "क",
//   l: "ल",
//   m: "म",
//   n: "न",
//   o: "ओ",
//   p: "प",
//   q: "क",
//   r: "र",
//   s: "स",
//   t: "त",
//   u: "उ",
//   v: "व",
//   w: "व",
//   x: "क्ष",
//   y: "य",
//   z: "ज़",
//   sh: "श",
//   ch: "च",
//   kh: "ख",
//   th: "थ",
//   dh: "ध",
//   gn: "ज्ञ",
//   tr: "त्र",
//   pr: "प्र",
//   sm: "स्म",
// };
// const VedicIDE = () => {
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const monaco = useMonaco();

//   const transliterate = (text) => {
//     let translatedText = text;

//     Object.keys(transliterationMap).forEach((key) => {
//       const regex = new RegExp(key, "gi");
//       translatedText = translatedText.replace(regex, transliterationMap[key]);
//     });
//     return translatedText;
//   };

//   useEffect(() => {
//     if (monaco) {
//       monaco.languages.register({ id: "vedic" });

//       monaco.languages.setMonarchTokensProvider("vedic", {
//         keywords: ["प्रारंभ", "गणना", "मुद्रण", "समाप्त"],
//         tokenizer: {
//           root: [[/\b(प्रारंभ|गणना|मुद्रण|समाप्त)\b/, "keyword"]],
//         },
//       });

//       monaco.languages.registerCompletionItemProvider("vedic", {
//         provideCompletionItems: () => ({
//           suggestions: [
//             {
//               label: "प्रारंभ",
//               kind: monaco.languages.CompletionItemKind.Keyword,
//               insertText: "प्रारंभ\n  गणना x = 10\n  मुद्रण(x)\nसमाप्त",
//             },
//             {
//               label: "गणना",
//               kind: monaco.languages.CompletionItemKind.Keyword,
//               insertText: "गणना x = ",
//             },
//             {
//               label: "मुद्रण",
//               kind: monaco.languages.CompletionItemKind.Keyword,
//               insertText: "मुद्रण(x)",
//             },
//             {
//               label: "समाप्त",
//               kind: monaco.languages.CompletionItemKind.Keyword,
//               insertText: "समाप्त",
//             },
//           ],
//         }),
//       });
//     }
//   }, [monaco]);

//   const handleEditorChange = (value) => {
//     setCode(transliterate(value));
//   };

//   const executeCode = () => {
//     try {
//       const jsCode = parseVedicCode(code);
//       console.log("Converted JS Code: ", jsCode);  // Log the converted JS code
  
//       let logOutput = "";
//       const originalLog = console.log;
  
//       console.log = (message) => {
//         logOutput += message + "\n"; // Store logs in a variable
//       };
  
//       eval(jsCode); // Execute the converted JS code
  
//       console.log = originalLog; // Restore console.log after execution
//       setOutput(logOutput || "No output");
//     } catch (error) {
//       console.error("Error in executing code:", error); // Log the error for better understanding
//       setOutput("Error: " + error.message);
//     }
//   };
  
  
//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Editor Section */}
//       <div style={{ flex: 1, borderRight: "1px solid #ccc" }}>
//         <Editor
//           height="100%"
//           defaultLanguage="vedic"
//           value={code}
//           onChange={handleEditorChange}
//           theme="vs-dark"
//         />
//         <button
//           onClick={executeCode}
//           style={{
//             width: "100%",
//             padding: "10px",
//             background: "#333",
//             color: "white",
//           }}
//         >
//           Run
//         </button>
//       </div>

//       {/* Output Section */}
//       <div
//         style={{
//           flex: 0.5,
//           padding: "20px",
//           background: "#222",
//           color: "white",
//         }}
//       >
//         <h3>Output:</h3>
//         <pre>{output}</pre>
//       </div>
//     </div>
//   );
// };

// export default VedicIDE;

import React, { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { parseVedicCode } from "./interpreter/vedicParser";

const typingText = "प्रारंभ\n  गणना x = 5 + 10\n  मुद्रण(x)\nसमाप्त";

const VedicIDE = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [index, setIndex] = useState(0);
  const monaco = useMonaco();

  // Typing Effect Logic
  useEffect(() => {
    if (index < typingText.length) {
      const timeout = setTimeout(() => {
        setCode((prev) => prev + typingText[index]);
        setIndex(index + 1);
      }, 100); // Typing speed (100ms per character)
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Register Vedic Language in Monaco Editor
  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "vedic" });

      monaco.languages.setMonarchTokensProvider("vedic", {
        keywords: ["प्रारंभ", "गणना", "मुद्रण", "समाप्त"],
        tokenizer: {
          root: [
            [/\b(प्रारंभ|गणना|मुद्रण|समाप्त)\b/, "keyword"],
          ],
        },
      });

      monaco.languages.registerCompletionItemProvider("vedic", {
        provideCompletionItems: () => ({
          suggestions: [
            {
              label: "प्रारंभ",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "प्रारंभ\n  गणना x = 10\n  मुद्रण(x)\nसमाप्त",
            },
            {
              label: "गणना",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "गणना x = ",
            },
            {
              label: "मुद्रण",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "मुद्रण(x)",
            },
            {
              label: "समाप्त",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "समाप्त",
            },
          ],
        }),
      });
    }
  }, [monaco]);

  const executeCode = () => {
    try {
      const jsCode = parseVedicCode(code);
      let logOutput = "";
      const originalLog = console.log;
      console.log = (message) => {
        logOutput += message + "\n";
      };

      eval(jsCode);

      console.log = originalLog;
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
          defaultLanguage="vedic"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />
        <button onClick={executeCode} style={{ width: "100%", padding: "10px", background: "#333", color: "white" }}>Run</button>
      </div>
      
      {/* Output Section */}
      <div style={{ flex: 0.5, padding: "20px", background: "#222", color: "white" }}>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default VedicIDE;
