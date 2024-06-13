import Chart, { ArcElement, Plugin } from "chart.js/auto";
import { drawArcs, drawOutsideCircle } from "./drawArc";
import { drawLabels } from "./drawLabels";
import { model } from "./const";
import { ActiveDataModel } from "./config";
const { outsideOffset } = model;

function debounce(func: Function, wait: number) {
  let timeout: number;
  return function (...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(null, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const customPlugin: Plugin<"doughnut"> = {
  id: "custom-plugin",
  afterDatasetDraw: (chart) => {
    // draw outside circle first
    drawOutsideCircle(chart);

    // draw arcs
    drawArcs(chart);

    // draw labels
    drawLabels(chart);
  },
  afterRender: (chart: Chart<"doughnut">) => {
    const { canvas } = chart;
    const metaData = chart.getDatasetMeta(0).data as ArcElement[];
    const arc = metaData[0];

    const wrapper = canvas.closest<HTMLElement>(".lifecycle-donut-block");
    wrapper?.classList.add("show");
    wrapper?.style.setProperty(
      "--inner-width",
      `${arc.innerRadius * 2 - outsideOffset - 40}px`
    );
  },
  afterInit: (chart: Chart<"doughnut">) => {
    const { canvas } = chart;

    // add event when mouse enter the canvas
    canvas.addEventListener(
      "mousemove",
      debounce((event: Event) => {
        const activeElements = chart.getElementsAtEventForMode(
          event,
          "nearest",
          { intersect: true },
          true
        );
        const hoverData: ActiveDataModel[] = [];

        activeElements.forEach((element) => {
          const { index, datasetIndex } = element;
          const isActive = hoverData.some(
            (data) => data.index === index && data.datasetIndex === datasetIndex
          );

          if (!isActive) {
            hoverData.push({ datasetIndex, index });
          }
        });

        if (activeElements.length) {
          canvas.classList.add("on-hover");
          canvas.dataset.hoverData = JSON.stringify(hoverData);
        } else {
          canvas.dataset.hoverData = "";
          canvas.classList.remove("on-hover");
        }

        chart.update();
      }, 0)
    );

    canvas.addEventListener(
      "mouseout",
      debounce(() => {
        canvas.dataset.hoverData = "";
        canvas.classList.remove("on-hover");
      }, 50)
    );
  },
  beforeDatasetDraw: (chart: Chart<"doughnut">) => {
    const { canvas } = chart;

    const hoverData: ActiveDataModel[] = JSON.parse(
      canvas.dataset.hoverData || "[]"
    );
    const activeData: ActiveDataModel[] = JSON.parse(
      canvas.dataset.activeData || "[]"
    );

    chart.setActiveElements([...hoverData, ...activeData]);

    return true;
  },
};

export { customPlugin };
