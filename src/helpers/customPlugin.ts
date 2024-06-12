
import { Plugin } from 'chart.js/auto';
import { drawArc } from './drawArc';

const customPlugin: Plugin<'doughnut'> = {
  id: 'custom-plugin',
  afterDatasetDraw: (chart) => {
    drawArc(chart);
  }
}

export { customPlugin }
