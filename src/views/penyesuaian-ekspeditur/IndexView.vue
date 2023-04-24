<template>
  <v-app>
    <Navbar />
      <v-container>
        <h1 class="heading black--text">{{ $t("sidebar.penyesuaianekspeditur") }}</h1>
        <v-spacer></v-spacer>
        <v-col md-12>
        <v-card>
            <v-card-title>
              Catatan Penyesuaian Ekspeditur
            </v-card-title>
            <v-divider></v-divider>
                <v-card>
                    <v-card-title>
                      <v-btn v-for="add in adds"
                router :to="add.route"
                >Penyesuaian Ekspeditur</v-btn>
                      <v-btn>
                {{ $t("manajemenpengguna.unduh") }}</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        prepend-icon="mdi-search"
                        :label="$t('manajemenpengguna.cari')"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table class="custom-table"
                    :loading="loading"
                    :headers="headers"
                    :search="search"
                    :items="items"
                    elevation="2"
                    border
                    >
                    </v-data-table>
                </v-card>
          </v-card>
      </v-col>
      </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Breadcomp from "@/components/Breadcrumb.vue";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
// @ is an alias to /src
export default {
  name: "ManajemenPerusahaan",
  components: {
    Navbar,
    Footer,
    Breadcomp
  },
  data() {
        return {
            headers: [
                { value: 'nomorpenyesuaian', text: 'Nomor Penyesuaian Ekspeditur'},
                { value: 'pelapor', text: 'Pelapor' },
                { value: 'perusahaan', text: 'Perusahaan'},
                { value: 'ekspeditur', text: 'Ekspeditur'},
                { value: 'alamat', text: 'Alamat'},
                { value: 'goodpallet', text: 'Good Pallet'},
                { value: 'TBRpallet', text: 'TBR Pallet'},
                { value: 'tipepenyesuaian', text: 'Tipe Penyesuaian'},
                { value: 'alasan', text: 'Alasan'},
                { value: 'catatan', text: 'Catatan'},
                { value: 'dibuat', text: 'Dibuat Saat'}

            ],
            items: [
                { name :'Daud', username: 'daudtea', email: 'mramdhanass@gmail.com' }
            ],
            search: '',
            adds: [{ route: "/tambah-penyesuaian-ekspeditur" }],

        }
    },
};
</script>
<style scoped>
.warna-font {
  color: white; 
}
.custom-table table {
  border-collapse: separate;
  border-spacing: 0px;
  width: 100%;
}

.custom-table th,
.custom-table td {
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 8px;
  text-align: left;
}
</style>
