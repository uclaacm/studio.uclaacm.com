export function drawRainbow(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  const grad = ctx.createLinearGradient(
    0,
    canvas.height / 2,
    canvas.width,
    canvas.height / 2,
  );
  const gradStops = `rgba(255, 0, 0, 1) 0%,
	rgba(255, 154, 0, 1) 10%,
	rgba(208, 222, 33, 1) 20%,
	rgba(79, 220, 74, 1) 30%,
	rgba(63, 218, 216, 1) 40%,
	rgba(47, 201, 226, 1) 50%,
	rgba(28, 127, 238, 1) 60%,
	rgba(95, 21, 242, 1) 70%,
	rgba(186, 12, 248, 1) 80%,
	rgba(251, 7, 217, 1) 90%,
	rgba(255, 0, 0, 1) 100%`;
  gradStops
    .split("\n")
    .map((v) => v.trim().match(/^(.*) (\d+)%,?$/))
    .forEach(([_, color, percent]) => {
      const value = parseInt(percent) / 100;
      grad.addColorStop(value, color);
    });

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
