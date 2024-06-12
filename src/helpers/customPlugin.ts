
import Chart, { ArcElement, Plugin } from 'chart.js/auto';
import { drawArcs, drawOutsideCircle } from './drawArc';
import { drawLabels } from './drawLabels';
import { model } from './const';
const {
  outsideOffset
} = model;

const customPlugin: Plugin<'doughnut'> = {
  id: 'custom-plugin',
  afterDatasetDraw: (chart) => {
    console.log('after Dataset Draw');

    // draw outside circle first
    drawOutsideCircle(chart);

    // draw arcs
    drawArcs(chart);

    // draw labels
    drawLabels(chart);
  },
  afterRender: (chart: Chart<"doughnut">) => {
    const { ctx, canvas } = chart;
    const metaData = chart.getDatasetMeta(0).data as ArcElement[];
    const arc = metaData[0];

    const wrapper = canvas.closest<HTMLElement>('.lifecycle-donut-block');
    wrapper?.classList.add('active');
    wrapper?.style.setProperty('--inner-width', `${arc.innerRadius * 2 - outsideOffset - 40}px`);
  },
  afterInit: (chart) => {
    console.log('after Init');
  }
}

export { customPlugin }
