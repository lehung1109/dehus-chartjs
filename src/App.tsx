import Chart, { ArcElement, ChartMeta, ChartType, Plugin } from 'chart.js/auto';
import { useEffect } from 'react';

const BORDER_WIDTH = 20;

const customPlugin: Plugin<'doughnut'> = {
  id: '',
  afterDatasetDraw: (chart, args, options) => {
    const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
    const arc = chart.getDatasetMeta(0).data[0] as ArcElement;
    const startAngle = arc.startAngle;
    const endAngle = arc.endAngle;
    const outerRadius = arc.outerRadius + arc.options.offset + 5;
    const innerRadius = arc.innerRadius - 5;
    const centerX = arc.x;
    const centerY = arc.y;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = BORDER_WIDTH;
    ctx.moveTo(centerX + innerRadius * Math.cos(startAngle), centerY + innerRadius * Math.sin(startAngle));
    ctx.lineTo(centerX + outerRadius * Math.cos(startAngle), centerY + outerRadius * Math.sin(startAngle));
    ctx.moveTo(centerX + innerRadius * Math.cos(endAngle), centerY + innerRadius * Math.sin(endAngle));
    ctx.lineTo(centerX + outerRadius * Math.cos(endAngle), centerY + outerRadius * Math.sin(endAngle));
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

const App = () => {
  useEffect(() => {
    const chart = new Chart(document.getElementById('myChart') as HTMLCanvasElement, {
      type: "doughnut",
      data: {
        datasets: [{
          data: [100, 300],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 99, 100)',
          ],
          hoverOffset: 30,
          borderWidth: 0,
        }]
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false
          }
        }
      },
      plugins: [customPlugin]
    });
  });

  return <div className="container" style={{
    width: '600px',
    height: '600px',
  }}><canvas id="myChart"></canvas></div>;
};

export default App;