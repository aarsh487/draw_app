import {
  Circle,
  Hand,
  Minus,
  Pencil,
  RectangleHorizontalIcon,
  Trash,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { motion } from 'motion/react';

export enum Tool {
  Rect = "rect",
  Circle = "circle",
  Line = "line",
  Pencil = "pencil",
  Hand = "hand",
}

export function Topbar({
  selectedTool,
  setSelectedTool,
  handleDelete,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
  handleDelete: () => void;
}) {
  const tools = [
    { name: Tool.Hand, icon: <Hand size={18} strokeWidth={1.25} /> },
    { name: Tool.Circle, icon: <Circle size={18} strokeWidth={1.25} /> },
    {
      name: Tool.Rect,
      icon: <RectangleHorizontalIcon size={18} strokeWidth={1.25} />,
    },
    { name: Tool.Pencil, icon: <Pencil size={18} strokeWidth={1.25} /> },
    { name: Tool.Line, icon: <Minus size={18} strokeWidth={1.25} /> },
  ];

  return (
    <motion.div initial={{ opacity: 0, translateY: 10}} animate={{ opacity: 1, translateY: 0 }} transition={{  duration: 0.3 }} className="fixed w-sm lg:w-3xl md:w-xl top-10 left-18 lg:left-96 bg-white text-neutral-600 shadow-lg shadow-neutral-400 rounded-lg">
      <div className="flex justify-around items-center">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className={twMerge(
              "rounded-lg",
              selectedTool === tool.name
                ? "bg-primary/60 text-white"
                : "hover:bg-primary/10"
            )}
          >
            <button
              className="cursor-pointer p-3"
              onClick={() => setSelectedTool(tool.name)}
            >
              {tool.icon}
            </button>
          </div>
        ))}
        <button className="cursor-pointer" onClick={handleDelete}>
          <Trash size={20} strokeWidth={1.25} />
        </button>
      </div>
    </motion.div>
  );
}
