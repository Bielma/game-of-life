const MAX_Y = 15,
  MAX_X = 15;
const MIN_Y = -15,
  MIN_X = -15;

class CPDrawer {
  private canvas: HTMLCanvasElement;
  //private context: CanvasRenderingContext2D;
  private widthCanvas: number;
  private heightCanvas: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.widthCanvas = canvas.width;
    this.heightCanvas = canvas.height;
  }

  // Returns the physical x-coordinate of a logical x-coordinate:
  XC(x: number) {
    return ((x - MIN_X) / (MAX_X - MIN_X)) * this.widthCanvas;
  }

  // Returns the physical y-coordinate of a logical y-coordinate:
  YC(y: number) {
    return (
      this.heightCanvas - ((y - MIN_Y) * this.heightCanvas) / (MAX_Y - MIN_Y)
    );
  }

  // Returns the logical x-coordinate of a physical x-coordinate:
  XL(x: number) {
    return (x * (MAX_X - MIN_X)) / this.widthCanvas + MIN_X;
  }

  // Returns the logical y-coordinate of a physical y-coordinate:
  YL(y: number) {
    return MAX_Y - (y * (MAX_Y - MIN_Y)) / this.heightCanvas;
  }

  drawAxis() {
    const ctx = this.canvas.getContext("2d"),
      cty = this.canvas.getContext("2d");

    if (ctx && cty) {
      ctx.beginPath();
      ctx.moveTo(this.widthCanvas / 2, 0);
      ctx.lineTo(this.widthCanvas / 2, this.heightCanvas);
      ctx.stroke();

      cty.beginPath();
      cty.moveTo(0, this.heightCanvas / 2);
      cty.lineTo(this.widthCanvas, this.heightCanvas / 2);
      cty.stroke();

      ctx.font = "10px Arial";
      ctx.fillStyle = "#fffff";
      for (let i = MIN_X; i < MAX_X; i++) {
        if (i === 0) continue;
        ctx.fillText(`${i}`, this.XC(i), this.YC(-0.2));
        ctx.fillText(`${i}`, this.XC(0.1), this.YC(i));
      }
      ctx.fillText(`${MAX_X}`, this.widthCanvas - 10, this.YC(-0.2));
      ctx.fillText(`${MAX_Y}`, this.XC(0.1), 10);
    }
  }

  drawPoint(x: number, y: number, state: boolean) {
    const rect = this.canvas.getBoundingClientRect(),
      ctx = this.canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = state ? "#00000" : "#FFFFF";
      ctx.fillRect(x - 2, y - 2, 4, 4); //square
    }
  }

  clearCanvas() {
    const context = this.canvas.getContext("2d");
    if (context == null) {
      return;
    }
    //context.clearRect(0,0, this.widthCanvas, this.heightCanvas);

    // Store the current transformation matrix
    context.save();

    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, this.widthCanvas, this.heightCanvas);

    // Restore the transform
    context.restore();
  }
}

export default CPDrawer;
