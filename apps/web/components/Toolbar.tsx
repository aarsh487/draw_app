"use client";
import { Circle, Eraser, Minus, Pen, Redo, Square, Undo } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useShapeStore } from "../store/useShapeStore";

export enum Tool {
  Rect = "rect",
  Circle = "circle",
  Line = "line",
  Pencil = "pencil",
  Eraser = "text",
}

export const Toolbar = () => {

  const { redo, undo, setSelectedTool, selectedTool } = useShapeStore();

  const tools = [
    { name: Tool.Rect, icon: <Square className="size-4"/> },
    { name: Tool.Circle, icon: <Circle className="size-4" /> },
    { name: Tool.Line, icon: <Minus className="size-4" /> },
    { name: Tool.Pencil, icon: <Pen className="size-4" /> },
    { name: Tool.Eraser, icon: <Eraser className="size-4" /> },
  ];


  return (
    <div className="flex items-center gap-4">
      <h1>Toolbar</h1>
      <div className="text-white flex gap-4">
        {tools.map((tool, i) => (
          <div key={tool.name} className="relative">
            <button
              onClick={() => setSelectedTool(tool.name)}
              className={twMerge( "cursor-pointer rounded-xs"
                ,selectedTool === tool.name && "outline-8 outline-[#5c5aa0]"
              )}
            >
              {tool.icon}
            </button>
            <p className={twMerge("absolute inset-y-3 inset-x-4 text-[10px] text-neutral-500", selectedTool === tool.name && "text-white")}>{i+1}</p>
          </div>
        ))}
        <button onClick={() => undo()} className="cursor-pointer"><Undo className="size-4" /></button>
        <button onClick={() => redo()} className="cursor-pointer"><Redo className="size-4" /></button>
      </div>
    </div>
  );
};
