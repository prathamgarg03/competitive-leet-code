// "use client";
// import { useState } from "react";
// import CodeEditor from "@/components/CodeEditor";
// import PowersPanel from "@/components/PowersPanel";
// import { TerminalOutput } from "@/components/TerminalOutput";
//
//
// export default async function DashboardPage({params,
// }: {
//     params: Promise<{ slug: string }>
// }) {
//     const [output, setOutput] = useState<string[]>(["Welcome to the terminal!"]);
//     const slug = (await params).slug
//     return (
//         <main className="flex h-screen p-4">
//             <div className="w-4/5 flex flex-col space-y-4">
//                 <CodeEditor setOutput={setOutput} />
//                 <TerminalOutput output={output} />
//             </div>
//
//             <div className="w-1/5">
//                 <PowersPanel />
//             </div>
//         </main>
//     );
// }

export default function GamePage() {
    return (
        <div>
            Game Page
        </div>
    );
}