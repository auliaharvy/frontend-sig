<template>
  <v-app>
    <app-header v-if="isAuth && this.$route.name != 'sjp-status.view' && this.$route.name != 'claim-pallet.view'" />
    <v-main>
      <router-view />
    </v-main>
    <app-footer v-if="isAuth && this.$route.name != 'sjp-status.view' && this.$route.name != 'claim-pallet.view'" />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Navbar from "@/components/Navbar"; // AMBIL COMPONENT NAVBAR
import Footer from "@/components/Footer"; // AMBIL COMPONENT FOOTER 
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