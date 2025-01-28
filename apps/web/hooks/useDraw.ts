import { Tool } from "../components/Toolbar";
import { useShape } from "../hooks/useShape";

interface Path {
  x: number;
  y: number;
}

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radiusX: number;
      radiusY: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      type: "pencil";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      pencilPath: Path[];
    };

export const useDraw = async (
  canvas: HTMLCanvasElement,
  socket: WebSocket,
  roomId: string,
  selectedTool: Tool | null
) => {
  const ctx = canvas.getContext("2d");
  const { getExistingShapes } = useShape();

  let allShapes: Shape[] = await getExistingShapes(roomId);

  if (!ctx) {
    return;
  }

  let clicked = false;
  let startX = 0;
  let startY = 0;
  let pencilPath: Path[] = [];

  clearCanvas(allShapes, canvas, ctx);

  const onMouseDown = (e: MouseEvent) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  const onMouseUp = (e: MouseEvent) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    let shape: Shape | null = null;
    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        width,
        height,
      };
    } else if (selectedTool === "circle") {
      const radiusX = Math.abs(width / 2);
      const radiusY = Math.abs(height / 2);
      const centerX = startX + radiusX;
      const centerY = startY + radiusY;

      shape = {
        type: "circle",
        centerX: centerX,
        centerY: centerY,
        radiusX: radiusX,
        radiusY: radiusY,
      };
    } else if (selectedTool === "line") {
      shape = {
        type: "line",
        startX,
        startY,
        endX: e.clientX,
        endY: e.clientY,
      };
    } else if (selectedTool === "pencil") {
      shape = {
        type: "pencil",
        startX,
        startY,
        endX: e.clientX,
        endY: e.clientY,
        pencilPath
      };
    }

    if (!shape) {
      return;
    }

    allShapes.push(shape);

    const data = JSON.stringify({
      type: "chat",
      message: JSON.stringify({
        shape,
      }),
      roomId,
    });
    socket.send(data);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(allShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255, 255, 255)";

      if (selectedTool === "rect") {
        ctx.strokeRect(startX, startY, width, height);
      } else if (selectedTool === "circle") {
        const radiusX = Math.abs(width / 2);
        const radiusY = Math.abs(height / 2);
        const centerX = startX + radiusX;
        const centerY = startY + radiusY;

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
      } else if (selectedTool === "line") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.closePath();
      } else if(selectedTool === "pencil"){
        pencilPath.push({ x: e.clientX, y: e.clientY })
        ctx.beginPath();
        ctx.moveTo(pencilPath[0].x, pencilPath[0].y)
        for(let i = 0; i < pencilPath.length; i++){
            
        }
      }
    }
  };

  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);

  return () => {
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mouseup", onMouseUp);
    canvas.removeEventListener("mousemove", onMouseMove);
  };
};

function clearCanvas(
  allShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  allShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.beginPath();
      ctx.ellipse(
        shape.centerX,
        shape.centerY,
        shape.radiusX,
        shape.radiusY,
        0,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type === "line") {
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.closePath();
    }
  });
}
