import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局样式css引入文件
import "./assets/styles/el-reset.css"
import './assets/styles/base.css'
// iconfont图标
import "./assets/iconFonts/iconfont.css"
// 引入subMenu
import qfSubMenu from "qf-sub-menu"
// Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(qfSubMenu)
// 引入nprogress插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由前置钩子(导航守卫)
// to去哪里
// from去哪里
// next继续执行
router.beforeEach((to, from, next) => {
  // 只要页面一打开就出现
  // NProgress.set(.99)
  //用户登录之后，localStorage中有token
  let token = localStorage.getItem("simon") || null;
  //  判断之前要把cookie删除，因为没登录之前是没有token的
  if (token) { //有token时
    // 设置前置钩子：
    if (store.state.menuList.length == 0) {
      //  说明没有用户路由，就要触发action获取用户路由
      store.dispatch("FETCH_MENULIST")
        .then(() => {
          console.log(to.path);
          next({
            path: to.path
          }) //这里要注意,next里面要传参数即要进入的页面路由信息，
          // 因为next传参数后，当前要进入的路由会被截止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效了
        })
    } else {
      next()
    }

  } else { //没有token的时候
    if (to.path === "/login") {
      next()
    } else { //访问的不是登录页
      next({
        path: "/login"
      })
    }
  }
})
// 使用后置钩子处理面包屑
router.afterEach((to, from) => {
  console.log(to);
  let crumblist = to.matched.slice(1)
  console.log(crumblist);
  store.commit('SET_CRUMBS', crumblist)
  // NProgress.done()

})
// 引入
import "./utils/recursionRoutes"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");