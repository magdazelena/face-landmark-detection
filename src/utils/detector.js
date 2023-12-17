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
    const fixedKeypoints = [
      {
        x: 586.2896147948742,
        y: 356.33899416771237,
        z: -17.46630358240438,
        name: "leftEyebrow",
      },
      {
        x: 587.5250814701762,
        y: 344.1988440500188,
        z: -19.890478982206805,
        name: "leftEyebrow",
      },
    ];
    // console.log(`==>`,fixedKeypoints)

    const renderFrame = () => {
      const elapsedTime = performance.now() - startTime;

      if (
        frameIndex < framesData.length &&
        elapsedTime >= framesData[frameIndex].time
      ) {
        const currentKeypoints = framesData[frameIndex].keypoints;
        const offsets = fixedKeypoints.map((fixedKeypoint, i) => ({
          offsetX: fixedKeypoint.x - currentKeypoints[10].x,
          offsetY: fixedKeypoint.y - currentKeypoints[10].y,
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
