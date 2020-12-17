import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import "material-design-icons-iconfont/dist/material-design-icons.css";
import DateFilter from './filters/date';

import VueThailandAddress from 'vue-thailand-address';
import Vue2Filters from 'vue2-filters';
import {imageUrl} from '@/services/constants'
import VueHtml2Canvas from 'vue-html2canvas';
import ThailandAutoComplete from 'vue-thailand-address-autocomplete';
import DatetimePicker from 'vuetify-datetime-picker';

import LongdoMap from 'longdo-map-vue' 

Vue.use(LongdoMap, {     
       load: {         
            apiKey: 'adb19628ea48e7eda8de0b9827cd182c'     
       } 
})




// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'
Vue.filter('date', DateFilter)
Vue.use(DatetimePicker)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


Vue.use(VueThailandAddress);
Vue.use(Vue2Filters);
Vue.use(VueHtml2Canvas);
Vue.component('ThailandAutoComplete', ThailandAutoComplete)

Vue.filter("imageUrl", function(image){
  return `${imageUrl}/${image}?timestamp=${Date.now()}`;
})


