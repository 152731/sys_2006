
import axios from "./config"

// 查看登录接口
 export const login = (username,password)=>axios({
    url:"/users/login",
    method:"post",
    data:{
        username,
        password
    }

 })
 // 声明登录日志
export const getLoginLog=()=>
axios.get("/getloginlog")