import { TRIANGULATION } from "./triangulation";

export const drawMesh = (predictions, ctx) => {
  if (predictions.length <= 0) return;

  predictions.forEach((prediction) => {
    const keyPoints = prediction.keypoints;
    for (let i = 0; i < TRIANGULATION.length / 3; i++) {
      const points = [
        TRIANGULATION[i * 3],
        TRIANGULATION[i * 3 + 1],
        TRIANGULATION[i * 3 + 2],
      ].map((index) => keyPoints[index]);
      drawPath(ctx, points, true);
    }
    keyPoints.forEach((keyPoint) => {
      ctx.beginPath();
      ctx.arc(keyPoint.x, keyPoint.y, 1, 0, 3 * Math.PI);
      ctx.fillStyle = "aqua";
      ctx.fill();
    });
  });
};

const drawPath = (ctx, points, closePath) => {
  const region = new Path2D();
  region.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point.x, point.y);
  }
  if (closePath) region.closePath();
  ctx.stokeStyle = "black";
  ctx.stroke(region);
};
