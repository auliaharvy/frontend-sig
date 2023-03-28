<template>
      <v-container class="fill-heigth" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10">
            <v-card class="elevation-6 mt-10">
              <v-window v-model="step">
                <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-card-text class="mt-12">
                      <h4 class="text-center">Login to your acc</h4>
                      <h6 class="text-center grey--text">Login to your acc so u can</h6>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-text-field label="username" outlined dense color="blue" autocomplete="false" class="mt-10"></v-text-field>
                          <v-text-field label="password" outlined dense color="blue" autocomplete="false" type="password"></v-text-field>
                          <v-row>
                            <v-col cols="12" sm="7">
                              <v-checkbox label="Remember Me"></v-checkbox>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
                </v-window-item>
                <v-window-item :value="2">

                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
  data:() => ({
    step :1
  }),
props: {
  source: string
}
}
</script>

<style scoped>
.v-appication .rounded-bl-xl{
  border-bottom-left-radius: 300px !important;
}
.v-appication .rounded-br-xl{
  border-bottom-right-radius: 300px !important;
}
</style>