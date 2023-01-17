import React, { MutableRefObject, useEffect, useRef } from "react";
import CPDrawer from "../util/CPDrawer";

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      let cpDrawer = new CPDrawer(canvasRef.current);
      //cpDrawer.drawAxis();
      cpDrawer.drawPoint(cpDrawer.XC(1), cpDrawer.YC(8), true);
      cpDrawer.drawPoint(cpDrawer.XC(0), cpDrawer.YC(5), true);
    }
  }, []);
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
