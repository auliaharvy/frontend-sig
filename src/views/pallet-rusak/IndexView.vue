<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("damagedPallet.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn v-if="$can('create damaged pallet')" router :to="adds.route">{{ $t("damagedPallet.add") }}</v-btn>
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
            :items="damagedPallets.data"
            dense
          >
            <!-- <template v-slot:item.actions="{ item }">
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-if="item.status == 0 || item.status == null && $can('update damaged pallet')"
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
              <v-icon v-if="item.status === 0 || item.status === null && $can('delete damaged pallet')" small @click="hapusData(item)"> mdi-delete </v-icon>
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
        </v-card-text>
        <v-card-actions>
          <export-excel
              :data="exportData.data"
              :fields="json_fields"
              worksheet="Sheet Damaged Pallet"
              name="data-damaged-pallet.xls"
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
  name: "DamagedPallet",
  components: {
    Breadcomp,
  },
  data() {
    return {
      dialogExport: false,
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("damagedPallet.trxNumber") },
        { value: "company_name", text: this.$t("company.compRequester") },
        { value: "reporter_name", text: this.$t("reporter.requester") },
        { value: "qty_tbr_pallet", text: this.$t("pallet.tbr") },
        { value: "note", text: this.$t("damagedPallet.note") },
      ],
      search: "",
      adds: { route: "/damaged-pallet/add" },
      edits: { route: "/damaged-pallet/edit" },
      json_fields: {
        "Transaction Number": "trx_number",
        "Company": "company_name",
        "Reporter": "reporter_name",
        "Quantity TBR Pallet": "qty_tbr_pallet",
        "Note": "note",
      },
    };
  },
  created() {
    this.getDamagedPallets(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("damagedPallet", {
      damagedPallets: (state) => state.damagedPallets, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
      exportData: (state) => state.exportData, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("damagedPallet", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("damagedPallet", ["getDamagedPallets", "getExportDamagedPallets","deleteDamagedPallet"]),
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
          this.deleteDamagedPallet(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportDamagedPallets(this.downloadRange);
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
