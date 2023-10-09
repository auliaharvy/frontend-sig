<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("palletTransfer.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn v-if="$can('create pallet transfer')" router :to="adds.route">{{ $t("palletTransfer.add") }}</v-btn>
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
            :search="search"
            :headers="headers"
            :items="filteredPalletTransfers"
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
            <template v-slot:item.status="{ item }">
              <p v-if="item.status == 0">Draft</p>
              <p class="text-green" v-else-if="item.status == 1">Approved</p>
              <p class="text-blue" v-else-if="item.status == 2">Sending</p>
              <p class="text-green" v-else-if="item.status == 3">Received</p>
              <p class="text-red" v-else-if="item.status == 4">Rejected</p>
            </template>

            <template v-slot:item.process="{ item }">
              <template v-if="item.status == 0 && $can('approve pallet transfer')">
                <router-link
                  :to="{ name: 'pallet-transfer.aprroval', params: { id: item.id } }"
                >
                  <v-btn color="secondary" small>{{ $t("palletTransfer.approval") }}</v-btn>
                </router-link>
              </template>
              <template v-else-if="item.status == 1 && item.id_company_departure == roleUser.company_id">
                <router-link
                  :to="{ name: 'pallet-transfer.send', params: { id: item.id } }"
                >
                  <v-btn color="secondary" small>{{ $t("palletTransfer.send") }}</v-btn>
                </router-link>
              </template>
              <template v-else-if="item.status == 2 && item.id_company_destination == roleUser.company_id">
                <router-link
                  :to="{ name: 'pallet-transfer.receive', params: { id: item.id } }"
                >
                  <v-btn color="secondary" small>{{ $t("palletTransfer.receive") }}</v-btn>
                </router-link>
              </template>
            </template>

            <!-- <template v-slot:item.actions="{ item }">
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-if="item.status == 0 && $can('update pallet transfer')"
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
                        ><v-btn router :to="list.href+'/'+item.id" small text>
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
              <v-icon v-if="item.status === 0 && $can('delete pallet transfer')" small @click="hapusData(item)"> mdi-delete </v-icon>
            </template> -->
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
              worksheet="Sheet Pallet Transfers"
              name="data-pallet-transfers.xls"
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
  name: "PalletTransfer",
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
        { value: "trx_code", text: this.$t("palletTransfer.trxNumber"), width: "200px" },
        { value: "departure_code", text: "Kode Keberangkatan", width: "120px" },
        { value: "departure_company", text: this.$t("palletTransfer.departure"), width: "180px" },
        { value: "destination_code", text: "Kode Tujuan", width: "120px" },
        { value: "destination_company", text: this.$t("palletTransfer.destination"), width: "180px" },
        { value: "transporter_code", text: "Kode Ekspeditur", width: "120px" },
        { value: "transporter_company", text: this.$t("palletTransfer.transporter"), width: "180px" },
        { value: "license_plate", text: this.$t("palletTransfer.truck"), width: "180px" },
        { value: "driver_name", text: this.$t("palletTransfer.driver"), width: "180px" },
        { value: "good_pallet", text: this.$t("pallet.good"), width: "100px" },
        { value: "tbr_pallet", text: this.$t("pallet.tbr"), width: "100px" },
        // { value: "ber_pallet", text: this.$t("pallet.ber"), width: "100px" },
        // { value: "missing_pallet", text: this.$t("pallet.missing"), width: "100px" },
        { value: "status", text: this.$t("palletTransfer.status"), width: "150px" },
        { value: "reason", text: this.$t("palletTransfer.reason"), width: "150px" },
        { value: "note", text: this.$t("palletTransfer.note"), width: "180px" },
        { value: "process", text: this.$t("palletTransfer.process"), width: "180px" },
        { value: "actions", text: this.$t("table.actions"), width: "80px" },
      ],
			filters: {
        trx_code: [],
        departure_company: [],
        destination_company: [],
        transporter_company: [],
        license_plate: [],
        driver_name: [],
        good_pallet: [],
        tbr_pallet: [],
        ber_pallet: [],
        missing_pallet: [],
        status: [],
        reason: [],
        note: [],
        process: [],
        // actions: [],
			},
      items: [],
      search: "",
      adds: { route: "/pallet-transfer/add" },
      edits: { route: "/pallet-transfer/edit" },
      listEdit: [
        {
          text: "Change Destination",
          icon: "mdi-warehouse",
          href: "/pallet-transfer/change-destination",
        },
        { text: "Change Truck", icon: "mdi-truck", href: "/pallet-transfers/change-truck" },
      ],
      json_fields: {
        "TP Number": "trx_code",
        "Departure": "departure_company",
        "Destination": "destination_company",
        "Transporter": "transporter_company",
        "Sender": "sender_name",
        "Receiver": "receiver_name",
        "Truck": "license_plate",
        "Driver": "driver_name",
        "Good Pallet": "good_pallet",
        "TBR Pallet": "tbr_pallet",
        "BER Pallet": "ber_pallet",
        "Missing Pallet": "missing_pallet",
        "Status": "status",
        "Note": "note",
        "Reason": "reason",
      },
    };
  },
  created() {
    this.getPalletTransfers();
    this.getUserRole();
  },
  computed: {
    ...mapState("palletTransfer", {
      palletTransfers: (state) => state.palletTransfers, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      exportData: (state) => state.exportData,
    }),
    ...mapState("palletTransfer", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    filteredPalletTransfers() {
      return this.palletTransfers.filter((d) => {
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
    ...mapActions("palletTransfer", ["getPalletTransfers", "getExportPalletTransfers","deletePalletTransfer"]),
    columnValueList(val) {
      return this.palletTransfers.map((d) => d[val]);
    },
    editData(item) {
      // Logika untuk mengedit data
      console.log("Mengedit data:", item);
    },
    getPallet( tipePallet, data) {
      let found = data.find(x => x.kondisi_pallet === tipePallet).quantity;
      console.log(found);
      return found;
    },
    sumTotal(data) {
      return data.reduce((acc, item) => acc + item.quantity, 0);
    },
    getUserRole() {
      this.roleUser = JSON.parse(localStorage.getItem("role"));
      console.log(this.roleUser)
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
          this.deletePalletTransfer(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportPalletTransfers(this.downloadRange).then((result) => {
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
