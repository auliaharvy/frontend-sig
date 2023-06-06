<template>
  <v-container>
    <Breadcomp :page-title="$t('sjp.changeDest')"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("sjp.changeDest") }}
        </v-card-title>
        <Form />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
import Form from "./FormChangeDestination.vue";
// @ is an alias to /src
export default {
  name: "ChangeDestinationSJP",
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
    this.getSjpDetail(this.$route.params.id)
  },
  methods: {
    ...mapActions("sjp", ["getSjpDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
