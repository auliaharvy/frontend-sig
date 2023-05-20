<template>
  <v-container>
    <Breadcomp page-title="palletTransfer.approval"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("palletTransfer.approval") }}
        </v-card-title>
        <Form />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
import Form from "./FormApproval.vue";
// @ is an alias to /src
export default {
  name: "ApprovalPalletTransfer",
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
    this.getPalletTransferDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions("palletTransfer", ["getPalletTransferDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
