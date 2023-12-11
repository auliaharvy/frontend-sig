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
            <v-btn v-if="$can('create company')" router :to="adds.route">{{ $t("perusahaan.tambah") }}</v-btn>
            <export-excel
              :data="filteredCompanies"
              :fields="json_fields"
              worksheet="Sheet Companies"
              name="data-companies.xls"
            >
              <v-btn style="margin-left: 20px">{{
                $t("manajemenpengguna.unduh")
              }}</v-btn>
            </export-excel>
            
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
            v-model="selected"
            :loading="loading"
            :headers="headers"
            :search="search"
            :items="filteredCompanies"
            dense
          >
            <template v-slot:header="{ header }">
              <tr class="grey lighten-3 tr-header hidden-sm-and-down">
                <th v-for="header in headers" :key="header.text" style="width: 200px;">
                  <div v-if="filters.hasOwnProperty(header.value)">
                    <v-autocomplete
                      flat
                      hide-details
                      hide-selected
                      multiple
                      attach
                      chips
                      dense
                      clearable
                      :items="columnValueList(header.value)"
                      v-model="filters[header.value]"
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 5">
                          <span>
                            {{ item }} 
                          </span>
                        </v-chip>
                        <span v-if="index === 5" class="grey--text caption" > 
                          (+{{ filters[header.value].length - 5 }} others) 
                        </span>
                      </template>
                    </v-autocomplete>
                  </div>
                </th>
              </tr>
            </template>
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
              <v-icon v-if="$can('update company')" small class="mr-2" @click="editData(item)">
                mdi-pencil
              </v-icon>
              <v-icon v-if="$can('delete company')" small @click="hapusData(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-col>
  </v-container>
</template>

<script src="https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.2.28/dist/vuetify.min.js"></script>
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
        // { value: "code_organization", text: "Kode Organisasi", width: "80px" },
        { value: "name_organization", text: this.$t("organisasi.nama"), width: "180px" },
        { value: "dist_code", text: "Kode Distributor", width: "180px" },
        { value: "code", text: "Kode Perusahaan", width: "180px" },
        { value: "name", text: "Nama Perusahaan", width: "180px" },
        { value: "name_company_type", text: this.$t("perusahaan.tipe"), width: "180px" },
        // { value: "address", text: this.$t("perusahaan.alamat"), width: "180px" },
        { value: "city", text: this.$t("perusahaan.kota"), width: "180px" },
        { value: "phone", text: this.$t("perusahaan.hp"), width: "180px" },
        { value: "email", text: this.$t("perusahaan.email"), width: "180px" },
        { value: "good_pallet", text: this.$t("pallet.good"), width: "100px" },
        { value: "tbr_pallet", text: this.$t("pallet.tbr"), width: "100px" },
        { value: "ber_pallet", text: this.$t("pallet.ber"), width: "100px" },
        { value: "missing_pallet", text: this.$t("pallet.missing"), width: "100px" },
        { value: "total_pallet", text: this.$t("pallet.total"), width: "100px" },
        { value: "quota", text: this.$t("pallet.quota"), width: "100px" },
        { value: "percent_quota", text: "%"+this.$t("pallet.quota"), width: "100px" },
        { value: "actions", text: this.$t("table.actions"), width: "180px" },
      ],
      filters: {
        dist_code: [],
        code: [],
        name: [],
        name_company_type: [],
        name_organization: [],
        address: [],
        city: [],
        phone: [],
        email: [],
        good_pallet: [],
        tbr_pallet: [],
        ber_pallet: [],
        missing_pallet: [],
        total_pallet: [],
        quota: [],
        // actions: [],
      },
      json_fields: {
        "Distributor Code": "dist_code",
        "Code": "code",
        "Name": "name",
        "Type": "name_company_type",
        "Organization": "name_organization",
        "Address": "address",
        "City": "city",
        "Phone": "phone",
        "Email": "email",
        "Good Pallet": "good_pallet",
        "TBR Pallet": "tbr_pallet",
        "BER Pallet": "ber_pallet",
        "Missing Pallet": "missing_pallet",
        "Total Pallet": "total_pallet",
        "Quota Pallet": "quota",
      },
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
    filteredCompanies() {
      return this.companies.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
  },
  methods: {
    ...mapActions("company", ["getCompanies", "deleteCompany"]),
    columnValueList(val) {
      return this.companies.map((d) => d[val]);
    },
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
