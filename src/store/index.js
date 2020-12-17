import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";
import { server } from "@/services/constants";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isLogged: false,
    username: "",
  },

  getters: {
    isLogin(state) {
      return state.isLogged;
    },
    username(state) {
      if (state.username == "addc_n1")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 1 (ภาคเหนือ) จังหวัดเชียงใหม่";
      if (state.username == "addc_n2")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 2 (ภาคเหนือ) จังหวัดพิษณุโลก";
      if (state.username == "addc_n3")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 3 (ภาคเหนือ) จังหวัดลพบุรี";
      if (state.username == "addc_ne1")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 1 (ภาคตะวันออกเฉียงเหนือ) จังหวัดอุดรธานี";
      if (state.username == "addc_ne2")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 2 (ภาคตะวันออกเฉียงเหนือ) จังหวัดอุบลราชธานี";
      if (state.username == "addc_ne3")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 3 (ภาคตะวันออกเฉียงเหนือ) จังหวัดนครราชสีมา";
      if (state.username == "addc_c1")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 1 (ภาคกลาง) จังหวัดพระนครศรีอยุธยา";
      if (state.username == "addc_c2")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 2 (ภาคกลาง) จังหวัดชลบุรี";
      if (state.username == "addc_c3")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 3 (ภาคกลาง) จังหวัดนครปฐม";
      if (state.username == "addc_s1")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 1 (ภาคใต้) จังหวัดเพชรบุรี";
      if (state.username == "addc_s2")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 2 (ภาคใต้) จังหวัดนครศรีธรรมราช";
      if (state.username == "addc_s3")
        return "ศูนย์ควบคุมการจ่ายไฟฟ้าเขต 3 (ภาคใต้) จังหวัดยะลา";
      if (state.username == "smc") return "ศูนย์สั่งการระบบไฟฟ้า";
      else {
        return state.username;
      }
      // return state.username;
    },
    codeArea(state) {
      if (state.username == "addc_n1") return "กฟน.1";
      if (state.username == "addc_n2") return "กฟน.2";
      if (state.username == "addc_n3") return "กฟน.3";
      if (state.username == "addc_ne1") return "กฟฉ.1";
      if (state.username == "addc_ne2") return "กฟฉ.2";
      if (state.username == "addc_ne3") return "กฟฉ.3";
      if (state.username == "addc_c1") return "กฟก.1";
      if (state.username == "addc_c2") return "กฟก.2";
      if (state.username == "addc_c3") return "กฟก.3";
      if (state.username == "addc_s1") return "กฟต.1";
      if (state.username == "addc_s2") return "กฟต.2";
      if (state.username == "addc_s3") return "กฟต.3";
      if (state.username == "smc") return "ศสฟ.";
    },
  },
  mutations: {
    SET_LOGGED_IN(state) {
      state.isLogged = true;
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
    },
    SET_USERNAME(state, value) {
      state.username = value;
    },
    
  },
  actions: {
    async doLogin({ commit, state, dispatch }, { username, password }) {
      let result = await api.login({ username, password });
      if (result == true) {
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
      } else {
        dispatch("doLogout", {});
      }
    },
    doLogout({ commit, state, dispatch }) {
      api.logoff();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME", "");
    },
    restoreLogin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
      }
    },
  },
  modules: {},
});
