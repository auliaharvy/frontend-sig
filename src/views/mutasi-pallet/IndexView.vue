<template>
  <v-app>
    <Navbar />
      <v-container>
        <h1 class="heading black--text">{{ $t("sidebar.mutasipallet") }}</h1>
        <v-spacer></v-spacer>
        <v-col md-12>
        <v-card>
            <v-card-title>
              Manajemen Mutasi Pallet
            </v-card-title>
            <v-divider></v-divider>
                <v-card>
                    <v-card-title>
                      <v-btn v-for="add in adds"
                router :to="add.route"
                >Tambah Mutasi Pallet</v-btn>
                <v-btn
                >{{ $t("manajemenpengguna.unduh") }}</v-btn>
                <v-btn color="success"
                >Scan QR</v-btn>
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
                    <template v-slot:item.hapus="{ item }">
                      <v-btn class="warna-font" color="red" small @click="hapusData(item)">{{ $t('manajemenpengguna.hapus') }}</v-btn>
                    </template>
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
  name: "ManajemenPengguna",
  components: {
    Navbar,
    Footer,
    Breadcomp
  },
  data() {
        return {
            headers: [
                { value: 'nomormutasi', text: 'Nomor Mutasi Pallet' },
                { value: 'keberangkatan', text: 'Keberangkatan' },
                { value: 'tujuan', text: 'Tujuan' },
                { value: 'checkerpengirim', text: 'Checker Pengirim' },
                { value: 'checkerpenerimaan', text: 'Checker Penerimaan' },
                { value: 'ekspeditur', text: 'Ekspeditur' },
                { value: 'nomorkendaraan', text: 'Nomor Kendaraan' },
                { value: 'pengendara', text: 'Pengendara' },
                { value: 'status', text: 'Status' },
                { value: 'alasan', text: 'Alasan' },
                { value: 'catatan', text: 'Catatan' },
                { value: 'dibuat', text: 'Dibuat Saat' },
                { value: 'diperbarui', text: 'Diperbarui Saat' },
                { value: 'tinjau', text: 'Tinjau' },
                { value: 'terima', text: 'Terima' },
                { value: 'hapus', text: this.$t('manajemenpengguna.hapus')}
            ],
            items: [
                { name :'Daud', username: 'daudtea', email: 'mramdhanass@gmail.com' }
            ],
            search: '',
            adds: [{ route: "/tambah-mutasi-pallet" }],

        }
    },
    methods: {
    hapusData(item) {
      // Logika untuk menghapus data
      console.log('Menghapus data:', item);
    }
  }
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
