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
            <v-btn router :to="adds.route">{{ $t("transporterAdjusment.add") }}</v-btn>
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
            :items="transporterAdjusments.data"
            dense
          >
            <template v-slot:item.is_from_pool="{ item }">
              <p class="text-normal" v-if="item.is_from_pool == 0 || item.is_from_pool == null">{{ $t("transporterAdjusment.isNotPool") }}</p>
              <p class="text-normal" v-if="item.is_from_pool == 1">{{ $t("transporterAdjusment.isPool") }}</p>
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
              worksheet="Sheet Transporter Adjusment"
              name="data-transporter-adjusment.xls"
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
  name: "TransporterAdjusment",
  components: {
    Breadcomp,
  },
  data() {
    return {
      dialogExport: false,
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("transporterAdjusment.trxNumber") },
        { value: "transporter_name", text: this.$t("transporterAdjusment.transporter") },
        { value: "company_name", text: this.$t("transporterAdjusment.company") },
        { value: "reporter_name", text: this.$t("transporterAdjusment.reporter") },
        { value: "is_from_pool", text: this.$t("transporterAdjusment.status") },
        { value: "good_pallet", text: this.$t("pallet.good") },
        { value: "tbr_pallet", text: this.$t("pallet.tbr") },
      ],
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
  },
  methods: {
    ...mapActions("transporterAdjusment", ["getTransporterAdjusments", "getExportTransporterAdjusments", "deleteTransporterAdjusment"]),
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
      this.getExportTransporterAdjusments(this.downloadRange);
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
