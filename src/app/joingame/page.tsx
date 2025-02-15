"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function JoinGamePage() {
  const router = useRouter();
  const [roomNumber, setRoomNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const createGame = () => {
    setLoading(true);
    const newRoomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit number
    setTimeout(() => {
      setLoading(false);
      router.push(`/game/${newRoomNumber}`); // Redirect to game room
    }, 1500);
  };

  const joinGame = () => {
    //TODO : GAME LOGIN
    // if (!roomNumber) return;
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   router.push(`/game/${roomNumber}`); // Redirect to game room
    // }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
      <SignedOut>
        <div className="text-center">
          <p className="text-lg font-medium">Please sign in to join or create a game.</p>
          <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
            Sign In
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        <Card className="w-full max-w-md p-6 bg-gray-600 border border-gray-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold text-white">Join or Create a Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Join Game Section */}
            <div>
              <p className="text-sm text-gray-300 mb-2">Enter Game Room Number:</p>
              <Input
                type="text"
                placeholder="Enter Room Number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="text-black bg-gray-200 placeholder-gray-500"
              />
              <Button
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                disabled={!roomNumber || loading}
                onClick={joinGame}
              >
                {loading ? "Joining..." : "Join Game"}
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center">
              <span className="w-1/3 border-t border-gray-500"></span>
              <span className="px-2 text-gray-300 text-sm">OR</span>
              <span className="w-1/3 border-t border-gray-500"></span>
            </div>

            {/* Create Game Section */}
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              disabled={loading}
              onClick= { ()=>console.log(roomNumber)}
            >
              {loading ? "Creating..." : "Create New Game"}
            </Button>
          </CardContent>
        </Card>
      </SignedIn>
    </div>
  );

}
