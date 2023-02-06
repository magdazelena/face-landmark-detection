export const drawRange = (range, ctx) => {
  const text = range ? range : "How old are you?";
  ctx.beginPath();
  ctx.arc(
    ctx.canvas.width / 2,
    ctx.canvas.height / 2,
    range ? range * 10 : 200,
    0,
    3 * Math.PI
  );
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";

  ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.stroke();
  console.log(ctx.canvas.width / 2, ctx.canvas.height / 2);
};
