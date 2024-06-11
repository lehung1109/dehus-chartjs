import { ChartConfiguration } from "chart.js/auto";
import { customPlugin } from "./customPlugin";
import { model } from "./const";

const data = [100, 100, 100];
const rotate = data[0] / data.reduce((a, b) => a + b, 0) * 360 / 2;
const {
    hoverBackgroundColor
} = model;

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