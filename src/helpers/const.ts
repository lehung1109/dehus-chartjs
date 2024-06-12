const model = {
    borderWidth: 20,
    borderColor: "#fff",
    hoverBorderColor: "blue",
    hoverBackgroundColor: "green",
    borderRadiusOffset: 10,
    borderRadiusDegree: 5,
    borderRadiusCircleRadius: 10,
    HoverBorderRadiusOffset: 15,
    HoverBorderRadiusDegree: 5,
    HoverBorderRadiusCircleRadius: 15,
    startColor: "#ffd700",
    endColor: "#a52a2a",
    outsideColor: '#abc204',
    outsideOffset: 10,
}

const data = [100, 100, 100];
const rotate = data[0] / data.reduce((a, b) => a + b, 0) * 360 / 2;

export { model, data, rotate };