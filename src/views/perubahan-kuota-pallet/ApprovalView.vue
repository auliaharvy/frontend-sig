<template>
  <v-container>
    <Breadcomp page-title="changeQuota.approval"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("changeQuota.approval") }}
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
  name: "TambahSJPStatus",
  components: {
    Form,
    Breadcomp,
  },
  data() {
    return {
      search: "",
      showPassword: false,
      route: { index: "/change-quota" },
    };
  },
  created() {
    this.getChangeQuotaDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions("changeQuota", ["getChangeQuotaDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
