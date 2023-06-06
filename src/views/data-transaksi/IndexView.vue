<template>
  <v-app>
    <Navbar />
      <v-container>
        <h1 class="heading black--text">{{ $t("sidebar.datatransaksi") }}</h1>
        <v-spacer></v-spacer>
        <v-col md-12>
        <v-card>
            <v-card-title>
              Semua Transaksi
            </v-card-title>
            <v-divider></v-divider>
                <v-card>
                    <v-card-title>
                      <v-btn
                >Tampilkan Data dalam satu minggu</v-btn>
                <v-btn
                >Tampilkan Data dalam satu bulan</v-btn>
                <v-btn
                >{{ $t("manajemenpengguna.unduh") }}</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        prepend-icon="mdi-search"
                        :label="$t('manajemenpengguna.cari')"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-btn
                >Query</v-btn>
                    </v-card-title>
                    <v-data-table class="custom-table"
                    :loading="loading"
                    :headers="headers"
                    :search="search"
                    :items="items"
                    elevation="2"
                    border
                    >
                    </v-data-table>
                </v-card>
          </v-card>
      </v-col>
      </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Breadcomp from "@/components/Breadcrumb.vue";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
// @ is an alias to /src
export default {
  name: "DataTransaksi",
  components: {
    Navbar,
    Footer,
    Breadcomp
  },
  data() {
        return {
            headers: [
                { value: 'nomorTID', text: 'Nomor TID' },
                { value: 'nomorSJP', text: 'Nomor SJP'},
                { value: 'nomorSJPS', text: 'Nomor SJPS' },
                { value: 'nomorMP', text: 'Nomor MP'},
                { value: 'nomorKP', text: 'Nomor KP'},
                { value: 'nomorPK', text: 'Nomor PK'},
                { value: 'nomorPPB', text: 'Nomor PPB'},
                { value: 'nomorRPB', text: 'Nomor RPB'},
                { value: 'nomorPR', text: 'Nomor PR'},
                { value: 'nomorPRP', text: 'Nomor PRP'},
                { value: 'nomorPP', text: 'Nomor PP'},
                { value: 'nomorPE', text: 'Nomor PE'},
                { value: 'pengubahantruck', text: 'Pengubahan Truk'},
                { value: 'pengubahandestinasi', text: 'Pengubahan Destinasi'},
                { value: 'transaksi', text: 'Transaksi'},
                { value: 'nomorDO', text: 'Nomor DO'},
                { value: 'nomorDObaru', text: 'Nomor DO Baru'},
                { value: 'status', text: 'Status'},
                { value: 'pengirim/pelapor', text: 'Pengirim / Pelapor'},
                { value: 'penerimapersetujuan', text: 'Penerima / Pemberi Persetujuan'},
                { value: 'perusahaantujuan', text: 'Perusahaan Tujuan'},
                { value: 'perusahaantujuanbaru', text: 'Perusahaan Tujuan Baru'},
                { value: 'perusahaanekspeditur', text: 'Perusahaan Ekspeditur'},
                { value: 'perusahaan', text: 'Perusahaan'},
                { value: 'nomorkendaraan', text: 'Nomor Kendaraan'},
                { value: 'nomorkendaraanbaru', text: 'Nomor Kendaraan Baru'},
                { value: 'pengendara', text: 'Pengendara'},
                { value: 'pengendarabaru', text: 'Pengendara Baru'},
                { value: 'goodpallet', text: 'Good Pallet'},
                { value: 'TBRpallet', text: 'TBR Pallet'},
                { value: 'BERpallet', text: 'BER Pallert'},
                { value: 'missingpallet', text: 'Missing Pallet'},
                { value: 'persetujuanpengiriman', text: 'Persetujuan Pengiriman'},
                { value: 'persetujuanpenerimaan', text: 'Persetujuan Penerimaan'},
                { value: 'alasan', text: 'Alasan'},
                { value: 'catatan', text: 'Catatan'},
                { value: 'dibuat', text: 'Dibuat Saat'},
                { value: 'diperbarui', text: 'Diperbarui Saat'}

            ],
            items: [
                { name :'Daud', username: 'daudtea', email: 'mramdhanass@gmail.com' }
            ],
            search: '',

        }
    },
};
</script>
<style scoped>
.warna-font {
  color: white; 
}
.custom-table table {
  border-collapse: separate;
  border-spacing: 0px;
  width: 100%;
}

.custom-table th,
.custom-table td {
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 8px;
  text-align: left;
}
</style>
