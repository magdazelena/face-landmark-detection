export const drawMesh = (predictions, ctx) => {
  if (!predictions) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  predictions.forEach((prediction) => {
    const keyPoints = prediction.keypoints;
    if (!keyPoints) return;

    for (let keyPoint of keyPoints) {
      if (!keyPoint.x) return;
      ctx.beginPath();
      ctx.arc(keyPoint.x, keyPoint.y, 1, 0, 6 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
    }
  });
};
