import { ArcElement, Chart } from "chart.js";
import { model } from "./const";

const {
    labels,
    labelColors,
    labelBackground,
    labelRound,
    labelPaddingLeft,
    labelPaddingTop,
    lineHeight1,
    fontSize1,
    fontFamily1,
    lineHeight2,
    fontSize2,
    fontFamily2,
} = model;

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
            // calculate text width and height
            const textWidth = Math.max(...lines.map((line, index) => {
                if(index === 0) {
                    ctx.font = `normal ${fontSize1} ${fontFamily1}`;
                } else {
                    ctx.font = `normal ${fontSize2} ${fontFamily2}`;
                }

                return ctx.measureText(line).width;
            }));
            const textHeight = lineHeight1 * lines.length;
    
            // draw label background
            ctx.fillStyle = labelBackground;
            ctx.roundRect(labelX - textWidth / 2 - labelPaddingLeft, labelY - textHeight / 2 - labelPaddingTop, textWidth + labelPaddingLeft * 2, textHeight + labelPaddingTop * 2, labelRound);
            ctx.fill();

            // draw label text
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';

            lines.forEach((line, i) => {
                ctx.fillStyle = labelColors[i];

                if(index === 0) {
                    ctx.font = `normal ${fontSize1} ${fontFamily1}`;
                    ctx.fillText(line, labelX - textWidth / 2, labelY + (i - (lines.length - 1) / 2) * lineHeight1);
                } else {
                    ctx.font = `normal ${fontSize2} ${fontFamily2}`;
                    ctx.fillText(line, labelX - textWidth / 2, labelY + (i - (lines.length - 1) / 2) * lineHeight2);
                }
            });
        }

        ctx.restore();
    });
};

export { drawLabels };