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
            label: "Quota",
            data: this.quota,
            backgroundColor: "rgba(1, 151, 127, 0.6)",
            borderColor: "rgba(1, 151, 127, 1)",
            borderWidth: 0.5,
          },
          {
            label: "Total",
            data: this.total,
            backgroundColor: "rgba(39, 106, 245, 0.6)",
            borderColor: "rgba(39, 106, 245,1)",
            borderWidth: 0.5,
          },
          {
            label: "Good",
            data: this.good,
            backgroundColor: "rgba(0, 149, 45, 0.6)",
            borderColor: "rgba(0, 149, 45,1)",
            borderWidth: 0.5,
          },
          {
            label: "TBR",
            data: this.tbr,
            backgroundColor: "rgba(241, 234, 11, 0.6)",
            borderColor: "rgba(241, 234, 11, 1)",
            borderWidth: 0.5,
          },
          {
            label: "BER",
            data: this.ber,
            backgroundColor: "rgba(225, 157, 2, 0.6)",
            borderColor: "rgba(225, 157, 2, 1)",
            borderWidth: 0.5,
          },
          {
            label: "Missing",
            data: this.missing,
            backgroundColor: "rgba(151, 1, 1, 0.6)",
            borderColor: "rgba(151, 1, 1, 1)",
            borderWidth: 0.5,
          },
        ],
      },
      chartOptions:  {
        plugins: {
          datalabels: {
          color: '#000000',
          formatter: function (value) {
            return Math.round(value);
          },
          font: {
            weight: 'bold',
            size: 12,
          }
        }
        },
        responsive: true,
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false
          }
        }
      },
    };
  },
};
</script>
