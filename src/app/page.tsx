"use client";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="h-screen bg-gray-100 text-gray-900 flex flex-col">
      <main className="flex-1 flex flex-col justify-center items-center p-6">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Welcome to Game Hub
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl text-center">
          We are a team of 4 developers CS students who created this multiplayer gaming
          platform where players can join and compete in real-time while learning how to code.
        </p>

        {/* Team Info Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-bold">Ruben Dua</h3>
            <p className="text-gray-600">Backend Developer</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-bold">Gourav Sharma</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-bold">Krish Bedi</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-bold">Pratham Garg</h3>
            <p className="text-gray-600">Game Logic Developer</p>
          </div>
        </div>

        {/* Join Game Button */}
        <div className="mt-10">
        <Button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg"
            onClick={() => window.location.href = "/joingame"}
          >
            Start Playing
          </Button>
        </div>
      </main>

      {/* 🔹 Footer Section */}
      <footer className="w-full p-4 bg-gray-900 text-white text-center">
        <p>&copy; 2025 Game Hub. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
