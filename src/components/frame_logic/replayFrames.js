

export const replayFrames = (canvas, framesData, drawCallback) => {
  const fixedKeypointIndices = [50, 51, 52, 53, 54];
  const ctx = canvas.getContext("2d");
  let frameIndex = 0;
  const startTime = performance.now();

  // Create an array to store the fixed keypoints from the first frame
  const fixedKeypoints = fixedKeypointIndices.map((index) => framesData[0].keypoints[index]);

  const renderFrame = () => {
    const elapsedTime = performance.now() - startTime;

    if (frameIndex < framesData.length && elapsedTime >= framesData[frameIndex].time+5) {
      // Create an array to store the current keypoints
      const currentKeypoints = framesData[frameIndex].keypoints;

      // Create an array to store the offsets for each fixed keypoint
      const offsets = fixedKeypoints.map((fixedKeypoint, i) => ({
        offsetX: fixedKeypoint.x - currentKeypoints[fixedKeypointIndices[i]].x,
        offsetY: fixedKeypoint.y - currentKeypoints[fixedKeypointIndices[i]].y,
      }));

      // Draw the keypoints with the offsets
      drawCallback(currentKeypoints, ctx, offsets);

      frameIndex++;
    }

    if (frameIndex === framesData.length) {
      frameIndex = 0;
    }

    requestAnimationFrame(renderFrame);
};