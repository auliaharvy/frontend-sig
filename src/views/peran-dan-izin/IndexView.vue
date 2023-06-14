<template>
  <v-container>
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
                  :items="users.data"
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
                  :items="companies.data"
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
                <v-btn class="success" @click="setRole()">
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
                <v-btn color="secondary">
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
                          <v-checkbox
                            v-for="permission in permissions"
                            :key="permission.id"
                            :value="permission.id"
                            v-model="new_permission"
                            :label="`${permission.name}`"
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-form>
              <v-form style="margin-top: 20px">
                <v-btn class="success" @click="setPermission">
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
  data() {
    return {
      userRole: {
        role_id: '',
        user_id: '',
        company_id: '',
      },
      role_selected: "",
      new_permission: [],
      loading: false,
      alert_permission: false,
      alert_role: false,
    };
  },
  created() {
    this.getRoles();
    this.getAllPermission();
    this.getUsers();
    this.getCompanies();
  },
  computed: {
    ...mapState(["errors"]),
    ...mapState("user", {
      users: (state) => state.users,
      roles: (state) => state.roles,
      permissions: (state) => state.permissions,
      role_permission: (state) => state.role_permission,
    }),
    ...mapState("company", {
      companies: (state) => state.companies
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
    ...mapActions("company", ["getCompanies"]),
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
      this.loading = true;
      this.getRolePermission(this.role_selected).then(() => {
        this.loading = false;
        this.new_permission = this.role_permission;
      });
    },
    setPermission() {
      console.log(this.new_permission);
      console.log(this.permissions);
      const dataRolePermissions = [];
      for(var i = 0; i < this.new_permission.length; i++) {
          var obj = {}; // <---- Move declaration inside loop

          obj['id_permission'] = this.new_permission[i];
          obj['id_role'] = this.role_selected;
          dataRolePermissions.push(obj);
      }
      this.setRolePermission({
        dataRolePermissions
      }).then((res) => {
        if (res.status == "success") {
          this.alert_permission = true;
          setTimeout(() => {
            this.role_selected = "";
            this.new_permission = [];
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
