<template>
  <v-container>
    <v-col md-12>
      <v-card>
        <v-card-title>
          {{ $t("sjpStatus.index") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>
            <!-- <v-btn router v-if="$can('create sjp')" :to="adds.route">{{ $t("palletTransfer.add") }}</v-btn> -->
            <!-- <v-btn router v-if="$can('create sjp status')" :to="adds.route">{{ $t("sjpStatus.add") }}</v-btn> -->
            <v-btn style="margin-left: 20px" @click="dialogExport = true">{{
              $t("manajemenpengguna.unduh")
            }}</v-btn>
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
            :items="FilteredSjpStatuss"
            mobile
            dense
          >
            <template class="hidden-sm-and-down" v-slot:header="{ header }">
              <tr class="grey lighten-3 tr-header hidden-sm-and-down">
                <th v-for="header in headers" :key="header.text">
                  <div v-if="filters.hasOwnProperty(header.value)">
                    <v-autocomplete
                      hide-selected
                      multiple
                      attach
                      small-chips
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
           <template v-slot:item.is_sendback="{ item }">
              <p class="text-normal" v-if="item.is_sendback == 0">Send</p>
              <p class="text-normal" v-else-if="item.is_sendback == 1">Sendback</p>
            </template>

            <template v-slot:item.status="{ item }">
              <p class="text-normal" v-if="item.status == 0">Sending</p>
              <p class="text-green" v-else-if="item.status == 1">Received</p>
            </template>

            <template v-slot:item.sending_driver_approval="{ item }">
              <v-btn v-if="item.sending_driver_approval != 0 || item.sending_driver_approval != '0'" @click="locationToImage($API_URL + item.sending_driver_approval)" class="cyan darken-4" small>
                <v-icon small class="mr-2">mdi-image</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.receiving_driver_approval="{ item }">
              <v-btn v-if="item.receiving_driver_approval != 0 || item.receiving_driver_approval != '0'" @click="locationToImage($API_URL + item.receiving_driver_approval)" class="cyan darken-4" small>
                <v-icon small class="mr-2">mdi-image</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.tinjau="{ item }">
              <router-link
                :to="{ name: 'sjp-status.view', params: { id: item.id } }"
              >
                <v-btn class="cyan darken-4" small><v-icon small class="mr-2">mdi-magnify</v-icon></v-btn>
              </router-link>
            </template>

            <template v-slot:item.actions="{ item }">
              <router-link
                :to="{ name: 'sjp-status.receive', params: { id: item.id } }"
                v-if="item.status_sjp == 1 && item.is_sendback == 0 && $can('update sjp status') && item.id_destination_company == roleUser.company_id"
              >
                <v-btn class="green darken-0" small>{{ $t("sjpStatus.receive") }}</v-btn>
              </router-link>
              <router-link
                :to="{ name: 'sjp-status.receive', params: { id: item.id } }"
                v-if="item.status_sjp == 3 && item.is_sendback == 1 && $can('update sjp status') && item.id_departure_company == roleUser.company_id"
              >
                <v-btn class="green darken-0" small>{{ $t("sjpStatus.receive") }}</v-btn>
              </router-link>
              <router-link
                :to="{ name: 'sjp-status.sendback', params: { id: item.id } }"
                v-if="item.status_sjp == 2 && item.is_sendback == 0 && $can('create sjp status') && item.status == 1 && item.id_destination_company == roleUser.company_id"
              >
                <v-btn class="green darken-0" small>{{ $t("sjpStatus.sendbackSjp") }}</v-btn>
              </router-link>
              <!-- <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        class="ma-2"
                        text
                        icon
                        v-if="item.status == 0 && $can('update sjp status')"
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
                      >
                        <v-icon small class="mr-2">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit data</span>
                  </v-tooltip>
                </template>
                <v-list>
                  <v-list-item v-for="(list, i) in listEdit" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        ><v-btn router :to="list.href+'/'+item.id" small text>
                          <v-icon left>
                            {{ list.icon }}
                          </v-icon>
                          {{ list.text }}
                        </v-btn></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-icon v-if="item.status === 0 && $can('delete sjp status')" small @click="hapusData(item)"> mdi-delete </v-icon> -->
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-col>
 
    <v-dialog v-model="dialogExport" width="auto">
      <v-card>
        <v-card-text>
          <v-date-picker
            v-model="downloadRange"
            @change="getExportData()"
            range
          ></v-date-picker>
          <v-text-field
            v-model="dateRangeText"
            label="Date range"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="totalDataDownload"
            label="Total Data"
            prepend-icon="mdi-file-multiple"
            readonly
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <export-excel
              :data="exportData.data"
              :fields="json_fields"
              worksheet="Sheet SJP Status"
              name="data-sjp-status.xls"
            >
              <v-btn color="primary" block>Download</v-btn>
            </export-excel>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Breadcomp from "@/components/Breadcrumb.vue";

// @ is an alias to /src
export default {
  name: "SJPStatus",
  components: {
    Breadcomp,
  },
  data() {
    return {
      roleUser: {},
      completeTrxNumber: false,
      totalDataDownload: 0,
      selected: [],
      dialogExport: false,
      dialogFilter: true,
      selectedColumn: [],
      selectedValueColumn: [],
      downloadRange: [],
      downloadRange: [],
      selectedItem: 1,
      name: ['a', 'b', 'c'],
      headers: [
        { value: "trx_number", text: this.$t("sjpStatus.trxNumber"), width: "200px"},
        { value: "sjp_number", text: this.$t("sjpStatus.sjpNumber"), width: "180px"},
        { value: "sender_name", text: this.$t("sjpStatus.sender"), width: "180px" },
        { value: "receiver_name", text: this.$t("sjpStatus.receiver"), width: "180px" },
        { value: "is_sendback", text: this.$t("sjpStatus.sendback"), width: "180px" },
        { value: "status", text: this.$t("sjpStatus.status"), width: "180px" },
        { value: "note", text: this.$t("sjpStatus.note"), width: "180px" },
        { value: "sending_driver_approval", text: this.$t("sjpStatus.sending_driver_approval"), width: "100px" },
        { value: "receiving_driver_approval", text: this.$t("sjpStatus.receiving_driver_approval"), width: "100px" },
        { value: "tinjau", text: this.$t("sjpStatus.preview"), width: "100px"},
        { value: "actions", text: this.$t("table.actions"), width: "80px" },
      ],
      filters: {
        trx_number: [],
        sjp_number: [],
        sender_name: [],
        receiver_name: [],
        is_sendback: [],
        status: [],
        note: [],
      },
      items: [],
      search: "",
      adds: { route: "/sjp-status/add" },
      edits: { route: "/sjp-status/edit" },
      listEdit: [
        {
          text: "Receive",
          icon: "mdi-call-received",
          href: "/sjp-status/receive",
        },
      ],
      json_fields: {
        "SJPS Number": "trx_number",
        "SJP Number": "sjp_number",
        "Departure": "departure_company",
        "Destination": "destination_company",
        "Transporter": "transporter_company",
        "Checker Sender": "sender_name",
        "Checker Receiver": "receiver_name",
        "Good Pallet": "good_pallet",
        "TBR Pallet": "tbr_pallet",
        "BER Pallet": "ber_pallet",
        "Missing Pallet": "missing_pallet",
        "Status": "status",
        "is_sendback": "is_sendback",
        "note": "note",
      },
    };
  },
  created() {
    this.getRoleSet();
    this.getSjpStatuss().then(() => {
      console.log(this.sjpStatuss)
      console.log(this.trx_number());
      console.log(this.sjp_number());
      console.log(this.sender_name());
      console.log(this.receiver_name());
      console.log(this.is_sendback());
      console.log(this.status());
      console.log(this.note());
    });
  },
  computed: {
    ...mapState(['errors']),
    ...mapState("sjpStatus", {
      sjpStatuss: (state) => state.sjpStatuss, // MENGAMBIL STATE SJP STATUS
      exportData: (state) => state.exportData,
      loading: (state) => state.loading,
    }),
    FilteredSjpStatuss() {
      return this.sjpStatuss.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
    dateRangeText () {
      return this.downloadRange.join(' ~ ')
    },
  },
  watch: {
    selectedColumn: function(val){
      const nameColumn = val[val.length-1];
      console.log(nameColumn);
      if(nameColumn == 'trx_number') this.selectedValueColumn = this.trx_number();
      if(nameColumn == 'sjp_number') this.selectedValueColumn = this.sjp_number();
      if(nameColumn == 'sender_name') this.selectedValueColumn = this.sender_name();
      if(nameColumn == 'receiver_name') this.selectedValueColumn = this.receiver_name();
      if(nameColumn == 'is_sendback') this.selectedValueColumn = this.is_sendback();
      if(nameColumn == 'status') this.selectedValueColumn = this.status();
      if(nameColumn == 'note') this.selectedValueColumn = this.note();
      // const nameColumn = val[val.length-1];
      // console.log(nameColumn);
      // this.selectedValueColumn = this.sjpStatuss
      // for (var i = 0; i < this.sjpStatuss.length; i++) {
      //   this.selectedValueColumn.push(this.sjpStatuss[i]);
      // }
      // console.log(this.selectedValueColumn)
    }
  },
  methods: {
    ...mapActions("sjpStatus", ["getSjpStatuss", "getExportDataSjpStatuss","deleteSjpStatus", "getDownloadImage"]),
    shouldShowItem(item) {
      // const filteredList = this.selectedColumn.filter(
      //   (name) => name.selectedWithAll === false
      // );
      // const itemIndex = this.selectedColumn.findIndex((n) => n.text === item.text);
      // if (itemIndex >= 5) return false;

      // const foundItem = this.selectedNames.find(
      //   (name) => name.text === item.text
      // );
      // return !foundItem.selectedWithAll;
    },
    onchange(value){
      console.log(value);
    },
    handleItem(item){
      // const itemIndex = this.selectedColumn.findIndex((n) => n.text === item);
      // console.log(itemIndex);
      // if (itemIndex >= 5) return false;

      // const column = this.selectedValueColumn.column;
      // const foundItem = column.find(
      //   (name) => name === item ? item : 'tidak ada'
      // );
      // console.log(foundItem);

      // return !foundItem;
      console.log(item);
    },
    filterByColumn(){
      console.log('filterbycolumn');
    },
    trx_number(){
      const trx_number = [];
      for (var i = 0; i < this.sjpStatuss.length; i++) {
        trx_number.push(this.sjpStatuss[i].trx_number);
      }
      return { column: trx_number, title: 'SJPS Number' } ;
    },
    sjp_number(){
      const sjp_number = [];
      for (var i = 0; i < this.sjpStatuss.length; i++) {
        sjp_number.push(this.sjpStatuss[i].sjp_number);
      }
      return { column: sjp_number, title: 'SJP Number' };
    },
    sender_name(){
      const sender_name = [];
      for (var i = 0; i < this.sjpStatuss.length; i++) {
        sender_name.push(this.sjpStatuss[i].sender_name);
      }
      return { column: sender_name, title: 'Sender' };
    },
    receiver_name(){
      const receiver_name = [];
      for (var i = 0; i < this.sjpStatuss.length; i++) {
        receiver_name.push(this.sjpStatuss[i].receiver_name);
      }
      return { column: receiver_name, title: 'Receiver' };
    },
    is_sendback(){
      const is_sendback = [];
      for (var i = 0; i < this.sjpStatuss.length; i++) {
        if(this.sjpStatuss[i].is_sendback == 0) is_sendback.push('Send');
        if(this.sjpStatuss[i].is_sendback == 1) is_sendback.push('Sendback');
      }
      return { column: is_sendback, title: 'Sendback' };
    },
    status(){
      const status= [];
      for (var i = 0; i < this.sjpStatuss.length; i++) {
        if(this.sjpStatuss[i].status == 0) status.push('Sending');
        if(this.sjpStatuss[i].status == 1) status.push('Received');
      }
      return { column: status, title: 'Status' };
    },
    note(){
      const note = [];
      for (var i = 0; i < this.sjpStatuss.length; i++) {
        note.push(this.sjpStatuss[i].note);
      }
      return { column: note, title: 'Note' };
    },

    locationToImage(name) {
      window.open(name, '_blank');
      // window.location.href = name;
    },
    columnValueList(val) {
      return this.sjpStatuss.map((d) => d[val]);
    },
    editData(item) {
      // Logika untuk mengedit data
      console.log("Mengedit data:", item);
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
          this.deleteSjpStatus(item.id); //JIKA SETUJU MAKA PERMINTAAN HAPUS AKAN DI EKSEKUSI
        }
      });
    },
    getExportData() {
      this.getExportDataSjpStatuss(this.downloadRange).then((result) => {
        this.totalDataDownload = result.data.length
      });
    },
    getRoleSet() {
      this.roleUser = JSON.parse(localStorage.getItem("role"));
    },
  },
};
</script>
<style scoped>
.warna-font {
  color: white;
}
.text-blue {
  vertical-align: middle;
  color: #0073b7 !important;
  display: table-cell;
  vertical-align: middle;
}
.text-green {
  vertical-align: middle;
  color: #00a65a !important;
  display: table-cell;
  vertical-align: middle;
}
.text-red {
  vertical-align: middle;
  color: red !important;
  display: table-cell;
  vertical-align: middle;
}
.text-normal {
  display: table-cell;
  vertical-align: middle;
}

.text-strike {
  text-decoration: line-through;
  display: table-cell;
  vertical-align: middle;
}
</style>
