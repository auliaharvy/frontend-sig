<template>
  <v-container>
  <nav>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title class="text-uppercase">
        PALLET MANAGEMENT SYSTEM
      </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <LocaleSwitcher />
      <ProfileMenu />
      <!-- <v-btn text @click="logout">
        <span>{{ $t("sidebar.keluar") }}</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" dark app class="red darken-4">
      <template>
        <v-layout column align-left>
          <v-flex class="mt-5">
            <v-img
              src="../../assets/logo-sig.png"
              max-heigth="200"
              max-width="400"
            ></v-img>
          </v-flex>
        </v-layout>
      </template>
      <v-divider></v-divider>
      <h3 style="color: white; margin-left: 10px">{{ $t("menu.menu") }}</h3>
      <v-list flat class="font-weight-bold">
        <v-list-item
          v-for="link in links"
          :key="link.title"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ $t(link.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="mgm in mgms"
          :key="mgm.title"
          v-model="mgm.active"
          :prepend-icon="mgm.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ $t(mgm.title) }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in mgm.items"
            :key="child.title"
            router
            :to="child.route"
          >
            <v-list-item-content>
              <v-list-item-title>{{ $t(child.title) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-for="pemp in pemps"
          :key="pemp.title"
          router
          :to="pemp.route"
        >
          <v-list-item-action>
            <v-icon>{{ pemp.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t(pemp.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          v-for="lp in lps"
          :key="lp.title"
          v-model="lp.active"
          :prepend-icon="lp.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ $t(lp.title) }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in lp.items"
            :key="child.title"
            router
            :to="child.route"
          >
            <v-list-item-content>
              <v-list-item-title> {{ $t(child.title) }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-item
          v-for="logout in logouts"
          :key="logout.title"
          router
          :to="logout.route"
        >
          <v-list-item-action>
            <v-icon>{{ logout.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t(logout.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item> </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
    <v-col md-12>
      <v-card class="container-print-section" style="display: flex; justify-content:center; padding-top: 50px; padding-bottom: 50px; background-color: #F5F5F5;">
        <!-- <v-card class="print-section" style="display: flex; justify-content:center; flex-direction: column; width: 75%; padding: 30px;"> -->
        <v-card class="print-section" style="display: flex; justify-content:center; flex-direction: column; width: 2480px; padding: 30px;">
        <!-- <v-card class="print-section" style="display: flex; justify-content:center; flex-direction: column; width: 287px; padding: 15px;"></v-card> -->
          <v-simple-table>
            <template v-slot:default>
              <table class="section-header" style="width: 100%; padding-bottom: 70px; font-size: 20px;">
                <tr style="width: 100%;">
                  <td class="faktur-tagihan" style="width: 100%; padding-bottom: 15px; text-align: center;">FAKTUR TAGIHAN</td>
                </tr>
                <tr style="width: 100%;">
                  <td class="pt-dan-number" style="display: inline-block; width: 50%; text-align: start;"><strong>PT. SEMEN INDONESIA</strong></td>
                  <td class="pt-dan-number" style="display: inline-block; width: 50%; text-align: end;"><strong>{{ sewaPallet.trx_number }}</strong></td>
                </tr>
                <tr style="width: 100%;">
                  <td style="display: inline-block; padding-top: 5px; width: 50%;">
                    <div class="container-alamat">
                      <div>Jl. Jendral Sudirman No.00</div>
                      <div>Jakarta Utara 14330</div>
                    </div>
                  </td>
                  <td class="container-qr-code" style="display: inline-block; width: 50%;">
                    <div style="display: inline-block; width: 100%;">
                      <div style="display: flex; justify-content: end;">
                        <div id="qr-code-box" style="display: inline-block;">
                          <qrcode-vue id="qr-code" :value="linkQR" :size="100" level="H" />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </template>
          </v-simple-table>
          <v-simple-table class="custom-table">
            <template v-slot:default>
              <table>
                <tr>
                  <td class="td-custom-table">Pembeli</td>
                  <td>:</td>
                  <td class="td-custom-table">{{ sewaPallet.company_name }}</td>
                </tr>
                <tr>
                  <td class="td-custom-table">Nama</td>
                  <td>:</td>
                  <td class="td-custom-table" colspan="2">{{ sewaPallet.manager_name == null ? '-' : sewaPallet.manager_name}}</td>
                </tr>
                <tr>
                  <td class="td-custom-table">Alamat</td>
                  <td class="td-custom-table">:</td>
                  <td class="td-custom-table" style="word-wrap: break-word;" colspan="2">
                    <div style="display: inline-block; width: 50%;">JL. JENDRAL SUDIRMAN NO.000023 JAKARTA UTARA 14330</div>
                  </td>
                </tr>
              </table>
            </template>
          </v-simple-table>
          <v-simple-table class="custom-data-table">
            <template v-slot:default>
              <thead style="padding: 20px;">
                <tr>
                  <td id="td-custom-data-table-1">No</td>
                  <td id="td-custom-data-table-2">Deskripsi</td>
                  <td id="td-custom-data-table-3">Unit (Pcs)</td>
                  <td id="td-custom-data-table-4">Harga</td>
                  <td id="td-custom-data-table-5">Jumlah</td>
                </tr>
              </thead>
              <tbody style="padding: 50px;">
               <tr>
                  <td id="td-custom-data-table-6">01</td>
                  <td id="td-custom-data-table-7">GOOD PALLET</td>
                  <td id="td-custom-data-table-8">{{ sewaPallet.good_pallet }}</td>
                  <td id="td-custom-data-table-9">{{ sewaPallet.good_pallet == 0 ? '-' : convertToRupiah(sewaPallet.price) }}</td> <!-- JIKA 0 MAKA TAMPILKAN STRIP '-'-->
                  <td id="td-custom-data-table-10">{{ convertToRupiah(sewaPallet.price * sewaPallet.good_pallet ) }}</td> <!-- JUMLAH PER DESKRIPSI PALLET, HASIL PERKALIAN DARI HARGA SATUAN PALLET DIKALI JUMLAH PALLET -->
                </tr>
                <tr>
                  <td id="td-custom-data-table-11">02</td>
                  <td id="td-custom-data-table-12">TBR PALLET</td>
                  <td id="td-custom-data-table-13">{{ sewaPallet.tbr_pallet }}</td>
                  <td id="td-custom-data-table-14">{{ sewaPallet.tbr_pallet == 0 ? '-' : convertToRupiah(sewaPallet.price) }}</td> <!-- JIKA 0 MAKA TAMPILKAN STRIP '-'-->
                  <td id="td-custom-data-table-15">{{ convertToRupiah(sewaPallet.price * sewaPallet.tbr_pallet ) }}</td> <!-- JUMLAH PER DESKRIPSI PALLET, HASIL PERKALIAN DARI HARGA SATUAN PALLET DIKALI JUMLAH PALLET -->
                </tr>
               <tr>
                  <td id="td-custom-data-table-6">03</td>
                  <td id="td-custom-data-table-7">BER PALLET</td>
                  <td id="td-custom-data-table-8">{{ sewaPallet.ber_pallet }}</td>
                  <td id="td-custom-data-table-9">{{ sewaPallet.ber_pallet == 0 ? '-' : convertToRupiah(sewaPallet.price) }}</td> <!-- JIKA 0 MAKA TAMPILKAN STRIP '-'-->
                  <td id="td-custom-data-table-10">{{ convertToRupiah(sewaPallet.price * sewaPallet.ber_pallet ) }}</td> <!-- JUMLAH PER DESKRIPSI PALLET, HASIL PERKALIAN DARI HARGA SATUAN PALLET DIKALI JUMLAH PALLET -->
                </tr>
                <tr>
                  <td id="td-custom-data-table-11">04</td>
                  <td id="td-custom-data-table-12">MISSING PALLET</td>
                  <td id="td-custom-data-table-13">{{ sewaPallet.missing_pallet }}</td>
                  <td id="td-custom-data-table-14">{{ sewaPallet.missing_pallet == 0 ? '-' : convertToRupiah(sewaPallet.price) }}</td> <!-- JIKA 0 MAKA TAMPILKAN STRIP '-'-->
                  <td id="td-custom-data-table-15">{{ convertToRupiah(sewaPallet.price * sewaPallet.missing_pallet ) }}</td> <!-- JUMLAH PER DESKRIPSI PALLET, HASIL PERKALIAN DARI HARGA SATUAN PALLET DIKALI JUMLAH PALLET -->
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td> 
                  <td id="td-custom-data-table-16">Total :</td>
                  <td id="td-custom-data-table-17">{{ convertToRupiah(sewaPallet.price * sewaPallet.good_pallet + sewaPallet.price * sewaPallet.tbr_pallet + sewaPallet.price * sewaPallet.ber_pallet + sewaPallet.price * sewaPallet.missing_pallet) }}</td><!-- TOTAL BERASAL DARI PENJUMLAHAN SELURUH JUMLAH DARI MASING MASING DESKRIPSI -->
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table class="v-simple-table-footer">
            <template v-slot:default>
              <div style="display: inline-block; width: 50%; padding-top: 20px;">
                <div class="td-simple-table-footer" style="text-align: center; padding-bottom: 70px;">Diterima Oleh</div>
                <div style="display: flex; justify-content: center;">
                  <div class="garis-tanda-tangan" style="width: 120px; height: 1px; background-color: black;"></div>
                </div>
                <div class="td-simple-table-footer" style="text-align: center; padding-bottom: 25px;">Tanda tangan / Nama</div>
              </div>
              <div style="display: inline-block; width: 50%;">
                <div class="td-simple-table-footer" style="text-align: center; padding-bottom: 70px;">Hormat Kami</div>
                <div style="display: flex; justify-content: center;">
                  <div class="garis-tanda-tangan" style="width: 120px; height: 1px; background-color: black;"></div>
                </div>
                <div class="td-simple-table-footer" style="text-align: center; padding-bottom: 25px;">Tanda tangan / Nama</div>
              </div>
            </template>
            </v-simple-table>
            <div style="display: flex; justify-content: center; padding-top: 20px;">
              <v-btn class="btn-print" style="width: 110px; font-size: 12px;" onclick="window.print();">PRINT TAGIHAN</v-btn>
            </div>
        </v-card>
      </v-card>
    </v-col>
    <v-footer dark padless app inset>
      <v-card class="flex" flat tile color="#423f3f" :elevation="10">
        <v-card-text class="py-2 white--text text-center">
          <strong
            >Copyright&copy; 2023 PT Semen Indonesia - By PT Dinamika Logistindo
            Indonesia</strong
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import QrcodeVue from 'qrcode.vue'
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ProfileMenu from "@/components/ProfileMenu";

// @ is an alias to /src
export default {
  name: "QRCode",
  data() {
    return {
    terbilang: '',
    linkQR: '',
    baseUrl: window.location.origin,
    forSlot: {
      table: 'table',
    },
    drawer: false,
    links: [{ icon: "home", title: "sidebar.halamanutama", route: "/" }],
    mgms: [
      {
        action: "mdi-file-document-outline",
        title: "sidebar.manajemensjp",
        items: [
          { title: "sidebar.suratjalanpallet", route: "/sjp" },
          { title: "sidebar.sjpstatus", route: "/sjp-status" },
        ],
      },
      {
        action: "mdi-shipping-pallet",
        title: "sidebar.manajemenpallet",
        items: [
          { title: "sidebar.mutasipallet", route: "/pallet-transfer" },
          { title: "sidebar.klaimpallet", route: "/claim-pallet" },
          {
            title: "sidebar.perubahankuotapallet",
            route: "/change-quota",
          },
          { title: "sidebar.palletbaru", route: "/new-pallet" },
          { title: "sidebar.realisasiPallet", route: "/pallet-realization" },
          { title: "sidebar.palletrusak", route: "/damaged-pallet" },
          { title: "sidebar.palletdiperbaiki", route: "/repaired-pallet" },
          { title: "sidebar.penyewaanpallet", route: "/sewa-pallet" },
        ],
      },
    ],
    pemps: [
      {
        icon: "mdi-truck-fast",
        title: "sidebar.penyesuaianekspeditur",
        route: "/transporter-adjusment",
      },
      {
        icon: "mdi-domain",
        title: "sidebar.manajemenperusahaan",
        route: "/company",
      },
    ],
    lps: [
      {
        action: "mdi-file-document-outline",
        title: "sidebar.laporan",
        items: [
          { title: "sidebar.dasbororganisasi", route: "/dashboard" },
          { title: "sidebar.pergerakanpallet", route: "/pergerakan-pallet" },
          { title: "sidebar.datatransaksi", route: "/data-transaksi" },
        ],
      },
      {
        action: "mdi-cog",
        title: "sidebar.pengaturan",
        items: [
          { title: "sidebar.organisasi", route: "/organization" },
          { title: "sidebar.perandanizin", route: "/peran-dan-izin" },
          { title: "sidebar.peran", route: "/roles" },
          { title: "sidebar.izin", route: "/permissions" },
          { title: "sidebar.manajemenpengguna", route: "/user" },
          { title: "sidebar.kendaraan", route: "/trucks" },
          { title: "sidebar.pengendara", route: "/drivers" },
        ],
      },
    ],
    logouts: [{ icon: "logout", title: "sidebar.keluar", route: "/" }],
      tanggal: '',
    }
  },
  components: {
    QrcodeVue,
  },
  created() {
    this.getSewaPalletDetail(this.$route.params.id).then((response) => {
      console.log(response);
      const tanggal = new Date(response.updated_at);
      const tanggalFormat = tanggal.getFullYear() + "-" + (tanggal.getMonth() + 1) + "-" + tanggal.getDate() + " " + tanggal.getHours() + ":" + tanggal.getMinutes() + ":" + tanggal.getSeconds();
      this.tanggal = tanggalFormat;
    });
    this.linkQR = window.location.origin + '/sewa-pallet/view/' + this.$route.params.id;
  },
  computed: {
    ...mapState("sewaPallet", {
      sewaPallet: (state) => state.sewaPallet,
      loading: (state) => state.loading,
    }),
  },
  methods: {
    ...mapActions("sewaPallet", ["getSewaPalletDetail"]),
    convertToRupiah(number) {
      const formattedNumber = number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
      return formattedNumber;
    }
  }
};
</script>
<style scoped>
/* Untuk perangkat dengan lebar layar maksimum 600px */
@media (max-width: 600px) {

.td-custom-table, .td-custom-data-table, 
.td-simple-table-footer, .pt-dan-number,
.container-alamat{
  font-size: x-small;
}

.td-custom-data-table{
  font-size: x-small;
}

.garis-tanda-tangan{
  width: 100px;
  height: 1px;
  background-color: black;
}
.table-informasi-pembeli{
  padding: 0px;
}
.td-informasi-pembeli{
  font-size: small;
}

#td-custom-data-table-1,
#td-custom-data-table-2,
#td-custom-data-table-3,
#td-custom-data-table-4,
#td-custom-data-table-5,
#td-custom-data-table-6,
#td-custom-data-table-7,
#td-custom-data-table-8,
#td-custom-data-table-9,
#td-custom-data-table-10,
#td-custom-data-table-11,
#td-custom-data-table-12,
#td-custom-data-table-13,
#td-custom-data-table-14,
#td-custom-data-table-15,
#td-custom-data-table-16,
#td-custom-data-table-17
{
  font-size: 10px;
}
}

@media (min-width: 601px) {

#td-custom-data-table-1,
#td-custom-data-table-2,
#td-custom-data-table-3,
#td-custom-data-table-4,
#td-custom-data-table-5,
#td-custom-data-table-6,
#td-custom-data-table-7,
#td-custom-data-table-8,
#td-custom-data-table-9,
#td-custom-data-table-10,
#td-custom-data-table-11,
#td-custom-data-table-12,
#td-custom-data-table-13,
#td-custom-data-table-14,
#td-custom-data-table-15,
#td-custom-data-table-16,
#td-custom-data-table-17
{
  font-size: 14px;
}
.container-alamat{
  font-size: 16px;
}

.pt-dan-number{
  font-size: 20px;
}

.faktur-tagihan{
  font-size: 24px;
}
}

/* @media print and (width: 302px) and (height: 700px) { */
@media print {
@page {
  size: A4;
  margin: 0;
}
*, .print-section .btn-print {
  visibility: hidden;
  /* display: none !important; */
}
.print-section, .print-section *{
  visibility: visible;
}
/* .print-section .btn-print{
  display: none;
} */
}
.custom-table{
border: 1px solid black;
border-radius: 0px;
}

.custom-data-table, .v-simple-table-footer{
border-right: 1px solid black;
border-left: 1px solid black;
border-radius: 0px;
}

.custom-data-table{
border-bottom: 1px solid black;
border-radius: 0px;
}

.v-simple-table-footer{
border-bottom: 1px solid black;
border-radius: 0px;
}

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