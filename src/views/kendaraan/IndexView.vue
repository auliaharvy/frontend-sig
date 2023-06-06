<template>
  <v-container>
    <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("trucks.trucks") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <v-btn @click="sinkronTruk()" >{{ $t("trucks.add") }}</v-btn>
              <export-excel
                :data="trucks.data"
                :fields="json_fields"
                worksheet="Sheet Truck"
                name="data-truck.xls"
              >
              <v-btn style="margin-left: 20px">{{
                $t("manajemenpengguna.unduh")
              }}</v-btn>
            </export-excel>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              prepend-icon="mdi-search"
              :label="$t('manajemenpengguna.cari')"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :loading="loading"
            :headers="headers"
            :search="search"
            :items="trucks.data"
            dense
          >
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editData(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="hapusData(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";
// @ is an alias to /src
export default {
  name: "ManajemenKendaraan",
  components: {
    Breadcomp,
  },
  data() {
    return {
      headers: [
        { value: "transporter_code", text: this.$t("trucks.transporter_code"), width: '40%' },
        { value: "license_plate", text: this.$t("trucks.no"), width: '40%' },
        { value: "actions", text: this.$t("table.actions"), width: '20%' },
      ],
      json_fields: {
        "Code": "transporter_code",
        "License Plate": "license_plate",
      },
      items: [],
      search: "",
      adds: { route: "/trucks/add" },
    };
  },
  created() {
    this.getTrucks(); //LOAD DATA SJP KETIKA COMPONENT DI-LOAD
  },
  computed: {
    ...mapState(["userData"]),
    ...mapState("truck", {
      trucks: (state) => state.trucks, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("apiExternal", {
      dataTruck: (state) => state.dataTruck, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
    ...mapState("truck", {
      loading: (state) => state.loading, //MENGAMBIL DATA CUSTOMER DARI STATE CUSTOMER
    }),
  },
  methods: {
    ...mapActions("truck", ["getTrucks", "deleteTruck", "bulkCreateTruck"]),
    ...mapActions("apiExternal", ["getDataTruck"]),
    editData(item) {
      this.$router.push({
        name: 'trucks.edit',
        params: { id: item.id}
      });
    },
    async sinkronTruk() {
      await this.getDataTruck().then((result) => {
        var dataSinkron = {
          id_company: 4,
          data: result.detailData,
          createdBy: this.userData.data.id,
          updatedBy: this.userData.data.id
        }
        this.bulkCreateTruck(dataSinkron)
        console.log(dataSinkron);
      });

    },
    hapusData(item) {
      this.$swal({
        title: "Are you sure?",
        text: "This will delete record Permanently!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.value) {
          this.deleteTruck(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
  },
};
</script>
<style scoped>
.warna-font {
  color: white;
}
</style>
