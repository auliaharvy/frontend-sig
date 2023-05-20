<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("changeQuota.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn router :to="adds.route">{{ $t("changeQuota.add") }}</v-btn>
            <v-btn style="margin-left: 20px">{{
              $t("manajemenpengguna.unduh")
            }}</v-btn>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              prepend-icon="mdi-search"
              :label="$t('manajemenpengguna.cari')"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :loading="loading"
            :headers="headers"
            :search="search"
            :items="changeQuotas.data"
            dense
          >
            <template v-slot:item.type="{ item }">
              <p class="text-green" v-if="item.type == 0 || item.type == null">Penambahan</p>
              <p class="text-red" v-else-if="item.type == 1">Pengurangan</p>
            </template>
            <template v-slot:item.status="{ item }">
              <p v-if="item.status == 0 || item.status == null">Draft</p>
              <p class="text-green" v-else-if="item.status == 1">Approved</p>
              <p class="text-red" v-else-if="item.status == 2">Rejected</p>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-menu v-if="item.id_new_pallet == 'belum ada'">
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
                      >
                        <v-icon small class="mr-2">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit data</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item v-if="item.id_new_pallet == 'belum ada' && item.status === 0 || item.status === null">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-btn router :to="'/change-quota/approval/'+item.id" small text>
                          <v-icon left>
                            mdi-draw-pen
                          </v-icon>
                          Approval
                        </v-btn></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="item.id_new_pallet == 'belum ada' && item.type != 1 && item.status === 1">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-btn router :to="'/new-pallet/add/'+item.id" small text>
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          Add New Pallet
                        </v-btn></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-icon v-if="item.status === 0 || item.status === null " small @click="hapusData(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
// @ is an alias to /src
export default {
  name: "SuratJalanPallet",
  components: {
    Breadcomp,
  },
  data() {
    return {
      selectedItem: 1,
      headers: [
        { value: "trx_number", text: this.$t("changeQuota.trxNumber") },
        { value: "company_name", text: this.$t("changeQuota.compRequester") },
        { value: "requester_name", text: this.$t("changeQuota.requester") },
        { value: "quantity", text: this.$t("changeQuota.requestedQuantity") },
        { value: "approved_quantity", text: this.$t("changeQuota.approvedQuantity") },
        { value: "type", text: this.$t("changeQuota.type") },
        { value: "status", text: this.$t("changeQuota.status") },
        { value: "reason", text: this.$t("changeQuota.reason") },
        { value: "note", text: this.$t("changeQuota.note") },
        { value: "actions", text: this.$t("table.actions") },
      ],
      search: "",
      adds: { route: "/change-quota/add" },
      edits: { route: "/change-quota/edit" },
    };
  },
  created() {
    this.getChangeQuotas(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("changeQuota", {
      changeQuotas: (state) => state.changeQuotas, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("changeQuota", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("changeQuota", ["getChangeQuotas", "deleteChangeQuota"]),
    editData(item) {
      // Logika untuk mengedit data
      console.log("Mengedit data:", item);
    },
    sumTotal(data) {
      return data.reduce((acc, item) => acc + item.quantity, 0);
    },
    hapusData(item) {
      this.$swal({
        title: "Are you sure?",
        text: "This will delete record Permanently!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.value) {
          this.deleteChangeQuota(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
  },
};
</script>
<style scoped>
.warna-font {
  color: white;
}
.text-blue {
  vertical-align: middle;
  color: #0073b7 !important;
  display: table-cell;
  vertical-align: middle;
}
.text-green {
  vertical-align: middle;
  color: #00a65a !important;
  display: table-cell;
  vertical-align: middle;
}

.text-red {
  vertical-align: middle;
  color: red !important;
  display: table-cell;
  vertical-align: middle;
}
.text-normal {
  display: table-cell;
  vertical-align: middle;
}

.text-strike {
  text-decoration: line-through;
  display: table-cell;
  vertical-align: middle;
}
</style>
