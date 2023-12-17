import React, { useRef, useEffect } from "react";
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh"; 
import { runDetector } from "./utils/detector";

const inputResolution = {
  width: 1080,
  height: 900,
};

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    runDetector(canvasRef.current);
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={inputResolution.width}
        height={inputResolution.height}
        style={{ position: "absolute", backgroundColor: "grey"}}
      />
    </div>
  );
}

export default App;
