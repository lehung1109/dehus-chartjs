
import { ArcElement, Plugin } from 'chart.js/auto';
import { model } from './const';

const {
  cornerRadius
} = model;

const angleOffsets: { [key: number]: number } = {
  3: 3,
  4: 3,
  5: 2,
  6: 2,
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
      ctx.arc(centerX, centerY, outerRadius, start, end);
      // ctx.arcTo(centerX + outerRadius, centerY, centerX + innerRadius, centerY, cornerRadius);
      ctx.arc(centerX, centerY, innerRadius, innerEnd, innerStart, true);
      // ctx.arcTo(centerX - innerRadius, centerY, centerX - outerRadius, centerY, cornerRadius);
      ctx.closePath();

      ctx.fillStyle = 'lightblue';
      ctx.fill();

      if(arc.options.offset > 1) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'green';
        ctx.stroke();
      }
      ctx.restore();
    });
  }
}

export { customPlugin }
