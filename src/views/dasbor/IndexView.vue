<template>
  <v-container>
    <v-row no-gutters>
      <v-col :sm="12" :md="12" :lg="12">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span class="text-h6 text-center font-weight-normal"
              >All Pallet : {{ sumTotal(totalPallets.data) }}</span
            >
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col :sm="12" :md="12" :lg="12">
        <v-card class="ma-1" elevation="5">
          <BarChart
            v-if="totalPallets.data"
            :data="dataTotalPallet"
            :options="barChartOptions"
            :labels="labelTotalPallet"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span class="text-h6 text-center font-weight-normal"
              >Pool Pallet</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <DoughnutChart
              v-if="palletConditionAlls.data"
              :data="dataConditionAll"
              :options="barChartOptions"
              :labels="labelConditionAll"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span class="text-h6 text-center font-weight-normal"
              >Transporter</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <DoughnutChart
              v-if="palletConditionTransporters.data"
              :data="dataConditionTrans"
              :options="barChartOptions"
              :labels="labelConditionTrans"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span class="text-h6 text-center font-weight-normal"
              >Pool Pallet Detail</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <BarChartPool
              v-if="detailPools.data"
              :dataStock="detailPoolStock"
              :dataIn="detailPoolIn"
              :dataOut="detailPoolOut"
              :options="barChartDetailOptions"
              :labels="detailPoolLabel"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span class="text-h6 text-center font-weight-normal"
              >Transporter</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <DoughnutChart
              v-if="palletConditionTransporters.data"
              :data="dataConditionTrans"
              :options="barChartOptions"
              :labels="labelConditionTrans"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";
import Breadcomp from "@/components/Breadcrumb.vue";
import BarChart from "./components/BarChart.vue";
import BarChartPool from "./components/BarChartPool.vue";
import DoughnutChart from "./components/DoughnutChart.vue";
// @ is an alias to /src
export default {
  name: "Dashboard",
  components: {
    Breadcomp,
    BarChart,
    BarChartPool,
    DoughnutChart,
  },
  data: () => ({
    barChartDetailOptions: {
      onClick: function (evt, array) {
        if (array.length != 0) {
          var position = array[0]._index;
          var activeElement = this.tooltip._data.labels[position];
          console.log(activeElement);
        } else {
          console.log("You selected the background!");
        }
      },
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
            ticks: {
              // stepSize: 50,
              // maxTicksLimit: 3,
              suggestedMin: 0,
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          display: true,
          align: "center",
          anchor: "center",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    barChartOptions: {
      onClick: function (evt, array) {
        if (array.length != 0) {
          var position = array[0]._index;
          var activeElement = this.tooltip._data.labels[position];
          console.log(activeElement);
        } else {
          console.log("You selected the background!");
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              // stepSize: 50,
              // maxTicksLimit: 3,
              suggestedMin: 0,
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          display: true,
          align: "center",
          anchor: "center",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    team: [
      { name: "Iyad", role: "web developer", avatar: "/img1.png" },
      { name: "Reda", role: "Graphic designer", avatar: "/img2.png" },
      { name: "Zineb", role: "web developer", avatar: "/img3.png" },
      { name: "Hu TechGroup", role: "Desktop developer", avatar: "/img4.png" },
    ],
  }),
  created() {
    this.getTotalPallets(); //LOAD DATA KETIKA COMPONENT DI-LOAD
    this.getConditionAlls("all"); //LOAD DATA KETIKA COMPONENT DI-LOAD
    this.getConditionTransporters("Transporter"); //LOAD DATA KETIKA COMPONENT DI-LOAD
    this.getDetailPools(); //LOAD DATA KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("dashboard", {
      totalPallets: (state) => state.totalPallets, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionAlls: (state) => state.palletConditionAlls, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionTransporters: (state) => state.palletConditionTransporters, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      detailPools: (state) => state.detailPools, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dashboard", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    // data total pallet barchart
    dataTotalPallet() {
      return _.map(this.totalPallets.data, function (o) {
        return o.jumlah_pallet;
      });
    },
    labelTotalPallet() {
      return _.map(this.totalPallets.data, function (o) {
        return o.name;
      });
    },
    // data pallet condition all
    dataConditionAll() {
      return _.map(this.palletConditionAlls.data, function (o) {
        return o.jumlah_pallet;
      });
    },
    labelConditionAll() {
      return _.map(this.palletConditionAlls.data, function (o) {
        return o.name;
      });
    },
    // data pallet condition transporter
    dataConditionTrans() {
      return _.map(this.palletConditionTransporters.data, function (o) {
        return o.jumlah_pallet;
      });
    },
    labelConditionTrans() {
      return _.map(this.palletConditionTransporters.data, function (o) {
        return o.name;
      });
    },
    // data Detail Pallet Pool
    detailPoolStock() {
      return _.map(this.detailPools.data, function (o) {
        return o.stock;
      });
    },
    detailPoolIn() {
      return _.map(this.detailPools.data, function (o) {
        return o.pallet_in;
      });
    },
    detailPoolOut() {
      return _.map(this.detailPools.data, function (o) {
        return o.pallet_out;
      });
    },
    detailPoolLabel() {
      return _.map(this.detailPools.data, function (o) {
        return o.name;
      });
    },
  },
  methods: {
    ...mapActions("dashboard", [
      "getTotalPallets",
      "getConditionAlls",
      "getConditionTransporters",
      "getDetailPools",
    ]),
    sumTotal(data) {
      return data.reduce((acc, item) => acc + parseInt(item.jumlah_pallet), 0);
    },
  },
};
</script>
