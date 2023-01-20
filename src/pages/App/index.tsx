import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import Canvas from "../../components/Canvas";

type GameState = "run" | "pause";

function App() {
  const [matrixBoard, setMatrixBoard] = useState<boolean[][]>([]);
  const [gameState, setGameState] = useState<GameState>("pause");

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  useEffect(() => {
    //initMatrix();
    randomPopulation();
  }, []);

  const randomPopulation = () => {
    const matrix: boolean[][] = [];
    const n = 10;
    for (let i = 0; i < n; i++) {
      matrix[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        matrix[i][j] = getRandomInt(1, 15) == 3 ? true : false;
      }
    }
    setMatrixBoard(matrix);
  };

  const initMatrix = () => {
    const matrix: boolean[][] = [];
    const n = 10;
    for (let i = 0; i < n; i++) {
      matrix[i] = new Array(n).fill(false);
    }
    setMatrixBoard(matrix);
  };

  const toggleCellValue = (x: number, y: number) => {
    console.log({ x, y });
    let newMatrix = matrixBoard;
    newMatrix[x][y] = !newMatrix[x][y];
    setMatrixBoard(newMatrix);
  };
  return (
    <div className="App row">
      <div className="col-md-12">
        <Canvas
          matrixInit={matrixBoard}
          toggleCellValue={toggleCellValue}
          gameState={gameState}
        />
      </div>

      <div className="col-md-12 text-center mt-4">
        <Button
          onClick={() => setGameState(gameState == "run" ? "pause" : "run")}
        >
          {gameState == "run" ? "Stop" : "Start"}
        </Button>
      </div>
      <div className="col-md-12 text-center mt-2">
        <Button onClick={randomPopulation}>Random population</Button>
      </div>
    </div>
  );
}

export default App;
