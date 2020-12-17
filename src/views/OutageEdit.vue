<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex s12 md9>
        <br />
        <v-form @submit.prevent="submit">
          <!-- card # 1 -->
          <v-card class="mx-auto pa-5" outlined :elevation="3">
            <!-- Box #1 : รายงานสถานการณ์ -->
            <v-layout row>
              <v-flex background-color="red" s12 ml-4>
                <h2>รายละเอียดเหตุการณ์</h2>
              </v-flex>
            </v-layout>

            <!-- บรรทัดที่ 1 -->
            <v-layout row>
              <v-flex pl-4 pr-4 pt-4 pb-0 s12 md4>
                <!-- จังหวัด ********************************************** -->
                <v-autocomplete
                  v-model="outageEvent.province"
                  :items="selectProvince"
                  label="จังหวัด"
                  clearable
                  append-icon="mdi-home-city"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-autocomplete>
              </v-flex>

              <!-- เวลาไฟฟ้าดับ -->
              <v-flex pl-4 pr-4 pt-4 pb-0 s12 md4>
                <v-datetime-picker
                  format="24hr"
                  label="เวลาไฟฟ้าดับ"
                  v-model="outageEvent.outageDate"
                  @input="updateDiffs"
                  date-format="dd/MM/yyyy"
                ></v-datetime-picker>
              </v-flex>

              <!-- สภาพอากาศ -->
              <v-flex pl-4 pr-4 pt-4 pb-0 s12 md4>
                <v-autocomplete
                  v-model="outageEvent.weather"
                  :items="selectWeather"
                  label="สภาพอากาศ"
                  clearable
                  append-icon="mdi-weather-cloudy"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <!-- บรรทัดที่ 2 -->
            <v-layout row>
              <!-- สถานีไฟฟ้า -->
              <v-flex pl-4 pr-4 pt-0 pb-0 s12 md4>
                <v-autocomplete
                  v-model="outageEvent.nameOrg"
                  :items="peaSubFilters"
                  label="สถานีไฟฟ้า (กฟภ.)"
                  clearable
                  append-icon="place"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-autocomplete>
              </v-flex>

              <!-- feeder ********************************************** -->
              <v-flex pl-4 pr-4 pt-0 pb-0 s12 md4>
                <v-text-field
                  v-model="outageEvent.feeder"
                  type="TEXT"
                  label="ฟีดเดอร์"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-text-field>
              </v-flex>

              <!-- ระบบไฟฟ้า *********************************************-->
              <v-flex pl-4 pr-4 pt-0 pb-0 s12 md4>
                <v-autocomplete
                  v-model="outageEvent.volt"
                  :items="selectVolt"
                  label="ระบบไฟฟ้า"
                  clearable
                  append-icon="mdi-power"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-autocomplete>
              </v-flex>
            </v-layout>

            <!-- บรรทัดที่ 3 -->
            <v-layout row>
              <!-- ประเภทสถานที่เลือกตั้ง ****************************-->
              <v-flex pl-4 pr-4 pt-6 pb-0 s12 md4>
                <v-autocomplete
                  v-model="outageEvent.typeElection"
                  :items="selectTypeElection"
                  label="ประเภทสถานที่เลือกตั้ง"
                  clearable
                  append-icon="place"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-autocomplete>
              </v-flex>

              <!-- ระบุสถานที่เกิดเหตุ ********************************************** -->

              <v-flex pl-4 pr-4 pt-6 pb-0 s12 md8>
                <v-text-field
                  v-model="outageEvent.namePlace"
                  type="TEXT"
                  label="ระบุสถานที่เกิดเหตุ"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-text-field>
              </v-flex>
            </v-layout>

            <!-- บรรทัดที่ 4 -->
            <v-layout row>
              <!-- สาเหตุ ********************************************** -->
              <v-flex pl-4 pr-4 pt-6 pb-0 s12 md12>
                <v-textarea
                  label="สาเหตุ"
                  no-resize
                  rows="3"
                  :value="value"
                  v-model="outageEvent.cause"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-textarea>
              </v-flex>
            </v-layout>

            <!-- บรรทัดที่ 5 -->
            <!-- บรรทัดสุดท้าย -->
            <v-row class="mt-4 mr-2">
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="cancel">cancel</v-btn>
              <v-btn color="primary" type="submit">confirm</v-btn>
            </v-row>
          </v-card>

          <!-- บรรทัดที่ 6 ผู้รายงาน -->
          <v-layout row>
            <!-- รายละเอียดเพิ่มเติม -->
            <v-flex pa-4 pb-2 s12 md12>
              <h2 style="color: purple; text-align: right">
                <b>ผู้รายงาน: {{ outageEvent.reporterName }}</b>
              </h2>

              <!-- <h3 style="color: gray">ผู้รายงาน2 : {{$store.getters["username"]}}</h3> -->
            </v-flex>
          </v-layout>
          <br />
        </v-form>

        debug
   {{outageEvent}}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from "@/services/api";
