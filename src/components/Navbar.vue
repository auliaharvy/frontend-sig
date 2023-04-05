<template>
    <nav>
        <v-app-bar  color="#e90e01" dark app >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase ">
                PALLET MANAGEMENT SYSTEM
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
       <template v-slot:activator="{ on }">
         <v-btn
           text
           v-on="on"
         >
           <v-icon left>expand_more</v-icon>
             <span>Menu</span>
         </v-btn>
       </template>
       <v-list flat>
         <v-list-item v-for="link in links"  :key="link.text" router :to="link.route" active-class="border">
           <v-list-item-title >{{link.text}}</v-list-item-title>
         </v-list-item>
       </v-list>
             </v-menu>
             <v-btn text>
                 <span>Exit</span>
                 <v-icon right>exit_to_app</v-icon>
              </v-btn>
        </v-app-bar>
       <v-navigation-drawer  v-model="drawer" dark app class="red darken-4">
           <v-layout column align-left>
                <v-flex class="mt-5"> 
                    <v-img src="../assets/logo-sig.png"
                     max-heigth="200"
                     max-width="400"
                     ></v-img>
                </v-flex>
               <span style="color: white;">MENU TRANSAKSI </span>
           </v-layout>
           <v-list flat>
               <v-list-item v-for="link in links"  :key="link.text" router :to="link.route" active-class="border">
                   <v-list-item-action>
                      <v-icon >{{link.icon}}</v-icon>
                   </v-list-item-action>
                   <v-list-item-content >
                       <v-list-item-title >{{link.text}}</v-list-item-title>
                   </v-list-item-content>
               </v-list-item>
           </v-list>
           <v-list flat>
      <v-list-group
        v-for="mgm in mgms"
        :key="mgm.title"
        v-model="mgm.active"
        :prepend-icon="mgm.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="mgm.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in mgm.items"
          :key="child.title"
          router :to="child.route"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-list flat>
               <v-list-item v-for="pemp in pemps"  :key="pemp.text" router :to="pemp.route" active-class="border">
                   <v-list-item-action>
                      <v-icon >{{pemp.icon}}</v-icon>
                   </v-list-item-action>
                   <v-list-item-content >
                       <v-list-item-title >{{pemp.text}}</v-list-item-title>
                   </v-list-item-content>
               </v-list-item>
           </v-list>
           <v-list flat>
      <v-list-group
        v-for="lp in lps"
        :key="lp.title"
        v-model="lp.active"
        :prepend-icon="lp.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="lp.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in lp.items"
          :key="child.title"
          router :to="child.route"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-list flat>
               <v-list-item v-for="logout in logouts"  :key="logout.text" router :to="logout.route" active-class="border">
                   <v-list-item-action>
                      <v-icon >{{logout.icon}}</v-icon>
                   </v-list-item-action>
                   <v-list-item-content >
                       <v-list-item-title >{{logout.text}}</v-list-item-title>
                   </v-list-item-content>
               </v-list-item>
           </v-list>
       </v-navigation-drawer>
    </nav>
 </template>
 <script>

 export default {
    data: () => ({
       drawer: true,
       links :[
           {icon: 'dashboard', text:'Halaman Utama', route: '/dashboard'},
       ],
       mgms: [
        {
          action: 'mdi-file',
          items: [
            { title: 'Surat Jalan Pallet' },
            { title: 'SJP Status' },
          ],
          title: 'Manajemen SJP',
        },
        {
          action: 'mdi-silverware-fork-knife',
          items: [
            { title: 'Mutasi Pallet'},
            { title: 'Klaim Pallet' },
            { title: 'Perubahan Kuota Pallet' },
            { title: 'Pallet Baru' },
            { title: 'Pallet Rusak' },
            { title: 'Pallet Diperbaiki' },
            { title: 'Penyewaan Pallet' },
          ],
          title: 'Manajemen Pallet',
        },
        
      ],
      pemps :[
           {icon: 'dashboard', text:'Penyesuaian Ekspeditur', route: '/dashboard'},
           {icon: 'dashboard', text:'Manajemen Perusahaan', route: '/dashboard'},
       ],
      lps: [
      {
          action: 'mdi-school',
          items: [
            { title: 'Dasbor Organisasi'},
            { title: 'Pergerakan Pallet' },
            { title: 'Data Transaksi' },
        ],
          title: 'Laporan',
        },
        {
          action: 'mdi-human-male-female-child',
          items: [
            { title: 'Organisasi'},
            { title: 'Peran & Izin' },
            { title: 'Manajemen Pengguna' },
            { title: 'Kendaraan' },
            { title: 'Pengendara' },
        ],
          title: 'Pengaturan',
        },
    ],
      logouts :[
           {icon: 'logout', text:'Keluar', route: '/'}
       ],

     }),
     components: {

   },
    
 }
 </script>
 <style scoped>
 .border {
   border-left: 4px solid #0ba518;
 }
 </style>