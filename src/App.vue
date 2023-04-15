<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Breadcomp from "@/components/Breadcrumb.vue";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Breadcomp
  },

  data: () => ({
    //
  }),
};
</script>

