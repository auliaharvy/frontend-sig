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
            <!-- <v-btn router v-if="$can('add sjp')" :to="adds.route">{{ $t("palletTransfer.add") }}</v-btn> -->
            <v-btn router v-if="$can('add sjp status')" :to="adds.route">{{ $t("palletTransfer.add") }}</v-btn>
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
            :items="sjpStatuss.data"
            dense
          >

            <template v-slot:item.is_sendback="{ item }">
              <p class="text-normal" v-if="item.is_sendback == 0">Send</p>
              <p class="text-normal" v-else-if="item.is_sendback == 1">Sendback</p>
            </template>

            <template v-slot:item.status="{ item }">
              <p class="text-normal" v-if="item.status == 0">Sending</p>
              <p class="text-green" v-else-if="item.status == 1">Received</p>
            </template>

            <template v-slot:item.tinjau="{ item }">
              <router-link
                :to="{ name: 'sjp-status.view', params: { id: item.id } }"
              >
                <v-btn color="info" small>Tinjau</v-btn>
              </router-link>
            </template>

            <template v-slot:item.actions="{ item }">
              <router-link
                :to="{ name: 'sjp-status.receive', params: { id: item.id } }"
                v-if="item.status_sjp == 1 && $can('update sjp status')"
              >
                <v-btn color="secondary" small>{{ $t("sjpStatus.receive") }}</v-btn>
              </router-link>
              <router-link
                :to="{ name: 'sjp-status.sendback', params: { id: item.id } }"
                v-if="item.status_sjp == 2 && item.is_sendback == 0 && $can('create sjp status') && item.status == 1"
              >
                <v-btn color="secondary" small>{{ $t("sjpStatus.sendbackSjp") }}</v-btn>
              </router-link>
              <!-- <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-if="item.status == 0 && $can('update sjp status')"
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
              <v-icon v-if="item.status === 0 && $can('delete sjp status')" small @click="hapusData(item)"> mdi-delete </v-icon> -->
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
      dialogExport: false,
      downloadRange: [],
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("sjpStatus.trxNumber"), width: "15%" },
        { value: "sjp_number", text: this.$t("sjpStatus.sjpNumber") },
        { value: "sender_name", text: this.$t("sjpStatus.sender") },
        { value: "receiver_name", text: this.$t("sjpStatus.receiver") },
        { value: "is_sendback", text: this.$t("sjpStatus.sendback") },
        { value: "status", text: this.$t("sjpStatus.status") },
        { value: "note", text: this.$t("sjpStatus.note") },
        { value: "tinjau", text: 'Tinjau'},
        { value: "actions", text: this.$t("table.actions") },
      ],
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
      sjpStatuss: (state) => state.sjpStatuss, // MENGAMBIL STATE SJP STATUSS
      exportData: (state) => state.exportData,
      loading: (state) => state.loading,
    }),
  },
  methods: {
    ...mapActions("sjpStatus", ["getSjpStatuss", "getExportDataSjpStatuss","deleteSjpStatus"]),
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
      this.getExportDataSjpStatuss(this.downloadRange);
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
