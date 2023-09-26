<template>
  <Bar id="bar-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from "vue-chartjs";
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";
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
  LinearScale,
  ChartJSPluginDatalabels
);

export default {
  name: "BarChart",
  components: { Bar },
  props: ["data", "options", "labels"],
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [
          {
            label: "Total Pallet",
            data: this.data,
            backgroundColor: "rgba(39, 106, 245, 0.6)",
            borderColor: "rgba(39, 106, 245,1)",
            borderWidth: 1,
          },
        ],
      },
      chartOptions: this.options,
    };
  },
};
</script>
