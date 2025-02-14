import CodeEditor from "@/components/CodeEditor";
import PowersPanel from "@/components/PowersPanel";


export default function DashboardPage() {
  return (
    <main className="flex h-screen p-4">
      {/* Left: Code Editor (Expanded to 80%) */}
      <div className="w-4/5">
        <CodeEditor />
      </div>

      {/* Right: Powers Panel (20%) */}
      <div className="w-1/5">
        <PowersPanel />
      </div>
    </main>
  );
}
