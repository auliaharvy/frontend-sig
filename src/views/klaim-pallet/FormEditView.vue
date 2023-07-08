<template>
  <v-container>
    <Breadcomp page-title="claimPallet.edit"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("claimPallet.edit") }}
        </v-card-title>
        <Form />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
import Form from "./FormEdit.vue";
// @ is an alias to /src
export default {
  name: "EditClaimPallet",
  components: {
    Form,
    Breadcomp,
  },
  data() {
    return {
      search: "",
      showPassword: false,
      route: { index: "/claim-pallet" },
    };
  },
  created() {
    this.getClaimPalletDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions("claimPallet", ["getClaimPalletDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
