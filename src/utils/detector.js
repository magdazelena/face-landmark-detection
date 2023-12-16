import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./drawMesh";
import { framesData } from "./frames/frame_2";
import { framesData_1 } from "./frames/frame_1";


export const runDetector = async (video, canvas, mySet) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: "tfjs",
  };
  const detector = await faceLandmarksDetection.createDetector(
    model,
    detectorConfig
  );

  let startTime = null;
  let frames = [];

  // const detect = async (net) => {
  //   const estimationConfig = { flipHorizontal: false };
  //   const faces = await net.estimateFaces(video, estimationConfig);

  //   const ctx = canvas.getContext("2d");

  //   if (!startTime) {
  //     startTime = performance.now();
  //   }

  //   const elapsedTime = performance.now() - startTime;
  //   const duration = 2000; 

  //   frames.push({ time: elapsedTime, keypoints: faces[0].keypoints });

  //   if (elapsedTime < duration) {
  //     requestAnimationFrame(() => drawMesh(secound_animation, ctx));
  //     detect(detector);
  //   } else {
  //     console.log("Captured 2 seconds of data:", frames);
  //     startTime = null;
  //     frames = [];
    // }
    
    const fixedKeypointIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const frameDelay = 100;

const replayFrames = (canvas, framesData, drawCallback) => {
  const ctx = canvas.getContext("2d");
  let frameIndex = 0;
  const startTime = performance.now();

  const fixedKeypoints = fixedKeypointIndices.map((index) => framesData[0].keypoints[index]);

  const renderFrame = () => {
    const elapsedTime = performance.now() - startTime;

    if (frameIndex < framesData.length && elapsedTime >= framesData[frameIndex].time) {
      const currentKeypoints = framesData[frameIndex].keypoints;
      const offsets = fixedKeypoints.map((fixedKeypoint, i) => ({
        offsetX: fixedKeypoint.x - currentKeypoints[fixedKeypointIndices[i]].x,
        offsetY: fixedKeypoint.y - currentKeypoints[fixedKeypointIndices[i]].y,
      }));

      drawCallback(currentKeypoints, ctx, offsets);

      frameIndex++;
    }

    if (frameIndex === framesData.length) {
      frameIndex = 0;
    }

    setTimeout(renderFrame, frameDelay);
  };

  renderFrame();
};

replayFrames(canvas, framesData, drawMesh);

    

    

  detect(detector);
};
