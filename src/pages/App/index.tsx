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

  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    const matrix: boolean[][] = [];
    //const matrix2: number[][] = new Array<Array<number>>();
    const n = 50;
    for (let i = 0; i < n; i++) {
      matrix[i] = new Array(n);
      for (let j = 0; j < n; j++) {
        matrix[i][j] = getRandomInt(1, 5) == 3 ? true : false;
      }
    }
    console.log(matrix);
    setMatrixBoard(matrix);
  }

  return (
    <div className="App row">
      <div className="col-md-12">
        <Canvas />
      </div>

      <div className="col-md-12 text-center mt-4">
        <Button onClick={startGame}>Start</Button>
      </div>
    </div>
  );
}

export default App;
