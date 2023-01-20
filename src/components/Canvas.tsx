import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import CPDrawer from "../util/CPDrawer";
type GameState = "run" | "pause";
interface Props {
  matrixInit: boolean[][];
  toggleCellValue: Function;
  gameState: GameState;
}

function Canvas({ matrixInit, toggleCellValue, gameState }: Props) {
  const [matrixBoard, setMatrixBoard] = useState<boolean[][]>([]);
  const canvasRef = useRef(null);
  let drawer: CPDrawer;

  //const [drawer, setDrawer] = useState<CPDrawer>(null)

  useEffect(() => {
    setMatrixBoard(matrixInit);
    if (canvasRef.current) {
      drawer = new CPDrawer(canvasRef.current);
      drawer.clearCanvas();
      drawer.drawGrid();
      printBoardState(matrixBoard);
    }
  }, [matrixInit]);

  useEffect(() => {
    setMatrixBoard(matrixInit);
    if (canvasRef.current) {
      if (drawer == null) {
        drawer = new CPDrawer(canvasRef.current);
      }
      if (gameState == "run") {
        runGameOfLife();
      }
      // drawer = new CPDrawer(canvasRef.current);
      // drawer.clearCanvas();
      // drawer.drawGrid();
      //printBoardState();
    }
  }, [gameState]);

  const runGameOfLife = async () => {
    let currentMatrix = matrixBoard;
    let newMatrix = currentMatrix;
    const n = 10;
    while (gameState == "run") {
      drawer.clearCanvas();
      drawer.drawGrid();
      for (let i = 0; i < currentMatrix.length; i++) {
        for (let j = 0; j < currentMatrix[i].length; j++) {
          if (currentMatrix[i][j]) {
            drawer.drawCell(i, j);
            await new Promise((r) => setTimeout(r, 100));
          }
          let numNeighbors = 0;

          if (currentMatrix[i][j + 1 >= n ? j - (n - 1) : j + 1])
            numNeighbors += 1;
          if (currentMatrix[i][j - 1 < 0 ? j + (n - 1) : j - 1])
            numNeighbors += 1;
          if (currentMatrix[i + 1 >= n ? i - (n - 1) : i + 1][j])
            numNeighbors += 1;
          if (currentMatrix[i - 1 < 0 ? i + (n - 1) : i - 1][j])
            numNeighbors += 1;
          if (
            currentMatrix[i + 1 >= n ? i - (n - 1) : i + 1][
              j - 1 < 0 ? j + (n - 1) : j - 1
            ]
          )
            numNeighbors += 1;
          if (
            currentMatrix[i + 1 >= n ? i - (n - 1) : i + 1][
              j + 1 >= n ? j - (n - 1) : j + 1
            ]
          )
            numNeighbors += 1;
          if (
            currentMatrix[i - 1 < 0 ? i + (n - 1) : i - 1][
              j - 1 < 0 ? j + (n - 1) : j - 1
            ]
          )
            numNeighbors += 1;
          if (
            currentMatrix[i - 1 < 0 ? i + (n - 1) : i - 1][
              j + 1 >= n ? j - (n - 1) : j + 1
            ]
          )
            numNeighbors += 1;

          if (currentMatrix[i][j] && (numNeighbors == 1 || numNeighbors > 3)) {
            newMatrix[i][j] = false;
          } else if (!newMatrix[i][j] && numNeighbors == 3) {
            newMatrix[i][j] = true;
          }
        }
      }
      currentMatrix = newMatrix;
    }
    setMatrixBoard(newMatrix);
  };

  const drawCell = async (x: number, y: number) => {
    drawer.drawCell(x, y);
    await new Promise((r) => setTimeout(r, 15));
  };
  async function printBoardState(matrix: boolean[][]) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j]) {
          drawer.drawPoint(i, j, matrix[i][j]);
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

      console.log({ physicalXCoordinate, physicalYCoordinate });
      console.log({ logicalXCoordinate, logicalYCoordinate });
      toggleCellValue(
        Math.floor(logicalXCoordinate),
        Math.floor(logicalYCoordinate)
      );
      // drawer.drawPoint(
      //   drawer.XL(Math.floor(physicalXCoordinate)),
      //   Math.floor(physicalYCoordinate),
      //   true
      // );
      drawer.drawCell(
        Math.floor(physicalXCoordinate),
        Math.floor(physicalYCoordinate)
      );
    }
  };

  return (
    <canvas
      id="canvasGL"
      onClick={handleClick}
      onContextMenu={handleClick}
      width={500}
      height={500}
      ref={canvasRef}
    ></canvas>
  );
}

export default Canvas;
