
import { Plugin } from 'chart.js/auto';
import { drawArcs, drawOutsideCircle } from './drawArc';

const customPlugin: Plugin<'doughnut'> = {
  id: 'custom-plugin',
  afterDatasetDraw: (chart) => {
    // draw outside circle first
    drawOutsideCircle(chart);

    // draw arcs
    drawArcs(chart);
  }
}

export { customPlugin }
