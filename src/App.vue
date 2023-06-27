<template>
  <v-app>
    <app-header v-if="isAuth && this.$route.name != 'sjp-status.view'" />
    <v-main>
      <router-view />
    </v-main>
    <app-footer v-if="isAuth && this.$route.name != 'sjp-status.view'" />
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
    isPrinting: false,
  }),
  computed: {
    ...mapState(["token"]),
    ...mapState(["userData"]),
    ...mapGetters(["isAuth", "getRoles"]),
  },
  created() {
    window.addEventListener('beforeprint', this.handleBeforePrint);
    window.addEventListener('afterprint', this.handleAfterPrint);
  },
  beforeDestroy() {
    window.removeEventListener('beforeprint', this.handleBeforePrint);
    window.removeEventListener('afterprint', this.handleAfterPrint);
  },
  methods: {
    handleBeforePrint() {
      this.isPrinting = true;
    },
    handleAfterPrint() {
      this.isPrinting = false;
    }
  }
};
</script>