import { TRIANGULATION } from "./triangulation";

export const drawMesh = (keypoints, ctx, offsets) => {
  if (!keypoints) return;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = 0; i < TRIANGULATION.length / 3; i++) {
    const points = [
      TRIANGULATION[i * 3],
      TRIANGULATION[i * 3 + 1],
      TRIANGULATION[i * 3 + 2],
    ].map((index) => ({
      x: keypoints[index].x + (offsets[index] ? offsets[index].offsetX : 0),
      y: keypoints[index].y + (offsets[index] ? offsets[index].offsetY : 0),
    }));

    drawPath(ctx, points);
  }

  for (let i = 0; i < keypoints.length; i++) {
    const keyPoint = keypoints[i];
    const offset = offsets[i];

    ctx.beginPath();
    ctx.arc(
      keyPoint.x + (offset ? offset.offsetX : 0),
      keyPoint.y + (offset ? offset.offsetY : 0),
      1,
      0,
      3 * Math.PI
    );
    ctx.fillStyle = "orange";
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.fillStyle = "yellow";
    ctx.font = "10px Arial";
    ctx.fillText(i.toString(), keyPoint.x + 5, keyPoint.y - 5);
  }
};

const drawPath = (ctx, points) => {
  const region = new Path2D();
  region.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point.x, point.y);
  }
  region.closePath();
  ctx.strokeStyle = "#131419";
  ctx.stroke(region);
};
