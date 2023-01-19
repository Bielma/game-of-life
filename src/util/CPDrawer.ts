const MAX_Y = 10,
  MAX_X = 10;

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
    return (x / MAX_X) * this.widthCanvas;
  }

  // Returns the physical y-coordinate of a logical y-coordinate:
  YC(y: number) {
    return this.heightCanvas - (y * this.heightCanvas) / MAX_Y;
  }

  // Returns the logical x-coordinate of a physical x-coordinate:
  XL(x: number) {
    return (x * MAX_X) / this.widthCanvas;
  }

  // Returns the logical y-coordinate of a physical y-coordinate:
  YL(y: number) {
    return MAX_Y - (y * MAX_Y) / this.heightCanvas;
  }

  drawGrid() {
    const ctx = this.canvas.getContext("2d"),
      cty = this.canvas.getContext("2d");

    for (let x = 0; x <= this.widthCanvas; x += this.widthCanvas / MAX_X) {
      for (let y = 0; y <= this.heightCanvas; y += this.heightCanvas / MAX_Y) {
        ctx?.moveTo(x, 0);
        ctx?.lineTo(x, this.heightCanvas);
        ctx?.stroke();
        ctx?.moveTo(0, y);
        ctx?.lineTo(this.widthCanvas, y);
        ctx?.stroke();
      }
    }
  }

  drawPoint(x: number, y: number, state: boolean) {
    const rect = this.canvas.getBoundingClientRect(),
      ctx = this.canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = state ? "#00000" : "#FFFFF";
      ctx.fillRect(
        this.XC(x),
        this.YC(y),
        this.widthCanvas / MAX_X,
        this.heightCanvas / MAX_Y
      ); //square
    }
  }
  drawCell(x: number, y: number) {
    const rect = this.canvas.getBoundingClientRect(),
      ctx = this.canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#00000";
      ctx.fillRect(
        this.XC(x),
        this.YC(y),
        this.widthCanvas / MAX_X,
        this.heightCanvas / MAX_Y
      ); //square
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
