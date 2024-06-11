import Chart from "chart.js/auto";
import { useEffect } from "react";
import { config } from "./helpers/config";

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
        height: "600px",
        backgroundColor: "#f5f5f5"
      }}
    >
      <div><canvas id="myChart"></canvas></div>
      <div><canvas id="myChart4"></canvas></div>
      <div><canvas id="myChart5"></canvas></div>
      <div><canvas id="myChart6"></canvas></div>
    </div>
  );
};

export default App;
