<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex s12 md9>
        <!-- Header =>  กรอกแบบฟอร์มรายงานกระแสไฟฟ้าขัดข้อง  -->
        <v-card class="mx-auto pa-3 pl-5 pt-5" outlined :elevation="3">
          <v-layout>
            <v-flex class="title">
              <h2 style="color:#424242;">
                <!-- <v-icon color="primary">mdi-file-document</v-icon> -->
                &nbsp;กรอกแบบฟอร์มรายงานเหตุการณ์กระแสไฟฟ้าขัดข้อง
              </h2>
            </v-flex>
            <!-- <v-spacer></v-spacer> -->
            <v-flex class="d-flex flex-row-reverse" align-xl-center style="color:red;" pr-2>
              <p>
                <b>หมายเลขงาน</b>
                {{workID | uppercase}}
              </p>
            </v-flex>
          </v-layout>
        </v-card>
        <br />

        <!-- <v-btn @click="isDisabled = !isDisabled">จ่ายไฟ</v-btn> -->

        <v-form @submit.prevent="submit">
          <!-- card # 1 -->
          <v-card class="mx-auto pa-5" outlined :elevation="3">
            <!-- line #1 : แจ้งเหตุกระแสไฟฟ้าขัดข้อง -->
            <v-layout row>
              <v-flex background-color="red" s12 ml-4>
                <h2>ส่วนที่ 1 : แจ้งเหตุกระแสไฟฟ้าขัดข้อง</h2>
              </v-flex>
            </v-layout>

            <!-- line #2 : ชุดข้อมูลเวลาไฟฟ้าดับ -->
            <v-layout row>
              <!-- เวลาไฟฟ้าดับ -->
              <v-flex pl-4 pr-4 pt-4 pb-0 s12 md2>
                <v-datetime-picker
                  format="24hr"
                  label="เวลาไฟฟ้าดับ"
                  v-model="outageEvent.outageDate"
                  @input="updateDiffs"
                  date-format="dd/MM/yyyy"
                ></v-datetime-picker>
              </v-flex>
              <!-- select PEA, EGAT, SPP/VSPP -->
              <v-flex pa-4 pb-2 s12 md2>
                <v-autocomplete
                  v-model="outageEvent.typeOrg"
                  :items="selectTypeOrg"
                  label="หน่วยงาน"
                  clearable
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-autocomplete>
              </v-flex>
              <!-- ตัวเลือก PEA, EGAT, SPP/VSPP -->
              <v-flex pa-4 pb-2 s12 md5>
                <v-text-field
                  v-if="outageEvent.typeOrg !='PEA' && outageEvent.typeOrg !='EGAT'&& outageEvent.typeOrg !='SPP/VSPP'"
                  disabled
                  filled
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-text-field>
                <!--  ทางเลือกที่ 1 PEA Substation -->
                <v-autocomplete
                  v-if="outageEvent.typeOrg=='PEA'"
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
                <!--  ทางเลือกที่ 2 EGAT Substation -->
                <v-autocomplete
                  v-if="outageEvent.typeOrg=='EGAT'"
                  v-model="outageEvent.nameOrg"
                  :items="egatSubFilters"
                  label="สถานีไฟฟ้าแรงสูง (กฟผ.)"
                  clearable
                  append-icon="place"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-autocomplete>
                <!--  ทางเลือกที่ 3 SPP/VSPP  -->
                <v-text-field
                  v-if="outageEvent.typeOrg=='SPP/VSPP'"
                  v-model="outageEvent.nameOrg"
                  type="TEXT"
                  suffix
                  label="ผู้ผลิตไฟฟ้า"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-text-field>
              </v-flex>
              <!-- ปริมาณโหลดก่อนทริป -->
              <v-flex pa-4 pb-2 s12 md3>
                <v-text-field
                  v-model="outageEvent.load"
                  type="number"
                  suffix="MW"
                  label="ปริมาณโหลด"
                  step="0.1"
                  min="0"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-text-field>
              </v-flex>
            </v-layout>

            <!-- line #3 : รายงานการจ่ายไฟฟ้าบางส่วน -->
            <v-layout row>
              <v-flex s12 m6 ml-4 mr-4 mt-3>
                <h2>ส่วนที่ 2 : รายงานการจ่ายไฟฟ้าบางส่วน</h2>
              </v-flex>
            </v-layout>

            <!-- line #4 : ชุดข้อมูลรายงานการจ่ายไฟฟ้าบางส่วน -->
            <v-layout row>
              <!-- เวลาจ่ายไฟฟ้าครั้งแรก -->
              <v-flex pl-4 pr-4 pt-4 pb-0 s12 md2>
                <v-datetime-picker
                  label="จ่ายไฟฟ้าครั้งแรก"
                  v-model="outageEvent.firstChargeDate"
                  :disabled="isDisabled"
                  @input="updateDiffs"
                  date-format="dd/MM/yyyy"
                  format="24hr"
                ></v-datetime-picker>
              </v-flex>

              <v-flex pl-4 pr-4 pt-4 pb-0 s12 md8 mt-2>
                <p>
                  <v-icon>mdi-battery-charging-medium</v-icon>
                  เริ่มจ่ายไฟฟ้าได้บางส่วนภายในเวลา {{outageEvent.hoursFristCharge}} ชั่วโมง
                  {{outageEvent.minutesFirstCharge}} นาที
                </p>
              </v-flex>
            </v-layout>

            <!-- line #5 : รายงานการจ่ายไฟฟ้าทั้งหมด -->
            <v-layout row>
              <v-flex s12 m6 ml-4 mr-4 mt-3>
                <h2>ส่วนที่ 3 : รายงานการจ่ายไฟฟ้าคืนทั้งหมด</h2>
              </v-flex>
            </v-layout>

            <!-- line #6 : ชุดข้อมูลรายงานการจ่ายไฟฟ้าทั้งหมด -->

            <v-layout row>
              <!-- เวลาจ่ายไฟฟ้าทั้งหมด -->
              <v-flex pl-4 pr-4 pt-4 pb-0 s12 md2>
                <v-datetime-picker
                  label="จ่ายไฟฟ้าทั้งหมด"
                  v-model="outageEvent.restoreDate"
                  :disabled="isDisabled"
                  @input="updateDiffs"
                  date-format="dd/MM/yyyy"
                ></v-datetime-picker>
              </v-flex>

              <v-flex pl-4 pr-4 pt-4 pb-0 s12 md8 mt-2>
                <P>
                  <v-icon>mdi-battery-charging-high</v-icon>
                  จ่ายไฟฟ้ากลับคืนสู่สภาพปกติในเวลา
                  {{outageEvent.hoursRestore}} ชั่วโมง
                  {{outageEvent.minutesRestore}} นาที
                </P>
              </v-flex>
            </v-layout>

            <!-- Button Submit -->
            <!-- <v-row>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="cancel">cancel</v-btn>
              <v-btn color="primary" type="submit">confirm</v-btn>
            </v-row>-->
          </v-card>

          <br />

          <!-- card # 2 -->
          <v-card class="mx-auto pa-5" outlined :elevation="3">
            <!-- line # 1 : รายละเอียดเพิ่มเติม -->
            <v-layout row>
              <v-flex s12 md6 ml-4 mr-4>
                <h2>รายละเอียดเพิ่มเติม</h2>
              </v-flex>
            </v-layout>

            <!-- line # 2 : รายละเอียดเพิ่มเติม -->
            <v-layout row>
              <v-flex pa-4 pb-0 s12 md3>
                <!-- สภาพอากาศ -->

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
                <!-- spacer -->
                <v-flex mt-3></v-flex>
                <!-- จำนวนผู้ใช้ไฟฟ้า -->

                <v-text-field
                  v-model="outageEvent.numberOfCustomer"
                  type="NUMBER"
                  label="จำนวนผู้ใช้ไฟฟ้า"
                  suffix="ราย"
                  min="0"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex pa-4 pb-0 s12 md9>
                <!-- พื้นที่ไฟดับ -->
                <v-textarea
                  label="พื้นที่ไฟดับ"
                  no-resize
                  rows="3"
                  :value="value"
                  v-model="outageEvent.areaOutage"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                  chips
                ></v-textarea>
              </v-flex>
            </v-layout>

            <!-- line # 3 : จุดเกิดเหตุ -->
            <v-layout row>
              <v-flex pa-4 pb-0 s12 md3>
                <!-- จุดสังเกตุ -->
                <v-text-field
                  v-model="outageEvent.tripLocation"
                  type="TEXT"
                  label="จุดสังเกต"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-text-field>
              </v-flex>

              <!-- ตำบล -->
              <v-flex pa-4 pb-0 s12 md3>
                <ThailandAutoComplete
                  v-model="district"
                  type="district"
                  @select="select"
                  label="ตำบล"
                  color="#35495e"
                />
              </v-flex>

              <!-- อำเภอ -->
              <v-flex pa-4 pb-0 s12 md3>
                <ThailandAutoComplete
                  v-model="amphoe"
                  type="amphoe"
                  @select="select"
                  label="อำเภอ"
                />
              </v-flex>

              <!-- จังหวัด -->
              <v-flex pa-4 pb-0 s12 md3>
                <ThailandAutoComplete
                  v-model="province"
                  type="province"
                  @select="select"
                  label="จังหวัด"
                  color="#35495e"
                />
              </v-flex>
            </v-layout>

            <!-- line # 4 : สาเหตุ -->
            <v-layout row>
              <!-- เลือก สาเหตุ -->
              <v-flex pa-4 pb-0 pr-0 pt-2 s12 md1>
                <p>
                  <v-icon>mdi-comment-question</v-icon>&nbsp;สาเหตุ
                </p>
              </v-flex>
              <v-flex pa-4 pb-0 pt-2 s12 md2>
                <v-radio-group
                  v-model="isKnownCause"
                  column
                  dense
                  hide-no-data
                  hide-details
                  class="pa-0 ma-0"
                >
                  <v-radio label="ไม่ทราบสาเหตุ" value="ไม่ทราบสาเหตุ"></v-radio>
                  <v-radio label="ทราบสาเหตุ" value="ทราบสาเหตุ"></v-radio>
                </v-radio-group>
              </v-flex>

              <v-flex pa-4 pb-0 pt-2 s12 md9>
                <!-- ไม่ทราบสาเหตุ -->
                <v-textarea
                  v-if="isKnownCause=='ไม่ทราบสาเหตุ'"
                  no-resize
                  rows="2"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                  filled
                  disabled
                ></v-textarea>

                <!-- ทราบสาเหตุ -->
                <v-textarea
                  v-if="isKnownCause=='ทราบสาเหตุ'"
                  label="สาเหตุ"
                  no-resize
                  rows="2"
                  :value="value"
                  v-model="outageEvent.tripCause"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                  chips
                ></v-textarea>
              </v-flex>
            </v-layout>

            <!-- line # 5 : ผู้ใช้ไฟฟ้าระบบ 115 kV / SPP / VSPP -->
            <v-layout row>
              <!-- <v-flex s12 md2 ml-4 mr-4 > -->
              <v-flex pa-4 pb-0 s12 md3>
                <p>
                  <v-icon>mdi-bullhorn</v-icon>&nbsp;ผู้ได้รับผลกระทบ
                </p>
              </v-flex>
              <v-flex pa-4 pb-0 s12 md9>
                <v-btn color="#5B4863" @click="addCus115toDlg(item)" outlined style="width:48%; margin-right: 4%" caption>ผู้ใช้ไฟฟ้าระบบ 115 kV</v-btn>
                
                <v-btn color="#5B4863" outlined style="width:48% " caption> ผู้ผลิตไฟฟ้ารายเล็ก/เล็กมาก</v-btn>

              </v-flex>
    

            </v-layout>

            <!-- dialog ของ ผู้ใช้ไฟฟ้าระบบ 115 kV -->  
            <v-dialog v-model="confirmAddCus115Dlg" max-width="1000">
              <v-card>
                <!-- Topic -->
                <v-layout>
                  <v-flex pa-4 pl-10 pr-10 s12 md12 pb-1>
                    <h2 align="center">ผู้ใช้ไฟฟ้าระบบ 115 kV</h2>
                  </v-flex>
                </v-layout>

                <!-- description -->
                <v-layout>
                  <v-flex pa-4 pl-10 pr-10 s12 md12 pt-1 pb-0>
                    <p
                      style="color:gray" align="center"
                    >จากเหตุการณ์กระแสไฟฟ้าขัดข้อง มีผู้ใช้ไฟฟ้าระบบ 115 kV ได้รับผลกระทบทั้งหมดจำนวน {{outageEventCus115Arrays.length}} ราย ดังนี้</p>
                  </v-flex>
                </v-layout>
                
            

                <!-- ผู้ใช้ไฟฟ้า 115 ที่ได้รับผลกระทบ  :label="`ผู้ใช้ไฟฟ้าระบบ 115 kV รายที่ ${index+1}`"  -->
                <v-layout>
                  <v-flex pa-4 s12 md12>
                    <tr v-for="(item,index) in outageEventCus115Arrays" :key="index">
                      <td style="width:50px"></td>
                      <td style="width:250px;">
                        <p>ผู้ใช้ไฟฟ้าระบบ 115 kV รายที่: {{index+1}}</p>
                      </td>
                      <!-- <td style="width:90%; padding:4px 0;"> -->
                      <td style="width:560px">
                        <v-text-field
                          v-model="item.cus115"
                          :label="` # ${index+1}`"
                          type="TEXT"
                          outlined
                          dense
                          hide-no-data
                          hide-details
                        ></v-text-field>
                      </td>

                      <td style="width:20px;">
                        <v-icon @click="deleteCus115(index,item)">delete</v-icon>
                      </td>
                    </tr>
                  </v-flex>
                </v-layout>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- ยกเลิก รอสร้าง Function 1. cls v-model 2. ย้อนกลับ confirmAddCus115Dlg ==false -->
                  <v-btn outlined color="primary" @click="addCus115" dense >
                      <v-icon>mdi-plus</v-icon>
                      เพิ่ม
                    </v-btn>
                  <v-btn color="error" @click="clsCus115Dlg()">clear</v-btn>
                  <v-btn color="primary" @click="confirmAddCus115Dlg = false">ok</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>






            <!-- line # 6 : รายละเอียดอุปกรณ์ที่เสียหาย -->
