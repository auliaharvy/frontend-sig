<template>
  <v-app>
    <Navbar />
      <v-container>
        <h1 class="heading black--text">{{ $t("sidebar.manajemenperusahaan") }}</h1>
        <v-spacer></v-spacer>
        <v-col md-12>
        <v-card>
            <v-card-title>
              Data Manajemen Pallet Perusahaan
            </v-card-title>
            <v-divider></v-divider>
                <v-card>
                    <v-card-title>
                      <v-btn v-for="add in adds"
                router :to="add.route"
                >Tambah Data Manajemen</v-btn>
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
  name: "ManajemenPerusahaan",
  components: {
    Navbar,
    Footer,
    Breadcomp
  },
  data() {
        return {
            headers: [
                { value: 'namaperusahaan', text: 'Nama Perusahaan'},
                { value: 'kodeperusahaan', text: 'Kode Perusahaan' },
                { value: 'tipeperusahaan', text: 'Tipe Perusahaan'},
                { value: 'keberangkatan', text: 'Keberangkatan'},
                { value: 'alamat', text: 'Alamat'},
                { value: 'palletmasuk', text: 'Pallet Masuk'},
                { value: 'palletkeluar', text: 'Pallet Keluar'},
                { value: 'goodpallet', text: 'Good Pallet'},
                { value: 'TBRpallet', text: 'TBR Pallet'},
                { value: 'BERpallet', text: 'BER Pallert'},
                { value: 'missingpallet', text: 'Missing Pallet'},
                { value: 'totalpallet', text: 'Total Pallet'},
                { value: 'kuotapallet', text: 'Kuota Pallet'},
                { value: 'hargasewa', text: 'Harga Sewa Pallet'},
                { value: 'totalbiaya', text: 'Total Biaya Pallet'},
                { value: 'hapus', text: this.$t('manajemenpengguna.hapus')},

            ],
            items: [
                { name :'Daud', username: 'daudtea', email: 'mramdhanass@gmail.com' }
            ],
            search: '',
            adds: [{ route: "/tambah-data-manajemen" }],

        }
    },
    methods: {
    editData(item) {
      // Logika untuk mengedit data
      console.log('Mengedit data:', item);
      this.$router.push({ path: "/edit-pengguna" });
    },
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
