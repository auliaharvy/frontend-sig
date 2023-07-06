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
            v-model="selected"
            :loading="loading"
            :headers="headers"
            :search="search"
            :items="filteredTrucks"
            dense
          >
            <template v-slot:header="{ header }">
              <tr class="grey lighten-3 tr-header hidden-sm-and-down">
                <th v-for="header in headers" :key="header.text" style="width: 200px;">
                  <div v-if="filters.hasOwnProperty(header.value)">
                    <v-autocomplete
                      flat
                      hide-details
                      multiple
                      attach
                      chips
                      dense
                      clearable
                      :items="columnValueList(header.value)"
                      v-model="filters[header.value]"
                    >
                      <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 5">
                          <span>
                            {{ item }} 
                          </span>
                        </v-chip>
                        <span v-if="index === 5" class="grey--text caption" > 
                          (+{{ filters[header.value].length - 5 }} others) 
                        </span>
                      </template>
                    </v-autocomplete>
                  </div>
                </th>
              </tr>
            </template>
            <template v-slot:item.is_deleted="{ item }">
              <v-chip
                v-if="item.is_deleted == 1"
                class="ma-2"
                color="red"
                label
                text-color="white"
              >
                Inactive
              </v-chip>
              <v-chip
                v-if="item.is_deleted == 0"
                class="ma-2"
                color="green"
                label
                text-color="white"
              >
                Active
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon v-if="item.is_deleted == 0" small class="mr-2" @click="editData(item)">
                mdi-pencil
              </v-icon>
              <v-icon v-if="item.is_deleted == 0" small @click="hapusData(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-col>
  </v-container>
</template>

<script src="https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.2.28/dist/vuetify.min.js"></script>
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
      selected: [],
      headers: [
        { value: "transporter_code", text: this.$t("trucks.transporter_code"), width: '40%' },
        { value: "license_plate", text: this.$t("trucks.no"), width: '40%' },
        { value: "is_deleted", text: 'Status', width: '40%' },
        { value: "actions", text: this.$t("table.actions"), width: '20%' },
      ],
      filters: {
        transporter_code: [],
        license_plate: [],
        // actions: [],
      },
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
    filteredTrucks() {
      return this.trucks.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
  },
  methods: {
    ...mapActions("truck", ["getTrucks", "deleteTruck", "bulkCreateTruck"]),
    ...mapActions("apiExternal", ["getDataTruck"]),
    columnValueList(val) {
      return this.trucks.map((d) => d[val]);
    },
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
