
import axios,{CancelToken} from "./config"

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
 /**
 *
 * @param {Obj} _this 一个组件实例
 */
export const getLoginLog=(_this)=>axios.get("/getloginlog",{
    cancelToken:new CancelToken(function(c){
             _this.cancel=c//相当于给组件添加一个cancel属性
    })
})

// 获取用户菜单

export const getMenuList=()=>axios.get("/permission/getMenuList")