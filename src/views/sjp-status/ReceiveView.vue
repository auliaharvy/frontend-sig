<template>
  <v-container>
    <Breadcomp page-title="sjpStatus.receive"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("sjpStatus.receive") }}
        </v-card-title>
        <Form />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
import Form from "./FormReceive.vue";
// @ is an alias to /src
export default {
  name: "ReceiveSjpStatus",
  components: {
    Form,
    Breadcomp,
  },
  data() {
    return {
      search: "",
      showPassword: false,
      route: { index: "/sjp-status" },
    };
  },
  created() {
    this.getSjpStatusDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions("sjpStatus", ["getSjpStatusDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
