import { ChartConfiguration } from "chart.js/auto";
import { customPlugin } from "./customPlugin";
import { data, rotate } from "./const";
import { spaces } from "./drawArc";

export interface ActiveDataModel {
    index: number;
    datasetIndex: number;
}

const config: ChartConfiguration<"doughnut"> = {
    type: "doughnut",
    data: {
        datasets: [{
            data: data,
            backgroundColor: 'transparent',
            hoverOffset: 5,
            rotation: -rotate,
            spacing: spaces[data.length],
        }]
    },
    options: {
        plugins: {
            tooltip: {
                enabled: false
            }
        },
        layout: {
            padding: {
                top: 0,
                bottom: 10,
            }
        },
        animation: {
            duration: 0
        },
        events: ['click'],
        onClick: (event, activeElements, chart) => {
            const { canvas } = chart;
            const activeData: ActiveDataModel[] = [];

            activeElements.forEach((element) => {
                const { index, datasetIndex } = element;

                activeData.push({ datasetIndex, index });
            });

            if(activeData.length) {
                canvas.classList.add('active');
                canvas.dataset.activeData = JSON.stringify(activeData);
            } else {
                canvas.classList.remove('active');
                canvas.dataset.activeData = '';
            }
        }
    },
    plugins: [customPlugin]
}

export { config }