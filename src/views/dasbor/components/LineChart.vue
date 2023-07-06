<template>
  <lineChart id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement
} from "chart.js";

ChartJS.register(
  ArcElement, Tooltip, Legend, LineElement, PointElement
);

export default {
  name: "LineChart",
  components: { 'lineChart': Line },
  props: ["data", "label1", "label2","dataReceive","options", "labels"],
  computed: {
      chartData() { return {
        labels: this.labels,
        datasets: [
          {
            label: this.label1,
            data: this.data,
            backgroundColor: ['rgba(255, 0, 0, 0.4)'],
            borderColor: ['rgba(255, 0, 0, 1)'],
            borderWidth: 0.5,
          },
          {
            label: this.label2,
            data: this.dataReceive,
            backgroundColor: ['rgba(0, 0, 255, 0.4)'],
            borderColor: ['rgba(0, 0, 255, 1)'],
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
