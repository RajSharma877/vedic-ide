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
  