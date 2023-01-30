import React, { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";
import Webcam from "react-webcam";
import { drawMesh } from "./utils/drawMesh";

const inputResolution = {
  width: 1080,
  height: 900,
};
const videoConstraints = {
  width: inputResolution.width,
  height: inputResolution.height,
  facingMode: "user",
};
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (
      typeof webcamRef.current === "undefined" ||
      webcamRef.current === null ||
      webcamRef.current.video.readyState !== 4 ||
      canvasRef.current === null
    )
      return;
    if (loaded) return;
    runDetector(webcamRef.current.video, canvasRef.current);
    setLoaded(true);
  }, [webcamRef, canvasRef, loaded]);

  runDetector();
  return (
    <div>
      <Webcam
        ref={webcamRef}
        width={inputResolution.width}
        height={inputResolution.height}
        style={{ opacity: 0 }}
        videoConstraints={videoConstraints}
      />
      {loaded ? (
        <canvas
          ref={canvasRef}
          width={inputResolution.width}
          height={inputResolution.height}
          style={fullScreenStyles}
        />
      ) : (
        <header>Loading...</header>
      )}
    </div>
  );
}

export default App;

const fullScreenStyles = {
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  textAlign: "center",
  width: inputResolution.width,
  height: inputResolution.height,
};
const runDetector = async (video, canvas) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: "tfjs",
  };
  const detector = await faceLandmarksDetection.createDetector(
    model,
    detectorConfig
  );
  const detect = async (net) => {
    const estimationConfig = { flipHorizontal: false };
    const faces = await net.estimateFaces(video, estimationConfig);
    const ctx = canvas.getContext("2d");
    requestAnimationFrame(() => drawMesh(faces[0], ctx));
    detect(detector);
  };
  detect(detector);
};
