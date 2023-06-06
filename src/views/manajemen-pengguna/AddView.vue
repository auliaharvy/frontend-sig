<template>
  <v-container>
    <Breadcomp page-title="manajemenpengguna.tambah"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("manajemenpengguna.tambah") }}
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
  name: "TambahPengguna",
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
  methods: {
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
