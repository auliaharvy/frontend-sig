<template>
  <v-app>
    <Navbar />
    <v-container>
      <h1 class="heading black--text">{{ $t("sidebar.organisasi") }}</h1>
      <v-spacer></v-spacer>
      <v-col md-12>
        <v-card>
          <v-card-title>
            {{ $t("organisasi.organisasi") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card>
            <v-card-title>
              <v-btn v-for="add in adds" router :to="add.route">{{
                $t("organisasi.tambah")
              }}</v-btn>
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
              :items="items"
              dense
            >
              <template v-slot:item.edit="{ item }">
                <v-btn
                  color="yellow"
                  small
                  @click="editData(item)"
                  v-for="edit in edits"
                  router
                  :to="edit.route"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
              </template>
              <template v-slot:item.hapus="{ item }">
                <v-btn
                  class="warna-font"
                  color="red"
                  small
                  @click="hapusData(item)"
                  >{{ $t("manajemenpengguna.hapus") }}</v-btn
                >
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
// @ is an alias to /src
export default {
  name: "ManajemenPengguna",
  components: {
    Navbar,
    Footer,
    Breadcomp,
  },
  data() {
    return {
      headers: [
        { value: "nama", text: this.$t("organisasi.nama") },
        { value: "alamat", text: this.$t("organisasi.alamat") },
        { value: "kota", text: this.$t("organisasi.kota") },
        { value: "nomor", text: this.$t("organisasi.nomor") },
        { value: "email", text: "Email" },
        { value: "tag", text: "Tag" },
        { value: "dibuat", text: this.$t("organisasi.dibuat") },
        { value: "diperbarui", text: this.$t("organisasi.diperbarui") },
        { value: "edit", text: this.$t("manajemenpengguna.sunting") },
        { value: "hapus", text: this.$t("manajemenpengguna.hapus") },
      ],
      items: [
        {
          nama: "Surya Micro Systems",
          alamat: "Cikarang",
          kota: "Bekasi",
          nomor: "081225340707",
          email: "mramdhanass@gmail.com",
          tag: "ada",
          dibuat: "Admin",
          diperbarui: "25-03-2023",
        },
      ],
      search: "",
      adds: [{ route: "/tambah-organisasi" }],
      edits: [{ route: "/edit-organisasi" }],
    };
  },
  methods: {
    editData(item) {
      // Logika untuk mengedit data
      console.log("Mengedit data:", item);
    },
    hapusData(item) {
      // Logika untuk menghapus data
      console.log("Menghapus data:", item);
    },
  },
};
</script>
<style scoped>
.warna-font {
  color: white;
}
</style>
