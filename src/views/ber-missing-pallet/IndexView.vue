<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("berMissingPallet.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn v-if="$can('create damaged pallet')" router :to="adds.route">{{ $t("berMissingPallet.add") }}</v-btn>
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
            :items="filteredberMissingPallets"
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

            <template v-slot:item.transaction_type="{ item }">
              <p v-if="item.transaction_type == 0" class="text-normal">Pallet BER</p>
              <p v-if="item.transaction_type == 1" class="text-normal">Pallet Hilang</p>
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
              worksheet="Sheet BER Missing Pallet"
              name="data-ber-missing-pallet.xls"
            >
            <v-btn class="red darken-1 text-white mt-4" block>Download</v-btn>
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
  name: "berMissingPallet",
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
        { value: "trx_number", text: this.$t("berMissingPallet.trxNumber"), width: "180px" },
        { value: "tanggal", text: "Tanggal", width: "120px" },
        { value: "jam", text: "Jam", width: "70px" },
        { value: "company_name", text: this.$t("berMissingPallet.company"), width: "180px" },
        { value: "reporter_name", text: this.$t("berMissingPallet.reporter") },
        { value: "transaction_type", text: "Tipe Transaksi", width: "150px" },
        { value: "qty_good_pallet", text: this.$t("pallet.good") },
        { value: "qty_tbr_pallet", text: this.$t("pallet.tbr") },
        { value: "qty_ber_missing_pallet", text: "Jumlah Pallet Hilang / BER" },
        { value: "note", text: this.$t("berMissingPallet.note") },
      ],
      filters: {
        trx_number: [],
        company_name: [],
        reporter_name: [],
        transaction_type: [],
        qty_good_pallet: [],
        qty_tbr_pallet: [],
        qty_ber_missing_pallet: [],
        note: [],
      },
      search: "",
      adds: { route: "/ber-missing-pallet/add" },
      edits: { route: "/ber-missing-pallet/edit" },
      json_fields: {
        "Transaction Number": "trx_number",
        "Company": "company_name",
        "Reporter": "reporter_name",
        "Tipe Transaksi": "transaction_type",
        "Quantity Good Pallet": "qty_good_pallet",
        "Quantity TBR Pallet": "qty_tbr_pallet",
        "Quantity Pallet Hilang / BER": "qty_ber_missing_pallet",
        "Note": "note",
      },
    };
  },
  created() {
    this.getberMissingPallets(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("berMissingPallet", {
      berMissingPallets: (state) => state.berMissingPallets, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("berMissingPallet", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    filteredberMissingPallets() {
      return this.berMissingPallets.filter((d) => {
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
    ...mapActions("berMissingPallet", ["getberMissingPallets", "getExportberMissingPallets","deleteberMissingPallet"]),
    columnValueList(val) {
      return this.berMissingPallets.map((d) => d[val]);
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
          this.deleteberMissingPallet(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportberMissingPallets(this.downloadRange).then((result) => {
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

.text-red {
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