<v-layout row>
          <v-flex pa-4 pb-0 s12 md3>
                <p>
                  <v-icon>mdi-server-network</v-icon>&nbsp;รายละเอียดอุปกรณ์
                </p>
              </v-flex>
              <v-flex pa-4 pb-0 s12 md9>
                <v-btn color="#5B4863"  outlined style="width:48%; margin-right: 4%" caption>เซอร์กิตเบรกเกอร์ / รีเลย์</v-btn>
                
                <v-btn color="#5B4863" outlined style="width:48% " caption>การทำงานของอุปกรณ์ป้องกัน</v-btn>

              </v-flex>
</v-layout>


            <!-- บรรทัดที่ 11111111111111111111111 -->
            <v-layout row>
              <!-- <v-flex pa-4 pb-2 s12 md4 align-self-md-center>
                <v-btn icon color="primary" @click="addRelayCB" dense>
                  <v-icon>mdi-battery-charging-20</v-icon>
                </v-btn>
                <label>รายละเอียดอุปกรณ์</label>
              </v-flex>-->

              <!-- ผู้ใช้ไฟฟ้า 115 ที่ได้รับผลกระทบ -->

              <!-- <v-flex pa-4 pb-2 s12 md8>
                <tr v-for="(item,index) in outageEventRelayCBArrays" :key="index">
                  <td style="width:100%; padding:4px 0;">
                    <div style="width:100%; padding:4px 0;">
                      <v-text-field
                        v-model="item.relay"
                        :label="`Relay ชุดที่ ${index+1}`"
                        type="TEXT"
                        outlined
                        dense
                        hide-no-data
                        hide-details
                      ></v-text-field>
                    </div>
                    <div style="width:100%; padding:4px 0;">
          
                      <v-text-field
                        v-model="item.circuitBreaker"
                        :label="`Circuite Breaker ชุดที่ ${index+1}`"
                        type="TEXT"
                        outlined
                        dense
                        hide-no-data
                        hide-details
                      ></v-text-field>
                    </div>
                  </td>

                  <v-icon @click="deleteRelayCB(index,item)">delete</v-icon>
                </tr>
              </v-flex>-->
            </v-layout>

            <!-- บรรทัดที่ 11111111111111111111 CUS 115 kV-->
            <v-layout row>
              <!-- <v-flex pa-4 pb-2 s12 md4 align-self-md-center>
                <v-btn icon color="primary" @click="addCus115" dense>
                  <v-icon>mdi-account-plus</v-icon>
                </v-btn>
                <label>ผู้ใช้ไฟฟ้าระบบ 115 kV</label>
              </v-flex>-->

              <!-- ผู้ใช้ไฟฟ้า 115 ที่ได้รับผลกระทบ -->

              <!-- <v-flex pa-4 s12 md8>
                <tr v-for="(item,index) in outageEventCus115Arrays" :key="index">
                  <td style="width:100%; padding:4px 0;">
                    <v-text-field
                      v-model="item.cus115"
                      :label="`ผู้ใช้ไฟฟ้าระบบ 115 kV รายที่ ${index+1}`"
                      type="TEXT"
                      outlined
                      dense
                      hide-no-data
                      hide-details
                    ></v-text-field>
                  </td>
                  <v-icon @click="deleteCus115(index,item)">delete</v-icon>
                </tr>
              </v-flex>-->
            </v-layout>

            <!-- บรรทัดที่ 8 -->
            <v-layout row>
              <!-- รายละเอียดเพิ่มเติม -->
              <v-flex pa-4 pb-2 s12 md12>
                <v-textarea
                  label="รายละเอียดเพิ่มเติม"
                  no-resize
                  rows="3"
                  :value="value"
                  v-model="outageEvent.moreDetails"
                  persistent-hint
                  outlined
                  dense
                  hide-no-data
                  hide-details
                ></v-textarea>
              </v-flex>
            </v-layout>

            <!-- บรรทัดที่ 9 -->
            <v-layout row>
              <!-- รายละเอียดเพิ่มเติม -->
              <v-flex pa-4 pb-2 s12 md12>
                <h2 class="title">
                  <b>ผู้รายงาน: {{reporterName}}</b>
                </h2>

                <!-- <h3 style="color: gray">ผู้รายงาน2 : {{$store.getters["username"]}}</h3> -->
              </v-flex>
            </v-layout>
{{sumCus115}}
            <!-- เพิ่มรูป ยังไม่เอา -->
            <!-- <v-layout row>
              <v-flex pa-4 pb-2 s12 md4>
                <input type="file" @change="onFileSelected" />
                <br />
                <br />

                <v-img
                  v-if="imageURL"
                  :src="imageURL"
                  style="height: 200px; width:200px;"
                  class="mt-3"
                ></v-img>
              </v-flex>
            </v-layout>-->

            <!-- บรรทัดสุดท้าย -->
            <v-row>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="cancel">cancel</v-btn>
              <v-btn color="primary" type="submit">confirm</v-btn>
            </v-row>
          </v-card>
        </v-form>
