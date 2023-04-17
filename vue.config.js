const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    port : 5000
  },

  lintOnSave:false,

  pluginOptions: {
    i18n: {
      locale: 'id',
      fallbackLocale: 'id',
      localeDir: 'locales',
      enableInSFC: false,
      includeLocales: false,
      enableBridge: true
    }
  }
})
