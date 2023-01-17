import React, { useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
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
