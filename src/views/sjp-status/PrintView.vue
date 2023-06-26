<template>
  <v-container>
    <v-col md-12>
      <v-card style="display: flex; justify-content:center; padding-top: 50px; padding-bottom: 50px; background-color: #F5F5F5;">
        <!-- <v-card style="display: flex; justify-content:center; flex-direction: column; width: 33%; padding: 30px;"> -->
        <v-card class="print-section" style="display: flex; justify-content:center; flex-direction: column; width: 287px; padding: 15px;">
          <div style="text-align: center; font-size: 12px; padding-bottom: 18px;">SJP Status Print</div>
          <div style="text-align: center; font-size: 10px; font-weight: bold; padding-bottom: 14px;"><strong>{{ sjpStatus.sjp_number }}</strong></div>
          <router-link
            :to="{ name: 'sjp-status.receive', params: { id: id } }"
            style="display: flex; justify-content: center;"
          >
            <qrcode-vue :value="this.$route.params.id" :size="100" level="H" />
          </router-link>

          <div style="text-align: center; font-size: 12px; font-weight: bold; padding-top: 18px;"><strong>Pallet</strong></div>
            <table style="width: 100%;">
              <tr style="width: 100%;">
                <td style="width: 36%; font-size: 12px;">Good Pallet</td>
                <td style="width: 2%">:</td>
                <td style="width: 62%; font-size: 12px; text-align: end;">{{ sjpStatus.good_pallet }}</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 36%; font-size: 12px;">TBR Pallet</td>
                <td style="width: 2%">:</td>
                <td style="width: 62%; font-size: 12px; text-align: end;">{{ sjpStatus.tbr_pallet }}</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 36%; font-size: 12px;">BER Pallet</td>
                <td style="width: 2%">:</td>
                <td style="width: 62%; font-size: 12px; text-align: end;">{{ sjpStatus.ber_pallet }}</td>
              </tr>
            </table>
          <div style="text-align: center; font-size: 12px; font-weight: bold; padding-top: 18px;"><strong>Pool Pallet</strong></div>
            <table style="width: 100%;">
              <tr style="width: 100%;">
                <td style="width: 36%; font-size: 12px;">Keberangkatan</td>
                <td style="width: 2%">:</td>
                <td style="width: 62%; font-size: 12px; text-align: end;">{{ sjpStatus.is_sendback == 1 ? sjpStatus.destination_company : sjpStatus.departure_company }}</td>
              </tr>
              <tr style="width: 100%;">
                <td style="width: 36%; font-size: 12px;">Tujuan</td>
                <td style="width: 2%">:</td>
                <td style="width: 62%; font-size: 12px; text-align: end;">{{ sjpStatus.is_sendback == 1 ? sjpStatus.departure_company : sjpStatus.destination_company}}</td>
              </tr>
            </table>
          <div style="text-align: center; font-size: 12px; font-weight: bold; padding-top: 18px;"><strong>Ekspeditur</strong></div>
          <div style="text-align: center; font-size: 12px;">{{ sjpStatus.transporter_company }}</div>
          <div style="text-align: center; font-size: 12px; font-weight: bold; padding-top: 18px;"><strong>Note</strong></div>
          <div style="text-align: center; font-size: 12px;">{{ sjpStatus.note }}</div>
          <div style="text-align: center; font-size: 12px; font-weight: bold; padding-top: 18px;"><strong>Waktu Pengiriman</strong></div>
          <div style="text-align: center; font-size: 12px; padding-bottom: 50px;">{{ tanggal }}</div>
          <div style="display: flex; justify-content: center;">
            <v-btn class="btn-print" style="width: 110px; font-size: 12px;" onclick="window.print();">PRINT</v-btn>
          </div>
        </v-card>
      </v-card>
    </v-col>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import QrcodeVue from 'qrcode.vue'
// import "@/views/global";

// @ is an alias to /src
export default {
  name: "QRCode",
  data() {
    return {
      tanggal: '',
    }
  },
  components: {
    QrcodeVue,
  },
  created() {
    this.getSjpStatusDetail(this.$route.params.id).then((response) => {
      console.log(response);
      const tanggal = new Date(response.created_at);
      const tanggalFormat = tanggal.getFullYear() + "-" + (tanggal.getMonth() + 1) + "-" + tanggal.getDate() + " " + tanggal.getHours() + ":" + tanggal.getMinutes() + ":" + tanggal.getSeconds();
      this.tanggal = tanggalFormat;
    });
  },
  computed: {
    ...mapState("sjpStatus", {
      sjpStatus: (state) => state.sjpStatus,
      loading: (state) => state.loading,
    }),
  },
  methods: {
    ...mapActions("sjpStatus", ["getSjpStatuss", "getSjpStatusDetail", "getExportDataSjpStatuss","deleteSjpStatus"]),
  }
};
</script>
<style scoped>
/* @media print and (width: 302px) and (height: 700px) { */
/* @media print {

  * {
    visibility: hidden;
    display: none !important;
  }

  .print-section, .print-section * {
    visibility: visible;
    display: block;
  }

} */
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
<!-- <style src="/src/views/global.css"></style> -->