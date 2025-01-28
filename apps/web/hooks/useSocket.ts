"use client";
import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const client = new WebSocket(`${WS_URL}?token=${localStorage.getItem("Authorization")}`);
    client.onopen = () => {
      setSocket(client);
    }
  }, []);

  return { socket };
}