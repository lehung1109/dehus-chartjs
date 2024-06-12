import { ChartConfiguration } from "chart.js/auto";
import { customPlugin } from "./customPlugin";
import { data, rotate } from "./const";

const config: ChartConfiguration<"doughnut"> = {
    type: "doughnut",
    data: {
        datasets: [{
            data: data,
            backgroundColor: 'transparent',
            hoverOffset: 5,
            rotation: -rotate,
            spacing: 15
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
        }
    },
    plugins: [customPlugin]
}

export { config }