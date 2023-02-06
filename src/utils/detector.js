import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { calculateDistance } from "./calculateDistance";
import { drawMesh } from "./drawMesh";
import { drawRange } from "./drawRange";
export const runDetector = async (video, canvas) => {
  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  const detectorConfig = {
    runtime: "tfjs",
    maxHands: 2,
    modelType: "lite",
  };
  const detector = await handPoseDetection.createDetector(
    model,
    detectorConfig
  );
  const detect = async (net) => {
    const estimationConfig = { flipHorizontal: false };
    const hands = await net.estimateHands(video, estimationConfig);
    const ctx = canvas.getContext("2d");
    if (hands.length)
      requestAnimationFrame(() => {
        const age = calculateDistance(hands);
        drawMesh(hands, ctx);
        drawRange(age, ctx);
      });
    detect(detector);
  };
  detect(detector);
};
