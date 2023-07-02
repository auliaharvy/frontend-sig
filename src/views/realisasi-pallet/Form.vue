<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-autocomplete
          :label="$t('newPallet.trxNumber')"
          :items="newPallets"
          :rules="idRules"
          outlined
          readonly
          v-model="palletRealization.id_trx_new_pallet"
          item-text="trx_number"
          item-value="id"
        >
        </v-autocomplete>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="palletRealization.sisa_qty_pallet"
          :label="$t('palletRealization.qtySisa')"
          :rules="idRules"
          readonly
          outlined
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="palletRealization.qty_pallet"
          :label="$t('palletRealization.qty')"
          :rules="[qtyRules(palletRealization.qty_pallet, palletRealization.sisa_qty_pallet)]"
          outlined
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-col :col="24">
          <div class="d-flex flex-column">
            <v-btn color="success" class="mt-4" block @click="validate">
              {{ $t("form.submit") }}
            </v-btn>

            <v-btn color="error" class="mt-4" block @click="reset">
              {{ $t("form.reset") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "FormAddPalletRealization",
  data: () => ({
    palletRules: [
      (v) => v > -1 || "cannot input - number",
    ],
    idRules: [
      (value) => {
        if (value) return true;

        return "this field is required";
      },
    ],
    noTruckRules: [
      (v) => !!v || "this field is required",
      (v) => (v && v.length >= 3) || "must be greater than 3 characters",
    ],
    // qtyRules: [
    //   (v) => !!v || "Quantity is required",
    //   (v) => v > this.palletRealization.sisa_qty_pallet || "Quantity is greater than needed",
    // ],
  }),
  created() {
    this.getNewPallets(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("newPallet", {
      newPallets: (state) => state.newPallets, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("palletRealization", {
      palletRealization: (state) => state.palletRealization, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("palletRealization", ["CLEAR_FORM"]),
    ...mapActions("newPallet", ["getNewPallets"]),
    ...mapActions("palletRealization", ["submitPalletRealization"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        var roleData = JSON.parse(localStorage.getItem("role"))
        this.palletRealization.created_by = roleData.user_id;
        this.palletRealization.updated_by = roleData.user_id;
        this.submitPalletRealization(this.palletRealization).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "pallet-realization" });
        });
      }
    },
    qtyRules(v, max){
      if (v > max) {
        return "Quantity is greater than requested";  
      } else if(v < 0) {
        return "cannot input - number";  
      } else {
        return true;
      }
    },
    reset() {
      this.palletRealization.qty_pallet = 0
    },
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
