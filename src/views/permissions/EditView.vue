<template>
  <v-container>
    <Breadcomp :page-title="$t('izin.sunting')"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("izin.sunting") }}
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
  name: "SuntingIzin",
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
    this.getPermissionDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions("permission", ["getPermissionDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
