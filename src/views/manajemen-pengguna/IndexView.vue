<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("manajemenpengguna.pengguna") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn router :to="adds.route">{{ $t("manajemenpengguna.tambah") }}</v-btn>
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
            :items="users.data"
            dense
          >
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
  name: "ManajemenPengguna",
  components: {
    Breadcomp,
  },
  data() {
    return {
      headers: [
        { value: "fullname", text: this.$t("manajemenpengguna.namalengkap") },
        { value: "username", text: this.$t("manajemenpengguna.username") },
        { value: "email", text: this.$t("manajemenpengguna.email") },
        { value: "actions", text: this.$t("table.actions") },
      ],
      items: [],
      search: "",
      adds: { route: "/user/add" },
      edits: { route: "/user/edit" },
    };
  },
  created() {
    this.getUsers(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("user", {
      users: (state) => state.users, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("user", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("user", ["getUsers", "deleteUser"]),
    editData(item) {
      // console.log("Mengedit data:", item);
      this.$router.push({
        name: 'user.edit',
        params: { id: item.id}
      });
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
          this.deleteUser(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
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
