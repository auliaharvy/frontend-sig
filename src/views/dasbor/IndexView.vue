<template>
  <v-container>
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-row
      v-if="
        roleUser.role_name == 'Supervisor' ||
        roleUser.role_name == 'Manager' ||
        roleUser.role_name == 'Superuser'
      "
      no-gutters
    >
      <v-col :sm="12" :md="12" :lg="12">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span v-if="totalPallets.data" class="text-h6 text-center font-weight-normal">
              {{ $t("dashboard.allPallet") }} : {{ sumTotal(totalPallets.data) }}
            </span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      v-if="
        roleUser.role_name == 'Supervisor' ||
        roleUser.role_name == 'Manager' ||
        roleUser.role_name == 'Superuser'
      "
      no-gutters
    >
      <v-col :sm="12" :md="8" :lg="8">
        <v-card class="ma-1" elevation="5">
          <BarChartGlobal
            v-if="totalPallets.data"
            style="height: 500px"
            :total="dataTotalPallet"
            :good="dataTotalPalletGood"
            :tbr="dataTotalPalletTbr"
            :ber="dataTotalPalletBer"
            :missing="dataTotalPalletMissing"
            :quota="dataTotalQuota"
            :options="barChartOptions"
            :labels="labelTotalPallet"
          />
        </v-card>
      </v-col>

      <v-col :sm="12" :md="4" :lg="4">
        <v-card class="ma-1" elevation="5">
          <!-- <v-card-title class="justify-center">
            <span class="text-h6 text-center font-weight-normal"
              >Percentage</span
            >
          </v-card-title> -->
          <!-- <v-divider /> -->
          <v-card-text>
            <DoughnutChart
              v-if="palletConditionAlls.data"
              :data="dataPercentageTotal"
              :options="percentageChartOption"
              :labels="labelTotalPallet"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row
      v-if="
        roleUser.role_name == 'Supervisor' ||
        roleUser.role_name == 'Manager' ||
        roleUser.role_name == 'Superuser'
      "
      no-gutters
    >
      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span class="text-h6 text-center font-weight-normal"
              >Pool Palet + Warehouse + Workshop</span
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
              >{{ $t("dashboard.transporter") }}</span
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
    </v-row> -->

    <v-row
      v-if="
        roleUser.role_name == 'Supervisor' ||
        roleUser.role_name == 'Manager' ||
        roleUser.role_name == 'Superuser' ||
        roleUser.company_type == 'Pool Pallet'
      "
      no-gutters
    >
      <v-col :sm="12" :md="12" :lg="12">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span v-if="detailPools.data" class="text-h6 text-center font-weight-normal"
              >{{ $t("dashboard.poolPalletDetail") }} : {{ sumPoolPallet(detailPools.data) }}</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <BarChartGlobal
              v-if="detailPools.data"
              style="height: 500px"
              :total="detailPoolStock"
              :good="dataPoolPalletGood"
              :tbr="dataPoolPalletTbr"
              :ber="dataPoolPalletBer"
              :missing="dataPoolPalletMissing"
              :quota="dataPoolQuota"
              :options="barChartOptions"
              :labels="detailPoolLabel"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- <v-col :sm="6" :md="6" :lg="6">
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
      </v-col> -->
    </v-row>

    <v-row
      v-if="
        roleUser.role_name == 'Supervisor' ||
        roleUser.role_name == 'Manager' ||
        roleUser.role_name == 'Superuser' ||
        roleUser.company_type == 'Warehouse'
      "
      no-gutters
    >
      <v-col :sm="12" :md="12" :lg="12">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span v-if="detailWarehouse.data" class="text-h6 text-center font-weight-normal"
              >{{ $t("dashboard.warehouseDetail") }}
              {{ sumPoolPallet(detailWarehouse.data) }}</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <BarChartGlobal
              v-if="detailWarehouse.data"
              style="height: 500px"
              :total="detailWarehouseStock"
              :good="dataWarehousePalletGood"
              :tbr="dataWarehousePalletTbr"
              :ber="dataWarehousePalletBer"
              :missing="dataWarehousePalletMissing"
              :quota="dataWarehouseQuota"
              :options="barChartDetailOptions"
              :labels="detailWarehouseLabel"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- <v-col :sm="6" :md="6" :lg="6">
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
      </v-col> -->
    </v-row>

    <!-- <v-row
      v-if="
        roleUser.role_name == 'Supervisor' ||
        roleUser.role_name == 'Manager' ||
        roleUser.role_name == 'Superuser' ||
        roleUser.company_type == 'Transporter'
      "
      no-gutters
    >
      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span v-if="detailTransporter.data" class="text-h6 text-center font-weight-normal"
              >{{ $t("dashboard.transporterDetail") }}
              {{ sumPoolPallet(detailTransporter.data) }}</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <BarChart
              v-if="detailTransporter.data"
              style="height: 350px"
              :data="detailTransporterStock"
              :options="barChartOptions"
              :labels="detailTransporterLabel"
            />
            <BarChartPool
              v-if="detailTransporter.data"
              style="height: 350px;"
              :dataStock="detailTransporterStock"
              :dataIn="detailTransporterIn"
              :dataOut="detailPoolOut"
              :options="barChartDetailOptions"
              :labels="detailTransporterLabel"
            />
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
    </v-row> -->

    <!-- <v-row
      v-if="
        roleUser.role_name == 'Supervisor' ||
        roleUser.role_name == 'Manager' ||
        roleUser.role_name == 'Superuser' ||
        roleUser.company_type == 'Workshop'
      "
      no-gutters
    >
      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <span v-if="detailWorkshop.data" class="text-h6 text-center font-weight-normal"
              >{{ $t("dashboard.workshopDetail") }}
              {{ sumPoolPallet(detailWorkshop.data) }}</span
            >
          </v-card-title>
          <v-divider />
          <v-card-text>
            <BarChart
              v-if="detailWorkshop.data"
              style="height: 350px"
              :data="detailWorkshopStock"
              :options="barChartOptions"
              :labels="detailWorkshopLabel"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :sm="6" :md="6" :lg="6">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <v-autocomplete
              :items="detailWorkshop.data"
              v-model="idConditionWorkshop"
              outlined
              item-text="name"
              @change="changeWorkshopDetail()"
              item-value="id"
              required
              clearable
            >
            </v-autocomplete>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <DoughnutChart
              v-if="palletConditionWorkshop.data"
              :data="dataConditionWorkshop"
              :options="barChartOptions"
              :labels="labelConditionWorkshop"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->

    <v-row
      v-if="
        roleUser.role_name == 'Supervisor' ||
        roleUser.role_name == 'Manager' ||
        roleUser.role_name == 'Superuser'
      "
      no-gutters
    >
      <v-col :sm="12" :md="12" :lg="12">
        <v-card class="ma-1" elevation="5">
          <v-card-title class="justify-center">
            <v-autocomplete
              style="margin-right: 20"
              :items="monthData"
              v-model="palletSend.month"
              outlined
              item-text="name"
              item-value="value"
              required
              clearable
            >
            </v-autocomplete>
            <v-autocomplete
              style="margin-left: 20"
              :items="years"
              v-model="palletSend.year"
              outlined
              required
              clearable
            >
            </v-autocomplete>
          </v-card-title>
          <v-divider />
          <v-card-text class="justify-center">
            <v-row no-gutters>
              <v-col :sm="12" :md="12" :lg="12">
                <LineChart
                  v-if="palletSendReceive"
                  style="height: 500px"
                  :label1="'Pallet Send'"
                  :label2="'Pallet Receive'"
                  :data="palletSendData"
                  :dataReceive="palletReceiveData"
                  :options="lineChartOptions"
                  :labels="labelPalletSend"
                />
              </v-col>
              <!-- <v-col style="margin-left: 20" :sm="6" :md="6" :lg="6">
                Pallet Receive
                <LineChart
                  v-if="palletSendReceive"
                  style="height: 500px"
                  :data="palletReceiveData"
                  :options="lineChartOptions"
                  :labels="labelPalletSend"
                />
              </v-col> -->
            </v-row>
            <v-row no-gutters>
              <v-col :sm="12" :md="12" :lg="12">
                <LineChart
                  v-if="palletSendBackReceive"
                  style="height: 500px"
                  :label1="'Pallet Send Back'"
                  :label2="'Pallet Receive Send Back'"
                  :data="palletSendBackData"
                  :dataReceive="palletReceiveBackData"
                  :options="lineChartOptions"
                  :labels="labelPalletSend"
                />
              </v-col>
              <!-- <v-col style="margin-left: 20" :sm="6" :md="6" :lg="6">
                Pallet Receive
                <LineChart
                  v-if="palletSendReceive"
                  style="height: 500px"
                  :data="palletReceiveData"
                  :options="lineChartOptions"
                  :labels="labelPalletSend"
                />
              </v-col> -->
            </v-row>
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
import BarChartGlobal from "./components/BarChartGlobal.vue";
import BarChartPool from "./components/BarChartPool.vue";
import DoughnutChart from "./components/DoughnutChart.vue";
import LineChart from "./components/LineChart.vue";
// @ is an alias to /src
export default {
  name: "Dashboard",
  components: {
    Breadcomp,
    BarChart,
    BarChartGlobal,
    BarChartPool,
    DoughnutChart,
    LineChart,
  },
  data: () => ({
    roleUser: {},
    palletSend: {
      year: 2023,
      month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
    },
    monthData: [
      {
        value: "01",
        name: "Januari",
      },
      {
        value: "02",
        name: "Februari",
      },
      {
        value: "03",
        name: "Maret",
      },
      {
        value: "04",
        name: "April",
      },
      {
        value: "05",
        name: "Mei",
      },
      {
        value: "06",
        name: "Juni",
      },
      {
        value: "07",
        name: "Juli",
      },
      {
        value: "08",
        name: "Agustus",
      },
      {
        value: "09",
        name: "September",
      },
      {
        value: "10",
        name: "Oktober",
      },
      {
        value: "11",
        name: "November",
      },
      {
        value: "12",
        name: "Desember",
      },
    ],
    idConditionCompany: 0,
    idConditionWarehouse: 0,
    idConditionTransporter: 0,
    idConditionWorkshop: 0,
    barChartDetailOptions: {
      scales: {
        x: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          color: "#000000",
          formatter: function (value) {
            return Math.round(value);
          },
          font: {
            weight: "bold",
            size: 12,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: true,
    },
    barChartOptions: {
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
          color: "#000000",
          formatter: function (value) {
            return Math.round(value);
          },
          font: {
            weight: "bold",
            size: 12,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: true,
    },
    lineChartOptions: {
      plugins: {
        datalabels: {
          color: "#000000",
          formatter: function (value) {
            return Math.round(value);
          },
          font: {
            weight: "bold",
            size: 12,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: true,
    },
    percentageChartOption: {
      plugins: {
        datalabels: {
          color: "#000000",
          formatter: function (value) {
            return Math.round(value)+"%";
          },
          font: {
            weight: "bold",
            size: 12,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: true,
    },
    team: [
      { name: "Iyad", role: "web developer", avatar: "/img1.png" },
      { name: "Reda", role: "Graphic designer", avatar: "/img2.png" },
      { name: "Zineb", role: "web developer", avatar: "/img3.png" },
      { name: "Hu TechGroup", role: "Desktop developer", avatar: "/img4.png" },
    ],
    conditionPoolName: "",
    conditionTransporterName: "",
  }),
  created() {
    this.getroleUser().then((response) => {
      this.doLoading();
      this.getTotalPallets(); //LOAD DATA KETIKA COMPONENT DI-LOAD
      this.getConditionAlls("all"); //LOAD DATA KETIKA COMPONENT DI-LOAD
      this.getConditionTransporters("Transporter"); //LOAD DATA KETIKA COMPONENT DI-LOAD
      this.getPalletSendReceive(this.palletSend);
      this.getPalletSendBackReceive(this.palletSend);
      if(
        this.roleUser.role_name == 'Supervisor' ||
        this.roleUser.role_name == 'Manager' ||
        this.roleUser.role_name == 'Superuser'
      ) {
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
        this.getDetailWorkshop().then((response) => {
          this.idConditionWorkshop = response.data[0].id;
          this.getConditionWorkshop(response.data[0].id);
          this.stopLoading();
        });
      } else if(
        this.roleUser.role_name == 'Supervisor' ||
        this.roleUser.role_name == 'Manager' ||
        this.roleUser.role_name == 'Superuser' ||
        this.roleUser.company_type == 'Pool Pallet'
      ) {
        this.getDetailPools().then((response) => {
          this.idConditionCompany = response.data[0].id;
          this.getConditionCompany(response.data[0].id);
          this.stopLoading();
        });
      } else if(
        this.roleUser.role_name == 'Supervisor' ||
        this.roleUser.role_name == 'Manager' ||
        this.roleUser.role_name == 'Superuser' ||
        this.roleUser.company_type == 'Warehouse'
      ) {
        this.getDetailWarehouse().then((response) => {
          this.idConditionWarehouse = response.data[0].id;
          this.getConditionWarehouse(response.data[0].id);
          this.stopLoading();
        });
      } else if(
        this.roleUser.role_name == 'Supervisor' ||
        this.roleUser.role_name == 'Manager' ||
        this.roleUser.role_name == 'Superuser' ||
        this.roleUser.company_type == 'Transporter'
      ) {
        this.getDetailTransporter().then((response) => {
          this.idConditionTransporter = response.data[0].id;
          this.getConditionTransporter(response.data[0].id);
          this.stopLoading();
        });
      } else if(
        this.roleUser.role_name == 'Supervisor' ||
        this.roleUser.role_name == 'Manager' ||
        this.roleUser.role_name == 'Superuser' ||
        this.roleUser.company_type == 'Workshop'
      ) {
        this.getDetailWorkshop().then((response) => {
          this.idConditionWorkshop = response.data[0].id;
          this.getConditionWorkshop(response.data[0].id);
          this.stopLoading();
        });
      }
    });
    
    
  },
  watch: {
    idConditionWarehouse() {
      this.getDetailWarehouse().then((response) => {
        this.getConditionWarehouse(this.idConditionWarehouse);
        this.stopLoading();
      });
    },
    palletSend: {
     handler(val){
      this.getPalletSendReceive(this.palletSend);
      this.getPalletSendBackReceive(this.palletSend);
     },
      deep: true
    }
  },
  computed: {
    years() {
      return _.range(2022, this.$moment().add(1, "years").format("Y"));
    },
    ...mapState("dashboard", {
      totalPallets: (state) => state.totalPallets, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionAlls: (state) => state.palletConditionAlls, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionTransporters: (state) => state.palletConditionTransporters, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionCompany: (state) => state.palletConditionCompany, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      detailPools: (state) => state.detailPools, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      detailWarehouse: (state) => state.detailWarehouse, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      detailTransporter: (state) => state.detailTransporter, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      detailWorkshop: (state) => state.detailWorkshop, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionWarehouse: (state) => state.palletConditionWarehouse, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionTransporter: (state) => state.palletConditionTransporter, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletConditionWorkshop: (state) => state.palletConditionWorkshop, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletSendReceive: (state) => state.palletSendReceive, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      palletSendBackReceive: (state) => state.palletSendBackReceive, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("dashboard", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    // ...mapState(["roleUser"]),
    // data total pallet barchart
    dataPercentageTotal() {
      const totalPallet = this.totalPallets.data.reduce((acc, item) => acc + parseInt(item.jumlah_pallet), 0);
      return _.map(this.totalPallets.data, function (o) {
        return o.jumlah_pallet / totalPallet * 100;
      });
    },
    dataTotalPallet() {
      return _.map(this.totalPallets.data, function (o) {
        return o.jumlah_pallet;
      });
    },
    dataTotalPalletGood() {
      return _.map(this.totalPallets.data, function (o) {
        return o.good_pallet;
      });
    },
    dataTotalPalletTbr() {
      return _.map(this.totalPallets.data, function (o) {
        return o.tbr_pallet;
      });
    },
    dataTotalPalletBer() {
      return _.map(this.totalPallets.data, function (o) {
        return o.ber_pallet;
      });
    },
    dataTotalPalletMissing() {
      return _.map(this.totalPallets.data, function (o) {
        return o.missing_pallet;
      });
    },
    dataTotalQuota() {
      return _.map(this.totalPallets.data, function (o) {
        return o.pallet_quota;
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
        return o.name + " | " + o.jumlah_pallet;
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
        return o.name + " | " + o.jumlah_pallet;
      });
    },
    dataConditionCompany() {
      return _.map(this.palletConditionCompany.data, function (o) {
        return o.jumlah_pallet;
      });
    },
    labelConditionCompany() {
      return _.map(this.palletConditionCompany.data, function (o) {
        return o.name + " | " + o.jumlah_pallet;
      });
    },
    // data Detail Pallet Pool

    detailPoolStock() {
      return _.map(this.detailPools.data, function (o) {
        return o.stock;
      });
    },
    dataPoolPalletGood() {
      return _.map(this.detailPools.data, function (o) {
        return o.good_pallet;
      });
    },
    dataPoolPalletTbr() {
      return _.map(this.detailPools.data, function (o) {
        return o.tbr_pallet;
      });
    },
    dataPoolPalletBer() {
      return _.map(this.detailPools.data, function (o) {
        return o.ber_pallet;
      });
    },
    dataPoolPalletMissing() {
      return _.map(this.detailPools.data, function (o) {
        return o.missing_pallet;
      });
    },
    dataPoolQuota() {
      return _.map(this.detailPools.data, function (o) {
        return o.pallet_quota;
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
    dataWarehousePalletGood() {
      return _.map(this.detailWarehouse.data, function (o) {
        return o.good_pallet;
      });
    },
    dataWarehousePalletTbr() {
      return _.map(this.detailWarehouse.data, function (o) {
        return o.tbr_pallet;
      });
    },
    dataWarehousePalletBer() {
      return _.map(this.detailWarehouse.data, function (o) {
        return o.ber_pallet;
      });
    },
    dataWarehousePalletMissing() {
      return _.map(this.detailWarehouse.data, function (o) {
        return o.missing_pallet;
      });
    },
    dataWarehouseQuota() {
      return _.map(this.detailWarehouse.data, function (o) {
        return o.pallet_quota;
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
        return o.name + " | " + o.jumlah_pallet;
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
        return o.name + " | " + o.jumlah_pallet;
      });
    },
    // data Detail Workshop
    detailWorkshopStock() {
      return _.map(this.detailWorkshop.data, function (o) {
        return o.stock;
      });
    },
    detailWorkshopLabel() {
      return _.map(this.detailWorkshop.data, function (o) {
        return o.name;
      });
    },
    // data pallet condition workshop
    dataConditionWorkshop() {
      return _.map(this.palletConditionWorkshop.data, function (o) {
        return o.jumlah_pallet;
      });
    },
    labelConditionWorkshop() {
      return _.map(this.palletConditionWorkshop.data, function (o) {
        return o.name + " | " + o.jumlah_pallet;
      });
    },
    palletSendData() {
      return _.map(this.palletSendReceive.dataSend, function (o) {
        return o.total;
      });
    },
    palletReceiveData() {
      return _.map(this.palletSendReceive.dataReceive, function (o) {
        return o.total;
      });
    },
    palletSendBackData() {
      return _.map(this.palletSendBackReceive.dataSend, function (o) {
        return o.total;
      });
    },
    palletReceiveBackData() {
      return _.map(this.palletSendBackReceive.dataReceive, function (o) {
        return o.total;
      });
    },
    labelPalletSend() {
      return _.map(this.palletSendReceive.dataSend, function (o) {
        return o.date;
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
      "getDetailWorkshop",
      "getConditionCompany",
      "getConditionWarehouse",
      "getConditionTransporter",
      "getConditionWorkshop",
      "getPalletSendReceive",
      "getPalletSendBackReceive",
      "doLoading",
      "stopLoading",
    ]),
    sumPoolPallet(data) {
      return data.reduce((acc, o) => acc + parseInt(o.stock), 0);
    },
    sumTotal(data) {
      return data.reduce((acc, item) => acc + parseInt(item.jumlah_pallet), 0);
    },
    async changePoolDetail() {
      this.getConditionCompany(this.idConditionCompany);
    },
    async changeWarehouseDetail() {
      this.getConditionWarehouse(this.idConditionWarehouse);
    },
    async changeTransporterDetail() {
      this.getConditionTransporter(this.idConditionTransporter);
    },
    async getroleUser() {
      this.roleUser = JSON.parse(localStorage.getItem("role"));
    },
  },
};
</script>
