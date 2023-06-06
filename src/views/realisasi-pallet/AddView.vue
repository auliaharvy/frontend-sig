<template>
  <v-container>
    <Breadcomp page-title="palletRealization.add"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("palletRealization.add") }}
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
  name: "TambahPalletRealization",
  components: {
    Form,
    Breadcomp,
  },
  data() {
    return {
      search: "",
      showPassword: false,
      route: { index: "/pallet-realization" },
    };
  },
  created() {
    this.getNewPalletDetail(this.$route.params.id).then(() => {
      console.log(this.newPallet);
      this.palletRealization.id_trx_new_pallet = this.newPallet.id;
      this.palletRealization.sisa_qty_pallet = this.newPallet.qty_request_pallet - this.newPallet.qty_ready_pallet;
      });
  },
  computed: {
    ...mapState("palletRealization", {
      palletRealization: (state) => state.palletRealization, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("newPallet", {
      newPallet: (state) => state.newPallet, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("newPallet", ["getNewPalletDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
