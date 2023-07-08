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
            v-model="selected"
            :loading="loading"
            :headers="headers"
            :search="search"
            :items="filteredClaimPallets"
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
            <template v-slot:item.photo="{ item }">
              <v-btn v-if="item.photo != 0 || item.photo != '0'" @click="locationToImage($API_URL + item.photo)" color="info" small>
                <v-icon small class="mr-2">mdi-image</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.tinjau="{ item }">
              <router-link
                :to="{ name: 'claim-pallet.view', params: { id: item.id } }"
              >
                <v-btn color="info" small><v-icon small class="mr-2">mdi-magnify</v-icon></v-btn>
              </router-link>
            </template>
            <template v-slot:item.price="{ item }">
              <p>Rp {{ formatPrice(item.price) }}</p>
            </template>
            <template v-slot:item.total_price="{ item }">
              <p>Rp {{ formatPrice(item.total_price) }}</p>
            </template>
            <template v-slot:item.status="{ item }">
              <p v-if="item.status == 0 || item.status == null">Draft</p>
              <p class="text-green" v-else-if="item.status == 1">SIG Approved</p>
              <p class="text-red" v-else-if="item.status == 2">SIG Rejected</p>
              <p class="text-green" v-else-if="item.status == 3">Distributor Approved</p>
              <p class="text-red" v-else-if="item.status == 4">Distributor Rejected</p>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn v-if="item.status == 0 && $can('delete claim pallet') " router :to="'/claim-pallet/approval-manager/'+item.id" small text>
                <v-icon left>
                  mdi-pen
                </v-icon>
                Approval SIG
              </v-btn>
              <v-btn v-if="item.status == 0 && $can('update claim pallet') && roleUser.company_id != item.id_company_distributor" router :to="'/claim-pallet/edit/'+item.id" small text>
                <v-icon left>
                  mdi-pen
                </v-icon>
                Edit Data
              </v-btn>
              <v-btn v-if="item.status == 1 && $can('update claim pallet') && roleUser.company_id == item.id_company_distributor" router :to="'/claim-pallet/approval-distributor/'+item.id" small text>
                <v-icon left>
                  mdi-pen
                </v-icon>
                Approval Distributor
              </v-btn>
              <v-btn v-if="item.status == 0 && $can('delete claim pallet')" @click="hapusData(item)" small text>
                <v-icon left>
                  mdi-delete
                </v-icon>
                Delete
              </v-btn>
              <!-- <v-icon v-if="item.status == 0 || item.status == null && $can('delete claim pallet')" small @click="hapusData(item)"> mdi-delete </v-icon> -->
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
      roleUser: {},
      totalDataDownload: 0,
      dialogExport: false,
      selected: [],
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("claimPallet.trxNumber"), width: "200px" },
        { value: "company_name", text: this.$t("claimPallet.company"), width: "180px" },
        { value: "manager_name", text: this.$t("claimPallet.approverManager"), width: "180px" },
        { value: "pic_distributor", text: this.$t("claimPallet.approverDistributor"), width: "180px" },
        { value: "status", text: this.$t("claimPallet.status"), width: "180px" },
        { value: "ber_pallet", text: this.$t("pallet.ber"), width: "100px" },
        { value: "missing_pallet", text: this.$t("pallet.missing"), width: "100px" },
        { value: "price", text: this.$t("claimPallet.price"), width: "150px" },
        { value: "total_price", text: this.$t("claimPallet.totalPrice"), width: "150px" },
        { value: "reason_manager", text: this.$t("claimPallet.reasonManager"), width: "180px" },
        { value: "reason_distributor", text: this.$t("claimPallet.reasonDist"), width: "180px" },
        { value: "photo", text: this.$t("claimPallet.photo"), width: "100px" },
        { value: "tinjau", text: this.$t("claimPallet.show"), width: "100px" },
        { value: "actions", text: this.$t("table.actions"), width: "180px" },
      ],
      filters: {
        trx_number: [],
        company_name: [],
        manager_name: [],
        pic_distributor: [],
        status: [],
        ber_pallet: [],
        missing_pallet: [],
        price: [],
        total_price: [],
        reason_manager: [],
        reason_distributor: [],
        // tinjau: [],
        // actions: [],
      },
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
    this.getRoleSet(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["roleSet"]),
    ...mapState("claimPallet", {
      claimPallets: (state) => state.claimPallets, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("claimPallet", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    filteredClaimPallets() {
      return this.claimPallets.filter((d) => {
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
    ...mapActions("claimPallet", ["getClaimPallets", "getExportClaimPallets","deleteClaimPallet"]),
    locationToImage(name) {
      console.log(name)
      window.open(name, '_blank');
      // window.location.href = name;
    },
    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    columnValueList(val) {
      return this.claimPallets.map((d) => d[val]);
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
          this.deleteClaimPallet(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportClaimPallets(this.downloadRange).then((result) => {
        this.totalDataDownload = result.data.length
      });
    },
    getRoleSet() {
      this.roleUser = JSON.parse(localStorage.getItem("role"));
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
