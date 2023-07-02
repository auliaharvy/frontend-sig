<template>
  <v-container>
    <Breadcomp page-title="newPallet.add"/>
    <v-spacer></v-spacer>
    <v-col md-12>
      <v-card>
        <v-card-title style="background: black; color: white">
          {{ $t("newPallet.add") }}
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
  name: "TambahNewPallet",
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
    this.getChangeQuotaDetail(this.$route.params.id).then(() => {
      this.newPallet.id_company_requester = this.changeQuota.id_company_requester;
      this.newPallet.id_trx_change_quota = this.changeQuota.id;
      this.newPallet.qty_request_pallet = this.changeQuota.approved_quantity;
      this.newPallet.reason = this.changeQuota.reason;
      this.newPallet.note = this.changeQuota.note;
      this.newPallet.qty_ready_pallet = '0';
    });
  },
  computed: {
    ...mapState("changeQuota", {
      changeQuota: (state) => state.changeQuota, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("newPallet", {
      newPallet: (state) => state.newPallet, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("changeQuota", ["getChangeQuotaDetail"]),
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
