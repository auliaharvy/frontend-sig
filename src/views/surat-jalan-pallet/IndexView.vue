<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("sjp.sjp") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <!-- <v-btn v-if="this.$route.path === '/sjp' && $can('create sjp')" router :to="adds.route">{{ $t("sjp.add") }}</v-btn> -->
            <v-btn v-if="$can('create sjp')" router :to="adds.route">{{ $t("sjp.add") }}</v-btn>
            <v-btn style="margin-left: 20px" @click="dialogExport = true">{{
              $t("manajemenpengguna.unduh")
            }}</v-btn>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              prepend-icon="mdi-search"
              :label="$t('manajemenpengguna.cari')"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-model="selected"
            :loading="loading"
            :headers="headers"
            :search="search"
            :items="filteredSjps"
            dense
          >
            <template v-slot:header="{ header }">
              <tr class="grey lighten-3">
                <th v-for="header in headers" :key="header.text">
                  <div v-if="filters.hasOwnProperty(header.value)">
                    <v-autocomplete
                      flat
                      hide-details
                      multiple
                      attach
                      chips
                      dense
                      clearable
                      :items="columnValueList(header.value)"
                      v-model="filters[header.value]"
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 5">
                          <span>
                            {{ item }} 
                          </span>
                        </v-chip>
                        <span v-if="index === 5" class="grey--text caption" > 
                          (+{{ filters[header.value].length - 5 }} others) 
                        </span>
                      </template>
                    </v-autocomplete>
                  </div>
                </th>
              </tr>
            </template>
            <template v-slot:item.driverName="{ item }">
              <template v-if="item.secondDriver === null">
                <p class="text-normal">
                  {{ item.driverName }}
                </p>
              </template>
              <template v-else>
                <p class="text-strike">
                  {{ item.driverName }}
                </p>
                <v-spacer />
                <p class="text-normal">({{ item.secondDriver }})</p>
              </template>
            </template>
            <template v-slot:item.trxStatus="{ item }">
              <p v-if="item.trxStatus == 0">Draft</p>
              <p class="text-green" v-else-if="item.trxStatus == 1">Send</p>
              <p class="text-blue" v-else-if="item.trxStatus == 2">Received</p>
              <p class="text-green" v-else-if="item.trxStatus == 3">
                Send Back
              </p>
              <p class="text-blue" v-else-if="item.trxStatus == 4">
                Send Back Received
              </p>
              <p class="text-red" v-else-if="item.state == 6">Sending Cancel</p>
            </template>
            <template v-slot:item.send="{ item }">
              <router-link
                :to="{ name: 'sjp-status.add', params: { id: item.id } }"
                v-if="item.trxStatus == 0 && $can('create sjp status') && item.idDeparture == roleSet.id_company"
              >
                <v-btn color="secondary" small>{{ $t("sjp.send") }}</v-btn>
              </router-link>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom >
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
                        v-if="item.trxStatus == 0 && $can('update sjp')"
                      >
                        <v-icon small class="mr-2">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit data</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item v-for="(list, i) in listEdit" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        ><v-btn
                          router
                          :to="list.href + '/' + item.id"
                          small
                          text
                        >
                          <v-icon left>
                            {{ list.icon }}
                          </v-icon>
                          {{ list.text }}
                        </v-btn></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-icon
                v-if="item.trxStatus == 0 && $can('delete sjp')"
                small
                @click="hapusData(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-col>
    <v-dialog v-model="dialogExport" width="auto">
      <v-card>
        <v-card-text>
          <v-date-picker
            v-model="downloadRange"
            @change="getExportData()"
            range
          ></v-date-picker>
          <v-text-field
            v-model="dateRangeText"
            label="Date range"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="totalDataDownload"
            label="Total Data"
            prepend-icon="mdi-file-multiple"
            readonly
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <export-excel
              :data="exportData.data"
              :fields="json_fields"
              worksheet="Sheet SJP"
              name="data-sjp.xls"
            >
              <v-btn color="primary" block>Download</v-btn>
            </export-excel>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.2.28/dist/vuetify.min.js"></script>
