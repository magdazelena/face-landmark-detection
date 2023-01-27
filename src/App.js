import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  return (
    <div>
      <Webcam ref={webcamRef} style={fullScreenStyles} />
      <canvas ref={canvasRef} style={fullScreenStyles} />
    </div>
  );
}

export default App;

const fullScreenStyles = {
  position: "absolute",
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  right: 0,
};
