"use client";
import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import PowersPanel from "@/components/PowersPanel";
import { TerminalOutput } from "@/components/TerminalOutput";


export default function DashboardPage() {
  const [output, setOutput] = useState<string[]>(["Welcome to the terminal!"]);

  return (
    <main className="flex h-screen p-4">
      {/* Left Side: Code Editor + Terminal */}
      <div className="w-4/5 flex flex-col space-y-4">
        <CodeEditor setOutput={setOutput} /> {/* Pass setOutput to CodeEditor */}
        <TerminalOutput output={output} /> {/* Pass output to TerminalOutput */}
      </div>

      {/* Right Side: Powers Panel */}
      <div className="w-1/5">
        <PowersPanel />
      </div>
    </main>
  );
}
