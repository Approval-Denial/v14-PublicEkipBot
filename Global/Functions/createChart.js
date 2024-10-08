const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const chartCallback = (ChartJS) => { };
const width = 400;
const height = 300;

async function createChart(userDatas){

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
    const configuration = {
        type: 'line',
        data: {
            labels: userMessages.map((data) => data.date),
            datasets: [
                {
                    label: ``,
                    data: userMessages.map((data) => Math.floor(data.total / 60000)),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                },
            ],
        },
        options: {
            title: {
                display: true,
                text: 'Mesaj İstatistik Grafiği'
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            backgroundImage: {
                url: "https://cdn.discordapp.com/attachments/1011397607685374033/1138529226673365042/Baslksz-1.jpg",
                repeat: 'no-repeat',
                size: 'cover',
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        callback: function (value, index, values) {
                            return userMessages[index].date;
                        },
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                        padding: 10,
                    },
                },
                y: {

                    display: true,
                    ticks: {
                        font: {
                            size: 14,
                            weight: 'bold',
                        },
                        padding: 10,
                    },
                },
            },
        },
    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);

}
module.exports = {createChart}