<template>
 <div class="change-language">
  <img class="change-icon" src="~@/assets/change-lang.png" alt="change-language">
  <select class="select" v-model="selectedLanguage">
      <option v-for="option in options" :value="option.value" :key="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "LocaleSwitcher",
  data() {
    return {
      selectedLanguage: localStorage.getItem('language'), // Menyimpan nilai bahasa yang dipilih
    };
  },
  computed: {
    ...mapState({
      options: state => state.lang.options,
    }),
  },
  methods: {
    ...mapActions('lang', ['setLanguage', 'setSelectedLanguageOption'])
    },
  watch: {
    async selectedLanguage(payload) {
    await this.setLanguage(payload);
    await this.setSelectedLanguageOption(payload);
    this.$i18n.locale = payload;
    },
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