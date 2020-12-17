<template>
  <v-app-bar app color="primary" dense dark>
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

    <v-toolbar-title
      ><v-icon>mdi-vote</v-icon>
      รายงานการจ่ายไฟฟ้าสำหรับการเลือกตั้งสมาชิกองค์การบริหารส่วนจังหวัด และนายกองค์การบริหารส่วนจังหวัด</v-toolbar-title
    >
    <v-spacer></v-spacer>

    <span>{{ $store.getters["username"] }}</span>

    <v-btn icon @click="onClickLogOff">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  computed: {
    version() {
      return "1.0";
    },
  },
  methods: {
    onClickLogOff() {
      this.$store.dispatch("doLogout");
    },
  },
};
</script>

<style></style>
