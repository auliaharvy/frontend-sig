<template>
    <v-container>
      <v-spacer></v-spacer>
      <v-col md-12>
        <v-card>
          <v-card-title> Semua Transaksi </v-card-title>
          <v-divider></v-divider>
          <v-card>
            <v-card-title>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Date Range"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dates"
                  no-title
                  @change="queryData()"
                  range
                ></v-date-picker>
              </v-menu>
              <v-icon v-if="$can('update all transaction')" small class="mr-2" @click="editData(item)">
                mdi-pencil
              </v-icon>
              <v-icon v-if="$can('delete all transaction')" small @click="hapusData(item)"> mdi-delete </v-icon>
              <v-btn>{{ $t("manajemenpengguna.unduh") }}</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-icon="mdi-search"
                :label="$t('manajemenpengguna.cari')"
                single-line
                hide-details
              ></v-text-field>
              <v-btn>Query</v-btn>
            </v-card-title>
            <v-data-table
              class="custom-table"
              v-model="selected"
              :loading="loading"
              :headers="headers"
              :search="search"
              :items="filteredAllTransactions"
              elevation="2"
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
  name: "AllTransaction",
  components: {
    Breadcomp,
  },
  data() {
    return {
      selected: [],
      menu1: false,
      dates: [ ], 
      headers: [
        { value: "log_number", text: this.$t("allTransaction.log"), width: "200px" },
        { value: "trx_number", text: this.$t("allTransaction.trxNumber"), width: "180px" },
        { value: "transaction", text: this.$t("allTransaction.transaction"), width: "180px" },
        { value: "status", text: this.$t("allTransaction.status"), width: "180px" },
        { value: "no_do", text: this.$t("allTransaction.noDo"), width: "180px" },
        { value: "no_do_new", text: this.$t("allTransaction.noDoNew"), width: "180px" },
        { value: "sender_reporter", text: this.$t("allTransaction.sender"), width: "180px" },
        { value: "receiver_approver", text: this.$t("allTransaction.receiver"), width: "180px" },
        { value: "company_departure", text: this.$t("allTransaction.departure"), width: "180px" },
        { value: "company_destination", text: this.$t("allTransaction.destination"), width: "180px" },
        { value: "company_new_destination", text: this.$t("allTransaction.destinationNew"), width: "180px" },
        { value: "company_transporter", text: this.$t("allTransaction.transporter"), width: "180px" },
        { value: "company", text: this.$t("allTransaction.company"), width: "180px" },
        { value: "truck_number", text: this.$t("allTransaction.truck"), width: "180px" },
        { value: "truck_number_new", text: this.$t("allTransaction.truckNew"), width: "180px" },
        { value: "driver_name", text: this.$t("allTransaction.driver"), width: "180px" },
        { value: "driver_name_new", text: this.$t("allTransaction.driverNew"), width: "180px" },
        { value: "good_pallet", text: this.$t("pallet.good"), width: "100px" },
        { value: "tbr_pallet", text: this.$t("pallet.tbr"), width: "100px" },
        { value: "ber_pallet", text: this.$t("pallet.ber"), width: "100px" },
        { value: "missing_pallet", text: this.$t("pallet.missing"), width: "100px" },
        { value: "price", text: this.$t("allTransaction.price"), width: "150px" },
        { value: "reason", text: this.$t("allTransaction.reason"), width: "180px" },
        { value: "note", text: this.$t("allTransaction.note"), width: "180px" },
      ],
      filters: {
        log_number: [],
        trx_number: [],
        transaction: [],
        status: [],
        no_do: [],
        no_do_new: [],
        sender_reporter: [],
        receiver_approver: [],
        company_departure: [],
        company_destination: [],
        company_new_destination: [],
        company_transporter: [],
        company: [],
        truck_number: [],
        truck_number_new: [],
        driver_name: [],
        driver_name_new: [],
        good_pallet: [],
        tbr_pallet: [],
        ber_pallet: [],
        missing_pallet: [],
        price: [],
        reason: [],
        note: [],
      },
      search: "",
    };
  },
  created() {
    this.setDate().then((result) => {
        this.getAllTransactions(this.dates)
      });
  },
  watch: {
    dates() {
      this.dateRange = this.dates
      this.getAllTransactions(this.dates)
    }    
  },
  computed: {
    ...mapState("allTransaction", {
      allTransactions: (state) => state.allTransactions,
      dateRange: (state) => state.dateRange,
      loading: (state) => state.loading,
    }),
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
    aMonth(){
      this.dateRange = this.dates
    },
    aWeek(){
      this.dateRange = this.dates
    },
    filteredAllTransactions() {
      return this.allTransactions.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
  },
  methods: {
    ...mapActions("allTransaction", ["getAllTransactions"]),
    columnValueList(val) {
      return this.allTransactions.map((d) => d[val]);
    },
    async setDate() {
      var week = new Date();
      week.setDate(week.getDate() - 7);
      var fromDate = week.toISOString().slice(0,10)
      var today = new Date ().toISOString().slice(0,10)
      this.dateRange = [fromDate, today ]
      this.dates = [fromDate, today ]
    },
    async queryData() {
      this.dateRange = this.dates
      this.getAllTransactions(this.dates)
    },
  },
};
</script>
<style scoped>
.warna-font {
  color: white;
}
.custom-table table {
  border-collapse: separate;
  border-spacing: 0px;
  width: 100%;
}

.custom-table th,
.custom-table td {
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 8px;
  text-align: left;
}
</style>
