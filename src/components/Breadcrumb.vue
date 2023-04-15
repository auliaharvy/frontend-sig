<template>
    <div class="d-flex align-center">
      <v-breadcrumbs class="ml-auto">
    <v-breadcrumbs-item class="bcformat" href="/dashboard">{{$t("sidebar.halamanutama")}} ></v-breadcrumbs-item>
    <v-breadcrumbs-item active>{{ $t('sidebar.activePage') }}</v-breadcrumbs-item>
  </v-breadcrumbs>
</div>
</template>

<script>
export default {
  name: 'Breadcomp',
  props: {
    pageTitle: {
      type: String,
      required: true
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
