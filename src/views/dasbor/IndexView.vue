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
            style="height: 500px;"
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
              style="height: 350px;"
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
              <v-autocomplete
                :items="detailPools.data"
                v-model="idConditionCompany"
                outlined
                item-text="name"
                @change="changePoolDetail()"
                item-value="id"
                required
                clearable
              >
              </v-autocomplete>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <DoughnutChart
              v-if="palletConditionCompany.data"
              :data="dataConditionCompany"
              :options="barChartOptions"
              :labels="labelConditionCompany"
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
              >Warehouse Detail</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <BarChartPool
              v-if="detailWarehouse.data"
              style="height: 350px;"
              :dataStock="detailWarehouseStock"
              :dataIn="detailWarehouseIn"
              :dataOut="detailWarehouseOut"
              :options="barChartDetailOptions"
              :labels="detailWarehouseLabel"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
              <v-autocomplete
                :items="detailWarehouse.data"
                v-model="idConditionWarehouse"
                outlined
                item-text="name"
                @change="changeWarehouseDetail()"
                item-value="id"
                required
                clearable
              >
              </v-autocomplete>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <DoughnutChart
              v-if="palletConditionWarehouse.data"
              :data="dataConditionWarehouse"
              :options="barChartOptions"
              :labels="labelConditionWarehouse"
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
              >Transporter Detail</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <BarChart
              v-if="detailTransporter.data"
              style="height: 350px;"
              :data="detailTransporterStock"
              :options="barChartOptions"
              :labels="detailTransporterLabel"
            />
            <!-- <BarChartPool
              v-if="detailTransporter.data"
              style="height: 350px;"
              :dataStock="detailTransporterStock"
              :dataIn="detailTransporterIn"
              :dataOut="detailPoolOut"
              :options="barChartDetailOptions"
              :labels="detailTransporterLabel"
            /> -->
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
              <v-autocomplete
                :items="detailTransporter.data"
                v-model="idConditionTransporter"
                outlined
                item-text="name"
                @change="changeTransporterDetail()"
                item-value="id"
                required
                clearable
              >
              </v-autocomplete>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <DoughnutChart
              v-if="palletConditionTransporter.data"
              :data="dataConditionTransporter"
              :options="barChartOptions"
              :labels="labelConditionTransporter"
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
    idConditionCompany: 4,
    idConditionWarehouse: 4,
    idConditionTransporter: 4,
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
    this.getDetailPools().then((response) => {
      this.idConditionCompany = response.data[0].id;
      this.getConditionCompany(response.data[0].id);
    });
    this.getDetailWarehouse().then((response) => {
      this.idConditionWarehouse = response.data[0].id;
      this.getConditionWarehouse(response.data[0].id);
    });
    this.getDetailTransporter().then((response) => {
      this.idConditionTransporter = response.data[0].id;
      this.getConditionTransporter(response.data[0].id);
    });
  },
  computed: {
    ...mapState("dashboard", {
      totalPallets: (state) => state.totalPallets, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionAlls: (state) => state.palletConditionAlls, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionTransporters: (state) => state.palletConditionTransporters, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionCompany: (state) => state.palletConditionCompany, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      detailPools: (state) => state.detailPools, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      detailWarehouse: (state) => state.detailWarehouse, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      detailTransporter: (state) => state.detailTransporter, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionWarehouse: (state) => state.palletConditionWarehouse, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionTransporter: (state) => state.palletConditionTransporter, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
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
    dataConditionCompany() {
      return _.map(this.palletConditionCompany.data, function (o) {
        return o.jumlah_pallet;
      });
    },
    labelConditionCompany() {
      return _.map(this.palletConditionCompany.data, function (o) {
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
    // data Detail Warehouse
    detailWarehouseStock() {
      return _.map(this.detailWarehouse.data, function (o) {
        return o.stock;
      });
    },
    detailWarehouseIn() {
      return _.map(this.detailWarehouse.data, function (o) {
        return o.pallet_in;
      });
    },
    detailWarehouseOut() {
      return _.map(this.detailWarehouse.data, function (o) {
        return o.pallet_out;
      });
    },
    detailWarehouseLabel() {
      return _.map(this.detailWarehouse.data, function (o) {
        return o.name;
      });
    },
    // data pallet condition warehouse
    dataConditionWarehouse() {
      return _.map(this.palletConditionWarehouse.data, function (o) {
        return o.jumlah_pallet;
      });
    },
    labelConditionWarehouse() {
      return _.map(this.palletConditionWarehouse.data, function (o) {
        return o.name;
      });
    },
    // data Detail Transporter
    detailTransporterStock() {
      return _.map(this.detailTransporter.data, function (o) {
        return o.stock;
      });
    },
    detailTransporterLabel() {
      return _.map(this.detailTransporter.data, function (o) {
        return o.name;
      });
    },
    // data pallet condition transporter
    dataConditionTransporter() {
      return _.map(this.palletConditionTransporter.data, function (o) {
        return o.jumlah_pallet;
      });
    },
    labelConditionTransporter() {
      return _.map(this.palletConditionTransporter.data, function (o) {
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
      "getDetailWarehouse",
      "getDetailTransporter",
      "getConditionCompany",
      "getConditionWarehouse",
      "getConditionTransporter"
    ]),
    sumTotal(data) {
      return data.reduce((acc, item) => acc + parseInt(item.jumlah_pallet), 0);
    },
    async changePoolDetail () {
      this.getConditionCompany(this.idConditionCompany);
    },
    async changeWarehouseDetail () {
      this.getConditionWarehouse(this.idConditionWarehouse);
    },
    async changeTransporterDetail () {
      this.getConditionTransporter(this.idConditionTransporter);
    }
  },
};
</script>
