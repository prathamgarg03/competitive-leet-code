"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ setOutput }: { setOutput: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [code, setCode] = useState("// Write your code here...");

  // Fix: Function to update terminal output
  const runCode = () => {
    setOutput((prevOutput) => [...prevOutput, `> Running Code...\n${code}`, "Execution complete!"]);
  };

  return (
    <div className="flex flex-col justify-start h-screen w-full p-4">
      <h1 className="text-xl font-bold mb-4">Code Editor</h1>
      <div className="w-full h-4/5 border rounded-lg shadow-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={code}
          theme="vs-dark"
          onChange={(value) => setCode(value || "")}
        />
      </div>
      <button
        onClick={runCode}
        className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
      >
        Run Code
      </button>
    </div>
  );
};

export default CodeEditor;
