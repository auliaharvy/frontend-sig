<template>
  <v-container>
    <Breadcomp page-title="changeQuota.add"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("changeQuota.add") }}
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
      route: { index: "/change-quota" },
    };
  },
};
</script>
