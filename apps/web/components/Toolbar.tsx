"use client";
import { Circle, Minus, Pen, Square } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export enum Tool {
  Rect = "rect",
  Circle = "circle",
  Line = "line",
  Pencil = "pencil",
}

interface ToolbarProps {
  setSelectedTool: React.Dispatch<React.SetStateAction<Tool | null>>;
  selectedTool: Tool | null;
}

export const Toolbar = ({ setSelectedTool, selectedTool }: ToolbarProps) => {
  const tools = [
    { name: Tool.Rect, icon: <Square /> },
    { name: Tool.Circle, icon: <Circle /> },
    { name: Tool.Line, icon: <Minus /> },
    { name: Tool.Pencil, icon: <Pen /> },
  ];

  return (
    <div className="flex items-center gap-4">
      <h1>Toolbar</h1>
      <div className="text-white flex gap-4">
        {tools.map((tool, i) => (
          <div key={tool.name} className="relative">
            <button
              
              onClick={() => setSelectedTool(tool.name)}
              className={twMerge(
                selectedTool === tool.name && "border border-white"
              )}
            >
              {tool.icon}
            </button>
            <p className="absolute inset-y-4 inset-x-6 text-xs">{i+1}</p>
          </div>
          
        ))}
      </div>
    </div>
  );
};
