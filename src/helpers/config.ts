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
            borderWidth: 0,
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
            padding: 20
        },
        animation: {
            duration: 0
        }
    },
    plugins: [customPlugin]
}

export { config }