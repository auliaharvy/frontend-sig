<template>
  <v-container>
    <Breadcomp page-title="perusahaan.tambah"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("perusahaan.tambah") }}
        </v-card-title>
        <Form />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import Breadcomp from "@/components/Breadcrumb.vue";
import Form from "./Form.vue";
// @ is an alias to /src
export default {
  name: "TambahPerusahaan",
  components: {
    Form,
    Breadcomp,
  },
  data() {
    return {
      search: "",
      showPassword: false,
      route: { index: "/perusahaan" },
    };
  },
  methods: {
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
