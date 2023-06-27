<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("claimPallet.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn v-if="$can('create claim pallet')" router :to="adds.route">{{ $t("claimPallet.add") }}</v-btn>
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
            :items="claimPallets.data"
            dense
          >
            <template v-slot:item.tinjau="{ item }">
              <router-link
                :to="{ name: 'claim-pallet.view', params: { id: item.id } }"
              >
                <v-btn color="info" small>Tinjau</v-btn>
              </router-link>
            </template>

            <template v-slot:item.status="{ item }">
              <p v-if="item.status == 0 || item.status == null">Draft</p>
              <p class="text-green" v-else-if="item.status == 1">Manager Approved</p>
              <p class="text-red" v-else-if="item.status == 2">Manager Rejected</p>
              <p class="text-green" v-else-if="item.status == 3">Distributor Approved</p>
              <p class="text-red" v-else-if="item.status == 4">Distributor Rejected</p>
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
                        v-if="item.status == 0 && $can('update claim pallet')"
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
                        <v-btn router :to="list.href+'/'+item.id" small text>
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
              <v-icon v-if="item.status == 0 || item.status == null && $can('delete claim pallet')" small @click="hapusData(item)"> mdi-delete </v-icon>
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
              worksheet="Sheet Claim Pallet"
              name="data-claim-pallet.xls"
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
  name: "ClaimPallet",
  components: {
    Breadcomp,
  },
  data() {
    return {
      dialogExport: false,
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("claimPallet.trxNumber"), width: "50%" },
        { value: "company_name", text: this.$t("claimPallet.company") },
        { value: "manager_name", text: this.$t("claimPallet.approverManager") },
        { value: "pic_distributor", text: this.$t("claimPallet.approverDistributor") },
        { value: "status", text: this.$t("claimPallet.status") },
        { value: "ber_pallet", text: this.$t("pallet.ber") },
        { value: "missing_pallet", text: this.$t("pallet.missing") },
        { value: "price", text: this.$t("claimPallet.price") },
        { value: "total_price", text: this.$t("claimPallet.totalPrice") },
        { value: "reason_manager", text: this.$t("claimPallet.reasonManager") },
        { value: "reason_distributor", text: this.$t("claimPallet.reasonDist") },
        { value: "tinjau", text: 'Tinjau' },
        { value: "actions", text: this.$t("table.actions") },
      ],
      search: "",
      adds: { route: "/claim-pallet/add" },
      edits: { route: "/claim-pallet/edit" },
      listEdit: [
        {
          text: "Approval Manager",
          icon: "mdi-pen",
          href: "/claim-pallet/approval-manager",
        },
        { text: "Approval Distributor", icon: "mdi-pen", href: "/claim-pallet/approval-distributor" },
      ],
      json_fields: {
        "CP Number": "trx_number",
        "Company": "company_name",
        "Manager": "manager_name",
        "PIC Company": "pic_distributor",
        "BER Pallet": "ber_pallet",
        "Missing Pallet": "missing_pallet",
        "Price": "price",
        "Total Price": "total_price",
        "Status": "status",
        "Reason Manager": "reason_manager",
        "Reason Company": "reason_distributor",
      },
    };
  },
  created() {
    this.getClaimPallets(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("claimPallet", {
      claimPallets: (state) => state.claimPallets, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("claimPallet", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("claimPallet", ["getClaimPallets", "getExportClaimPallets","deleteClaimPallet"]),
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
          this.deleteClaimPallet(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportClaimPallets(this.downloadRange);
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
