"use client";

import React from "react";

// interface TerminalOutputProps {
//   output: string[]
// }

export const TerminalOutput = ({ output }: { output: string[] }) => {
  return (
    <div className="w-full h-60 bg-black text-green-400 font-mono text-sm p-4 overflow-auto border border-gray-700 rounded-md shadow-lg">
      {output.length > 0 ? (
        output.map((line, index) => (
          <div key={index} className="whitespace-pre">
            {line}
          </div>
        ))
      ) : (
        <div className="text-gray-500">No output yet...</div>
      )}
    </div>
  );
};