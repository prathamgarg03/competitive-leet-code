"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import React from "react";

const PowersPanel = () => {
    return (
        <div className="flex flex-col justify-start h-screen w-full p-4">
            <h1 className="text-xl font-bold mb-4">Powers Panel</h1>
            <div className="w-full h-4/5 border rounded-lg shadow-lg overflow-hidden bg-gray-800 text-white p-4">
                <Card className="w-full h-full bg-gray-800 text-white border-gray-700 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg text-center">Activate a Power</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        {/* Decrease Time Button */}
                        <button
                            className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded transition duration-200 text-lg
                md:px-5 md:py-2 md:text-base xl:px-4 xl:py-2 xl:text-sm"
                            onClick={() => {
                                console.log("Decreased your time by 10 seconds");
                            }}
                        >
                            ⏱️ Time Boost
                        </button>

                        {/* Get a Hint Button */}
                        <button
                            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded transition duration-200 text-lg
                md:px-5 md:py-2 md:text-base xl:px-4 xl:py-2 xl:text-sm"
                            onClick={() => {
                                console.log("Hint activated");
                            }}
                        >
                            💡 Get a Hint
                        </button>

                        {/* Freeze Opponent's Code Button */}
                        <button
                            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition duration-200 text-lg
                md:px-5 md:py-2 md:text-base xl:px-4 xl:py-2 xl:text-sm"
                            onClick={() => {
                                console.log("Opponent's code box frozen");
                            }}
                        >
                            ❄️ Freeze Opponent
                        </button>
                    </CardContent>
                    <CardFooter className="text-sm text-gray-400 text-center">
                        Choose wisely—each power could change the game!
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default PowersPanel;
