// 定义axios
import axios from "axios"
// 引入router
import router from "../router"
// 引入element-ui 来设置好看的提示信息

import ElementUI from "element-ui"
// 开发模式判断
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : "http://www.chst.vip"

// 允许请求携带认证
axios.defaults.withCredentials = true;

//创建请求拦截器，可以给每个请求都携带想要传递的内容
axios.interceptors.request.use(config => {
    // 登录注册是不需要携带cookie
    if (config.url == "/users/login") {
        // 如果请求的路由和登录页面相同时，直接放行
        return config
    }else {
        let token = localStorage.getItem("simon")
        config.headers["authorization"] = token;
        // config每一个请求对象
        // console.log(config);
        // 放行，直接return一个config
        return config
    }
})
// 响应拦截
axios.interceptors.response.use(config=>{
    let {data} =config;
    console.log(config);
    if(data.code=="1004"){
        // 在当前的后台api中1004代表的token效验失败
        console.log("登录失效");
        console.log(router);
        console.log(ElementUI);
        ElementUI.Message.error("登录信息失效重新登录")
       router.push("/login")
    }
    return config
})


axios.create({
    timeout: 4000
})
export default axios


