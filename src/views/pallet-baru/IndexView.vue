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
            <!-- <v-btn router :to="adds.route">{{ $t("newPallet.add") }}</v-btn> -->
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
            :items="newPallets.data"
            dense
          >
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
                  <v-list-item v-if="item.qty_ready_pallet < item.qty_request_pallet">
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
              <v-icon v-if="item.status === 0" small @click="hapusData(item)"> mdi-delete </v-icon>
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
      dialogExport: false,
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("newPallet.trxNumber") },
        { value: "no_change_quota", text: this.$t("changeQuota.trxNumber") },
        { value: "company_requester", text: this.$t("newPallet.compRequester") },
        { value: "company_workshop", text: this.$t("newPallet.compSupplier") },
        { value: "qty_request_pallet", text: this.$t("newPallet.palletAdd") },
        { value: "qty_ready_pallet", text: this.$t("newPallet.palletRealisation") },
        { value: "status", text: this.$t("newPallet.status") },
        { value: "actions", text: this.$t("table.actions") },
      ],
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
  },
  methods: {
    ...mapActions("newPallet", ["getNewPallets", "getExportNewPallets","deleteNewPallet"]),
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
      this.getExportNewPallets(this.downloadRange);
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
