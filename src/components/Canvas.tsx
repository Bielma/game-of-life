import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import CPDrawer from "../util/CPDrawer";

interface Props {
  matrix: boolean[][];
}
export default function Canvas({ matrix }: Props) {
  const canvasRef = useRef(null);
  let drawer: CPDrawer;

  //const [drawer, setDrawer] = useState<CPDrawer>(null)

  useEffect(() => {
    if (canvasRef.current) {
      drawer = new CPDrawer(canvasRef.current);
      drawer.clearCanvas();
      printBoardState();
    }
  }, [matrix]);

  async function printBoardState() {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j]) {
          drawer.drawPoint(drawer.XC(i), drawer.YC(j), matrix[i][j]);
          await new Promise((r) => setTimeout(r, 15));
        }
      }
    }
  }
  return (
    <canvas
      id="canvas_plane"
      //onClick={handleClick}
      //onContextMenu={handleClick}
      width={500}
      height={500}
      ref={canvasRef}
    ></canvas>
  );
}
