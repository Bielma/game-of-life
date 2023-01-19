import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import CPDrawer from "../util/CPDrawer";

interface Props {
  matrix: boolean[][];
  toggleCellValue: Function;
}
export default function Canvas({ matrix, toggleCellValue }: Props) {
  const canvasRef = useRef(null);
  let drawer: CPDrawer;

  //const [drawer, setDrawer] = useState<CPDrawer>(null)

  useEffect(() => {
    if (canvasRef.current) {
      drawer = new CPDrawer(canvasRef.current);
      drawer.clearCanvas();
      drawer.drawGrid();
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

  const handleClick = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    evt.preventDefault();
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const physicalXCoordinate = evt.clientX - rect.left,
        physicalYCoordinate = evt.clientY - rect.top,
        logicalXCoordinate = drawer.XL(physicalXCoordinate),
        logicalYCoordinate = drawer.YL(physicalYCoordinate);

      toggleCellValue(
        Math.floor(logicalXCoordinate),
        Math.floor(logicalYCoordinate)
      );
    }
  };

  return (
    <canvas
      id="canvasGL"
      onClick={handleClick}
      //onContextMenu={handleClick}
      width={500}
      height={500}
      ref={canvasRef}
    ></canvas>
  );
}
