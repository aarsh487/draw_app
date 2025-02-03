"use client";
import React, { useEffect, useRef, useState } from "react";
import { Tool, Toolbar } from "./Toolbar";
import { Shape, useDraw } from "../hooks/useDraw";
import { useShapeStore } from "../store/useShapeStore";
import { OctagonX } from "lucide-react";

export const Canvas = ({
  socket,
  roomId,
}: {
  socket: WebSocket;
  roomId: string;
}) => {

  const { allShapes, getExistingShapes, setAllShapes, selectedTool } = useShapeStore();

  
  const [ isClearModalOpen, setIsClearModalOpen ] = useState(false);
  const [ canvasSize, setCanvasSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    const loadShapes = async() => {
      getExistingShapes(roomId);
    }
    loadShapes();
  }, [roomId]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const setUpDrawing = async () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        cleanup = useDraw(canvas, socket, roomId, selectedTool, allShapes, setAllShapes  );
      }
    };

    setUpDrawing();

    return () => {
      if (cleanup) cleanup();
    };
  }, [canvasRef, selectedTool, allShapes, canvasSize]);

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

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if(ctx){
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = "rgb(18, 18, 18)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      setIsClearModalOpen(!isClearModalOpen)
    }
  }

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
        <div className="flex gap-4 items-center">
          <Toolbar />
          <button onClick={() => setIsClearModalOpen(!isClearModalOpen)} className="cursor-pointer"><OctagonX /></button>
        </div>
      </div>
      {isClearModalOpen && <>
        <div className="absolute top-62 right-120 w-[548px] h-[228px] drop-shadow-xl border border-neutral-700 bg-[#232329] rounded-xl p-8">
          <div className=" divide-y divide-neutral-700">
            <h1 className="font-semibold text-lg pb-2">
              Clear canvas
            </h1>
            <p className="text-md pt-6">This will clear the whole canvas. Are you sure?</p>
          </div>
          <div className="flex gap-2 justify-end py-4">
            <button onClick={() => setIsClearModalOpen(!isClearModalOpen)} className="text-sm border border-neutral-700 px-6 py-3 rounded-lg cursor-pointer">
              Cancel
            </button>
            <button onClick={clear} className="bg-[#FFA8A5] text-black text-sm border border-neutral-600 px-6 py-3 rounded-lg cursor-pointer">
              Confirm
            </button>
          </div>
        </div>
        </>}
    </>
  );
};
