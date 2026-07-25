import Editor from "@monaco-editor/react"

const CodeEditor=({language, code, setCode})=>{
    return(
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
        //   defaultValue="// Write your code here..."
          onChange={(value)=>setCode(value || "")}
        />
    );
};

export default CodeEditor