// 'use client';
//
//
//
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { getQuizzes } from '@/actions/quiz-actions';
//
// // interface Quiz {
// //   id: string
// //   title: string
// // }
//
// import {useState} from "react";
//
// export default function JoinGamePage() {
//   // const router = useRouter()
//   // const [roomNumber, setRoomNumber] = useState("")
//   // const [loading, setLoading] = useState(false)
//   // const [quizzes, setQuizzes] = useState<Quiz[]>([])
//   // const [selectedQuizId, setSelectedQuizId] = useState("")
//
//   // useEffect(() => {
//   //   async function fetchQuizzes() {
//   //     const response = await getQuizzes()
//   //     if (response.success && response.quizzes) {
//   //       setQuizzes(response.quizzes)
//   //     }
//   //   }
//   //   fetchQuizzes()
//   // }, [])
//   //
//   // const createGame = () => {
//   //   if (!selectedQuizId) return alert('Please select a quiz')
//   //   setLoading(true)
//   //   const newRoomNumber = Math.floor(100000 + Math.random() * 900000)
//   //   setTimeout(() => {
//   //     setLoading(false)
//   //     router.push(`/game/${newRoomNumber}?quizId=${selectedQuizId}`)
//   //   }, 1500)
//   // };
//   //
//   // const joinGame = () => {
//   //   if (!roomNumber || !selectedQuizId) return alert('Please enter a room number and select a quiz')
//   //   setLoading(true)
//   //   setTimeout(() => {
//   //     setLoading(false);
//   //     router.push(`/game/${roomNumber}?quizId=${selectedQuizId}`)
//   //   }, 1000)
//   // };
//
//     const generateLobbyCode = () => {
//         return nanoid(8);
//     }
//
//     const createGame = () => {
//         lobbyCode = generateLobbyCode();
//
//
//     }
//
//
//     const [lobbyCode, setLobbyCode] = useState("");
//
//     const handleJoinGame = () => {
//         if (lobbyCode.trim()) {
//             console.log("Joining game with code:", lobbyCode);
//         } else {
//             alert("Please enter a valid lobby code.");
//         }
//     };
//
//   return (
//       <div>
//           <h2>Join Game</h2>
//           <input
//               type="text"
//               placeholder="Enter Lobby Code"
//               value={lobbyCode}
//               onChange={(e) => setLobbyCode(e.target.value)}
//           />
//           <button onClick={handleJoinGame}>Join</button>
//           <button onClick={createGame}></button>
//       </div>
//       // <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
//       //   <Card className="w-full max-w-md p-6 bg-gray-600 border border-gray-500 shadow-lg">
//       //     <CardHeader>
//       //       <CardTitle className="text-center text-xl font-bold text-white">Join or Create a Game</CardTitle>
//       //     </CardHeader>
//       //     <CardContent className="space-y-4">
//       //       <div>
//       //         <p className="text-sm text-gray-300 mb-2">Choose a Quiz:</p>
//       //         <select
//       //             className="w-full p-2 text-black bg-gray-200"
//       //             value={selectedQuizId}
//       //             onChange={(e) => setSelectedQuizId(e.target.value)}
//       //         >
//       //           <option value="">Select a quiz</option>
//       //           {quizzes.map((quiz) => (
//       //               <option key={quiz.id}>{quiz.title}</option>
//       //           ))}
//       //         </select>
//       //       </div>
//       //
//       //       <div>
//       //         <p className="text-sm text-gray-300 mb-2">Enter Game Room Number:</p>
//       //         <Input
//       //             type="text"
//       //             placeholder="Enter Room Number"
//       //             value={roomNumber}
//       //             onChange={(e) => setRoomNumber(e.target.value)}
//       //             className="text-black bg-gray-200 placeholder-gray-500"
//       //         />
//       //         <Button
//       //             className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
//       //             disabled={!roomNumber || !selectedQuizId || loading}
//       //             // onClick={joinGame}
//       //         >
//       //           {loading ? "Joining..." : "Join Game"}
//       //         </Button>
//       //       </div>
//       //
//       //       <div className="flex items-center justify-center">
//       //         <span className="w-1/3 border-t border-gray-500"></span>
//       //         <span className="px-2 text-gray-300 text-sm">OR</span>
//       //         <span className="w-1/3 border-t border-gray-500"></span>
//       //       </div>
//       //
//       //       <Button
//       //           className="w-full bg-green-500 hover:bg-green-600 text-white"
//       //           disabled={!selectedQuizId || loading}
//       //           // onClick={createGame}
//       //       >
//       //         {loading ? "Creating..." : "Create New Game"}
//       //       </Button>
//       //     </CardContent>
//       //   </Card>
//       // </div>
//   );
// }

"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Realtime } from "ably";
import { getAblyTokenRequest } from "@/actions/ably-token";

function createConnection() {
    const client = new Realtime({
        authCallback: async (tokenParams, callback) => {
            try {
                const token = await getAblyTokenRequest();
                console.log("Generated token:", token);
                callback(null, token);
            } catch (err) {
                console.error("Error generating token:", err);
                callback(err, null);
            }
        },

    });

    client.connection.on("connected", () => {
        console.log("Connected to Ably!");
    });

    return client;
}

export default function JoinGame() {
    const [lobbyCode, setLobbyCode] = useState("");
    const [ablyClient, setAblyClient] = useState<Realtime | null>(null);
    const [channel, setChannel] = useState<Ably.Types.RealtimeChannel | null>(null);

    // Generate a unique game ID
    const generateLobbyCode = () => nanoid(8);

    // Function to create a game and establish Ably connection
    const createGame = async () => {
        const newLobbyCode = generateLobbyCode();
        setLobbyCode(newLobbyCode);
        console.log("New Game Created with Lobby Code:", newLobbyCode);

        try {
            // Initialize Ably Realtime connection using Token Authentication

            const client = createConnection();
            // Attach to a channel using the lobby code
            const gameChannel = client.channels.get(`game-${newLobbyCode}`);

            gameChannel.subscribe("message", (msg) => {
                console.log("Received message:", msg.data);
            });

            setAblyClient(client);
            setChannel(gameChannel);
            console.log(`Channel created: game-${newLobbyCode}`);
        } catch (error) {
            console.error("Error connecting to Ably:", error);
        }
    };

    const join = async (lobbyCodeToJoin:string) => {
        try {
            const client = createConnection();
            const gameChannel = client.channels.get(`game-${lobbyCodeToJoin}`);

            gameChannel.subscribe("message", (msg) => {
                console.log("Received message:", msg.data);
            });

            setAblyClient(client);
            setChannel(gameChannel);
            console.log(`Lobby Joined: ${lobbyCodeToJoin}`);
        } catch (error) {
            console.error("Error connecting to Ably:", error);
        }
    };

    return (
        <div>
            <h2>Join Game</h2>
            <input
                type="text"
                placeholder="Enter Lobby Code"
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
            />
            <button onClick={join(lobbyCode)}>Join</button>
            <button onClick={createGame}>Create Game</button>
        </div>
    );
}