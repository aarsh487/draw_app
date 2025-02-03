"use client";
import React, { useEffect } from "react";
import { Canvas } from "./Canvas";
import { useShapeStore } from "../store/useShapeStore";

export const CanvasRoom = ({ roomId }: { roomId: string }) => {
  // const { socket } = useSocket();
  const { socket, connectSocket }  = useShapeStore();

  useEffect(() => {
    connectSocket()
  }, [])

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
