<template>
  <Bar id="bar-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  props: ['total','good', 'tbr', 'ber', 'missing', 'quota','options', 'labels'],
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [     
          {
            label: "Good",
            data: this.good,
            backgroundColor: "rgba(0, 149, 45, 0.6)",
            borderColor: "rgba(0, 149, 45,1)",
            borderWidth: 0.5,
            stack: 'Stack 2',
          },
          {
            label: "TBR",
            data: this.tbr,
            backgroundColor: "rgba(241, 234, 11, 0.6)",
            borderColor: "rgba(241, 234, 11, 1)",
            borderWidth: 0.5,
            stack: 'Stack 2',
          },
          {
            label: "BER",
            data: this.ber,
            backgroundColor: "rgba(225, 157, 2, 0.6)",
            borderColor: "rgba(225, 157, 2, 1)",
            borderWidth: 0.5,
            stack: 'Stack 2',
          },
          {
            label: "Missing",
            data: this.missing,
            backgroundColor: "rgba(151, 1, 1, 0.6)",
            borderColor: "rgba(151, 1, 1, 1)",
            borderWidth: 0.5,
            stack: 'Stack 2',
          },
          // {
          //   label: "Total",
          //   data: this.total,
          //   backgroundColor: "rgba(39, 106, 245, 0.6)",
          //   borderColor: "rgba(39, 106, 245,1)",
          //   borderWidth: 0.5,
          //   stack: 'Stack 2',
          // },
        ],
      },
      chartOptions:  {
        plugins: {
          datalabels: {
            // anchor: 'end',
            // align: 'end',
            color: '#000000',
            formatter: function (value, context) {
              const datasetArray = [];
              context.chart.data.datasets.forEach((dataset) => {
                if(dataset.data[context.dataIndex] != undefined && dataset.label != "Total" && dataset.label != "Quota"){
                  datasetArray.push(dataset.data[context.dataIndex]);
                }
              });

              function totalSum(total, datapoint) {
                return parseInt(total) + parseInt(datapoint)
              }

              let sum = datasetArray.reduce(totalSum, 0);
              // context.font = "bold 12px sans-serif";
              // context.fillStyle = chart.data.datasets[0].borderColor[index];
              // context.textAlign = 'center';
              // context.fillText(sum, x.getPixelForValue(index), chart.getDataSetMeta(1).data[index].y - 10);
              if(context.datasetIndex != 0) {
                return `${value}`;
              } else {
                return value;
              }
            },
            font: {
              weight: 'bold',
              size: 10,
            }
          },
          // topLabels: {
          //   afterDataset
          // }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grace: 50
          }
        }
      },
    };
  },
};
</script>


