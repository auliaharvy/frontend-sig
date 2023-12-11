<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("transporterAdjusment.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn v-if="$can('create transporter adjustment')" :to="adds.route">{{ $t("transporterAdjusment.add") }}</v-btn>
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
            :items="filteredTransporterAdjusments"
            dense
          >
            <template v-slot:header="{ header }">
              <tr class="grey lighten-3 tr-header hidden-sm-and-down">
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
            <template v-slot:item.is_from_pool="{ item }">
              <p class="text-normal" v-if="item.is_from_pool == 0 || item.is_from_pool == null">{{ $t("transporterAdjusment.isNotPool") }}</p>
              <p class="text-normal" v-if="item.is_from_pool == 1">{{ $t("transporterAdjusment.isPool") }}</p>
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
                        v-if="item.status == 0 && $can('update transporter adjustment')"
                      >
                        <v-icon small class="mr-2">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit data</span>
                  </v-tooltip>
                </template>
              </v-menu>
              <v-icon v-if="item.status === 0 && $can('delete transporter adjustment')" small @click="hapusData(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:item.tanggal="{ item }">
              <p class="text-normal">{{ item.created_at | moment('DD-MM-YYYY') }}</p>
            </template>
            <template v-slot:item.jam="{ item }">
              <p class="text-normal">{{ item.created_at | moment('HH:mm') }}</p>
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
              worksheet="Sheet Transporter Adjusment"
              name="data-transporter-adjusment.xls"
            >
              <v-btn class="red darken-1 text-white mt-4" block>Download</v-btn>
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
  name: "TransporterAdjusment",
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
        { value: "trx_number", text: this.$t("transporterAdjusment.trxNumber"), width: "200px" },
        { value: "transporter_name", text: this.$t("transporterAdjusment.transporter"), width: "180px" },
        { value: "company_name", text: this.$t("transporterAdjusment.company"), width: "180px" },
        { value: "reporter_name", text: this.$t("transporterAdjusment.reporter"), width: "180px" },
        { value: "is_from_pool", text: this.$t("transporterAdjusment.status"), width: "100px" },
        { value: "good_pallet", text: this.$t("pallet.good"), width: "100px" },
        { value: "tbr_pallet", text: this.$t("pallet.tbr"), width: "100px" },
      ],
      filters: {
        trx_number: [],
        transporter_name: [],
        company_name: [],
        reporter_name: [],
        is_from_pool: [],
        good_pallet: [],
        tbr_pallet: [],
      },
      search: "",
      adds: { route: "/transporter-adjusment/add" },
      edits: { route: "/transporter-adjustment/edit" },
      json_fields: {
        "Transaction Number": "trx_number",
        "Company": "company_name",
        "Transporter": "transporter_name",
        "Reporter": "reporter_name",
        "Good Pallet": "good_pallet",
        "TBR Pallet": "tbr_pallet",
        "is_from_pool": "is_from_pool",
      },
    };
  },
  created() {
    this.getTransporterAdjusments(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("transporterAdjusment", {
      transporterAdjusments: (state) => state.transporterAdjusments, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("transporterAdjusment", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    filteredTransporterAdjusments() {
      return this.transporterAdjusments.filter((d) => {
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
    ...mapActions("transporterAdjusment", ["getTransporterAdjusments", "getExportTransporterAdjusments", "deleteTransporterAdjusment"]),
    columnValueList(val) {
      return this.transporterAdjusments.map((d) => d[val]);
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
          this.deleteTransporterAdjusment(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportTransporterAdjusments(this.downloadRange).then((result) => {
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
.text-red{
  vertical-align: middle;
  color: red !important;
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
