<template>
 <div class="change-language">
  <img class="change-icon" src="~@/assets/change-lang.png" alt="change-language">
    <select class="select" v-model="selectedLanguage">
      <option value="id">Indonesia</option>
      <option value="en">English</option>
    </select>
  </div>
</template>
  
<script>
export default {
  name: "LocaleSwitcher",
  data() {
    return {
    options: [
      { value: 'id', text: 'Indonesia' },
      { value: 'en', text: 'English' },
      // Tambahkan opsi bahasa lain sesuai kebutuhan
    ],
    selectedLanguage: localStorage.getItem('language'), // Menyimpan nilai bahasa yang dipilih
  };
  },
  watch: {
    selectedLanguage (payload) {
      this.$i18n.locale = payload
    }
  },
};
</script>

<style scoped>
.change-language {
  display: flex;
  justify-content: center;
  align-items: left;
}
.change-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.select {
  height: 30px;
  border-radius: 8px;
  border: 1px solid #ffffff;
  padding: 4px;
  color: #ffffff;
  font-weight: bold;
  font-size: 15px;
  background-color: #e90e01;
}
</style>