import moment from "moment";
export default {
  name: "outage-create",

  data() {
    return {

      // reporterName: this.$store.getters["username"],

      // reporterName: this.$store.getters["codeArea"],

      modalDate: false,
      modalTime: false,
      modalDate2: false,

      isStep1Outage: false,
      isStep2FirstCharge: false,
      isStep3Approve: false,

      outageEvent: {

        outageDate: "", // have
        nameOrg: null, // have
        weather: "-", // have

        province: "",
        feeder: "",
        volt: "",
        typeElection: "",
        namePlace: "",
        cause: "",
      },

      peaSubFilters: [],
      selectVolt: ["ระบบแรงสูง", "ระบบแรงต่ำ"],
      selectWeather: [
        "ปกติ",
        "ชื้น",
        "ลมแรง",
        "ฝนตก",
        "ฝนตกลมแรง",
        "พายุฝนฟ้าคะนอง",
      ],
      selectProvince: [
        "ปทุมธานี",
        "พระนครศรีอยุธยา",
        "อ่างทอง",
        "ลพบุรี",
        "สิงห์บุรี",
        "ชัยนาท",
        "สระบุรี",
        "ชลบุรี",
        "ระยอง",
        "จันทบุรี",
        "ตราด",
        "ฉะเชิงเทรา",
        "ปราจีนบุรี",
        "นครนายก",
        "สระแก้ว",
        "นครราชสีมา",
        "บุรีรัมย์",
        "สุรินทร์",
        "ศรีสะเกษ",
        "อุบลราชธานี",
        "ยโสธร",
        "ชัยภูมิ",
        "อำนาจเจริญ",
        "บึงกาฬ",
        "หนองบัวลำภู",
        "ขอนแก่น",
        "อุดรธานี",
        "เลย",
        "หนองคาย",
        "มหาสารคาม",
        "ร้อยเอ็ด",
        "กาฬสินธุ์",
        "สกลนคร",
        "นครพนม",
        "มุกดาหาร",
        "เชียงใหม่",
        "ลำพูน",
        "ลำปาง",
        "อุตรดิตถ์",
        "แพร่",
        "น่าน",
        "พะเยา",
        "เชียงราย",
        "แม่ฮ่องสอน",
        "นครสวรรค์",
        "อุทัยธานี",
        "กำแพงเพชร",
        "ตาก",
        "สุโขทัย",
        "พิษณุโลก",
        "พิจิตร",
        "เพชรบูรณ์",
        "ราชบุรี",
        "กาญจนบุรี",
        "สุพรรณบุรี",
        "นครปฐม",
        "สมุทรสาคร",
        "สมุทรสงคราม",
        "เพชรบุรี",
        "ประจวบคีรีขันธ์",
        "นครศรีธรรมราช",
        "กระบี่",
        "พังงา",
        "ภูเก็ต",
        "สุราษฎร์ธานี",
        "ระนอง",
        "ชุมพร",
        "สงขลา",
        "สตูล",
        "ตรัง",
        "พัทลุง",
        "ปัตตานี",
        "ยะลา",
        "นราธิวาส",
      ],
      selectTypeElection: ["หน่วยลงคะแนน", "เขตเลือกตั้งอำเภอ", "กกต. จังหวัด"],
    };
  },

  async mounted() {
    //autocomplete สถานีฯ
    this.peasubjson = require("@/assets/data/peaSubstations.json");
    this.peaSubFilters = this.peasubjson.map(item => {
      return {
        text: `${item.code} – ${item.name}`,
        value: item.name
      };
    });  

    let result = await api.getOutageById(this.$route.params.id);
    this.outageEvent = result.data;
    this.outageEvent.outageDate = new Date(result.data.outageDate);
    // alert(JSON.stringify(result.data))

  },

  methods: {
   
    cancel() {
      this.$router.back();
    },
    async submit() {
      // alert(JSON.stringify(this.outageEvent));
      let formData = new FormData();
      const {
   nameOrg,
        weather,
        outageDate,

        province,
        feeder,
        volt,
        typeElection,
        namePlace,
        cause,

        id
      } = this.outageEvent;

      formData.append("nameOrg", nameOrg);
      formData.append("weather", weather);
      formData.append("outageDate", outageDate);

      //ใหม่ ***********************************************************
      formData.append("province", province);
      formData.append("feeder", feeder);
      formData.append("volt", volt);
      formData.append("typeElection", typeElection);
      formData.append("namePlace", namePlace);
      formData.append("cause", cause);
  
      // formData.append("reporterName", this.reporterName);


      formData.append("id", id);

      await api.updateOutage(formData); 

      // ส่งไลน์ route สำรอง await api.sendLineNotify(formData)
      this.$router.back();
    },
   
  
  }
};
</script>

<style></style>
