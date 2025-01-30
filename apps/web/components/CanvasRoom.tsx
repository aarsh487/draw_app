"use client";
import React from "react";
import { useSocket } from "../hooks/useSocket";
import { Canvas } from "./Canvas";

export const CanvasRoom = ({ roomId }: { roomId: string }) => {
  const { socket } = useSocket();

  if (!socket) {
    return (
      <div className="h-screen bg-[#131312]">
        <h1 className="text-center text-9xl">
          {" "}
          Creating Room...{" "}
        </h1>
      </div>
    );
  }
  return (
    <>
      <Canvas roomId={roomId} socket={socket}></Canvas>
    </>
  );
};
