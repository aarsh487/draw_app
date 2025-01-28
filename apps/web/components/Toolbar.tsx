"use client";
import { Circle, Minus, Pen, Square } from "lucide-react";
import React, { useState } from "react";

export enum Tool {
  Rect = "rect",
  Circle = "circle",
  Line = "line",
  Pencil = "pencil"
}

interface ToolbarProps {
  setSelectedTool: React.Dispatch<React.SetStateAction<Tool | null>>;
}

export const Toolbar = ({ setSelectedTool }: ToolbarProps) => {
  const tools = [
    { name: Tool.Rect, icon: <Square /> },
    { name: Tool.Circle, icon: <Circle /> },
    { name: Tool.Line, icon: <Minus /> },
    { name: Tool.Pencil, icon: <Pen /> },
  ];

  return (
    <div>
      <h1>Toolbar</h1>
      <div style={{ color: "black", textAlign: "center" }}>
        {tools.map((tool) => (
          <button key={tool.name} onClick={() => setSelectedTool(tool.name)}>
            {tool.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
