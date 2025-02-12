import { Minus } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

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
    <div className="fixed top-8 left-20 bg-red-400">
      <div className="flex gap-2">
        <h1>Stroke color</h1>
        {bgColors.map((bg) => (
          <div key={bg.name}>
            <button
              onClick={() => setStrokeStyle(bg.hex)}
              className="bg-blue-900 p-4"
            ></button>
          </div>
        ))}
        <div className="border border-white"></div>
        <input
          type="color"
          className="h-10"
          onChange={(e) => setStrokeStyle(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <h1>Background color</h1>
        {bgColors.map((bg) => (
          <div key={bg.name}>
            <button
              onClick={() => setBgColor(bg.hex)}
              className="bg-blue-900 p-4"
            ></button>
          </div>
        ))}
        <div className="border border-white"></div>
        <input
          type="color"
          className="h-10"
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>
      <div className="">
        <h1>Stroke Width</h1>
        <div className="flex p-4 gap-2">
          <button className="cursor-pointer bg-blue-400" onClick={() => setStrokeWith(1)}>
            <Minus strokeWidth={1} />
          </button>
          <button className="cursor-pointer bg-blue-400" onClick={() => setStrokeWith(2.5)}>
            <Minus strokeWidth={2.5} />
          </button>
          <button className="cursor-pointer bg-blue-400" onClick={() => setStrokeWith(5)}>
            <Minus strokeWidth={5} />
          </button>
        </div>
      </div>
    </div>
  );
};
