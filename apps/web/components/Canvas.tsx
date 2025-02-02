"use client";
import React, { useEffect, useRef, useState } from "react";
import { Tool, Toolbar } from "./Toolbar";
import { useDraw } from "../hooks/useDraw";

export const Canvas = ({
  socket,
  roomId,
}: {
  socket: WebSocket;
  roomId: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [ canvasSize, setCanvasSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const setUpDrawing = async () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        cleanup = await useDraw(canvas, socket, roomId, selectedTool);
      }
    };

    setUpDrawing();

    return () => {
      if (cleanup) cleanup();
    };
  }, [canvasRef, selectedTool, canvasSize]);

  useEffect(() => {
    const handleResize = () => {
      if(canvasRef.current){
        setCanvasSize({
          width : window.innerWidth,
          height : window.innerHeight
        })
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      <div className="relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          className=""
        ></canvas>
      </div>
      <div className="absolute top-8 right-150 border border-black bg-[#232329] rounded-xl p-3">
        <Toolbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      </div>
      
    </>
  );
};
