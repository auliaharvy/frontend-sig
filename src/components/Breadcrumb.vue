<template>
    <div class="align-left">
    <v-breadcrumbs>
      <v-breadcrumbs-item class="bcformat" href="/">{{$t("sidebar.halamanutama")}} ></v-breadcrumbs-item>
      <v-breadcrumbs-item class="bcformat" active>{{ $t(pageTitle) }}</v-breadcrumbs-item>
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
    color: black;
}

</style>
