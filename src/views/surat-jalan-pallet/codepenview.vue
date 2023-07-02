<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("sjpStatus.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <!-- <v-btn router v-if="$can('create sjp')" :to="adds.route">{{ $t("palletTransfer.add") }}</v-btn> -->
            <!-- <v-btn router v-if="$can('create sjp status')" :to="adds.route">{{ $t("sjpStatus.add") }}</v-btn> -->
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
          <v-simple-table class="custom-data-table">
            <template v-slot:default>
              <tbody style="padding: 50px;">
                <tr v-for="item in sjpStatuss">
                  <td>{{ item.ber_pallet }}</td>
                  <td>{{ item.ber_pallet }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
              worksheet="Sheet SJP Status"
              name="data-sjp-status.xls"
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
  name: "SJPStatus",
  components: {
    Breadcomp,
  },
  data() {
    return {
      sortBy: 'nama',
      sortDesc: false,
      completeTrxNumber: false,
      totalDataDownload: 0,
      selected: [],
      dialogExport: false,
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("sjpStatus.trxNumber"), width: "200px"},
        { value: "sjp_number", text: this.$t("sjpStatus.sjpNumber"), width: "180px"},
        { value: "sender_name", text: this.$t("sjpStatus.sender"), width: "180px" },
        { value: "receiver_name", text: this.$t("sjpStatus.receiver"), width: "180px" },
        { value: "is_sendback", text: this.$t("sjpStatus.sendback"), width: "180px" },
        { value: "status", text: this.$t("sjpStatus.status"), width: "180px" },
        { value: "note", text: this.$t("sjpStatus.note"), width: "180px" },
        { value: "sending_driver_approval", text: this.$t("sjpStatus.sending_driver_approval"), width: "180px" },
        { value: "receiving_driver_approval", text: this.$t("sjpStatus.receiving_driver_approval"), width: "180px" },
        { value: "tinjau", text: 'Tinjau', width: "100px"},
        { value: "actions", text: this.$t("table.actions"), width: "80px" },
      ],
      filters: {
        trx_number: [],
        sjp_number: [],
        sender_name: [],
        receiver_name: [],
        is_sendback: [],
        status: [],
        note: [],
      },
      items: [],
      search: "",
      adds: { route: "/sjp-status/add" },
      edits: { route: "/sjp-status/edit" },
      listEdit: [
        {
          text: "Receive",
          icon: "mdi-call-received",
          href: "/sjp-status/receive",
        },
      ],
      json_fields: {
        "SJPS Number": "trx_number",
        "SJP Number": "sjp_number",
        "Departure": "departure_company",
        "Destination": "destination_company",
        "Transporter": "transporter_company",
        "Checker Sender": "sender_name",
        "Checker Receiver": "receiver_name",
        "Good Pallet": "good_pallet",
        "TBR Pallet": "tbr_pallet",
        "BER Pallet": "ber_pallet",
        "Missing Pallet": "missing_pallet",
        "Status": "status",
        "is_sendback": "is_sendback",
        "note": "note",
      },
    };
  },
  created() {
    this.getSjpStatuss();
  },
  watch: {
    errors(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);

      // Do whatever makes sense now
      if (newValue === 'success') {
        
      }
    },
  },
  computed: {
    ...mapState(['errors']),
    ...mapState("sjpStatus", {
      sjpStatuss: (state) => state.sjpStatuss, // MENGAMBIL STATE SJP STATUS
      exportData: (state) => state.exportData,
      loading: (state) => state.loading,
    }),
    FilteredSjpStatuss() {
      return this.sjpStatuss.filter((d) => {
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
    ...mapActions("sjpStatus", ["getSjpStatuss", "getExportDataSjpStatuss","deleteSjpStatus", "getDownloadImage"]),
    updateSortBy(value) {
      console.log('HAHAHA')
      this.sortBy = value;
    },
    updateSortDesc(value) {
      console.log('HAHAHA')
      this.sortDesc = value;
    },
    locationToImage(name) {
      console.log(name);
      window.location.href = name;
    },
    columnValueList(val) {
      return this.sjpStatuss.map((d) => d[val]);
    },
    editData(item) {
      // Logika untuk mengedit data
      console.log("Mengedit data:", item);
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
          this.deleteSjpStatus(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportDataSjpStatuss(this.downloadRange).then((result) => {
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
