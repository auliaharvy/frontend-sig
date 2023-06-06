<template>
  <v-app>
    <Navbar />
      <v-container>
        <h1 class="heading black--text">{{ $t("sidebar.manajemenpengguna") }}</h1>
        <v-spacer></v-spacer>
        <v-col md-12>
        <v-card>
            <v-card-title>
              Semua Transaksi
            </v-card-title>
            <v-divider></v-divider>
                <v-card>
                    <v-card-title>
                      <v-btn v-for="add in adds"
                router :to="add.route"
                >Tampilkan Data dalam satu minggu</v-btn>
                <v-btn
                >Tampilkan Data dalam satu bulan</v-btn>
                <v-btn
                >{{ $t("manajemenpengguna.unduh") }}</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        prepend-icon="mdi-search"
                        :label="$t('manajemenpengguna.cari')"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-btn
                >Query</v-btn>
                    </v-card-title>
                    <v-data-table class="custom-table"
                    :loading="loading"
                    :headers="headers"
                    :search="search"
                    :items="items"
                    elevation="2"
                    border
                    >
                    <template v-slot:item.edit="{ item }">
                      <v-btn color="yellow" small @click="editData(item)"
                      ><v-icon>mdi-pencil</v-icon></v-btn>
                    </template>
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
                { value: 'name', text: this.$t('manajemenpengguna.namalengkap') },
                { value: 'username', text: this.$t('login.namapengguna')},
                { value: 'email', text: 'Email' },
                { value: 'edit', text: this.$t('manajemenpengguna.sunting')},
                { value: 'hapus', text: this.$t('manajemenpengguna.hapus')}
            ],
            items: [
                { name :'Daud', username: 'daudtea', email: 'mramdhanass@gmail.com' }
            ],
            search: '',
            adds: [{ route: "/tambah-pengguna" }],

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
