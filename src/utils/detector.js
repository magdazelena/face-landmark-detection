import { drawMesh } from "./drawMesh";
import { framesData } from "./frames/frame_2";
import { framesData_1 } from "./frames/frame_1";
import { points } from "./frames/points";

export const runDetector = async (canvas) => {
  const ctx = canvas.getContext("2d");
  function animate(frame) {
    if (frame[0].keypoints !== null) {
      let i = 0;
      const delayIteration = 20;
      function processIteration() {
        drawMesh(frame[i].keypoints, ctx);
        i = (i + 1) % frame.length;

        setTimeout(processIteration, delayIteration);
      }

      processIteration();
    } else {
      drawMesh(frame[15].keypoints, ctx);
    }
  }
  animate(points);
};
