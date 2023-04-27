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
              {{ $t("manajemenpengguna.tambah") }}
            </v-card-title>
            <v-form @submit.prevent="submitForm">
            <v-layout row wrap class="px-5" style="margin-top: 20px">
              <v-flex class="px-5" xs12 md6 lg6>
                  <v-card-text>
                    <v-text-field
                      outlined
                      :label="$t('manajemenpengguna.namalengkap')"
                      v-model="formData.fullname"
                    />
                  </v-card-text>
              </v-flex>
              <v-flex class="px-5" xs12 md6 lg6>
                  <v-card-text>
                    <v-text-field outlined :label="$t('login.namapengguna')"
                    v-model="formData.username" />
                  </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="px-5">
              <v-flex class="px-5" xs12 md6 lg6>
                  <v-card-text>
                    <v-text-field outlined label="Email"
                    v-model="formData.email" />
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
                      v-model="formData.password"
                    />
                  </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="px-5">
              <v-flex class="px-5" xs12 md6 lg6>
                  <v-card-action>
                    <v-btn class="success" style="margin-top: -30px" type="submit">
                      {{ $t("manajemenpengguna.kirim") }}
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
import axios from "axios";

export default {
  name: "TambahPengguna",
  components: {
    Navbar,
    Footer,
    Breadcomp,
  },
  data() {
    return {
      showPassword: false,
      outs: [{ route: "/manajemen-pengguna" }],
      formData: {
        fullname: "",
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
    submitForm() {
      axios.post('http://localhost:3000/users/register', this.formData)
        .then(response => {
          console.log(this.formData);
          this.$router.push('/manajemen-pengguna');
        })
        .catch(error => {
          console.log(error);
          alert('Gagal menambahkan pengguna.');
        });
    }
  },
};
</script>
