import { useEffect, useRef, useState } from "react";

import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "../draw/Game";
import { Tool } from "./Toolbar";


export function Canvas({ roomId, socket }: { socket: WebSocket; roomId: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Circle);

    useEffect(() => {
        game?.setTool(selectedTool);
        console.log(selectedTool);
    }, [selectedTool, game]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const g = new Game(canvasRef.current, roomId, socket);
        setGame(g);

        // Handle window resize to adjust canvas size dynamically
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                g.clearCanvas();
            }
        };
        
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        return () => {
            g.destroy();
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [roomId, socket]);

    return (
        <div style={{ height: "100vh", overflow: "hidden" }}>
            <canvas ref={canvasRef}></canvas>
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        </div>
    );
}

function Topbar({ selectedTool, setSelectedTool }: { selectedTool: Tool; setSelectedTool: (s: Tool) => void }) {
    return (
        <div style={{ position: "fixed", top: 10, left: 10, backgroundColor: "red" }}>
            <div className="flex gap-2">
                <button onClick={() => setSelectedTool(Tool.Pencil)}><Pencil /></button>
                <button onClick={() => setSelectedTool(Tool.Rect)} ><RectangleHorizontalIcon /></button>
                <button onClick={() => setSelectedTool(Tool.Circle)}><Circle /></button>
            </div>
        </div>
    ); 
}