<script>
import { mapActions, mapState } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
// @ is an alias to /src
export default {
  name: "SuratJalanPallet",
  components: {
    Breadcomp,
  },
  data() {
    return {
      totalDataDownload: 0,
      selected: [],
      roleSet: {},
      dialogExport: false,
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trxNumber", text: this.$t("sjp.trxNumber"), width: "180px" },
        { value: "departure", text: this.$t("sjp.departure"), width: "180px"  },
        { value: "destination", text: this.$t("sjp.destination"), width: "180px"  },
        { value: "transporter", text: this.$t("sjp.transporter"), width: "180px" },
        { value: "licensePlate", text: this.$t("sjp.truck"), width: "150px" },
        { value: "driverName", text: this.$t("sjp.driver"), width: "150px" },
        { value: "noDo", text: this.$t("sjp.noDo"), width: "150px" },
        { value: "trxStatus", text: this.$t("sjp.trxStatus"), width: "100px" },
        { value: "send", text: this.$t("sjp.send"), width: "100px" },
        { value: "actions", text: this.$t("table.actions"), width: "80px" },
      ],
      filters: {
        trxNumber: [],
        departure: [],
        destination: [],
        transporter: [],
        license: [],
        licensePlate: [],
        driverName: [],
        noDo: [],
        trxStatus: [],
        send: [],
        // actions: []
      },
      items: [],
      search: "",
      adds: { route: "/sjp/add" },
      edits: { route: "/sjp/edit" },
      listEdit: [
        {
          text: "Change Destination",
          icon: "mdi-warehouse",
          href: "/sjp/change-destination",
        },
        { text: "Change Truck", icon: "mdi-truck", href: "/sjp/change-truck" },
      ],
      json_fields: {
        "SJP Number": "trxNumber",
        "DO Number": "noDo",
        "Departure": "departure",
        "Destination": "destination",
        "Transporter": "transporter",
        "Pallet Quantity": "palletQuantity",
        "Truck": "licensePlate",
        "Driver": "driverName",
        "Departure Time": "departureTime",
        "Estimated Time Arrival": "eta",
        "Status": "trxStatus",
        "Distribution": "distribution",
      },
    };
  },
  created() {
    this.getRoleSet();
    this.getSjps(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
    console.log(this.sjps);
  },
  computed: {
    ...mapState("sjp", {
      sjps: (state) => state.sjps, //MENGAMBIL STATE SJPS
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMERrr
    }),
    ...mapState("sjp", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    filteredSjps() {
      return this.sjps.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
    dateRangeText () {
      return this.downloadRange.join(' ~ ')
    },
  },
  methods: {
    ...mapActions("sjp", ["getSjps", "getExportDataSjps", "deleteSjp"]),
    columnValueList(val) {
      return this.sjps.map((d) => d[val]);
    },
    getRoleSet() {
      this.roleSet = JSON.parse(localStorage.getItem("role"));
    },
    editData(item) {
      // Logika untuk mengedit data
      console.log("Mengedit data:", item);
    },
    sumTotal(data) {
      return data.reduce((acc, item) => acc + item.quantity, 0);
    },
    hapusData(item) {
      this.$swal({
        title: "Are you sure?",
        text: "This will delete record Permanently!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.value) {
          this.deleteSjp(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportDataSjps(this.downloadRange).then((result) => {
        this.totalDataDownload = result.data.length
      });
    },
  },
};
</script>
<style scoped>
.warna-font {
  color: white;
}
.text-blue {
  vertical-align: middle;
  color: #0073b7 !important;
  display: table-cell;
  vertical-align: middle;
}
.text-green {
  vertical-align: middle;
  color: #00a65a !important;
  display: table-cell;
  vertical-align: middle;
}
.text-normal {
  display: table-cell;
  vertical-align: middle;
}

.text-strike {
  text-decoration: line-through;
  display: table-cell;
  vertical-align: middle;
}
</style>
