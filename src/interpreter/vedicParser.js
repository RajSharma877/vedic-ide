// export const parseVedicCode = (vedicCode) => {
//     let jsCode = vedicCode;
  
//     // Mapping for keywords and symbols to JS-friendly equivalents
//     const keywordMap = {
//       "प्रारंभ": "function start() {",
//       "समाप्त": "}",
//       "गणना": "let",
//       "मुद्रण": "console.log"
//     };
  
//     // Replace Vedic keywords with their JavaScript equivalents
//     Object.keys(keywordMap).forEach(keyword => {
//       const regex = new RegExp(`\\b${keyword}\\b`, "g");
//       jsCode = jsCode.replace(regex, keywordMap[keyword]);
//     });
  
//     // Replace variable assignments
//     jsCode = jsCode.replace(/\bगणना\s+(\w+)\s*=\s*(.+)/g, "let $1 = $2;");
  
//     // Replace print statement with console.log
//     jsCode = jsCode.replace(/\bमुद्रण\((.*?)\)/g, "console.log($1);");
  
//     // Handle unknown characters (e.g., Devanagari symbols)
//     const vedicSymbolsRegex = /[अ-ह॒॑िॣ𑀅𑀓𑀻𑀡]+/g;
//     jsCode = jsCode.replace(vedicSymbolsRegex, (match) => `"${match}"`);
  
//     // Check for unexpected tokens and sanitize them
//     jsCode = jsCode.replace(/[^a-zA-Z0-9\s{}=;()]/g, ''); // Sanitize any other unexpected characters
    
//     return jsCode;
//   };
  

export const parseVedicCode = (vedicCode) => {
    let jsCode = vedicCode;
  
    // Replace "प्रारंभ" and "समाप्त" with JS-friendly structure
    jsCode = jsCode.replace("प्रारंभ", "").replace("समाप्त", "");
  
    // Replace "गणना x = ..." with "let x = ..."
    jsCode = jsCode.replace(/गणना\s+(\w+)\s*=\s*(.+)/g, "let $1 = $2;");
  
    // Replace "मुद्रण(x)" with "console.log(x)"
    jsCode = jsCode.replace(/मुद्रण\((.*?)\)/g, "console.log($1);");
  
    return jsCode;
  };
  