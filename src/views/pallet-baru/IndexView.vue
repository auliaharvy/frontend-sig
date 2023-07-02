<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("newPallet.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <!-- <v-btn v-if="$can('create new pallet')" router :to="adds.route">{{ $t("newPallet.add") }}</v-btn>s -->
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
            :items="filteredNewPallets"
            dense
          >
            <template v-slot:header="{ header }">
              <tr class="grey lighten-3">
                <th v-for="header in headers" :key="header.text" style="width: 200px;">
                  <div v-if="filters.hasOwnProperty(header.value)">
                    <v-autocomplete
                      flat
                      hide-details
                      hide-selected
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

            <template v-slot:item.status="{ item }">
              <p v-if="item.status == 0">Draft</p>
              <p class="text-green" v-else-if="item.status == 1">Process</p>
              <p class="text-red" v-else-if="item.status == 2">Closed</p>
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
                        v-if="item.status == 0 || item.status == null || item.status == 1 && $can('update new pallet')"
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
                  <v-list-item v-if="item.qty_ready_pallet < item.qty_request_pallet && $can('create pallet realization')">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-btn router :to="'/pallet-realization/add/'+item.id" small text>
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          Add Pallet Realization
                        </v-btn></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-icon v-if="item.status === 0 || item.status == null && $can('delete new pallet')" small @click="hapusData(item)"> mdi-delete </v-icon>
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
              worksheet="Sheet New Pallet"
              name="data-new-pallet.xls"
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
  name: "NewPallet",
  components: {
    Breadcomp,
  },
  data() {
    return {
      totalDataDownload: 0,
      selected: [],
      dialogExport: false,
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("newPallet.trxNumber"), width: "200px" },
        { value: "no_change_quota", text: this.$t("changeQuota.trxNumber"), width: "200px" },
        { value: "company_requester", text: this.$t("newPallet.compRequester"), width: "180px" },
        { value: "company_workshop", text: this.$t("newPallet.compSupplier"), width: "180px" },
        { value: "qty_request_pallet", text: this.$t("newPallet.palletAdd"), width: "100px" },
        { value: "qty_ready_pallet", text: this.$t("newPallet.palletRealisation"), width: "100px" },
        { value: "status", text: this.$t("newPallet.status"), width: "100px" },
        { value: "actions", text: this.$t("table.actions"), width: "80px" },
      ],
      filters: {
        trx_number: [],
        no_change_quota: [],
        company_requester: [],
        company_workshop: [],
        qty_request_pallet: [],
        qty_ready_pallet: [],
        status: [],
        // actions: [],
      },
      search: "",
      adds: { route: "/new-pallet/add" },
      edits: { route: "/new-pallet/edit" },
      listEdit: [
        {
          text: "Change Destination",
          icon: "mdi-warehouse",
          href: "/new-pallet/change-destination",
        },
        { text: "Change Truck", icon: "mdi-truck", href: "/sjp/change-truck" },
      ],
      json_fields: {
        "NP Number": "trx_number",
        "CQ Number": "no_change_quota",
        "Company": "company_requester",
        "Workshop": "company_workshop",
        "Request Pallet": "qty_request_pallet",
        "Ready Pallet": "qty_ready_pallet",
        "Status": "status",
      },
    };
  },
  created() {
    this.getNewPallets(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("newPallet", {
      newPallets: (state) => state.newPallets, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("newPallet", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    filteredNewPallets() {
      return this.newPallets.filter((d) => {
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
    ...mapActions("newPallet", ["getNewPallets", "getExportNewPallets","deleteNewPallet"]),
    columnValueList(val) {
      return this.newPallets.map((d) => d[val]);
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
          this.deleteNewPallet(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportNewPallets(this.downloadRange).then((result) => {
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
