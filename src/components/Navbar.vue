<template>
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
              src="../assets/logo-sig.png"
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
</template>
<script>
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ProfileMenu from "@/components/ProfileMenu";

export default {
  data: () => ({
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
  }),
  methods: {
    logout() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        resolve();
      }).then(() => {
        this.$store.state.token = localStorage.getItem("token");
        this.$router.push("/login");
      });
    },
  },
  components: {
    LocaleSwitcher,
    ProfileMenu
  },
};
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>
