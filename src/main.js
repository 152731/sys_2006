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

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 路由前置钩子(导航守卫)
// to去哪里
// from去哪里
// next继续执行
router.beforeEach((to,from,next)=>{
      //用户登录之后，localStorage中有token
       let token=localStorage.getItem("simon");
      //  判断之前要把cookie删除，因为没登录之前是没有token的
       if(token){//有token时
         next()
       }else{//没有token的时候
        if(to.path==="/login"){
          next()
        }else{//访问的不是登录页
          next({path:"/login"})
        }
       }            
})

// 引入
import "./utils/recursionRoutes"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
