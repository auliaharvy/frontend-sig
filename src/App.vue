<template>
  <v-app>
    <app-header v-if="isAuth" />
    <!-- <app-header/> -->
    <v-main>
      <router-view />
    </v-main>
    <!-- <app-footer/> -->
    <app-footer v-if="isAuth" />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import "@/views/global";
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
    ...mapState(["userData"]),
    ...mapGetters(["isAuth", "getRoles"]),
  },
};
</script>
<!-- <style src="./src/views/global.css"></style> -->