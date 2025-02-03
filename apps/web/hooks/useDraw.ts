import { Tool } from "../components/Toolbar";

// interface Path {
//   x: number;
//   y: number;
// }

export type Shape =
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
      pencilPath: any;
    };

export const useDraw =  (
  canvas: HTMLCanvasElement,
  socket: WebSocket,
  roomId: string,
  selectedTool: Tool | null,
  allShapes: Shape[],
  setAllShapes: (shape: Shape) => void,
) => {

  const ctx = canvas.getContext("2d");

  console.log("inside useDraw:", allShapes)

  if (!ctx) {
    return;
  }

  let clicked = false;
  let startX = 0;
  let startY = 0;
  let pencilPath : any = [];


  clearCanvas(allShapes, canvas, ctx);

  const onMouseDown = (e: MouseEvent) => {
    clicked = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  };

  const onMouseUp = (e: MouseEvent) => {
    clicked = false;
    

    const rect = canvas.getBoundingClientRect();
    const width = e.clientX - rect.left - startX;
    const height = e.clientY - rect.top - startY;
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
        endX: e.clientX - rect.left,
        endY: e.clientY - rect.top,
      };
    } else if (selectedTool === "pencil") {
      shape = {
        type: "pencil",
        pencilPath
      };

      pencilPath = [];
    }

    if (!shape) {
      return;
    }
   
    setAllShapes(shape);


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
    const rect = canvas.getBoundingClientRect();
    if (clicked) {
      const width = e.clientX - rect.left - startX;
      const height = e.clientY - rect.top - startY;
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
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.closePath();
      } else if(selectedTool === "pencil"){
        pencilPath.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        
          ctx.beginPath();

          for(let i = 1; i < pencilPath.length; i++){
            ctx.moveTo(pencilPath[i-1].x, pencilPath[i-1].y);
            ctx.lineTo(pencilPath[i].x, pencilPath[i].y)
          }
          ctx.stroke();
          ctx.closePath();
        
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
  ctx.fillStyle = "rgb(18, 18, 18)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  allShapes?.map((shape) => {
    if (shape?.type === "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape?.type === "circle") {
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
    } else if (shape?.type === "line") {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.stroke();
      ctx.closePath();
    } else if(shape?.type === "pencil"){
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.beginPath();
      for(let i = 1; i < shape.pencilPath.length; i++){
        ctx.moveTo(shape.pencilPath[i - 1].x, shape.pencilPath[i - 1].y)
        ctx.lineTo(shape.pencilPath[i].x, shape.pencilPath[i].y)
      }
      ctx.stroke();
      ctx.closePath();
    }
  });
}
