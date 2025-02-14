import { useEffect, useRef, useState } from "react";

import { Game } from "../draw/Game";
import { Tool, Topbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";
import { deleteAllShapes } from "../draw/http";
import { twMerge } from "tailwind-merge";


export function Canvas({ roomId, socket }: { socket: WebSocket; roomId: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>(Tool.Circle);
    const [strokeStyle, setStrokeStyle] = useState("#000000");
    const [bgColor, setBgColor ] = useState("#ffffff");
    const [strokeWidth, setStrokeWith ] = useState(1);
    const [game, setGame] = useState<Game>();


    const handleDelete = async() => {
        const res = await deleteAllShapes(roomId);
        if(game){
            game.allShapes = [];
            game.clearCanvas();
        }
    }
    
    useEffect(() => {
        game?.setTool(selectedTool);
        game?.setStrokestyle(strokeStyle);
        game?.setBgColor(bgColor);
        game?.setLineWidth(strokeWidth)
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
        <div className={twMerge("h-screen overflow-hidden")}>
            <canvas className={twMerge(selectedTool === Tool.Hand ? "cursor-grab" : "cursor-crosshair")} ref={canvasRef}></canvas>
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} handleDelete={handleDelete} />
            <Sidebar setBgColor={setBgColor} setStrokeStyle={setStrokeStyle} setStrokeWith={setStrokeWith} />
        </div>
    );
}


