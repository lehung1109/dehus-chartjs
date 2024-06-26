import { ArcElement, Chart } from "chart.js";
import { data, model } from "./const";
import { blendColors } from "@solcode/color-blend-midpoints/src";

const {
  borderRadiusOffset,
  borderRadiusDegree,
  borderRadiusCircleRadius,
  HoverBorderRadiusOffset,
  HoverBorderRadiusDegree,
  HoverBorderRadiusCircleRadius,
  startColor,
  endColor,
  outsideColor,
  outsideOffset,
  hoverBorderColor,
  hoverBackgroundColor,
  arrowAngle,
} = model;

const arrowRadian = arrowAngle * Math.PI / 180;

const blends = data.length >= 2 ? blendColors(startColor, endColor, data.length - 2) : [startColor, endColor];

export const angleOffsets: { [key: number]: number } = {
    3: 1.5,
    4: 1,
    5: 1,
    6: 1,
}

export const spaces: { [key: number]: number } = {
    3: 5,
    4: 7,
    5: 9,
    6: 11,
};

/**
 * Convert (r, 𝜃) to (x, y)
 */
export function rThetaToXY(r: number, theta: number, x: number, y: number) {
  return {
    x: x + r * Math.cos(theta),
    y: y + r * Math.sin(theta),
  };
}

export const getSpacingOffset = (innerRadius: number, outerRadius: number, endAngle: number, startAngle: number, spacing: number) => {
  const alpha = endAngle - startAngle;
  const noSpacingInnerRadius = innerRadius > 0 ? innerRadius - spacing : 0;
  const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
  const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
  const adjustedAngle = avNogSpacingRadius !== 0 ? (alpha * avNogSpacingRadius) / (avNogSpacingRadius + spacing) : alpha;
  const spacingOffset = (alpha - adjustedAngle) / 2;

  return spacingOffset;
}

export const drawRadiusArc = (
  ctx: CanvasRenderingContext2D,
  R: number,
  theta: number,
  x: number,
  y: number,
  radiusRRadian: number,
  borderRadius: number,
  borderOffset: number,
  shouldAroundInside: boolean,
  endLine: boolean,
  revert: boolean = false
) => {
  let p0 = rThetaToXY(R - borderOffset * (shouldAroundInside ? -1 : 1), theta, x, y);
  const p1 = rThetaToXY(R, theta, x, y);
  let p2 = rThetaToXY(R, theta + radiusRRadian * (endLine ? -1 : 1) * (theta > 0 ? 1 : -1), x, y);

  if (revert) {
    let temp = p0;
    p0 = p2;
    p2 = temp;
  }

  ctx.lineTo(p0.x, p0.y);
  ctx.arcTo(p1.x, p1.y, p2.x, p2.y, borderRadius);
  ctx.lineTo(p2.x, p2.y);
}

export const getOuterRadius = (arc: ArcElement) => {
    return arc.outerRadius + arc.options.offset + 1;
}

export const getInnerRadius = (arc: ArcElement) => {
    return arc.innerRadius - 1;
}

export const drawOutsideCircle = (chart: Chart<"doughnut">) => {
    const { ctx } = chart;
    const metaData = chart.getDatasetMeta(0).data as ArcElement[];
    const arc = metaData[0];

    ctx.save();
    ctx.fillStyle = outsideColor;
    ctx.beginPath();

    // outer circle
    ctx.arc(arc.x, arc.y, arc.outerRadius + outsideOffset, 0, 2 * Math.PI);

    // inner circle
    ctx.arc(arc.x, arc.y, arc.innerRadius - outsideOffset, 0, 2 * Math.PI, true);

    // close path and fill color
    ctx.closePath();
    ctx.fill();

    // restore context
    ctx.restore();
}

export const drawArcs = (chart: Chart<"doughnut">) => {
    const { ctx } = chart;
    const metaData = chart.getDatasetMeta(0).data as ArcElement[];

    metaData.forEach((arc, index) => {
      const startAngle = arc.startAngle;
      const endAngle = arc.endAngle;
      const outerRadius = getOuterRadius(arc);
      const innerRadius = getInnerRadius(arc);
      const centerX = arc.x;
      const centerY = arc.y;
      const spacingOffset = getSpacingOffset(innerRadius, outerRadius, endAngle, startAngle, arc.options.spacing);
      const start = startAngle + spacingOffset;
      const end = endAngle - spacingOffset;
      const innerStart = start + angleOffsets[metaData.length] / 180 * Math.PI;
      const innerEnd = end - angleOffsets[metaData.length] / 180 * Math.PI;
      const radiusRRadian = (arc.options.offset > 1 ? HoverBorderRadiusDegree : borderRadiusDegree) * Math.PI / 180;
      const borderRadius = arc.options.offset > 1 ? HoverBorderRadiusCircleRadius : borderRadiusCircleRadius;
      const borderOffset = arc.options.offset > 1 ? HoverBorderRadiusOffset : borderRadiusOffset;

      ctx.save();
      ctx.beginPath();

      // arc from 1 - 2
      ctx.arc(centerX, centerY, outerRadius, start + radiusRRadian, end - radiusRRadian);

      // radius the line from 2 - 3
      drawRadiusArc(ctx, outerRadius, end, centerX, centerY, radiusRRadian, borderRadius, borderOffset, false, end > 0 ? true : false, true);

      // radius the line from 3 - 4
      drawRadiusArc(ctx, innerRadius, innerEnd, centerX, centerY, radiusRRadian, borderRadius, borderOffset, true, innerEnd > 0 ? true : false);

      // arc from 3 - 4
      ctx.arc(centerX, centerY, innerRadius, innerEnd - radiusRRadian, innerStart + radiusRRadian, true);

      // radius the line from 4 - 1
      drawRadiusArc(ctx, innerRadius, innerStart, centerX, centerY, radiusRRadian, borderRadius, borderOffset, true, innerStart < 0 ? true : false, true);

      // radius the line from 1 - 2
      drawRadiusArc(ctx, outerRadius, start, centerX, centerY, radiusRRadian, borderRadius, borderOffset, false, start < 0 ? true : false);

      // close path and fill color
      ctx.closePath();
      ctx.fillStyle = arc.active ? hoverBackgroundColor : blends[index] || 'red';
      ctx.fill();

      // only draw border when arc is offset
      if(arc.active) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = hoverBorderColor;
        ctx.stroke();

        // draw arrow active
        const coors = rThetaToXY(arc.innerRadius - outsideOffset, (innerStart + innerEnd) / 2, centerX, centerY);
        ctx.fillStyle = hoverBorderColor;
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, (innerStart + innerEnd) / 2 - arrowRadian, (innerStart + innerEnd) / 2 + arrowRadian);
        ctx.lineTo(coors.x, coors.y);
        ctx.closePath();
        ctx.fill();
      }

      // restore context
      ctx.restore();
    });
}