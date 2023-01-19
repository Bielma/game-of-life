import { useState, useEffect } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import Canvas from "../../components/Canvas";

function App() {
  const [matrixBoard, setMatrixBoard] = useState<boolean[][]>([]);
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function randomPopulation() {
    const matrix: boolean[][] = [];
    const n = 10;
    for (let i = 0; i < n; i++) {
      matrix[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        matrix[i][j] = getRandomInt(1, 4) == 3 ? true : false;
      }
    }
    setMatrixBoard(matrix);
  }
  function startGame() {
    let max = 100;
    let cont = 0;
    let newMatrix = matrixBoard;
    while (cont < max) {
      for (let i = 0; i < newMatrix.length; i++) {
        for (let j = 0; j < newMatrix[i].length; j++) {
          let numNeighbors = 0;
          if (i - 1 >= 0 && i + 1 < 10 && j - 1 >= 0 && j + 1 < 10) {
            if (newMatrix[i][j + 1]) numNeighbors += 1;
            if (newMatrix[i][j - 1]) numNeighbors += 1;
            if (newMatrix[i - 1][j]) numNeighbors += 1;
            if (newMatrix[i - 1][j]) numNeighbors += 1;
            if (newMatrix[i + 1][j - 1]) numNeighbors += 1;
            if (newMatrix[i + 1][j + 1]) numNeighbors += 1;
            if (newMatrix[i - 1][j - 1]) numNeighbors += 1;
            if (newMatrix[i - 1][j + 1]) numNeighbors += 1;

            if (newMatrix[i][j] && (numNeighbors == 1 || numNeighbors > 3)) {
              newMatrix[i][j] = false;
            } else if (!newMatrix[i][j] && numNeighbors == 3) {
              newMatrix[i][j] = true;
            }
            //setMatrixBoard(newMatrix);
          }
        }
      }
      if (cont == 0 || cont == 999) console.log(newMatrix);
      cont++;
    }
    setMatrixBoard(newMatrix);
  }

  return (
    <div className="App row">
      <div className="col-md-12">
        <Canvas matrix={matrixBoard} />
      </div>

      <div className="col-md-12 text-center mt-4">
        <Button onClick={startGame}>Start</Button>
      </div>
      <div className="col-md-12 text-center mt-2">
        <Button onClick={randomPopulation}>Init Random population</Button>
      </div>
    </div>
  );
}

export default App;
