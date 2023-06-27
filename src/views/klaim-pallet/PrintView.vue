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
            <!-- <v-img
              src="../assets/logo-sig.png"
              max-heigth="200"
              max-width="400"
            ></v-img> -->
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
        <v-card class="print-section" style="display: flex; justify-content:center; flex-direction: column; width: 75%; padding: 30px;">
        <!-- <v-card class="print-section" style="display: flex; justify-content:center; flex-direction: column; width: 287px; padding: 15px;"></v-card> -->
          <div style="text-align: center; font-size: 20px; padding-bottom: 18px;">FAKTUR TAGIHAN</div>
          <div style="width: 100%;">
            <div style="display: inline-block; width: 50%;">
              <div style="font-size: 18px;"><strong>PT. SEMEN INDONESIA</strong></div>
              <div style="padding-bottom: 15px;">
                <div style="font-size: 14px;">Jl. Jendral Sudirman No.00</div>
                <div style="font-size: 14px;">Jakarta Utara 14330</div>
              </div>
              <div>
                <div style="font-size: 14px;">Telp. 102390124090</div>
                <div style="font-size: 14px;">Fax. 21318024938</div>
              </div>
            </div>
            <div style="display: inline-block; width: 50%;">
              <div style="font-size: 18px;"><strong>{{ claimPallet.trx_number }}</strong></div>
              <qrcode-vue :value="baseUrl + '/sjp-status/receive/' + this.$route.params.id" :size="100" level="H" />
            </div>
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
    baseUrl: window.location.origin,
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
    this.getClaimPalletDetail(this.$route.params.id).then((response) => {
      console.log(response);
      const tanggal = new Date(response.created_at);
      const tanggalFormat = tanggal.getFullYear() + "-" + (tanggal.getMonth() + 1) + "-" + tanggal.getDate() + " " + tanggal.getHours() + ":" + tanggal.getMinutes() + ":" + tanggal.getSeconds();
      this.tanggal = tanggalFormat;
    });
  },
  computed: {
    ...mapState("claimPallet", {
      claimPallet: (state) => state.claimPallet,
      loading: (state) => state.loading,
    }),
  },
  methods: {
    ...mapActions("claimPallet", ["getClaimPalletDetail"]),
  }
};
</script>
<style scoped>
/* @media print and (width: 302px) and (height: 700px) { */
@media print {
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