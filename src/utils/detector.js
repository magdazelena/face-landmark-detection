import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./drawMesh";
import { A } from "./a";
import { B } from "./b";

export const runDetector = async (video, canvas) => {
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

    // setTimeout(() => {
    //   console.log(faces[0]);
    // }, 1000);

    const ctx = canvas.getContext("2d");
    let isi = true;

    // Function to toggle the value and update the drawing
    function toggleAndDraw() {
      isi = !isi; // Toggle the value
      console.log(isi);
      requestAnimationFrame(() => drawMesh(isi ? A : B, ctx)); // Assuming A and B are defined elsewhere
    }

    // Call the toggleAndDraw function every second
    setInterval(toggleAndDraw, 1000);

    detect(detector);
  };
  detect(detector);
};
