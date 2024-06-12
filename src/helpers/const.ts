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
    outsideOffset: 15,
    labels: [['Lorem ispum', 'Lorem'], ['Lorem ispum', 'Lorem'], ['Lorem ispum', 'Lorem']],
    labelColors: ['green',' blue'],
    labelBackground: "#fff",
    labelRound: 30,
    labelPaddingLeft: 15,
    labelPaddingTop: 7,
    lineHeight: 16,
    fontSize: "14px",
    fontFamily: "Arial",
    defaultImage: {
        width: 400,
        height: 400,
        alt: "alt text",
        src: "https://fastly.picsum.photos/id/676/400/400.jpg?hmac=gLQIVDp29YaNlH_3cmFTwlcgxKMpHDUIURuY4d6N3jY"
    },
    defaultTitle: "Lorem ipsum",
    defaultText: "Lorem ipsum dolor sit amet",
    items: [
        {
            img: {
                width: 300,
                height: 300,
                alt: "alt text",
                src: "https://picsum.photos/300/300"
            },
            title: "Lorem ipsum one line only",
            text: "text content one line only",
            button: {
                text: "click me"
            }
        }
    ]
}

const data = [100, 100, 100];
const rotate = data[0] / data.reduce((a, b) => a + b, 0) * 360 / 2;

export { model, data, rotate };