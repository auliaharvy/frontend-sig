<template>
    <Bar id="bar-chart-id" :options="chartOptions" :dataSend="dataSend" :dataReceive="dataReceive" />
  </template>
  
  <script>
  import { Bar } from "vue-chartjs";
  import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
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
    name: "LineChart",
    components: { Bar },
    props: ["dataReceive", "dataSend","options", "labels"],
    data() {
      return {
        chartData: {
          labels: this.labels,
          datasets: [
            {
              label: "Pallet Send",
              data: this.dataSend,
              backgroundColor: "rgba(255, 0, 0, 0.6)",
              borderColor: "rgba(255,0,0,1)",
              borderWidth: 1,
            },
            {
              label: "Pallet Receive",
              data: this.dataReceive,
              backgroundColor: "rgba(255, 0, 1, 0.6)",
              borderColor: "rgba(255,0,1,1)",
              borderWidth: 1,
            },
          ],
        },
        chartOptions: this.options,
      };
    },
  };
  </script>
  