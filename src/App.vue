<template>

  <v-app id="app" >
   
    <Header v-if="$store.getters['isLogin']" />
    
    <Menu v-if="$store.getters['isLogin']" />

    
    <Content />

  </v-app>
</template>

<script>
import Header from '@/components/core/Header.vue'
import Menu from '@/components/core/Menu.vue'
import Content from '@/components/core/Content.vue'

export default {
  name: "app",
  components:{
    Header,
    Menu,
    Content
  },
  mounted() {
    this.$store.dispatch({ type: "restoreLogin"});
  },
};
</script>

<style>
 #app {
    /* background-color: var(--v-background-base); */
    background-color: var(--v-background-base);

    font-family: 'Prompt', sans-serif;
}
</style>
