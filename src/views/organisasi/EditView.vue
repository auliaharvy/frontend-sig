<template>
  <v-container>
    <Breadcomp :page-title="$t('organisasi.sunting')"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("organisasi.sunting") }}
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
  name: "SuntingOrganisasi",
  components: {
    Form,
    Breadcomp,
  },
  data() {
    return {
      search: "",
      showPassword: false,
    };
  },
  created() {
    this.getOrganizationDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions("organization", ["getOrganizationDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
