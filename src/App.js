import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

const inputResolution = { width: 640, height: 480 };
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const runFacemesh = async () => {
    const net = await facemesh.load({ inputResolution, scale: 0.8 });
    setInterval(async () => {
      await detect(net);
    }, 100);
  };
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = net.estimateFaces(video);
    }
  };
  runFacemesh();
  return (
    <div>
      <Webcam
        ref={webcamRef}
        width={inputResolution.width}
        height={inputResolution.height}
      />
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
