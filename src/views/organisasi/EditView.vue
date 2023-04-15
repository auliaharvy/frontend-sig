<template>
  <v-app>
    <Navbar />
      <v-container>
        <h1 class="heading black--text">{{ $t("sidebar.manajemenpengguna") }}</h1>
        <v-spacer></v-spacer>
        <v-col md-12>
        <v-card>
                <v-card>
                    <v-card-title style="background: brown; color: white;">
                      {{ $t("manajemenpengguna.edit") }}
                    </v-card-title>
                <v-layout row wrap class="px-5" style="margin-top: 20px;">
                      <v-flex class="px-5" xs12 md6 lg6>
              <v-form>
                <v-card-text>
                  <v-text-field outlined
                    :label="$t('manajemenpengguna.namalengkap')"
                  />
                </v-card-text>
              </v-form>
            </v-flex>
            <v-flex class="px-5" xs12 md6 lg6>
              <v-form>
                <v-card-text>
                  <v-text-field outlined
                    :label="$t('login.namapengguna')"
                  />
                </v-card-text>
              </v-form>
            </v-flex>
          </v-layout>
        <v-layout row wrap class="px-5">
             <v-flex class="px-5" xs12 md6 lg6>
              <v-form>
                <v-card-text>
                  <v-text-field outlined
                    label="Email"
                  />
                </v-card-text>
              </v-form>
            </v-flex>
            <v-flex class="px-5" xs12 md6 lg6>
              <v-form>
                <v-card-text>
                  <v-text-field outlined
                    :label="$t('login.katasandi')"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="handleIcon"
                  />
                </v-card-text>
              </v-form>
            </v-flex>
            </v-layout>
            <v-layout row wrap class="px-5">
             <v-flex class="px-5" xs12 md6 lg6>
              <v-form>
                <v-card-action>
              <v-btn class="success" style="margin-top: -30px;">
                    {{ $t("manajemenpengguna.sunting") }}
                    </v-btn>
                    <v-btn 
                    v-for="out in outs"
                    router
                    :to="out.route"
                    class="warning" 
                    style="margin-top: -30px; 
                    margin-left: 20px;">
                    {{ $t("login.kembali") }}
                    </v-btn>
                  </v-card-action>
              </v-form>
            </v-flex>
            </v-layout>
            
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
import en from "@/locales/en.json";
import id from "@/locales/id.json";
// @ is an alias to /src
export default {
  name: "TambahPengguna",
  components: {
    Navbar,
    Footer,
    Breadcomp
  },
  data() {
        return {
            search: '',
            showPassword: false,
            outs: [{ route: "/manajemen-pengguna" }],
        }
    },
  methods: {
    handleIcon() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>
