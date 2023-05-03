<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("izin.izin") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn router :to="adds.route">{{ $t("izin.tambah") }}</v-btn>
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
            :items="permissions.data"
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
  name: "ManajemenIzin",
  components: {
    Breadcomp,
  },
  data() {
    return {
      headers: [
        { value: "name", text: this.$t("izin.nama") },
        { value: "actions", text: this.$t("table.actions") },
      ],
      items: [],
      search: "",
      adds: { route: "/permissions/add" },
    };
  },
  created() {
    this.getPermissions(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState("permission", {
      permissions: (state) => state.permissions, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("permission", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("permission", ["getPermissions", "deletePermission"]),
    editData(item) {
      this.$router.push({
        name: 'permissions.edit',
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
          this.deletePermission(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
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
