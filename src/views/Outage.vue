<template>
  <v-container>
    <!-- Summary Section -->

    <v-card class="mb-2">
      <v-card-title>
        <h3 style="color: #210f37">
          สรุปเหตุการณ์กระแสไฟฟ้าขัดข้อง
          ที่ส่งผลกระทบต่อบริเวณจัดการเลือกตั้งนายกและสมาชิกสภาองค์การบริหารส่วนจังหวัด
          <small>(วันที่ 20 ธันวาคม 2563)</small>
        </h3>
      </v-card-title>
    </v-card>

    <!-- Table Section -->

    <v-card class="margin-top: 16 px">
      <v-data-table :search="search" :headers="headers" :items="mDataArray">
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>รายการค้นหา</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              @click="$router.push('/outage-create')"
              color="primary"
              dark
              class="mb-2"
            >
              <v-icon left>add</v-icon>
              <span>รายงานเหตุการณ์</span>
            </v-btn>
          </v-toolbar>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ index, item }">
          <tr>
            <!-- <td>{{ item.id }}</td> -->
            <td style="width: 3%">{{ index + 1 }}</td>
            <td style="background: blue; color: white; width: 5%">
              {{ item.reporterName }}
            </td>
            <td style="width: 11%">{{ item.outageDate | date }} น.</td>
            <td style="width: 10%">{{ item.nameOrg }}</td>
            <td style="width: 7%">{{ item.feeder }}</td>
            <td style="width: 7%">{{ item.volt }}</td>
            <td style="width: 15%">{{ item.cause }}</td>
            <td style="width: 8%">{{ item.weather }}</td>
            <td style="width: 12%">{{ item.namePlace }}</td>

            <!-- แก้ได้ในเขตตัวเอง -->
            <td v-if="item.reporterName == $store.getters['codeArea'] ||thisIsSmc =='ศูนย์สั่งการระบบไฟฟ้า'">
              <v-icon class="mr-2" @click="editItem(item)">edit</v-icon>
              <v-icon class="ma-1" @click="deleteItem(item)">delete</v-icon>
            </td>

          </tr>
        </template>
      </v-data-table>
      <v-dialog v-model="confirmDeleteDlg" max-width="290">
        <v-card>
          <v-card-title primary-title>มั่นใจแล้วนะว่าจะลบ ??</v-card-title>
          <v-card-text class="body">ให้คิดอีกรอบ ถ้าจะลบก็ลบเลย</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="confirmDeleteDlg = false">ยกเลิก</v-btn>
            <v-btn color="error" @click="confirmDelete">จะลบละนะ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>


  </v-container>
</template>

<script>
// import Axios from "axios";
import api from "@/services/api";
import moment from "moment";

import fs from "fs";

export default {
  name: "Outage",
  data() {
    return {
      thisIsSmc: this.$store.getters["username"],
      search: "",
      selectedOutageId: "",
      confirmDeleteDlg: false,
      mDataArray: [],
      headers: [
        { text: "ลำดับ", sortable: false },
        { text: "เขต", value: "reporterName" },
        { text: "วันเวลาที่เกิดเหตุการณ์", value: "outageDate" },
        { text: "สถานีไฟฟ้า", value: "nameOrg" },
        { text: "ฟีดเดอร์", value: "feeder" },
        { text: "ระบบไฟฟ้า", value: "volt" },
        { text: "สาเหตุ", value: "volt" },
        { text: "สภาพอากาศ", value: "weather" },
        { text: "พื้นที่จัดการเลือกตั้ง", value: "namePlace" },

        { text: "ACTION", sortable: false },

        //    { text: "อนุมัติ", value: "typeOrg" },
        // { text: "สถานะ", value: "nameOrg" },
        // { text: "วันเวลาที่เกิดเหตุการณ์", value: "load" },
        // { text: "สถานีไฟฟ้า", value: "outageDate" },
        // { text: "ปริมาณโหลด", value: "outageTime" },
        // { text: "ผู้รายงาน", value: "action" }
      ],
      output: "",
    };
  },

  methods: {
    editItem(item) {
      this.$router.push(`/outage-edit/${item.id}`);
    },

    deleteItem(item) {
      this.selectedOutageId = item.id;
      this.confirmDeleteDlg = true;
    },
    async confirmDelete() {
      await api.deleteOutage(this.selectedOutageId);
      this.confirmDeleteDlg = false;
      this.loadOutages();
    },
    async loadOutages() {
      let result = await api.getOutages();
      this.mDataArray = result.data;
    },
  },

  async mounted() {
    // Axios.get("http://localhost:8081/api/v2/outage").then(result => {
    //   console.log(JSON.stringify(result.data));
    // console.log("stock is running");
    // let result = await api.getOutages();
    // this.mDataArray = result.data;
    this.loadOutages();
  },
};
</script>

<style>
</style>
