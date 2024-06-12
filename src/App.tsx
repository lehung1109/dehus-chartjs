import Chart from "chart.js/auto";
import { useEffect } from "react";
import { config } from "./helpers/config";
import "./style.scss";
import { model } from "./helpers/const";

const {
  defaultImage,
  defaultTitle,
  defaultText
} = model;

const App = () => {
  useEffect(() => {
    const chart = new Chart(
      document.getElementById("myChart") as HTMLCanvasElement,
      config
    );

    const chart4 = new Chart(
      document.getElementById("myChart4") as HTMLCanvasElement,
      {
        ...config,
        data: {
          ...config.data,
          datasets: [
            {
              ...config.data.datasets[0],
              data: [100,100,100,100],
            }
          ]
        }
      }
    );

    const chart5 = new Chart(
      document.getElementById("myChart5") as HTMLCanvasElement,
      {
        ...config,
        data: {
          ...config.data,
          datasets: [
            {
              ...config.data.datasets[0],
              data: [100,100,100,100, 100],
            }
          ]
        }
      }
    );

    const chart6 = new Chart(
      document.getElementById("myChart6") as HTMLCanvasElement,
      {
        ...config,
        data: {
          ...config.data,
          datasets: [
            {
              ...config.data.datasets[0],
              data: [100,100,100,100, 100, 100],
            }
          ]
        }
      }
    );
  });

  return (
    <div
      className="container"
      style={{
        width: "600px",
        height: "600px"
      }}
    >
      <div className="lifecycle-donut-block">
        <canvas id="myChart"></canvas>

        <div className="lifecycle-donut-block__default">
          <div className="lifecycle-donut-block__default-image">
            <picture>
              <img
                src={defaultImage.src}
                alt={defaultImage.alt}
                width={defaultImage.width}
                height={defaultImage.height}
              />
            </picture>
          </div>

          <div className="lifecycle-donut-block__default-content">
            {defaultTitle && <div className="lifecycle-donut-block__default-title">{defaultTitle}</div>}

            {defaultText && <div className="lifecycle-donut-block__default-text">{defaultText}</div>}
          </div>
        </div>
      </div>
      <div className="lifecycle-donut-block"><canvas id="myChart4"></canvas></div>
      <div className="lifecycle-donut-block"><canvas id="myChart5"></canvas></div>
      <div className="lifecycle-donut-block"><canvas id="myChart6"></canvas></div>
    </div>
  );
};

export default App;
