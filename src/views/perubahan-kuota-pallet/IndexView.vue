<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("changeQuota.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn v-if="$can('create change quota')" router :to="adds.route">{{ $t("changeQuota.add") }}</v-btn>
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
            :items="filteredChangeQuotas"
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
            <template v-slot:item.type="{ item }">
              <p class="text-green" v-if="item.type == 0 || item.type == null">Penambahan</p>
              <p class="text-red" v-else-if="item.type == 1">Pengurangan</p>
            </template>
            <template v-slot:item.status="{ item }">
              <p v-if="item.status == 0 || item.status == null">Draft</p>
              <p class="text-green" v-else-if="item.status == 1">Approved</p>
              <p class="text-red" v-else-if="item.status == 2">Rejected</p>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-menu v-if="item.id_new_pallet == 'belum ada'">
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-if="item.status === 0 || item.status === null && $can('update change quota')"
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
                  <v-list-item v-if="item.id_new_pallet == 'belum ada' && item.status === 0 || item.status === null">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-btn router :to="'/change-quota/approval/'+item.id" small text>
                          <v-icon left>
                            mdi-draw-pen
                          </v-icon>
                          Approval
                        </v-btn></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="item.id_new_pallet == 'belum ada' && item.type != 1 && item.status === 1">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-btn router :to="'/new-pallet/add/'+item.id" small text>
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          Add New Pallet
                        </v-btn></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-icon v-if="item.status === 0 || item.status === null && $can('delete change quota')" small @click="hapusData(item)"> mdi-delete </v-icon>
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
              worksheet="Sheet Change Quota"
              name="data-change-quota.xls"
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
  name: "ChangeQuota",
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
        { value: "trx_number", text: this.$t("changeQuota.trxNumber"), width: "200px" },
        { value: "company_name", text: this.$t("changeQuota.compRequester"), width: "180px" },
        { value: "requester_name", text: this.$t("changeQuota.requester"), width: "180px" },
        { value: "quantity", text: this.$t("changeQuota.requestedQuantity"), width: "100px" },
        { value: "approved_quantity", text: this.$t("changeQuota.approvedQuantity"), width: "100px" },
        { value: "type", text: this.$t("changeQuota.type"), width: "150px" },
        { value: "status", text: this.$t("changeQuota.status"), width: "150px" },
        { value: "reason", text: this.$t("changeQuota.reason"), width: "180px" },
        { value: "note", text: this.$t("changeQuota.note"), width: "180px" },
        { value: "actions", text: this.$t("table.actions"), width: "80px" },
      ],
      filters: {
        trx_number: [],
        company_name: [],
        requester_name: [],
        quantity: [],
        approved_quantity: [],
        type: [],
        status: [],
        reason: [],
        note: [],
        // actions: [],
      },
      search: "",
      adds: { route: "/change-quota/add" },
      edits: { route: "/change-quota/edit" },
      json_fields: {
        "CQ Number": "trx_number",
        "Company": "company_name",
        "Requester": "requester_name",
        "Approver": "approver_name",
        "Quantity": "quantity",
        "Approved Quantity": "approved_quantity",
        "Receiver": "receiver_name",
        "Status": "status",
        "Note": "note",
        "Reason": "reason",
      },
    };
  },
  created() {
    this.getChangeQuotas(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("changeQuota", {
      changeQuotas: (state) => state.changeQuotas, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("changeQuota", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    filteredChangeQuotas() {
      return this.changeQuotas.filter((d) => {
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
    ...mapActions("changeQuota", ["getChangeQuotas", "getExportChangeQuotas","deleteChangeQuota"]),
    columnValueList(val) {
      return this.changeQuotas.map((d) => d[val]);
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
        if (result.value) { this.deleteChangeQuota(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportChangeQuotas(this.downloadRange).then((result) => {
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
