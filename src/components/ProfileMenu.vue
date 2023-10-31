<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-y
      location="end"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon small v-on="on">
          <v-avatar color="white" size="30">
            <span class="red--text" v-if="userData">{{
              userData.data.initials
            }}</span>
          </v-avatar>
        </v-btn>
        <v-icon small right>mdi-menu-down</v-icon>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                userData.data.fullname
              }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ userData.data.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>


        <v-card-actions>
          <v-btn variant="text" @click="editProfile()">
            Profile
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="doLogout()">
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LocaleSwitcher",
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      languageMenu: false,
      selectedLanguage: localStorage.getItem("language"), // Menyimpan nilai bahasa yang dipilih
    };
  },
  computed: {
    ...mapState(["userData"]),
    ...mapState({
      options: (state) => state.lang.options,
    }),
  },
  methods: {
    ...mapActions("auth", [
      "logout",
    ]),
    editProfile() {
      // console.log("Mengedit data:", item);
      var userData = JSON.parse(localStorage.getItem("userData"));
      this.$router.push({
        name: 'user.edit',
        params: { id: userData.data.id}
      });
    },
    ...mapActions("lang", ["setLanguage", "setSelectedLanguageOption"]),
    async doLogout() {
      this.logout().then(() => {
        this.$router.push({ name: "loginView" }).then(() => { window.location.reload() });
      });
      // return new Promise((resolve, reject) => {
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("userData");
      //   localStorage.removeItem("role");
      //   localStorage.removeItem("permission");
      //   resolve();
      // }).then(() => {
      //   this.$router.push("/login");
      // });
    },
  },
  watch: {
    // async selectedLanguage(payload) {
    //   await this.setLanguage(payload);
    //   await this.setSelectedLanguageOption(payload);
    //   this.$i18n.locale = payload;
    // },
    activeLanguage() {
      return this.selectedLanguage;
    },
  },
};
</script>

<style scoped>
.change-language {
  display: flex;
  justify-content: center;
  align-items: left;
}
.change-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.select {
  height: 30px;
  border-radius: 8px;
  border: 1px solid #ffffff;
  padding: 4px;
  color: #ffffff;
  font-weight: bold;
  font-size: 15px;
  background-color: #e90e01;
}
</style>
