<template>
  <v-form ref="form">
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <loading-overlay :active="loadingApi" :is-full-page="true" loader="bars" />
    <v-container>
      <v-row no-gutters>
        <v-menu
          v-model="tanggal1"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="paramDo.X_TGL1"
              clearable
              label="Tanggal Query dari"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="paramDo.X_TGL1"
            @change="tanggal1 = false"
          ></v-date-picker>
        </v-menu>
      </v-row>
      <v-row no-gutters>
        <v-menu
          v-model="tanggal2"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="paramDo.X_TGL2"
              clearable
              label="Tanggal query ke"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="paramDo.X_TGL2"
            @change="tanggal2 = false"
          ></v-date-picker>
        </v-menu>
      </v-row>
      <v-row no-gutters>
        <v-text-field
          v-model="paramDo.X_WERKS"
          label="Kode Plant"
          :rules="noTruckRules"
          placeholder="79B1"
          outlined
          required
        ></v-text-field>
      </v-row>
      <v-row no-gutters>
        <v-text-field
          v-model="paramDo.X_NOPOLISI"
          :label="$t('sjp.truck')"
          :rules="noTruckRules"
          placeholder="B6672HI"
          outlined
          required
          append-icon="mdi-reload"
          @click:append="fetchDo"
          @keyup.enter.native="fetchDo"
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
          <v-autocomplete
            :label="$t('sjp.noDo')"
            :items="dataDo"
            :rules="idRules"
            outlined
            v-model="sjp.no_do"
            item-text="NO_DO"
            item-value="NO_DO"
            @change="changeDo()"
            required
            clearable
          >
          </v-autocomplete>
        </v-row>
        <v-row no-gutters>
          <v-autocomplete
            label="Multiple SPJ"
            :items="[{id: '0', label: 'Single'}, {id: '1', label: 'Multiple'}]"
            outlined
            v-model="sjp.is_multiple"
            item-text="label"
            item-value="id"
          >
          </v-autocomplete>
        </v-row>

      
      <v-row no-gutters>
        <v-text-field
          v-model="sjp.destination"
          :label="$t('sjp.destination')"
          :rules="idRules"
          outlined
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sjp.transporter"
          :label="$t('sjp.transporter')"
          :rules="idRules"
          outlined
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sjp.driver"
          :label="$t('sjp.driver')"
          :rules="idRules"
          outlined
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-text-field
          v-model="sjp.pallet_quantity"
          :label="$t('sjp.palletQuantity')"
          :rules="palletRules"
          outlined
          required
        ></v-text-field>
      </v-row>

      <v-row no-gutters>
        <v-menu
          v-model="departureForm"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="sjp.departure_time"
              clearable
              :label="$t('sjp.depart')"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="sjp.departure_time"
            @change="etaForm = false"
          ></v-date-picker>
        </v-menu>
      </v-row>

      <v-row no-gutters>
        <v-menu
          v-model="etaForm"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="sjp.eta"
              clearable
              :label="$t('sjp.eta')"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="sjp.eta"
            @change="etaForm = false"
          ></v-date-picker>
        </v-menu>
      </v-row>

      <v-row no-gutters>
        <v-col :col="24">
          <div class="d-flex flex-column">
            <v-btn class="mt-4 red darken-1 text-white" block @click="validate">
              {{ $t("form.submit") }}
            </v-btn>

            <!-- <v-btn color="error" class="mt-4" block @click="reset">
              {{ $t("form.reset") }}
            </v-btn> -->
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "FormOrganization",
  data: () => ({
    etaForm: false,
    departureForm: false,
    tanggal1: false,
    tanggal2: false,
    idRules: [
      (value) => {
        if (value) return true;

        return "this field is required";
      },
    ],
    palletRules: [
      (v) => v > -1 || "cannot input - number",
    ],
    noTruckRules: [
      (v) => !!v || "this field is required",
      (v) => (v && v.length >= 3) || "must be greater than 3 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
  }),
  created() {
    this.getCompanies(); //LOAD DATA COMPANY KETIKA COMPONENT DI-LOAD
    this.setDate();
  },
  computed: {
    ...mapState('roleSet'),
    ...mapState(["errors"]), //LOAD STATE ERROR UNTUK DITAMPILKAN KETIKA TERJADI ERROR VALIDASI
    ...mapState("company", {
      companies: (state) => state.companies, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("company", {
      loadingApi: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("sjp", {
      sjp: (state) => state.sjp, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loading: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("apiExternal", {
      dataDo: (state) => state.dataDo, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      loadingApi: (state) => state.loading, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
      paramDo: (state) => state.paramDo, //LOAD DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapMutations("sjp", ["CLEAR_FORM"]),
    ...mapActions("sjp", ["submitSjp"]),
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("apiExternal", ["getDataDo"]),
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        var roleData = JSON.parse(localStorage.getItem("role"))
        this.sjp.created_by = roleData.user_id;
        this.sjp.updated_by = roleData.user_id;
        this.sjp.id_departure_company = roleData.company_id;
        this.submitSjp(this.sjp).then((response) => {
          this.$swal({
                icon: 'success',
                title: 'Success',
              });
            this.CLEAR_FORM();
            this.$router.push({ name: "sjp" });
          // else {
          //   if (this.errors) {
          //     this.$swal({
          //       icon: 'error',
          //       title: 'error.status',
          //       text: this.errors,
          //     });
          //   }
          // }
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    async changeDo() {
      const foundDo = this.dataDo.find(x => x.NO_DO === this.sjp.no_do);
      this.sjp.no_do = foundDo.NO_DO
          this.sjp.destination = foundDo.NAMA_TOKO;
          this.sjp.destination_code = foundDo.KODE_DA;
          this.sjp.destination_dist = foundDo.NAMA_SOLD_TO;
          this.sjp.destination_dist_code = foundDo.SOLD_TO;
          this.sjp.truck_number = foundDo['LICENSE PLATE'];
          this.sjp.transporter = response[0].NAMA_EXPEDITUR;
          this.sjp.transporter_code = response[0].NO_EXPEDITUR;
          this.sjp.id_transporter_company = 91;
          this.sjp.organization_name = foundDo.NAMA_PLANT;
          this.sjp.organization_code = foundDo.PLANT;
          this.sjp.driver = foundDo.NAMA_SOPIR;
          const beratIsi = foundDo.BERAT_ISI.split(',')[0]
          const tonnage = beratIsi.replace('.','')
          this.sjp.tonnage = parseInt(tonnage) / 1000;
          this.sjp.product_quantity = parseInt(tonnage) / 40;
          this.sjp.packaging = 40;
          this.sjp.pallet_quantity = Math.floor((parseInt(tonnage)/ 1000) / 2);
          this.sjp.departure_time = new Date().toISOString().slice(0, 10);
          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          this.sjp.eta = tomorrow.toISOString().slice(0, 10);
    },
    async setDate() {
      this.paramDo.X_TGL1 = new Date().toISOString().slice(0, 10);
      this.paramDo.X_TGL2 = new Date().toISOString().slice(0, 10);
    },
    async fetchDo() {
      if (!this.paramDo.X_NOPOLISI) {
        this.$swal({
          title: "Truck Number Empty",
          text: "Please Fill Truck Number",
          type: "danger",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok!",
        });
      } else {
        // this.loading = true;
        await this.getDataDo().then((response) => {
          if(response === 'No Data Found') {
            this.$swal({
              title: "No data found",
              text: "No DO Data found",
              type: "danger",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok!",
            });
          } else {
            this.sjp.no_do = response[0].NO_DO
            this.sjp.destination = foundDo.NAMA_TOKO;
            this.sjp.destination_code = foundDo.KODE_DA;
            this.sjp.destination_dist = foundDo.NAMA_SOLD_TO;
            this.sjp.destination_dist_code = foundDo.SOLD_TO;
            this.sjp.truck_number = response[0]['LICENSE PLATE'];
            this.sjp.transporter = response[0].NAMA_EXPEDITUR;
            this.sjp.transporter_code = response[0].NO_EXPEDITUR;
            this.sjp.id_transporter_company = 91;
            this.sjp.organization_name = response[0].NAMA_PLANT;
            this.sjp.organization_code = response[0].PLANT;
            this.sjp.driver = response[0].NAMA_SOPIR;
            const beratIsi = response[0].BERAT_ISI.split(',')[0]
            const tonnage = beratIsi.replace('.','')
            this.sjp.tonnage = parseInt(tonnage) / 1000;
            this.sjp.packaging = 40;
            this.sjp.product_quantity = parseInt(tonnage) / 40;
            this.sjp.pallet_quantity = Math.floor((parseInt(tonnage)/ 1000) / 2);
            this.sjp.departure_time = new Date().toISOString().slice(0, 10);
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            this.sjp.eta = tomorrow.toISOString().slice(0, 10);
          }
        });
        // this.sjp.departure_time = new Date().toISOString().slice(0, 10);
        // var tomorrow = new Date();
        // tomorrow.setDate(tomorrow.getDate() + 1);
        // this.sjp.eta = tomorrow.toISOString().slice(0, 10);
        // this.sjp.destination = "Distributor 1";
        // this.sjp.transporter = "Transporter 1";
        // this.sjp.driver = "Budi";
        // this.sjp.id_departure_company = 4;
        // this.sjp.id_destination_company = 10;
        // this.sjp.id_transporter_company = 51;
        // this.sjp.id_truck = 4;
        // this.sjp.id_driver = 3;
        // this.sjp.no_do = "DO-202305-0010";
        // this.sjp.tonnage = 100;
        // this.sjp.packaging = 60;
        // this.sjp.product_quantity = 80;
        // this.sjp.pallet_quantity = 10;
        // this.loading = false;
      }
    },
  },
  timeLoad() {
    this.sjp.departureTime = new Date().toISOString().slice(0, 10);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.sjp.eta = tomorrow.toISOString().slice(0, 10);
  },
  destroyed() {
    this.CLEAR_FORM(); //KETIKA COMPONENT DITINGGALKAN, BERSIHKAN DATA
  },
};
</script>
