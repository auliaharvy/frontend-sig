<template>
  <v-container>
    <Breadcomp :page-title="$t('trucks.edit')"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("trucks.edit") }}
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
  name: "SuntingKendaraan",
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
    this.getTruckDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions("truck", ["getTruckDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
