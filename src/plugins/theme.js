import colors from 'vuetify/lib/util/colors'

export default {
  primary: {
    base: colors.red.darken1,
    darken1: colors.orange.darken2,
  },
  secondary: colors.indigo,
  // All keys will generate theme styles,
  // Here we add a custom `tertiary` color
  tertiary: colors.pink.base,

  sucess: colors.blue,
  good: colors.green,
  warning: colors.deepOrange,
  danger: colors.red
}