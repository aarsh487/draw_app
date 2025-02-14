import { Tool } from "../components/Toolbar";
import { getExistingShapes } from "./http";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      strokeStyle: string;
      lineWidth: number;
    }
  | {
      type: "circle";
      radiusX: number;
      radiusY: number;
      centerX: number;
      centerY: number;
      strokeStyle: string;
      lineWidth: number;
    }
  | {
      type: "pencil";
      pencilPath: any;
      strokeStyle: string;
      lineWidth: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      strokeStyle: string;
      lineWidth: number;
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private selectedTool: Tool = Tool.Hand;
  private clicked = false;
  private startX = 0;
  private startY = 0;
  private socket: WebSocket;
  private roomId: string;
  private offSetX = 0;
  private offSetY = 0;
  public isPanning = false;
  private panStartX = 0;
  private panStartY = 0;
  private scale = 1;
  private pencilPath: any = [];
  public allShapes: Shape[] = [];
  private strokestyle: string;
  private bgColor: string = "#ffffff";
  private lineWidth: number = 1;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.socket = socket;
    this.strokestyle = "#000000";
    this.initMouseHandlers();
    this.init();
    this.initHandler();
    this.initZoomPanHandlers();
  }

  async init() {
    this.allShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandler() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "draw") {
        const parsedShape = JSON.parse(message.message);
        this.allShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mousedownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseupHandler);
    this.canvas.removeEventListener("mousemove", this.mousemoveHandler);
    this.canvas.removeEventListener("wheel", this.zoomHandler);
    this.canvas.removeEventListener("mousedown", this.panStartHandler);
    this.canvas.removeEventListener("mouseup", this.panStopHandler);
    this.canvas.removeEventListener("mousemove", this.panMoveHandler);
    this.canvas.removeEventListener("wheel", this.panMoveOnWheel);
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  setStrokestyle(stroke: string) {
    this.strokestyle = stroke;
  }

  setBgColor(color: string) {
    this.bgColor = color;
    this.clearCanvas();
  }

  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
    console.log(lineWidth);
  }

  clearCanvas() {
    this.ctx.setTransform(
      this.scale,
      0,
      0,
      this.scale,
      this.offSetX,
      this.offSetY
    );
    this.ctx.clearRect(
      -this.offSetX / this.scale,
      -this.offSetY / this.scale,
      this.canvas.width / this.scale,
      this.canvas.height / this.scale
    );
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(
      -this.offSetX / this.scale,
      -this.offSetY / this.scale,
      this.canvas.width / this.scale,
      this.canvas.height / this.scale
    );
    this.allShapes.forEach((shape) => {
      this.ctx.strokeStyle = shape.strokeStyle;
      this.ctx.lineWidth = shape.lineWidth;
      switch (shape.type) {
        case "rect":
          this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
          break;
        case "circle":
          this.ctx.beginPath();
          this.ctx.ellipse(
            shape.centerX,
            shape.centerY,
            shape.radiusX,
            shape.radiusY,
            0,
            0,
            Math.PI * 2
          );
          this.ctx.stroke();
          this.ctx.closePath();
          break;
        case "line":
          this.ctx.beginPath();
          this.ctx.moveTo(shape.startX, shape.startY);
          this.ctx.lineTo(shape.endX, shape.endY);
          this.ctx.stroke();
          this.ctx.closePath();
          break;
        case "pencil":
          if (shape.pencilPath.length > 1) {
            this.ctx.beginPath();
            shape.pencilPath.forEach((p: any, i: number) => {
              if (i > 0 && p && shape.pencilPath[i - 1]) {
                this.ctx.moveTo(
                  shape.pencilPath[i - 1].x,
                  shape.pencilPath[i - 1].y
                );
                this.ctx.lineTo( shape.pencilPath[i].x,
                  shape.pencilPath[i].y);
              }
            });
            this.ctx.stroke();
            this.ctx.closePath();
          }
          break;
          default:
            console.log("no tool selected")
      }
    });
  }

  mousedownHandler = (e: any) => {
    this.clicked = true;
    this.startX = (e.clientX - this.offSetX) / this.scale;
    this.startY = (e.clientY - this.offSetY) / this.scale;
  };

  mouseupHandler = (e: any) => {
    this.clicked = false; 
    const endX = (e.clientX - this.offSetX) / this.scale;
    const endY = (e.clientY - this.offSetY) / this.scale;

    const width = endX - this.startX;
    const height = endY - this.startY;

    let shape: Shape | null = null;
    switch (this.selectedTool) {
      case Tool.Rect:
        shape = {
          type: "rect",
          x: this.startX,
          y: this.startY,
          width,
          height,
          strokeStyle: this.strokestyle,
          lineWidth: this.lineWidth,
        };
        break;
      case Tool.Circle:
        const centerX = (this.startX + endX) / 2;
        const centerY = (this.startY + endY) / 2;
        const radiusX = Math.abs(this.startX - endX) / 2;
        const radiusY = Math.abs(this.startY - endY) / 2;
        shape = {
          type: "circle",
          centerX,
          centerY,
          radiusX,
          radiusY,
          strokeStyle: this.strokestyle,
          lineWidth: this.lineWidth,
        };
        break;
      case Tool.Line:
        shape = {
          type: "line",
          startX: this.startX,
          startY: this.startY,
          endX,
          endY,
          strokeStyle: this.strokestyle,
          lineWidth: this.lineWidth,
        };
        break;
      case Tool.Pencil:
        shape = {
          type: "pencil",
          pencilPath: this.pencilPath,
          strokeStyle: this.strokestyle,
          lineWidth: this.lineWidth,
        };
        this.pencilPath = [];
        break;
        default:
          console.log("no tool selected")
    }

    if (!shape) return;
    this.allShapes.push(shape);
    this.socket.send(
      JSON.stringify({
        type: "draw",
        shape: JSON.stringify({ shape }),
        roomId: this.roomId,
      })
    );
  };

  mousemoveHandler = (e: any) => {
    if (this.clicked) {
      this.clearCanvas();
      const endX = (e.clientX - this.offSetX) / this.scale;
      const endY = (e.clientY - this.offSetY) / this.scale;

      const width = endX - this.startX;
      const height = endY - this.startY;
      this.ctx.strokeStyle = this.strokestyle;
      this.ctx.lineWidth = this.lineWidth;

      switch (this.selectedTool) {
        case Tool.Rect:
          this.ctx.strokeRect(this.startX, this.startY, width, height);
          break;
        case Tool.Circle:
          const centerX = (this.startX + endX) / 2;
          const centerY = (this.startY + endY) / 2;
          const radiusX = Math.abs(this.startX - endX) / 2;
          const radiusY = Math.abs(this.startY - endY) / 2;
          this.ctx.beginPath();
          this.ctx.ellipse(
            centerX,
            centerY,
            radiusX,
            radiusY,
            0,
            0,
            Math.PI * 2
          );
          this.ctx.stroke();
          this.ctx.closePath();
          break;
        case Tool.Line:
          this.ctx.beginPath();
          this.ctx.moveTo(this.startX, this.startY);
          this.ctx.lineTo(endX, endY);
          this.ctx.stroke();
          this.ctx.closePath();
          break;
        case Tool.Pencil:
          this.pencilPath.push({ x: endX, y: endY });
          this.ctx.beginPath();
          this.pencilPath.forEach((p: any, i: any) => {
            if (i > 0) {
              this.ctx.moveTo(
                this.pencilPath[i - 1].x,
                this.pencilPath[i - 1].y
              );
              this.ctx.lineTo( this.pencilPath[i].x,
                this.pencilPath[i].y);
            }
          });
          this.ctx.stroke();
          this.ctx.closePath();
          break;
        default:
          console.log("no tool selected")
      }
    }
  };

  zoomHandler = (e: any) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const worldX = (e.clientX - this.offSetX) / this.scale;
      const worldY = (e.clientY - this.offSetY) / this.scale;
      const zoomFactor = 1.1;
      const direction = e.deltaY > 0 ? 1 / zoomFactor : zoomFactor;
      this.scale = Math.min(Math.max(this.scale * direction, 0.5), 10);
      // this.scale = this.scale * direction

      this.offSetX = e.clientX - worldX * this.scale;
      this.offSetY = e.clientY - worldY * this.scale;
      this.clearCanvas();
    }
  };

  panStartHandler = (e: any) => {
    if (this.selectedTool === Tool.Hand) {
      this.isPanning = true;
      this.panStartX = e.clientX - this.offSetX;
      this.panStartY = e.clientY - this.offSetY;
    }
  };

  panMoveHandler = (e: any) => {
    if (this.isPanning) {
      this.offSetX = e.clientX - this.panStartX;
      this.offSetY = e.clientY - this.panStartY;
      this.clearCanvas();
    }
  };

  panMoveOnWheel = (e: any) => {
    if (e.ctrlKey) return;
    const pan = e.deltaY > 0 ? 90 : -90;
    this.offSetY = this.offSetY - pan;
    this.clearCanvas();
  };

  panStopHandler = () => {
    this.isPanning = false;
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mousedownHandler);
    this.canvas.addEventListener("mouseup", this.mouseupHandler);
    this.canvas.addEventListener("mousemove", this.mousemoveHandler);
  }

  initZoomPanHandlers() {
    this.canvas.addEventListener("wheel", this.zoomHandler);
    this.canvas.addEventListener("mousedown", this.panStartHandler);
    this.canvas.addEventListener("mouseup", this.panStopHandler);
    this.canvas.addEventListener("mousemove", this.panMoveHandler);
    this.canvas.addEventListener("wheel", this.panMoveOnWheel);
  }
}
