<template>
  <v-app>
    <Navbar />
    <v-container>
      <h1 class="heading black--text">{{ $t("sidebar.manajemenpengguna") }}</h1>
      <v-spacer></v-spacer>
      <v-col md-12>
        <v-card>
          <v-card>
            <v-card-title style="background: brown; color: white">
              {{ $t("manajemenpengguna.edit") }}
            </v-card-title>
            <v-form>
            <v-layout row wrap class="px-5" style="margin-top: 20px">
              <v-flex class="px-5" xs12 md6 lg6>
                  <v-card-text>
                    <v-text-field
                      outlined
                      :label="$t('manajemenpengguna.namalengkap')"
                      v-model="pengguna.fullname || penggunaSebelumnya.fullname "
                    />
                  </v-card-text>
              </v-flex>
              <v-flex class="px-5" xs12 md6 lg6>
                  <v-card-text>
                    <v-text-field outlined :label="$t('login.namapengguna')"
                    v-model="pengguna.username || penggunaSebelumnya.username " />
                  </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="px-5">
              <v-flex class="px-5" xs12 md6 lg6>
                  <v-card-text>
                    <v-text-field outlined label="Email" 
                    v-model="pengguna.email || penggunaSebelumnya.email"/>
                  </v-card-text>
              </v-flex>
              <v-flex class="px-5" xs12 md6 lg6>
                  <v-card-text>
                    <v-text-field
                      outlined
                      :label="$t('login.katasandi')"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="handleIcon"
                      v-model="pengguna.password || penggunaSebelumnya.password"
                    />
                  </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="px-5">
              <v-flex class="px-5" xs12 md6 lg6>
                  <v-card-action>
                    <v-btn class="success" style="margin-top: -30px">
                      {{ $t("manajemenpengguna.sunting") }}
                    </v-btn>
                    <v-btn
                      v-for="out in outs"
                      router
                      :to="out.route"
                      class="warning"
                      style="margin-top: -30px; margin-left: 20px"
                    >
                      {{ $t("login.kembali") }}
                    </v-btn>
                  </v-card-action>
                </v-flex>
              </v-layout>
            </v-form>
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

export default {
  name: "SuntingPengguna",
  components: {
    Navbar,
    Footer,
    Breadcomp,
  },
  data() {
    return {
      search: "",
      showPassword: false,
      outs: [{ route: "/manajemen-pengguna" }],
      pengguna: {
      fullname: "",
      username: "",
      email: "",
      password: "",
    },
    penggunaSebelumnya: {},
    };
  },
  methods: {
    suntingData() {
    const { fullname, username, email, password } = this.pengguna;
  },
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
  created() {
  // mengambil data dari URL
  this.penggunaSebelumnya = {
    fullname: this.$route.query.fullname,
    username: this.$route.query.username,
    email: this.$route.query.email,
    password: this.$route.query.password,
  };

  // menyalin data sebelumnya ke properti pengguna agar bisa ditampilkan pada form
  this.pengguna = Object.assign({}, this.penggunaSebelumnya);
},

};
</script>
