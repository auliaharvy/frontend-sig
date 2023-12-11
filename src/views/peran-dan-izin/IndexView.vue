<template>
  <v-container>
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <h1 class="heading black--text">{{ $t("sidebar.perandanizin") }}</h1>
    <v-col cols="12" sm="12" md="12">
      <v-row>
        <v-col cols="12" sm="12" md="5">
          <v-card>
            <v-card-title>
              {{ $t("perandanizin.menetapkanperan") }}
            </v-card-title>
            <v-card-text>
              <div class="alert alert-success" v-if="alert_role">Role Has Been Added</div>
              <v-form>
                <v-autocomplete
                  :label="$t('perandanizin.peran')"
                  :items="roles"
                  :rules="idRules"
                  outlined
                  v-model="userRole.role_id"
                  item-text="name"
                  item-value="id"
                  required
                  clearable
                >
                </v-autocomplete>
              </v-form>
              <v-form>
                <v-autocomplete
                  :label="$t('perandanizin.pengguna')"
                  :items="users"
                  :rules="idRules"
                  outlined
                  v-model="userRole.user_id"
                  item-text="username"
                  item-value="id"
                  required
                  clearable
                >
                </v-autocomplete>
              </v-form>
              <v-form>
                <v-autocomplete
                  :label="$t('perandanizin.perusahaan')"
                  :items="companiesAll.data"
                  :rules="idRules"
                  outlined
                  v-model="userRole.company_id"
                  item-text="name"
                  item-value="id"
                  required
                  clearable
                >
                </v-autocomplete>
              </v-form>
              <v-form>
                
                <v-btn class="red darken-1 text-white" @click="setRole()">
                  {{ $t("perandanizin.aturperan") }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="7">
          <v-card>
            <v-card-title>
              {{ $t("perandanizin.aturizin") }}
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-autocomplete
                  :label="$t('perandanizin.peran')"
                  :items="roles"
                  outlined
                  v-model="role_selected"
                  item-text="name"
                  item-value="id"
                  required
                  clearable
                >
                </v-autocomplete>
              </v-form>
              <v-form>
                <v-btn class="red darken-1 text-white" @click="checkPermission">
                  {{ $t("perandanizin.cek") }} 
                </v-btn>
              </v-form>
              <v-form style="margin-top: 20px">
                <v-card>
                  <v-card-title>
                    {{ $t("perandanizin.izin") }}
                  </v-card-title>
                  <v-card-text style="height: 300px; overflow-y: auto">
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                        >
                          <!-- <v-checkbox
                            v-for="permission in permissions"
                            :key="permission.id"
                            :value="permission.id"
                            v-model="new_permission"
                            :label="`${permission.name}`"
                          ></v-checkbox> -->
                          <template v-for="(row, index) in permissions">
                            <input type="checkbox" 
                            class="minimal-red" 
                            :key="index"
                            :value="row.name"
                            :checked="role_permission.findIndex(x => x.id_permission == row.id) != -1"
                            @click="addPermission(row.id)"
                            > {{ row.name }} <br :key="'row' + index">
                            <br :key="'enter' + index" v-if="(index+1) %4 == 0">
                          </template>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-form>
              <v-form style="margin-top: 20px">
                <v-btn class="red darken-1 text-white" @click="setPermission">
                  {{ $t("perandanizin.aturizin") }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "SetPermission",
  data: () => ({
      userRole: {
        role_id: '',
        user_id: '',
        company_id: '',
      },
      idRules: [
        (value) => {
          if (value) return true;

          return "this field is required";
        },
      ],
      role_selected: "",
      new_permission: [],
      loading: false,
      alert_permission: false,
      alert_role: false,
  }),
  created() {
    this.getRoles();
    this.getAllPermission();
    this.getUsers();
    this.getCompaniesAll();
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("user", {
      users: (state) => state.users,
      roles: (state) => state.roles,
      permissions: (state) => state.permissions,
      role_permission: (state) => state.role_permission,
      success: (state) => state.success,
    }),
    ...mapState("dropdown", {
      companiesAll: (state) => state.companiesAll
    }),
  },
  methods: {
    ...mapActions("user", [
      "getUsers",
      "getRoles",
      "getAllPermission",
      "getRolePermission",
      "setRolePermission",
      "setRoleUser",
    ]),
    ...mapActions("dropdown", ["getCompaniesAll"]),
    ...mapMutations("user", ["CLEAR_ROLE_PERMISSION"]),
    setRole() {
      this.setRoleUser(this.userRole).then(() => {
        this.alert_role = true;
        setTimeout(() => {
          this.userRole = {
            role_id: '',
            user_id: '',
            company_id: '',
          };
          this.alert_role = false;
        }, 1000);
      });
    },
    addPermission(name) {
      // console.log(this.new_permission);
      const record = this.new_permission.find((el) => el.name == name);
      if (record) {
        this.new_permission.splice(this.new_permission.indexOf(record), 1);
      } else {
        this.new_permission.push({
          name,
        });
      }
    },
    checkPermission() {
      // console.log(this.new_permission);
      // console.log(this.role_permission);
      this.loading = true;
      this.getRolePermission(this.role_selected).then(() => {
        this.loading = false;
        this.new_permission = this.role_permission;
      });
    },
    setPermission() {
      // console.log(this.new_permission);
      // console.log(this.role_permission);
      // console.log(this.permissions);
      const dataRolePermissions = [];
      for(var i = 0; i < this.new_permission.length; i++) {
          var obj = {}; // <---- Move declaration inside loop

          obj['id_permission'] = this.new_permission[i].name;
          obj['id_role'] = this.role_selected;
          dataRolePermissions.push(obj);
      }
      console.log(dataRolePermissions);
      this.setRolePermission({
        dataRolePermissions
      }).then((res) => {
        // if (res.status == "success") {
        this.$swal(res.message);
        if (res.message != "") {
          console.log(res);
          this.alert_permission = true;
          setTimeout(() => {
            this.role_selected = "";
            this.new_permission = [];
            // this.role_permission = [];
            this.loading = false;
            this.alert_permission = false;
            this.CLEAR_ROLE_PERMISSION();
          }, 1000);
        }
      });
    },
  },
};
</script>

<style type="text/css">
.tab-pane {
  height: 150px;
  overflow-y: scroll;
}
</style>