<h3 style="color:red">
  {{outageEventCus115Arrays}}
</h3>
        <!-- DeBugging -->
        <!-- <h3 style="color:purple">{{outageEventCus115Arrays}}</h3> -->

        <!-- <br />
          <hr />
          <h2>debugging :</h2>
        <span style="color:red">{{ outageEvent }}</span>-->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ThailandAutoComplete from "@/components/thailandAddress/vue-thailand-address-autocomplete.vue";
import api from "@/services/api";
import moment from "moment";

export default {
  name: "outage-create",
  components: {
    ThailandAutoComplete
  },
  // data: () => ({

  // }),
  data() {
    return {
      reporterName: this.$store.getters["username"],
      // reporterName: this.$store.state["username"],

      // reporterName: this.$store.mutations["username"],

      // reporterName:'',
      workID: this.$store.getters["codeArea"] + Date.now().toString(32),

      modalDate: false,
      modalTime: false,
      modalDate2: false,
      isSMC: false,
      isDisableSMC: false,
      isDisabled: true,
      isCus115: false,
      isKnownCause: "ไม่ทราบสาเหตุ",
      isStep1Outage: false,
      isStep2FirstCharge: false,
      isStep3Approve: false,

      confirmAddCus115Dlg: false,

      district: "",
      amphoe: "",
      province: "",

      outageEvent: {
        tripLocation: "",

        hoursFristCharge: 0, //have
        minutesFirstCharge: 0, //have
        hoursRestore: 0, //have
        minutesRestore: 0, //have

        outageTime: null, // รอลบในฐานข้อมูล

        outageDate: "", // have
        firstChargeDate: "",
        restoreDate: "",

        typeOrg: "", // have
        nameOrg: null, // have

        load: "", // have
        numberOfCustomer: null, // have
        weather: "-", // have

        areaOutage: "", // have
        tripCause: "", // have
        moreDetails: "", // have
        image: null // have
      },
      outageEventCus115Arrays: [{ cus115: "" }],
      outageEventRelayCBArrays: [
        {
          relay: "",
          circuitBreaker: ""
        }
      ],
      imageURL: null,

      peaSubFilters: [],
      egatSubFilters: [],
      selectTypeOrg: ["PEA", "EGAT", "SPP/VSPP"],
      selectWeather: [
        "ปกติ",
        "ชื้น",
        "ลมแรง",
        "ฝนตก",
        "ฝนตกลมแรง",
        "พายุฝนฟ้าคะนอง"
      ]
    };
  },
  mounted() {
    //autocomplete สถานีฯ
    this.peasubjson = require("@/assets/data/peaSubstations.json");
    this.peaSubFilters = this.peasubjson.map(item => {
      return {
        text: `${item.code} – ${item.name}`,
        value: item.name
      };
    });

    //autocomplete สฟ.
    this.egatsubjson = require("@/assets/data/egatSubstations.json");
    this.egatSubFilters = this.egatsubjson.map(item => {
      return {
        text: `${item.code} – ${item.name}`,
        value: item.name
      };
    });
  },
  methods: {
    clsCus115Dlg() {
      this.outageEventCus115Arrays = [{ cus115: "" }];
      this.confirmAddCus115Dlg = false;
    },
    addCus115toDlg(item) {
      this.confirmAddCus115Dlg = true;
    },
    select(address) {
      this.district = address.district;
      this.amphoe = address.amphoe;
      this.province = address.province;
    },
    isSMCApprove() {
      this.isSMC = true;
      this.isDisableSMC = true;
    },

    updateDiffs() {
      let a = this.outageEvent.firstChargeDate - this.outageEvent.outageDate;
      let b = this.outageEvent.restoreDate - this.outageEvent.outageDate;

      if (a >= 0) {
        let diff1 = Math.abs(
          this.outageEvent.firstChargeDate - this.outageEvent.outageDate
        );
        this.outageEvent.hoursFristCharge = Math.floor(diff1 / 3600000); //60 *60 *1000
        diff1 -= this.outageEvent.hoursFristCharge * 3600000; //60 *60 *1000
        this.outageEvent.minutesFirstCharge = Math.floor(diff1 / 60000); //60 *1000
        if (b >= 0) {
          let diff2 = Math.abs(
            this.outageEvent.restoreDate - this.outageEvent.outageDate
          );
          this.outageEvent.hoursRestore = Math.floor(diff2 / 3600000);
          diff2 -= this.outageEvent.hoursRestore * 3600000;
          this.outageEvent.minutesRestore = Math.floor(diff2 / 60000);
        } else {
          this.outageEvent.hoursRestore = "-";
          this.outageEvent.minutesRestore = "-";
        }
      } else {
        this.outageEvent.hoursFristCharge = "-";
        this.outageEvent.hoursRestore = "-";

        this.outageEvent.minutesFirstCharge = "-";
        this.outageEvent.minutesRestore = "-";
      }
    },
    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = event => {
        //for Preview
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

      //for Upload
      this.outageEvent.image = event.target.files[0];
    },
    cancel() {
      this.$router.back();
    },
    async submit() {
      // alert(JSON.stringify(this.outageEvent));
      // alert(JSON.stringify(this.outageEvent.typeOrg));

      let formData = new FormData();
      const {
        hoursFristCharge,
        minutesFirstCharge,
        hoursRestore,
        minutesRestore,
        typeOrg,
        nameOrg,
        load,
        numberOfCustomer,
        weather,
        areaOutage,
        tripCause,
        moreDetails,
        outageDate,
        firstChargeDate,
        restoreDate
      } = this.outageEvent;
      formData.append("hoursFristCharge", hoursFristCharge);
      formData.append("minutesFirstCharge", minutesFirstCharge);
      formData.append("hoursRestore", hoursRestore);
      formData.append("minutesRestore", minutesRestore);
      formData.append("typeOrg", typeOrg);

      formData.append("numberOfCustomer", numberOfCustomer);
      formData.append("weather", weather);
      formData.append("areaOutage", areaOutage);
      formData.append("tripCause", tripCause);
      formData.append("moreDetails", moreDetails);

      formData.append("nameOrg", nameOrg);
      formData.append("load", load);
      formData.append("outageDate", outageDate);
      formData.append("firstChargeDate", firstChargeDate);
      formData.append("restoreDate", restoreDate);

      formData.append("image", this.outageEvent.image);
      formData.append("reporterName", this.reporterName);
      formData.append("workID", this.workID);

      let sumCus115 = [];
      for (var i = 0; i < this.outageEventCus115Arrays.length; i++) {
        sumCus115[i] = this.outageEventCus115Arrays[i].cus115; 
        formData.append("cus115", JSON.stringify(sumCus115));
      }







      if (this.outageEventRelayCBArrays.length == "5") {
        formData.append("relaya", this.outageEventRelayCBArrays[0].relay);
        formData.append("relayb", this.outageEventRelayCBArrays[1].relay);
        formData.append("relayc", this.outageEventRelayCBArrays[2].relay);
        formData.append("relayd", this.outageEventRelayCBArrays[3].relay);
        formData.append("relaye", this.outageEventRelayCBArrays[4].relay);

        formData.append(
          "circuitBreakera",
          this.outageEventRelayCBArrays[0].circuitBreaker
        );
        formData.append(
          "circuitBreakerb",
          this.outageEventRelayCBArrays[1].circuitBreaker
        );
        formData.append(
          "circuitBreakerc",
          this.outageEventRelayCBArrays[2].circuitBreaker
        );
        formData.append(
          "circuitBreakerd",
          this.outageEventRelayCBArrays[3].circuitBreaker
        );
        formData.append(
          "circuitBreakere",
          this.outageEventRelayCBArrays[4].circuitBreaker
        );
      }
      if (this.outageEventRelayCBArrays.length == "4") {
        formData.append("relaya", this.outageEventRelayCBArrays[0].relay);
        formData.append("relayb", this.outageEventRelayCBArrays[1].relay);
        formData.append("relayc", this.outageEventRelayCBArrays[2].relay);
        formData.append("relayd", this.outageEventRelayCBArrays[3].relay);

        formData.append(
          "circuitBreakera",
          this.outageEventRelayCBArrays[0].circuitBreaker
        );
        formData.append(
          "circuitBreakerb",
          this.outageEventRelayCBArrays[1].circuitBreaker
        );
        formData.append(
          "circuitBreakerc",
          this.outageEventRelayCBArrays[2].circuitBreaker
        );
        formData.append(
          "circuitBreakerd",
          this.outageEventRelayCBArrays[3].circuitBreaker
        );
      }
      if (this.outageEventRelayCBArrays.length == "3") {
        formData.append("relaya", this.outageEventRelayCBArrays[0].relay);
        formData.append("relayb", this.outageEventRelayCBArrays[1].relay);
        formData.append("relayc", this.outageEventRelayCBArrays[2].relay);

        formData.append(
          "circuitBreakera",
          this.outageEventRelayCBArrays[0].circuitBreaker
        );
        formData.append(
          "circuitBreakerb",
          this.outageEventRelayCBArrays[1].circuitBreaker
        );
        formData.append(
          "circuitBreakerc",
          this.outageEventRelayCBArrays[2].circuitBreaker
        );
      }
      if (this.outageEventRelayCBArrays.length == "2") {
        formData.append("relaya", this.outageEventRelayCBArrays[0].relay);
        formData.append("relayb", this.outageEventRelayCBArrays[1].relay);
        formData.append(
          "circuitBreakera",
          this.outageEventRelayCBArrays[0].circuitBreaker
        );
        formData.append(
          "circuitBreakerb",
          this.outageEventRelayCBArrays[1].circuitBreaker
        );
      }
      if (this.outageEventRelayCBArrays.length == "1") {
        formData.append("relaya", this.outageEventRelayCBArrays[0].relay);
        formData.append(
          "circuitBreakera",
          this.outageEventRelayCBArrays[0].circuitBreaker
        );
      }

      await api.addOutage(formData); // รวมส่งไลน์ด้วยแล้ว

      // ส่งไลน์ route สำรอง await api.sendLineNotify(formData)
      this.$router.back();
    },
    activateIsCus115() {
      this.isCus115 = true;
    },
    addCus115() {
      this.outageEventCus115Arrays.push({
        cus115: ""
      });
    },
    deleteCus115(index, outageEventCus115Array) {
      var idx = this.outageEventCus115Arrays.indexOf(outageEventCus115Array);
      console.log(idx, index);
      if (idx > -1) {
        this.outageEventCus115Arrays.splice(idx, 1);
      }
    },
    addRelayCB() {
      this.outageEventRelayCBArrays.push({
        relay: "",
        circuitBreaker: ""
      });
    },
    deleteRelayCB(index, outageEventRelayCBArray) {
      var idx = this.outageEventRelayCBArrays.indexOf(outageEventRelayCBArray);
      console.log(idx, index);
      if (idx > -1) {
        this.outageEventRelayCBArrays.splice(idx, 1);
      }
    }
  }
};
</script>

<style>
</style>
