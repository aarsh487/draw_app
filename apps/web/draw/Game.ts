import { Tool } from "../components/Toolbar";
import { getExistingShapes } from "./http";


type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool;
    private offsetX = 0;
    private offsetY = 0;
    private scale = 1;
    private isPanning = false;
    private panStartX = 0;
    private panStartY = 0;

    socket: WebSocket;

    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.clicked = false;
        this.selectedTool = Tool.Circle;  // ✅ Initialize here
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
        this.initZoomPanHandlers();
    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
        this.canvas.removeEventListener("wheel", this.zoomHandler);
        this.canvas.removeEventListener("mousedown", this.panStartHandler);
        this.canvas.removeEventListener("mousemove", this.panMoveHandler);
        this.canvas.removeEventListener("mouseup", this.panEndHandler);
    }

    setTool(tool: Tool) {
        this.selectedTool = tool;
    }

    async init() {
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type == "chat") {
                const parsedShape = JSON.parse(message.message);
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        };
    }

    clearCanvas() {
        this.ctx.setTransform(this.scale, 0, 0, this.scale, this.offsetX, this.offsetY);
        this.ctx.clearRect(-this.offsetX / this.scale, -this.offsetY / this.scale, this.canvas.width / this.scale, this.canvas.height / this.scale);
        this.ctx.fillStyle = "rgba(0, 0, 0)";
        this.ctx.fillRect(-this.offsetX / this.scale, -this.offsetY / this.scale, this.canvas.width / this.scale, this.canvas.height / this.scale);
        
        this.existingShapes.forEach((shape) => {
            this.ctx.strokeStyle = "rgba(255, 255, 255)";
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === "circle") {
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        });
    }

    mouseDownHandler = (e : any) => {
        this.clicked = true;
        this.startX = (e.clientX - this.offsetX) / this.scale;
        this.startY = (e.clientY - this.offsetY) / this.scale;
    };
    
    mouseUpHandler = (e : any) => {
        this.clicked = false;
        const endX = (e.clientX - this.offsetX) / this.scale;
    const endY = (e.clientY - this.offsetY) / this.scale;

    const width = endX - this.startX;
    const height = endY - this.startY;

    let shape: Shape | null = null;
    if (this.selectedTool === "rect") {
        shape = { type: "rect", x: this.startX, y: this.startY, width, height };
    } else if (this.selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        shape = { type: "circle", radius, centerX: this.startX + radius, centerY: this.startY + radius };
    }

    if (!shape) return;

    this.existingShapes.push(shape);
    this.socket.send(JSON.stringify({ type: "chat", message: JSON.stringify({ shape }), roomId: this.roomId }));
    };
    
    mouseMoveHandler = (e : any) => {
        if (this.clicked) {
            this.clearCanvas();
    
            // Convert screen coordinates to canvas coordinates
            const endX = (e.clientX - this.offsetX) / this.scale;
            const endY = (e.clientY - this.offsetY) / this.scale;
    
            const width = endX - this.startX;
            const height = endY - this.startY;
    
            this.ctx.strokeStyle = "rgba(255, 255, 255)";
            if (this.selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (this.selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                this.ctx.beginPath();
                this.ctx.arc(this.startX + radius, this.startY + radius, Math.abs(radius), 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    };
    
    zoomHandler = (e : any) => {
        e.preventDefault();
        const zoomFactor = 1.1;
        const direction = e.deltaY > 0 ? 1 / zoomFactor : zoomFactor;
        this.scale *= direction;
        this.clearCanvas();
    };
    
    panStartHandler = (e : any) => {
        if (this.selectedTool === Tool.Pencil) {
            this.isPanning = true;
            this.panStartX = e.clientX - this.offsetX;
            this.panStartY = e.clientY - this.offsetY;
        }
    };
    
    panMoveHandler = (e : any) => {
        if (this.isPanning) {
            this.offsetX = e.clientX - this.panStartX;
            this.offsetY = e.clientY - this.panStartY;
            this.clearCanvas();
        }
    };
    
    panEndHandler = () => {
        this.isPanning = false;
    };

    initMouseHandlers(){
        this.canvas.addEventListener("mousedown", this.mouseDownHandler)
        this.canvas.addEventListener("mouseup", this.mouseUpHandler)
        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)
    }
    
    initZoomPanHandlers() {
        this.canvas.addEventListener("wheel", this.zoomHandler);
        this.canvas.addEventListener("mousedown", this.panStartHandler);
        this.canvas.addEventListener("mousemove", this.panMoveHandler);
        this.canvas.addEventListener("mouseup", this.panEndHandler);
    }
}
