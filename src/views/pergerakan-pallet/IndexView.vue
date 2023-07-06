<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("palletMovement.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <export-excel
              :data="palletMovements"
              :fields="json_fields"
              worksheet="Sheet Pallet Movement"
              name="data-pallet-movement.xls"
            >
              <v-btn style="margin-left: 0px">{{
                $t("manajemenpengguna.unduh")
              }}</v-btn>
            </export-excel>
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
            :items="filteredPalletMovements"
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
            <template v-slot:item.distribution="{ item }">
              <p v-if="item.distribution == 0 || item.distribution == null">Send</p>
              <p v-if="item.distribution == 1">Send Back</p>
            </template>
            <template v-slot:item.status="{ item }">
              <p v-if="item.status == 0 || item.status == null">Sending</p>
              <p v-if="item.status == 1">Received</p>
            </template>
            <template v-slot:item.departure_time="{ item }">
              <p>{{ item.departure_time | moment('DD-MM-YYYY') }}</p>
            </template>
            <template v-slot:item.eta="{ item }">
              <p>{{ item.eta | moment('DD-MM-YYYY') }}</p>
            </template>
            <template v-slot:item.late="{ item }">
              <v-chip
                class="ma-2"
                color="blue"
                v-if="diffDate(item.eta) <= 0"
              >
                0
              </v-chip>
              <v-chip
                class="ma-2"
                color="primary"
                v-if="diffDate(item.eta) > 0"
              >
                {{ diffDate(item.eta) }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom >
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
                        v-if="item.status == 0 && $can('update pallet movement')"
                      >
                        <v-icon small class="mr-2">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit data</span>
                  </v-tooltip>
                </template>
              </v-menu>
              <v-icon v-if="item.status === 0 && $can('delete pallet movement')" small @click="hapusData(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-col>
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
  name: "PalletMovement",
  components: {
    Breadcomp,
  },
  data() {
    return {
      selectedItem: 1,
      selected: [],
      headers: [
        { value: "trx_number", text: this.$t("palletMovement.trxNumber"), width: "200px" },
        { value: "distribution", text: this.$t("palletMovement.send"), width: "100px" },
        { value: "status", text: this.$t("palletMovement.status"), width: "100px" },
        { value: "departure", text: this.$t("palletMovement.departure"), width: "180px" },
        { value: "destination", text: this.$t("palletMovement.destination"), width: "180px" },
        { value: "transporter", text: this.$t("palletMovement.transporter"), width: "180px" },
        { value: "truck", text: this.$t("palletMovement.truck"), width: "180px" },
        { value: "good", text: this.$t("pallet.good"), width: "100px" },
        { value: "tbr", text: this.$t("pallet.tbr"), width: "100px" },
        { value: "ber", text: this.$t("pallet.ber"), width: "100px" },
        { value: "missing", text: this.$t("pallet.missing"), width: "100px" },
        { value: "departure_time", text: this.$t("palletMovement.departTime"), width: "150px" },
        { value: "eta", text: this.$t("palletMovement.eta"), width: "150px" },
        { value: "late", text: this.$t("palletMovement.late"), width: "100px" },
      ],
      filters: {
        trx_number: [],
        distribution: [],
        status: [],
        departure: [],
        destination: [],
        transporter: [],
        truck: [],
        good: [],
        tbr: [],
        ber: [],
        missing: [],
        departure_time: [],
        eta: [],
        late: [],
      },
      json_fields: {
        "Transaction Number": "trx_number",
        "Send / Sendback": {
            field: 'distribution',
            callback: (value) => {
              if(value == 0) {
              return `Send`
            } else {
              return `Send Back`
            }
          }
        },
        'Status' : {
            field: 'status',
            callback: (value) => {
              if(value == 0) {
              return `Sending`
            } else {
              return `Received`
            }
          }
        },
        "Departure": "departure",
        "Destination": "destination",
        "Transporter": "transporter",
        "Truck": "truck",
        "Good Pallet": "good",
        "TBR Pallet": "tbr",
        "BER Pallet": "ber",
        "Missing Pallet": "missing",
        "Departure Time": "departure_time",
        "ETA": "eta",
        "Late (day)": {
            field: 'eta',
            callback: (value) => {
              return this.diffDate(value)
          }
        },
      },
      search: "",
      adds: { route: "/pallet-movement/add" },
      edits: { route: "/pallet-movement/edit" },
    };
  },
  created() {
    this.getPalletMovements(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("palletMovement", {
      palletMovements: (state) => state.palletMovements, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("palletMovement", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    filteredPalletMovements() {
      return this.palletMovements.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
  },
  methods: {
    ...mapActions("palletMovement", ["getPalletMovements"]),
    columnValueList(val) {
      return this.palletMovements.map((d) => d[val]);
    },
    diffDate(eta) {
      const todayYear = this.$moment(new Date()).format("YYYY");
      const todayMonth = this.$moment(new Date()).format("MM");
      const todayDay = this.$moment(new Date()).format("DD");
      const today = this.$moment([todayYear, todayMonth, todayDay]);
      const etaYear = this.$moment(eta).format("YYYY");
      const etaMonth = this.$moment(eta).format("MM");
      const etaDay = this.$moment(eta).format("DD");
      const formattedEta = this.$moment([etaYear, etaMonth, etaDay]);
      return today.diff(formattedEta, 'days');
    },
    beforeDownload(eta) {
      const todayYear = this.$moment(new Date()).format("YYYY");
      const todayMonth = this.$moment(new Date()).format("MM");
      const todayDay = this.$moment(new Date()).format("DD");
      const today = this.$moment([todayYear, todayMonth, todayDay]);
      const etaYear = this.$moment(eta).format("YYYY");
      const etaMonth = this.$moment(eta).format("MM");
      const etaDay = this.$moment(eta).format("DD");
      const formattedEta = this.$moment([etaYear, etaMonth, etaDay]);
      return today.diff(formattedEta, 'days');
    }
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
