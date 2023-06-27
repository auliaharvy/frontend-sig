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
            <v-btn router :to="adds.route">{{ $t("sjp.add") }}</v-btn>
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
            :loading="loading"
            :headers="headers"
            :search="search"
            :items="sjps.data"
            dense
          >
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
                v-if="item.trxStatus == 0"
              >
                <v-btn color="secondary" small>{{ $t("sjp.send") }}</v-btn>
              </router-link>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
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
                v-if="item.trxStatus === 0"
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
      dialogExport: false,
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trxNumber", text: this.$t("sjp.trxNumber"), width: "15%" },
        { value: "departure", text: this.$t("sjp.departure") },
        { value: "destination", text: this.$t("sjp.destination") },
        { value: "transporter", text: this.$t("sjp.transporter") },
        { value: "licensePlate", text: this.$t("sjp.truck") },
        { value: "driverName", text: this.$t("sjp.driver") },
        { value: "noDo", text: this.$t("sjp.noDo") },
        { value: "trxStatus", text: this.$t("sjp.trxStatus") },
        { value: "send", text: this.$t("sjp.send") },
        { value: "actions", text: this.$t("table.actions") },
      ],
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
    this.getSjps(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
    console.log(this.sjps);
    console.log('wkwk');
  },
  computed: {
    ...mapState("sjp", {
      sjps: (state) => state.sjps, //MENGAMBIL STATE SJPS
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sjp", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("sjp", ["getSjps", "getExportDataSjps", "deleteSjp"]),
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
      this.getExportDataSjps(this.downloadRange);
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
