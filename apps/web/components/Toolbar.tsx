import { Circle, Hand, Minus, Pencil, RectangleHorizontalIcon } from "lucide-react";

export enum Tool {
  Rect = "rect",
  Circle = "circle",
  Line = "line",
  Pencil = "pencil",
  Eraser = "text",
  Hand = "hand",
}

export function Topbar({ selectedTool, setSelectedTool }: { selectedTool: Tool; setSelectedTool: (s: Tool) => void }) {

  const tools = [
    { name: Tool.Hand, icon: <Hand />},
    { name: Tool.Circle, icon: <Circle />},
    { name: Tool.Rect, icon: <RectangleHorizontalIcon />},
    { name: Tool.Pencil, icon: <Pencil />},
    { name: Tool.Line, icon: <Minus />}
  ]

  
  return (
      <div className="fixed w-3xl top-10 left-96 bg-white text-neutral-600 shadow-xl shadow-neutral-400 rounded-2xl">
          <div className="flex justify-around p-4">
            {tools.map((tool) => (
              <div key={tool.name}>
              <button onClick={() => setSelectedTool(tool.name)}>{tool.icon}</button>
              </div>
            ))}
          </div>
      </div>
  ); 
}