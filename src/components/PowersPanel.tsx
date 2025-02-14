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
            <CardTitle className="text-lg text-center">Powers Panel</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Power Up
            </button>
            <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
              Reset Power
            </button>
            <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
              Save Power
            </button>
          </CardContent>
          <CardFooter className="text-sm text-gray-400 text-center">
            Manage your powers here
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PowersPanel;
