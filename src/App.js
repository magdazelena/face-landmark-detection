import React, { useRef } from "react";
import "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";
import Webcam from "react-webcam";
import { drawMesh } from "./utils/drawMesh";

const inputResolution = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const videoConstraints = {
  width: inputResolution.width,
  height: inputResolution.height,
  facingMode: "user",
};
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runDetector = async () => {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: "tfjs",
    };
    const detector = await faceLandmarksDetection.createDetector(
      model,
      detectorConfig
    );
    setInterval(async () => {
      await detect(detector);
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

      const estimationConfig = { flipHorizontal: false };
      const faces = await net.estimateFaces(video, estimationConfig);
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(faces[0], ctx);
    }
  };
  runDetector();
  return (
    <div>
      <Webcam
        ref={webcamRef}
        width={inputResolution.width}
        height={inputResolution.height}
        style={fullScreenStyles}
        videoConstraints={videoConstraints}
      />
      <canvas
        ref={canvasRef}
        width={inputResolution.width}
        height={inputResolution.height}
        style={fullScreenStyles}
      />
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
