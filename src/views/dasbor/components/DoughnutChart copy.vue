<template>
  <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from "chart.js";

ChartJS.register(
  ArcElement, Tooltip, Legend
);

export default {
  name: "DoughnutChart",
  components: { Doughnut },
  props: ["data", "options", "labels"],
  computed: {
      chartData() { return {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: ['rgba(0, 0, 255, 0.4)', 'rgba(255, 216, 0, 0.4)', 'rgba(255, 70, 0, 0.4)', 'rgba(255, 0, 0, 0.4)'],
            borderColor: ['rgba(0, 0, 255, 1)', 'rgba(255, 216, 0, 1)', 'rgba(255, 70, 0, 1)', 'rgba(255, 0, 0, 1)'],
            borderWidth: 0.5,
          },
        ],
      } },
      chartOptions() { return this.options}
    },
  data() {
    return {
      // chartData: {
      //   labels: this.labels,
      //   datasets: [
      //     {
      //       data: this.data,
      //       backgroundColor: ['rgba(0, 0, 255, 0.4)', 'rgba(255, 216, 0, 0.4)', 'rgba(255, 70, 0, 0.4)', 'rgba(255, 0, 0, 0.4)'],
      //       borderColor: ['rgba(0, 0, 255, 1)', 'rgba(255, 216, 0, 1)', 'rgba(255, 70, 0, 1)', 'rgba(255, 0, 0, 1)'],
      //       borderWidth: 0.5,
      //     },
      //   ],
      // },
      // chartOptions: this.options,
    };
  },
};
</script>
