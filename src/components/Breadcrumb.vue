<template>
    <div class="d-flex align-center">
      <v-breadcrumbs class="ml-auto">
    <v-breadcrumbs-item class="bcformat" href="/dashboard">{{$t("sidebar.halamanutama")}} ></v-breadcrumbs-item>
    <v-breadcrumbs-item href="/kategori">Test</v-breadcrumbs-item>
  </v-breadcrumbs>
</div>
</template>

<script>
export default {
  name: 'Breadcomp',
  props: {
    homeLink: {
      type: String,
      default: '/dashboard'
    },
    homeText: {
      type: String,
      default: 'Beranda'
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.bcformat {
    font-size: 12px;
    color: #fffff;
}

</style>
