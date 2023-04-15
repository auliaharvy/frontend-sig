<template>
  <v-app>
    <Navbar />
      <v-container fluid>
        <h1 class="heading black--text">{{ $t("sidebar.perandanizin") }}</h1>
        <v-col cols="12" sm="12" md="12">
        <v-row>
          <v-col cols="12" sm="12" md="5">
                <v-card>
                  <v-card-title>
                    {{ $t("perandanizin.menetapkanperan") }}
                  </v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-select outlined
                      :label="$t('perandanizin.peran')">
                    </v-select>
                    </v-form>
                    <v-form>
                      <v-select outlined
                      :label="$t('manajemenpengguna.pengguna')">
                    </v-select>
                    </v-form>
                    <v-form>
                      <v-select outlined
                      :label="$t('perandanizin.perusahaan')">
                    </v-select>
                    </v-form>
                    <v-form>
                      <v-btn class="success">
                        {{ $t("perandanizin.aturperan") }}
                    </v-btn>
                    </v-form>
                    </v-card-text>
                  </v-card>
              </v-col>
              <v-col cols="12" sm="12" md="7">
                <v-card >
                  <v-card-title>
                    {{ $t("perandanizin.aturizin") }}
                  </v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-select outlined
                      :label="$t('perandanizin.peran')">
                    </v-select>
                    </v-form>
                    <v-form>
                      <v-btn color="secondary">
                        {{ $t("perandanizin.cek") }}
                    </v-btn>
                    </v-form>
                    <v-form style="margin-top: 20px;">
                      <v-card>
                        <v-card-title>
                          {{ $t("perandanizin.izin") }}
                        </v-card-title>
                        <v-card-text style="height: 300px; overflow-y: auto;">
                          <v-container>
                            <v-row>
                              <v-col
                                cols="12"
                                v-for="permission in Object.keys(izin)"
                                :key="permission"
                              >
                                <v-checkbox
                                  v-model="izin[permission.toLowerCase()]"
                                  :label="`Izin ${permission}`"
                                ></v-checkbox>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-form>
                    <v-form style="margin-top: 20px;">
                      <v-btn class="success">
                        {{ $t("perandanizin.aturizin") }}
                    </v-btn>
                    </v-form>
                    </v-card-text>
                  </v-card>
              </v-col>
          </v-row>
      </v-col>
      </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
// @ is an alias to /src
export default {
  name: "peran-dan-izin",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      izin: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
      },
    };
  },
};
</script>
