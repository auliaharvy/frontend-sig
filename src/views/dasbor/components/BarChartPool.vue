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
  props: ['dataStock','dataOut', 'dataIn', 'options', 'labels'],
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [
          {
            label: "Stock",
            data: this.dataStock,
            backgroundColor: "rgba(0, 255, 0, 0.6)",
            borderColor: "rgba(0, 255,0,1)",
            borderWidth: 0.5,
          },
          {
            label: "Pallet In",
            data: this.dataIn,
            backgroundColor: "rgba(0, 165, 255, 0.6)",
            borderColor: "rgba(0, 165, 255,1)",
            borderWidth: 0.5,
          },
          {
            label: "Pallet Out",
            data: this.dataOut,
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            borderColor: "rgba(255,0,0,1)",
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
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },
    };
  },
};
</script>
