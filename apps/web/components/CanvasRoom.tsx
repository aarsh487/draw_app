"use client";
import React from "react";
import { useSocket } from "../hooks/useSocket";
import { Canvas } from "./Canvas";

export const CanvasRoom = ({ roomId }: { roomId: string }) => {
  const { socket } = useSocket();

  if (!socket) {
    return (
      <div className="">
        <h1 style={{ color: "black", textAlign: "center" }}>
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
