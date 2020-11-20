import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

// 引入获取用户菜单
import {getMenuList}   from "@/api"

// 引入allRoutes
import allRoutes from "../router/allRoutes"
// 引入递归函数
import recursionRoutes from "../utils/recursionRoutes"
// 引入动态路由dynamicRoutes
import dynamicRoutes from "../router/dynamicRoutes"
// 引入route
import router from "../router"




let userInfo=localStorage.getItem("song") || "{}";
userInfo=JSON.parse(userInfo)
export default new Vuex.Store({
  state: {
    // 将来被多个数组公用的userInfo数组
    // 双击数据丢失该如何，从本地存贮中取出来
    userInfo,
    menuList:[],//用户定义侧边栏
    crumbs:[]
  },
  mutations: {
    // 更改userInfo
    SET_USERINFO(state,payload){
        state.userInfo=payload
    },
    SET_MENULIST(state,payload){
           state.menuList=payload;
        // 动态的将路由添加到routes中核心方法：router.addRoutes(复合路由配置规则的数据)
        // 1第一步将menu List赋值给dynamicRoutes的children
      let target= dynamicRoutes.find(item=>item.path==="/" )
      target.children=[...state.menuList]
      // 动态添加路由配置到router/routes中
      router.addRoutes(dynamicRoutes)
    }, 
    // 设置面包屑
     SET_CRUMBS(state,payload){
       state.crumbs=payload
     }
  },
  actions: {
    //1: 发送请求，获取用户菜单数据
    async FETCH_MENULIST({commit}){
      // 2通过allRoutes和请求回来的用户菜单数据进行对比，将结果提交给mutation
     let userMenu=await getMenuList()
       let sideMenu=  recursionRoutes(allRoutes,userMenu.data.menuList)
      //  第三步将mutation
      commit('SET_MENULIST',sideMenu)
         }
       
},
  modules: {

  }
});
