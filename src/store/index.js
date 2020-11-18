import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);



let userInfo=localStorage.getItem("song") || "{}";
userInfo=JSON.parse(userInfo)
export default new Vuex.Store({
  state: {
    // 将来被多个数组公用的userInfo数组
    // 双击数据丢失该如何，从本地存贮中取出来
    userInfo
  },
  mutations: {
    // 更改userInfo
    SET_USERINFO(state,payload){
        state.userInfo=payload
    }

  },
  actions: {},
  modules: {}
});
