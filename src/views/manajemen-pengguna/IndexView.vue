<template>
  <v-app>
    <Navbar />
      <v-container>
        <h1 class="heading black--text">{{ $t("sidebar.manajemenpengguna") }}</h1>
        <v-spacer></v-spacer>
        <v-col md-12>
        <v-card>
            <v-card-title>
              {{ $t("manajemenpengguna.pengguna") }}
            </v-card-title>
            <v-divider></v-divider>
                <v-card>
                    <v-card-title>
                      <v-btn v-for="add in adds"
                router :to="add.route"
                >{{ $t("manajemenpengguna.tambah") }}</v-btn>
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
                    </v-card-title>
                    <v-data-table class="custom-table"
                    v-if="!loading"
                    :headers="headers"
                    :search="search"
                    :items="users.data.data.data"
                    elevation="2"
                    border
                    >
                    <template v-slot:item.edit="{ item }">
                      <v-btn color="yellow" small @click="editData(item)"
                      ><v-icon>mdi-pencil</v-icon></v-btn>
                    </template>
                    <template v-slot:item.hapus="{ item }">
                      <v-btn class="warna-font" color="red" small @click="deleteItem(item)">{{ $t('manajemenpengguna.hapus') }}</v-btn>
                    </template>
                    </v-data-table>
                </v-card>
          </v-card>
      </v-col>
      <v-dialog v-model="dialog" elevation="2">
      <v-card>
      <v-card-title>Hapus Data Pengguna?</v-card-title>
      <v-card-text>Anda yakin ingin menghapus Pengguna ini?</v-card-text>
      <v-card-actions>
        <v-btn @click="dialog = false" elevation="2">Tidak</v-btn>
        <v-btn @click="confirmDelete" color="red" class="warna-font" elevation="2">Ya</v-btn>
      </v-card-actions>
      </v-card>
       </v-dialog>
      </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Breadcomp from "@/components/Breadcrumb.vue";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";

export default {
  name: "ManajemenPengguna",
  components: {
    Navbar,
    Footer,
    Breadcomp
  },
  data() {
        return {
            // headers: [
            //     { value: 'fullname', text: this.$t('manajemenpengguna.namalengkap') },
            //     { value: 'username', text: this.$t('login.namapengguna')},
            //     { value: 'email', text: 'Email' },
            //     { value: 'edit', text: this.$t('manajemenpengguna.sunting')},
            //     { value: 'hapus', text: this.$t('manajemenpengguna.hapus')}
            // ],
            headers: [
        { text: this.$t('manajemenpengguna.namalengkap'), value: 'fullname' },
        { text: this.$t('login.namapengguna'), value: 'username' },
        { text: 'Email', value: 'email' },
        { text: this.$t('manajemenpengguna.sunting'), value: 'edit', sortable: false },
        { text: this.$t('manajemenpengguna.hapus'), value: 'hapus', sortable: false }
      ],
            users: {
              data:{
                data:{
                  data:[]
                }
              }
            },
            search: '',
            adds: [{ route: "/tambah-pengguna" }],
            loading: false,
            dialog: false,
            deleteId: null,

        }
    },
    methods: {
      getData() {
  this.loading = true;
  axios
    .get("http://localhost:3000/users")
    .then((response) => {
      this.users.data.data.data = response.data.data.data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      this.loading = false;
    });
},
    editData(item) {
      console.log('Mengedit data:', item);
      this.pengguna = {
        fullname: item.fullname,
        username: item.username,
        email: item.email,
        password: item.password,
      };    
      this.$router.push({ path: "/edit-pengguna"});
    },
    deleteItem(item) {
    this.deleteId = item.id;
    this.dialog = true;
  },
  confirmDelete() {
    axios
      .delete(`http://localhost:3000/users/${this.deleteId}`)
      .then((response) => {
        this.getData();
        this.dialog = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  },
  mounted() {
    this.getData();
  },
  computed: {
  computedItems() {
    return this.users.data.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage)
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
