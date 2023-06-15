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
              :loading="loading"
              :headers="headers"
              :search="search"
              :items="allTransactions.data"
              elevation="2"
              border
            >
            </v-data-table>
          </v-card>
        </v-card>
      </v-col>
    </v-container>
</template>

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
      menu1: false,
      dates: [ ], 
      headers: [
        { value: "log_number", text: this.$t("allTransaction.log") },
        { value: "trx_number", text: this.$t("allTransaction.trxNumber") },
        { value: "transaction", text: this.$t("allTransaction.transaction") },
        { value: "status", text: this.$t("allTransaction.status") },
        { value: "no_do", text: this.$t("allTransaction.noDo") },
        { value: "no_do_new", text: this.$t("allTransaction.noDoNew") },
        { value: "sender_reporter", text: this.$t("allTransaction.sender") },
        { value: "receiver_approver", text: this.$t("allTransaction.receiver") },
        { value: "company_departure", text: this.$t("allTransaction.departure") },
        { value: "company_destination", text: this.$t("allTransaction.destination") },
        { value: "company_new_destination", text: this.$t("allTransaction.destinationNew") },
        { value: "company_transporter", text: this.$t("allTransaction.transporter") },
        { value: "company", text: this.$t("allTransaction.company") },
        { value: "truck_number", text: this.$t("allTransaction.truck") },
        { value: "truck_number_new", text: this.$t("allTransaction.truckNew") },
        { value: "driver_name", text: this.$t("allTransaction.driver") },
        { value: "driver_name_new", text: this.$t("allTransaction.driverNew") },
        { value: "good_pallet", text: this.$t("pallet.good") },
        { value: "tbr_pallet", text: this.$t("pallet.tbr") },
        { value: "ber_pallet", text: this.$t("pallet.ber") },
        { value: "missing_pallet", text: this.$t("pallet.missing") },
        { value: "price", text: this.$t("allTransaction.price") },
        { value: "reason", text: this.$t("allTransaction.reason") },
        { value: "note", text: this.$t("allTransaction.note") },
      ],
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
  },
  methods: {
    ...mapActions("allTransaction", ["getAllTransactions"]),
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
