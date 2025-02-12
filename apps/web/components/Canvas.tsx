import { useEffect, useRef, useState } from "react";

import { Game } from "../draw/Game";
import { Tool, Topbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";


export function Canvas({ roomId, socket }: { socket: WebSocket; roomId: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Circle);
    const [strokeStyle, setStrokeStyle] = useState("");
    const [bgColor, setBgColor ] = useState("");
    const [strokeWidth, setStrokeWith ] = useState(1);
    const [game, setGame] = useState<Game>();
    
    useEffect(() => {
        game?.setTool(selectedTool);
        game?.setStrokestyle(strokeStyle);
        game?.setBgColor(bgColor);
        game?.setLineWidth(strokeWidth)
        console.log(selectedTool);
        console.log(strokeStyle);
    }, [selectedTool, game, strokeStyle, bgColor, strokeWidth]);


    useEffect(() => {
        if (!canvasRef.current) return;

        const g = new Game(canvasRef.current, roomId, socket);
        setGame(g);


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
        <div className="h-screen overflow-hidden">
            <canvas ref={canvasRef}></canvas>
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
            <Sidebar setBgColor={setBgColor} setStrokeStyle={setStrokeStyle} setStrokeWith={setStrokeWith} />
        </div>
    );
}


