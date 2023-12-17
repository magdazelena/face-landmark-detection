import { drawMesh } from "./drawMesh";
import { framesData } from "./frames/frame_2";
import { framesData_1 } from "./frames/frame_1";

export const runDetector = async (canvas) => {
  const fixedKeypointIndices = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const frameDelay = 100;

  const replayFrames = (canvas, framesData, drawCallback) => {
    const ctx = canvas.getContext("2d");
    let frameIndex = 0;
    const startTime = performance.now();

    // const fixedKeypoints = fixedKeypointIndices.map(
    //   (index) => framesData[0].keypoints[index]
    // );
    const fixedKeypoints =  [
      {
          "x": 10,
          "y": 10,
          "z": -12.479683710942279,
          "name": "faceOval"
      },
      {
          "x": 30,
          "y": 30,
          "z": -29.243376263203825
      },
      {
          "x": 50,
          "y": 50,
          "z": -25.002785689102
      },
      {
          "x": 70,
          "y": 70,
          "z": -19.577282231938923,
          "name": "lips"
      }
  ]
    // console.log(`==>`,fixedKeypoints)

    const renderFrame = () => {
      const elapsedTime = performance.now() - startTime;

      if (
        frameIndex < framesData.length &&
        elapsedTime >= framesData[frameIndex].time
      ) {
        const currentKeypoints = framesData[frameIndex].keypoints;
        const offsets = fixedKeypoints.map((fixedKeypoint, i) => ({
          offsetX:
            fixedKeypoint.x - currentKeypoints[i].x,
          offsetY:
            fixedKeypoint.y - currentKeypoints[i].y,
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
};
