<template>
  <v-app>
    <Navbar />
    <v-container>
      <h1 class="heading black--text">{{ $t("sidebar.pengendara") }}</h1>
      <v-spacer></v-spacer>
      <v-col md-12>
        <v-card>
          <v-card-title>
            {{ $t("sidebar.pengendara") }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card>
            <v-card-title>
              <v-btn>{{
                $t("kendaraan.singkronisasi")
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
              <template v-slot:item.action="{ item }">
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
            </v-data-table>
          </v-card>
        </v-card>
      </v-col>
    </v-container>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Breadcomp from "@/components/Breadcrumb.vue";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// @ is an alias to /src
export default {
  name: "Dashboard",
  components: {
    Navbar,
    Footer,
    Breadcomp
  },
  data() {
    return {
      headers: [
        { value: "ekspeditur", text: this.$t("kendaraan.ekspeditur") },
        { value: "id", text: this.$t("pengendara.id") },
        { value: "nama", text: this.$t("pengendara.nama") },
        { value: "nomor", text: this.$t("pengendara.nomor") },
        { value: "action", text: this.$t("manajemenpengguna.sunting") },
      ],
      items: [
        {
          ekspeditur: "SIG",
          id: "28992",
          nama: "agus",
          nomor: "08937363535",
        },
      ],
      search: "",
      edits: [{ route: "/edit-pengendara" }],
    };
  },
  methods: {
    editData(item) {
      // Logika untuk mengedit data
      console.log("Mengedit data:", item);
    },
  },
};
</script>
