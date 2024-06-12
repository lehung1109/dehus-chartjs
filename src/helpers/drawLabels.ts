import { ArcElement, Chart } from "chart.js";
import { model } from "./const";

const {
    labels,
    labelColors,
    labelBackground,
    labelRound,
    labelPaddingLeft,
    labelPaddingTop,
    lineHeight,
    fontSize,
    fontFamily
} = model;

const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

const drawLabels = (chart: Chart<"doughnut">) => {
    const { ctx } = chart;
    const metaData = chart.getDatasetMeta(0).data as ArcElement[];

    metaData.forEach((arc, index) => {
        const centerX = arc.x;
        const centerY = arc.y;
        const innerRadius = arc.innerRadius;
        const outerRadius = arc.outerRadius;

        // get center position of the arc
        const midAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
        const labelX = centerX + (innerRadius + outerRadius) / 2 * Math.cos(midAngle);
        const labelY = centerY + (innerRadius + outerRadius) / 2 * Math.sin(midAngle);

        ctx.save();
        ctx.beginPath();
        const lines = labels[index];

        if(lines) {
            ctx.font = `normal ${fontSize} ${fontFamily}`;
            const textWidth = Math.max(...lines.map(line => ctx.measureText(line).width));
            const textHeight = lineHeight * lines.length;
    
            // draw label background
            ctx.fillStyle = labelBackground;
            ctx.roundRect(labelX - textWidth / 2 - labelPaddingLeft, labelY - textHeight / 2 - labelPaddingTop, textWidth + labelPaddingLeft * 2, textHeight + labelPaddingTop * 2, labelRound);
            ctx.fill();

            // draw label text
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';

            lines.forEach((line, i) => {
                ctx.fillStyle = labelColors[i];
                ctx.fillText(line, labelX - textWidth / 2, labelY + (i - (lines.length - 1) / 2) * lineHeight);
            });
        }

        ctx.restore();
    });
};

export { drawLabels };