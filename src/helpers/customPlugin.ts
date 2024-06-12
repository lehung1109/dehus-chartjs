
import { ArcElement, Plugin } from 'chart.js/auto';
import { model } from './const';

const {
  radiusROffset,
  radiusRAngle
} = model;

const angleOffsets: { [key: number]: number } = {
  3: 3,
  4: 3,
  5: 2,
  6: 2,
}

/**
 * Convert (r, 𝜃) to (x, y)
 */
function rThetaToXY(r: number, theta: number, x: number, y: number) {
  return {
    x: x + r * Math.cos(theta),
    y: y + r * Math.sin(theta),
  };
}

const getSpacingOffset = (innerRadius: number, outerRadius: number, endAngle: number, startAngle: number, spacing: number) => {
  const alpha = endAngle - startAngle;
  const noSpacingInnerRadius = innerRadius > 0 ? innerRadius - spacing : 0;
  const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
  const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
  const adjustedAngle = avNogSpacingRadius !== 0 ? (alpha * avNogSpacingRadius) / (avNogSpacingRadius + spacing) : alpha;
  const spacingOffset = (alpha - adjustedAngle) / 2;

  return spacingOffset;
}

const drawRadiusArc = (ctx: CanvasRenderingContext2D, R: number, theta: number, x: number, y: number) => {
  const p0 = rThetaToXY(R - radiusROffset, theta, x, y);
  const p1 = rThetaToXY(R, theta, x, y);
  const p2 = rThetaToXY(R, theta + radiusRAngle * Math.PI / 180, x, y);
  ctx.moveTo(p0.x, p0.y);
  ctx.arcTo(p1.x, p1.y, p2.x, p2.y, 2 * Math.PI);
}

const customPlugin: Plugin<'doughnut'> = {
  id: 'custom-plugin',
  afterDatasetDraw: (chart) => {
    const { ctx } = chart;
    const metaData = chart.getDatasetMeta(0).data as ArcElement[];

    metaData.forEach((arc, index) => {
      // drawBorder(arc, ctx);

      // test draw new color
      arc = metaData[0];
      const startAngle = arc.startAngle;
      const endAngle = arc.endAngle;
      const outerRadius = arc.outerRadius + arc.options.offset + 1;
      const innerRadius = arc.innerRadius - 1;
      const centerX = arc.x;
      const centerY = arc.y;
      let spacingOffset = getSpacingOffset(innerRadius, outerRadius, endAngle, startAngle, arc.options.spacing);

      const start = startAngle + spacingOffset;
      const end = endAngle - spacingOffset;
      const innerStart = start + angleOffsets[metaData.length] / 180 * Math.PI;
      const innerEnd = end - angleOffsets[metaData.length] / 180 * Math.PI;

      ctx.save();
      ctx.beginPath();

      // radius the line from 1 - 2
      drawRadiusArc(ctx, outerRadius, start, centerX, centerY);

      // arc from 1 - 2
      ctx.arc(centerX, centerY, outerRadius, start + radiusRAngle * Math.PI / 180, end - radiusRAngle * Math.PI / 180);

      // radius the line from 2 - 3
      drawRadiusArc(ctx, outerRadius, end, centerX, centerY);

      // radius the line from 3 - 4
      drawRadiusArc(ctx, innerRadius, innerEnd, centerX, centerY);

      // arc from 3 - 4
      ctx.arc(centerX, centerY, innerRadius, innerEnd, innerStart, true);

      // radius the line from 4 - 1
      drawRadiusArc(ctx, innerRadius, innerStart, centerX, centerY);
      ctx.closePath();

      ctx.fillStyle = 'rgb(255 0 153 / 0%)';
      ctx.fill();

      // if(arc.options.offset > 1) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'green';
        ctx.stroke();
      // }
      ctx.restore();
    });
  }
}

export { customPlugin }
