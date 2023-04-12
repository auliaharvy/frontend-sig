<template>
 <div class="change-language">
  <img class="change-icon" src="~@/assets/change-lang.png" alt="change-language">
    <select class="select" v-model="selectedLanguage">
      <option value="id">Bahasa Indonesia</option>
      <option value="en">English</option>
    </select>
  </div>
</template>
  
<script>
export default {
  name: "LocaleSwitcher",
  data() {
    return {
       locales: ["id", "en"],
       selectedLanguage: 'id'
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
  border: 1px solid #2c3e50;
  padding: 4px;
  color: #2c3e50;
  font-weight: bold;
  font-size: 15px;
}
</style>