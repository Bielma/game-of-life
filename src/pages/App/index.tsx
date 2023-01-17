import { useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import Canvas from "../../components/Canvas";

function App() {
  const startGame = () => {};

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
