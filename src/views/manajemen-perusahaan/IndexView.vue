<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("perusahaan.perusahaan") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn router :to="adds.route">{{ $t("perusahaan.tambah") }}</v-btn>
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
            :items="companies.data"
            dense
          >
            <template v-slot:item.total_pallet="{ item }">
              <template v-if="item.total_pallet == 0">
                <v-chip
                  label
                  color="blue"
                >
                  0
                </v-chip>
              </template>
              <template v-else>
                <v-chip
                  label
                  color="red"
                  v-if="item.total_pallet > item.quota"
                >
                  {{ item.total_pallet }}
                </v-chip>
                <v-chip
                  label
                  color="blue"
                  text-color="white"
                  v-else-if="item.total_pallet < item.quota"
                >
                  {{ item.total_pallet }}
                </v-chip>
                <v-chip
                  label
                  color="yellow"
                  v-else-if="item.total_pallet == item.quota"
                >
                  {{ item.total_pallet }}
                </v-chip>
              </template>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editData(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="hapusData(item)"> mdi-delete </v-icon>
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
  name: "ManajemenPerusahaan",
  components: {
    Breadcomp,
  },
  data() {
    return {
      headers: [
        { value: "code", text: this.$t("perusahaan.nomor") },
        { value: "name", text: this.$t("perusahaan.nama") },
        { value: "name_company_type", text: this.$t("perusahaan.tipe") },
        { value: "name_organization", text: this.$t("organisasi.nama") },
        { value: "address", text: this.$t("perusahaan.alamat") },
        { value: "city", text: this.$t("perusahaan.kota") },
        { value: "phone", text: this.$t("perusahaan.hp") },
        { value: "email", text: this.$t("perusahaan.email") },
        { value: "good_pallet", text: this.$t("pallet.good") },
        { value: "tbr_pallet", text: this.$t("pallet.tbr") },
        { value: "ber_pallet", text: this.$t("pallet.ber") },
        { value: "missing_pallet", text: this.$t("pallet.missing") },
        { value: "total_pallet", text: this.$t("pallet.total") },
        { value: "quota", text: this.$t("pallet.quota") },
        { value: "actions", text: this.$t("table.actions") },
      ],
      items: [],
      search: "",
      adds: { route: "/company/add" },
      edits: { route: "/edit-perusahaan" },
    };
  },
  created() {
    this.getCompanies(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("company", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("company", ["getCompanies", "deleteCompany"]),
    editData(item) {
      this.$router.push({
        name: 'company.edit',
        params: { id: item.id}
      });
    },
    getPallet( tipePallet, data) {
      let found = data.find(x => x.kondisi_pallet === tipePallet).quantity;
      console.log(found);
      return found;
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
          this.deleteCompany(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
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
</style>
