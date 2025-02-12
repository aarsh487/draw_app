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
      <div className="fixed top-10 left-1/2 bg-white text-black shadow-xl border-2 border-amber-600">
          <div className="flex gap-2 p-4">
            {tools.map((tool) => (
              <div key={tool.name}>
              <button onClick={() => setSelectedTool(tool.name)}>{tool.icon}</button>
              </div>
            ))}
          </div>
      </div>
  ); 
}