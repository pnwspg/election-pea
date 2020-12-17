<template>
  <v-navigation-drawer app permanent>
    <router-link to="/about" exact>
    <div  align="center" style="padding:25px">

      <v-img src="@/assets/election.png" alt="" width="100%" />
      <!-- <v-img src="@/assets/logo_display.png"  /> -->

    </div>

    </router-link>

    <v-list nav>
      <!-- <v-subheader>MENUS</v-subheader> -->
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
        
         v-for="([icon, title, route], index) in menus" 
         :key="index" 
         @click="onClickMenu(route)"
         >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ title }}
            </v-list-item-title>
          </v-list-item-content>


        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  methods: {
   onClickMenu(link){
this.$router.push(link).catch(err=>{});
   }
  },
 
  data() {
    return {
      selectedMenu: 0,
      menus: [
        ["mdi-apps-box", "รายงานการจ่ายไฟ", "/outage"],
      
        ["mdi-comment-text-outline", "สรุปภาพรวม", "/canvas"],
  

      ],
    };
  },
   watch: {
    $route(to, from){
      this.selectedMenu = this.menus.findIndex(menu => menu[2] == to.path)
    }
  },
  mounted() {
    this.selectedMenu = this.menus.findIndex(
      menu => menu[2] == this.$route.path
    )
  },
};
</script>

<style></style>
