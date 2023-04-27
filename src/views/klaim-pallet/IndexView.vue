<template>
  <v-app>
    <Navbar />
      <v-container>
        <h1 class="heading black--text">{{ $t("sidebar.klaimpallet") }}</h1>
        <v-spacer></v-spacer>
        <v-col md-12>
        <v-card>
            <v-card-title>
              Manajemen Klaim Pallet
            </v-card-title>
            <v-divider></v-divider>
                <v-card>
                    <v-card-title>
                      <v-btn v-for="add in adds"
                router :to="add.route"
                >Ajukan Klaim Pallet</v-btn>
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
                { value: 'nomormutasi', text: 'Nomor Klaim Pallet' },
                { value: 'keberangkatan', text: 'ID Perusahaan Distributor' },
                { value: 'tujuan', text: 'ID Manager' },
                { value: 'checkerpengirim', text: 'ID PIC Distributor' },
                { value: 'checkerpenerimaan', text: 'Status Transaksi' },
                { value: 'ekspeditur', text: 'Alasan Manager' },
                { value: 'nomorkendaraan', text: 'Alasan Distributor' },
                { value: 'pengendara', text: 'BER Pallet' },
                { value: 'status', text: 'Missing Pallet' },
                { value: 'alasan', text: 'Biaya / Pallet' },
                { value: 'catatan', text: 'Total Biaya' },
                { value: 'dibuat', text: 'Dibuat Oleh' },
                { value: 'diperbarui', text: 'Diperbarui Saat' },
                { value: 'tinjau', text: 'Persetujuan Manager' },
                { value: 'terima', text: 'Persetujuan Distributor' },
                { value: 'terima', text: 'Tinjau Tagihan' },
                { value: 'terima', text: 'Memperbarui' },
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
