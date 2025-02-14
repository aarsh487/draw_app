import { Minus } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from 'motion/react';

interface SidebarProps {
  setStrokeStyle: React.Dispatch<React.SetStateAction<string>>;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  setStrokeWith: React.Dispatch<React.SetStateAction<number>>;
}

export const Sidebar = ({
  setStrokeStyle,
  setBgColor,
  setStrokeWith,
}: SidebarProps) => {
  const bgColors = [
    { name: "white", hex: "#ffffff" },
    { name: "pink", hex: "#e03131" },
    { name: "green", hex: "#2f9e44" },
    { name: "cyan", hex: "#1971c2" },
    { name: "orange", hex: "#f08c00" },
  ];

  return (
    <motion.div initial={{ opacity: 0, translateX: 10}} animate={{ opacity: 1, translateX: 0 }} transition={{  duration: 0.3 }} className="hidden md:block fixed top-40 left-4 bg-white shadow-2xl shadow-neutral-600 text-neutral-600 p-8">
      <div className="flex flex-col gap-8">
       <div>
       <h1>Stroke</h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setStrokeStyle("#ffffff")}
            className="bg-white border border-neutral-500 h-6 w-6 rounded-md cursor-pointer"
          ></button>
          <button
            onClick={() => setStrokeStyle("#121212")}
            className="bg-black h-6 w-6 rounded-md cursor-pointer"
          ></button>
          <div className="border border-neutral-400 h-8"></div>
          <input
            type="color"
            className="h-8 w-8 rounded-xl"
            onChange={(e) => setStrokeStyle(e.target.value)}
          />
        </div>
       </div>
       <div>
       <h1>Background</h1>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setBgColor("#ffffff")}
            className="bg-white border border-neutral-500 h-6 w-6 rounded-md cursor-pointer"
          ></button>
          <button
            onClick={() => setBgColor("#000000")}
            className={twMerge(
              "bg-black border border-neutral-500 h-6 w-6 rounded-md cursor-pointer"
            )}
          ></button>
          <div className="border border-neutral-400 h-8"></div>
          <input
            type="color"
            className="h-8 w-8 rounded-xl"
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
       </div>
        <div className="">
          <h1>Stroke Width</h1>
          <div className="flex gap-2">
            <button
              className="cursor-pointer bg-primary text-white rounded-md"
              onClick={() => setStrokeWith(1)}
            >
              <Minus strokeWidth={1} />
            </button>
            <button
              className="cursor-pointer bg-primary text-white rounded-md"
              onClick={() => setStrokeWith(2.5)}
            >
              <Minus strokeWidth={2.5} />
            </button>
            <button
              className="cursor-pointer bg-primary text-white rounded-md"
              onClick={() => setStrokeWith(5)}
            >
              <Minus strokeWidth={5} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
