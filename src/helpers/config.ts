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
            const wrapper = canvas.closest<HTMLElement>(".lifecycle-donut-block");
            const items = wrapper?.querySelectorAll<HTMLElement>('[data-arc-index]');
            let activeData: ActiveDataModel[] = JSON.parse(
                canvas.dataset.activeData || "[]"
              );

            activeElements.forEach((element) => {
                const { index, datasetIndex } = element;

                activeData = [{ datasetIndex, index }];
                
                // show item active and hide item remains
                items?.forEach((item) => {
                    const arcIndex = parseInt(item.dataset.arcIndex || '');

                    if(arcIndex === index) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            });

            if(activeData.length) {
                wrapper?.classList.add('active');
                canvas.dataset.activeData = JSON.stringify(activeData);
            } else {
                wrapper?.classList.remove('active');
                canvas.dataset.activeData = '';
            }
        }
    },
    plugins: [customPlugin]
}

export { config }