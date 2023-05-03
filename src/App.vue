<template>
  <v-app>
    <app-header v-if="isAuth" />
    <v-main>
      <router-view />
    </v-main>
    <app-footer v-if="isAuth" />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    'app-header': Navbar,
    'app-footer': Footer
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(["token"]),
    ...mapGetters(["isAuth"]),
  },
};
</script>
