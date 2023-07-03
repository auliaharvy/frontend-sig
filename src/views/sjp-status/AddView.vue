<template>
  <v-container>
    <Breadcomp page-title="sjpStatus.add"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("sjpStatus.add") }}
        </v-card-title>
        <Form />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions, mapState, } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
import Form from "./Form.vue";
// @ is an alias to /src
export default {
  name: "TambahSJPStatus",
  components: {
    Form,
    Breadcomp,
  },
  data() {
    return {
      search: "",
      showPassword: false,
      route: { index: "/pallet-transfers" },
    };
  },
  created() {
    this.getSjpDetail(this.$route.params.id).then(() => {
      this.sjpStatus.sjp_number = this.sjp.trxNumber;
      this.sjpStatus.id_sjp = this.$route.params.id;
      this.sjpStatus.id_departure_company = this.sjp.idDeparture;
      this.sjpStatus.id_destination_company = this.sjp.idDestination;
      this.sjpStatus.id_transporter_company = this.sjp.idTransporter;
      this.sjpStatus.good_pallet = this.sjp.palletQuantity;
      this.sjpStatus.tbr_pallet = 0;
      this.sjpStatus.ber_pallet = 0;
      this.sjpStatus.missing_pallet = 0;
    });
  },
  computed: {
    ...mapState("sjp", {
      sjp: (state) => state.sjp, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sjpStatus", {
      sjpStatus: (state) => state.sjpStatus, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("sjp", ["getSjpDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
