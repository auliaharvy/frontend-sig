<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("sewaPallet.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn v-if="$can('create sewa pallet')" router :to="adds.route">{{ $t("sewaPallet.add") }}</v-btn>
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
            :items="filteredSewaPallets"
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

            <template v-slot:item.photo="{ item }">
              <v-btn v-if="item.photo" @click="locationToImage($API_URL + item.photo)" color="info" small>
                <v-icon small class="mr-2">mdi-image</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.tinjau="{ item }">
              <router-link
                :to="{ name: 'sewa-pallet.view', params: { id: item.id } }"
              >
                <v-btn color="info" small><v-icon small class="mr-2">mdi-magnify</v-icon></v-btn>
              </router-link>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn v-if="item.status == 0 && $can('delete sewa pallet')" router :to="'/sewa-pallet/approval-manager/'+item.id" small text>
                <v-icon left>
                  mdi-pen
                </v-icon>
                Approval SIG
              </v-btn>
              <br>
              <!-- <v-btn v-if="item.status == 1 && $can('update sewa pallet') && roleUser.company_id == item.id_company_distributor" router :to="'/sewa-pallet/approval-distributor/'+item.id" small text>
                <v-icon left>
                  mdi-pen
                </v-icon>
                Approval Distributor
              </v-btn> -->
              <!-- <br> -->
              <v-btn v-if="item.status == 0 && $can('delete sewa pallet')" @click="hapusData(item)" small text>
                <v-icon left>
                  mdi-delete
                </v-icon>
                Delete
              </v-btn>
              <!-- <v-icon v-if="item.status == 0 || item.status == null && $can('delete sewa pallet')" small @click="hapusData(item)"> mdi-delete </v-icon> -->
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
              worksheet="Sheet Biaya Sewa Pallet"
              name="data-biaya-sewa-pallet.xls"
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
  name: "SewaPallet",
  components: {
    Breadcomp,
  },
  data() {
    return {
      roleUser: {},
      totalDataDownload: 0,
      dialogExport: false,
      downloadRange: [],
      selected: [],
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("claimPallet.trxNumber"), width: "200px" },
        { value: "company_name", text: this.$t("claimPallet.company"), width: "180px" },
        { value: "manager_name", text: this.$t("claimPallet.approverManager"), width: "180px" },
        { value: "pic_distributor", text: this.$t("claimPallet.approverDistributor"), width: "180px" },
        { value: "status", text: this.$t("claimPallet.status"), width: "180px" },
        { value: "good_pallet", text: this.$t("pallet.good"), width: "100px" },
        { value: "tbr_pallet", text: this.$t("pallet.tbr"), width: "100px" },
        { value: "ber_pallet", text: this.$t("pallet.ber"), width: "100px" },
        { value: "missing_pallet", text: this.$t("pallet.missing"), width: "100px" },
        { value: "price", text: this.$t("claimPallet.price"), width: "150px" },
        { value: "total_price", text: this.$t("claimPallet.totalPrice"), width: "150px" },
        { value: "reason_manager", text: this.$t("claimPallet.reasonManager"), width: "180px" },
        { value: "reason_distributor", text: this.$t("claimPallet.reasonDist"), width: "180px" },
        { value: "photo", text: this.$t("claimPallet.photo"), width: "100" },
        { value: "tinjau", text: this.$t("claimPallet.reasonDist"), width: "100" },
        { value: "actions", text: this.$t("table.actions"), width: "80px" },
      ],
      filters: {
        trx_number: [],
        company_name: [],
        manager_name: [],
        pic_distributor: [],
        status: [],
        good_pallet: [],
        tbr_pallet: [],
        ber_pallet: [],
        missing_pallet: [],
        price: [],
        total_price: [],
        reason_manager: [],
        reason_distributor: [],
        tinjau: [],
        // actions: [],
      },
      search: "",
      adds: { route: "/sewa-pallet/add" },
      edits: { route: "/sewa-pallet/edit" },
      listEdit: [
        {
          text: "Approval Manager",
          icon: "mdi-pen",
          href: "/sewa-pallet/approval-manager",
        },
        { text: "Approval Distributor", icon: "mdi-pen", href: "/sewa-pallet/approval-distributor" },
      ],
      json_fields: {
        "Transaction Number": "trx_number",
        "Company": "company_name",
        "Manager": "manager_name",
        "PIC Company": "pic_distributor",
        "Good Pallet": "good_pallet",
        "TBR Pallet": "tbr_pallet",
        "BER Pallet": "ber_pallet",
        "Missing Pallet": "missing_pallet",
        "Price": "price",
        "Total Price": "total_price",
        "Reason Manager": "reason_manager",
        "Reason Company": "reason_distributor",
        "Status": "status",
      },
    };
  },
  created() {
    this.getSewaPallets().then((result) => {
      console.log(this.sewaPallets);
    }); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
    this.getUserRole()
  },
  computed: {
    ...mapState("sewaPallet", {
      sewaPallets: (state) => state.sewaPallets, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sewaPallet", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    filteredSewaPallets() {
      return this.sewaPallets.filter((d) => {
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
    ...mapActions("sewaPallet", ["getSewaPallets", "getExportSewaPallets","deleteSewaPallet"]),
    locationToImage(name) {
      console.log(name);
      // window.location.href = name;
      window.open(name, '_blank');
    },
    formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    columnValueList(val) {
      return this.sewaPallets.map((d) => d[val]);
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
          this.deleteSewaPallet(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportSewaPallets(this.downloadRange).then((result) => {
        this.totalDataDownload = result.data.length
      });
    },
    getUserRole() {
      this.roleUser = JSON.parse(localStorage.getItem("role"));
      console.log(this.roleUser)
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
