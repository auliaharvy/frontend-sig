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
            <v-btn style="margin-left: 20px">{{
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
            :items="palletMovements.data"
            dense
          >
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
  name: "PalletMovement",
  components: {
    Breadcomp,
  },
  data() {
    return {
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("palletMovement.trxNumber") },
        { value: "distribution", text: this.$t("palletMovement.send") },
        { value: "status", text: this.$t("palletMovement.status") },
        { value: "departure", text: this.$t("palletMovement.departure") },
        { value: "destination", text: this.$t("palletMovement.destination") },
        { value: "transporter", text: this.$t("palletMovement.transporter") },
        { value: "truck", text: this.$t("palletMovement.truck") },
        { value: "good", text: this.$t("pallet.good") },
        { value: "tbr", text: this.$t("pallet.tbr") },
        { value: "ber", text: this.$t("pallet.ber") },
        { value: "missing", text: this.$t("pallet.missing") },
        { value: "departure_time", text: this.$t("palletMovement.departTime") },
        { value: "eta", text: this.$t("palletMovement.eta") },
        { value: "late", text: this.$t("palletMovement.late") },
      ],
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
  },
  methods: {
    ...mapActions("palletMovement", ["getPalletMovements"]),
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
