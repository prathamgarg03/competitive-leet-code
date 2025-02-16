"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";

const initialPowers = [
    { id: 1, name: "Power Up", color: "bg-blue-600", hoverColor: "hover:bg-blue-700", duration: 10000, disabled: false },
    { id: 2, name: "Reset Power", color: "bg-red-600", hoverColor: "hover:bg-red-700", duration: 8000, disabled: false },
    { id: 3, name: "Save Power", color: "bg-green-600", hoverColor: "hover:bg-green-700", duration: 12000, disabled: false },
];

const PowersPanel = () => {
    const [powers, setPowers] = useState(initialPowers);

    // 🔥 Function to handle button clicks
    const handlePowerClick = (id: number, duration: number) => {
        setPowers((prevPowers) =>
            prevPowers.map((p) =>
                p.id === id ? { ...p, disabled: true } : p
            )
        );

        // ⏳ Re-enable the power-up after its duration
        setTimeout(() => {
            setPowers((prevPowers) =>
                prevPowers.map((p) =>
                    p.id === id ? { ...p, disabled: false } : p
                )
            );
        }, duration);
    };

    return (
        <div className="flex flex-col justify-start h-screen w-full p-4">
            <h1 className="text-xl font-bold mb-4">Powers Panel</h1>
            <div className="w-full h-4/5 border rounded-lg shadow-lg overflow-hidden bg-gray-800 text-white p-4">
                <Card className="w-full h-full bg-gray-800 text-white border-gray-700 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg text-center">Powers Panel</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        {powers.map((power) => (
                            <button
                                key={power.id}
                                className={`w-full px-4 py-2 ${power.color} ${power.hoverColor} text-white rounded ${
                                    power.disabled ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={power.disabled}
                                onClick={() => handlePowerClick(power.id, power.duration)}
                            >
                                {power.disabled ? `Wait...` : power.name}
                            </button>
                        ))}
                    </CardContent>
                    <CardFooter className="text-sm text-gray-400 text-center">
                        Use your powers wisely
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default PowersPanel;
