<template>
  <v-container>
    <Breadcomp page-title="sjpStatus.sendbackSjp"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("sjpStatus.sendbackSjp") }}
        </v-card-title>
        <Form />
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions, mapState, } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
import Form from "./FormSendback.vue";
// @ is an alias to /src
export default {
  name: "SendbackSJPStatus",
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
    this.getSjpStatusDetail(this.$route.params.id);
  },
  computed: {
    ...mapState("sjpStatus", {
      sjpStatus: (state) => state.sjpStatus, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("sjpStatus", ["getSjpStatusDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
