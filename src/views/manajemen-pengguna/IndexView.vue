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
            :items="FilteredUsers"
            dense
          >
          <template class="hidden-sm-and-down" v-slot:header="{ header }">
              <tr class="grey lighten-3 tr-header hidden-sm-and-down">
                <th v-for="header in headers" :key="header.text">
                  <div v-if="filters.hasOwnProperty(header.value)">
                    <v-autocomplete
                      hide-selected
                      multiple
                      attach
                      small-chips
                      dense
                      clearable
                      :items="columnValueList(header.value)"
                      v-model="filters[header.value]"
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 5">
                          <span>
                            {{ item }} 
                          </span>
                        </v-chip>
                        <span v-if="index === 5" class="grey--text caption" > 
                          (+{{ filters[header.value].length - 5 }} others) 
                        </span>
                      </template>
                    </v-autocomplete>
                  </div>
                </th>
              </tr>
            </template>
            <template v-slot:item.roles="{ item }">
              <div v-for="(role,i) in item.roles" :key="i">
                <span>{{ i+1 + '. ' + role.role + ' - ' + role.company + ' '}} <v-icon small @click="hapusRole(role)"> mdi-delete </v-icon></span>
              </div>
            </template>
            <template v-slot:item.last_updated="{ item }">
              <p>{{ item.updated_at | moment('DD-MM-YYYY') }}</p>
            </template>
            <template v-slot:item.is_deleted="{ item }">
              <v-chip
                v-if="item.is_deleted == 1"
                class="ma-2"
                color="red"
                label
                text-color="white"
              >
                Inactive
              </v-chip>
              <v-chip
                v-if="item.is_deleted == 0"
                class="ma-2"
                color="green"
                label
                text-color="white"
              >
                Active
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon v-if="item.is_deleted == 0" small class="mr-2" @click="editData(item)">
                mdi-pencil
              </v-icon>
              <v-icon v-if="item.is_deleted == 0" small @click="hapusData(item)"> mdi-delete </v-icon>
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
      expanded: [],
      selected: [],
      headersRoles: [
        { value: "role", text: "Role", width: '300px'},
        { value: "company", text: "Perusahaan", width: '300px' },
        { value: "actions", text: this.$t("table.actions") },
      ],
      headers: [
        { value: "fullname", text: this.$t("manajemenpengguna.namalengkap") },
        { value: "username", text: this.$t("manajemenpengguna.username") },
        { value: "email", text: this.$t("manajemenpengguna.email") },
        { value: "roles", text: 'Roles', width: '300px' },
        { value: "last_updated", text: 'Last Update', width: '150px' },
        { value: "is_deleted", text: 'Status' },
        { text: '', value: 'data-table-expand' },
        { value: "actions", text: this.$t("table.actions") },
      ],
      filters: {
        fullname: [],
        username: [],
        email: [],
        // actions: [],
      },
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
    FilteredUsers() {
      return this.users.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
  },
  methods: {
    ...mapActions("user", ["getUsers", "deleteUser", "deleteRoleUser"]),
    columnValueList(val) {
      return this.users.map((d) => d[val]);
    },
    editData(item) {
      // console.log("Mengedit data:", item);
      this.$router.push({
        name: 'user.edit',
        params: { id: item.id}
      });
    },
    hapusRole(data) {
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
          this.deleteRoleUser(data); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
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
