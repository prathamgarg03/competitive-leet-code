"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here...");

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
          options={{
            minimap: { enabled: false }, // Hide minimap for better space usage
            automaticLayout: true, // Ensure it resizes properly
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
