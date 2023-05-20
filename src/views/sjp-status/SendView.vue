<template>
  <v-container>
    <Breadcomp page-title="palletTransfer.send"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("palletTransfer.send") }}
        </v-card-title>
        <Form />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
import Form from "./FormSend.vue";
// @ is an alias to /src
export default {
  name: "SendPalletTransfer",
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
