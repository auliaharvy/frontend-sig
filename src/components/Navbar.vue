<template>
  <nav>
    <v-app-bar color="primary" dark app class="red darken-4">
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
          <v-flex class="mr-5 ml-5">
            <v-autocomplete
              label="Role"
              :items="dataRole"
              outlined
              v-model="role"
              item-value="index"
              @change="changeRole"
            >
            <template slot="item" slot-scope="{ item, selected }">
                {{item.role_name}} - {{item.company_name}}
            </template>
            <template slot="selection" slot-scope="{ item, selected }">
                {{item.role_name}} - {{item.company_name}}
            </template>
            <template slot="item" slot-scope="{ item, tile }">
                {{item.role_name}} - {{item.company_name}}
            </template>
            <!-- <template slot="selection" slot-scope="{ item, tile }">
              <v-list-tile-content>
                {{item.role_name}} - {{item.company_name}}
              </v-list-tile-content>
            </template> -->
            </v-autocomplete>
          </v-flex>
        </v-layout>
      </template>
      <v-divider></v-divider>
      <h3 style="color: white; margin-left: 10px">{{ $t("menu.menu") }}</h3>
      <v-list flat class="font-weight-bold">
        <v-list-item
          v-for="link in links"
          :key="link.title"
          v-if="$can(link.permission)"
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
            v-if="$can(child.permission)"
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
          v-if="$can(pemp.permission)"
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
          v-if="$can(lp.permission)"
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
            v-if="$can(child.permission)"
            router
            :to="child.route"
          >
            <v-list-item-content>
              <v-list-item-title> {{ $t(child.title) }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          v-for="setting in settings"
          v-if="$can(setting.permission)"
          :key="setting.title"
          v-model="setting.active"
          :prepend-icon="setting.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ $t(setting.title) }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in setting.items"
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
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { mapActions } from "vuex";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ProfileMenu from "@/components/ProfileMenu";

export default {
  data: () => ({
    role: '',
    dataRole: '',
    drawer: false,
    links: [{ icon: "home", title: "sidebar.halamanutama", route: "/", permission: 'read dashboard' }],
    mgms: [
      {
        action: "mdi-file-document-outline",
        title: "sidebar.manajemensjp",
        items: [
          { title: "sidebar.suratjalanpallet", route: "/sjp", permission: 'read sjp' },
          { title: "sidebar.sjpstatus", route: "/sjp-status", permission: 'read sjp status' },
        ],
      },
      {
        action: "mdi-shipping-pallet",
        title: "sidebar.manajemenpallet",
        items: [
          { title: "sidebar.mutasipallet", route: "/pallet-transfer", permission: 'read pallet transfer' },
          { title: "sidebar.klaimpallet", route: "/claim-pallet", permission: 'read claim pallet' },
          {
            title: "sidebar.perubahankuotapallet",
            route: "/change-quota",
            permission: 'read change quota'
          },
          // { title: "sidebar.palletbaru", route: "/new-pallet", permission: 'read new pallet' },
          // { title: "sidebar.realisasiPallet", route: "/pallet-realization", permission: 'read pallet realization' },
          { title: "sidebar.palletrusak", route: "/damaged-pallet", permission: 'read damaged pallet' },
          { title: "sidebar.berMissingPallet", route: "/ber-missing-pallet", permission: 'read damaged pallet' },
          { title: "sidebar.palletdiperbaiki", route: "/repaired-pallet", permission: 'read repaired pallet' },
          { title: "sidebar.penyewaanpallet", route: "/sewa-pallet", permission: 'read sewa pallet' },
        ],
      },
    ],
    pemps: [
      {
        icon: "mdi-truck-fast",
        title: "sidebar.penyesuaianekspeditur",
        route: "/transporter-adjusment",
        permission: 'read transporter adjustment',
      },
      {
        icon: "mdi-domain",
        title: "sidebar.manajemenperusahaan",
        route: "/company",
        permission: 'read company'
      },
    ],
    lps: [
      {
        action: "mdi-file-document-outline",
        title: "sidebar.laporan",
        items: [
          // { title: "sidebar.dasbororganisasi", route: "/",  permission: 'read dashboard organization' },
          { title: "sidebar.palletbaru", route: "/new-pallet", permission: 'read new pallet' },
          { title: "sidebar.realisasiPallet", route: "/pallet-realization", permission: 'read pallet realization' },
          { title: "sidebar.pergerakanpallet", route: "/pergerakan-pallet", permission: 'read pallet movement' },
          { title: "sidebar.datatransaksi", route: "/data-transaksi", permission: 'read all transaction' },
        ],
        permission: 'read laporan'
      },
    ],
    settings: [
      {
        action: "mdi-cog",
        title: "sidebar.pengaturan",
        items: [
          { title: "sidebar.organisasi", route: "/organization"  },
          { title: "Distributor", route: "/distributor"  },
          { title: "sidebar.perandanizin", route: "/peran-dan-izin" },
          { title: "sidebar.peran", route: "/roles" },
          { title: "sidebar.izin", route: "/permissions" },
          { title: "sidebar.manajemenpengguna", route: "/user" },
          { title: "sidebar.kendaraan", route: "/trucks" },
          { title: "sidebar.pengendara", route: "/drivers" },
        ],
        permission: 'read setting'
      },
    ],
    logouts: [{ icon: "logout", title: "sidebar.keluar", route: "/" }],
  }),
  created() {
    this.getRole();
  },
  methods: {
    ...mapActions("auth", [
      "logout",
      "setRole",
    ]),
    getRole() {
      var role = JSON.parse(localStorage.getItem("role"));
      var roles = JSON.parse(localStorage.getItem("userData"));
      this.dataRole = roles.data.role;
      this.role = role.index;
    },
    changeRole() {
      var payload =this.dataRole.find(x => x.index === this.role);
      this.setRole(payload);
      window.location.reload();
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
