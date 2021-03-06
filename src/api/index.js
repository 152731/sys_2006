import axios from "./config"

// 查看登录接口
export const login = (username, password) => axios({
    url: "/users/login",
    method: "post",
    data: {
        username,
        password
    }

})
// 声明登录日志
/**
 *
 * @param {Obj} _this 一个组件实例
 */
//用户日志
export const getLoginLog = () => axios.get("/getloginlog")

// 获取用户菜单
export const getMenuList = () => axios.get("/permission/getMenuList")

// 获取学员信息
export const getStudentList = () => axios.get('/students/getstulist')

// 删除学员
export const delStudentList = (sId) => axios.get(`/students/delstu?sId=${sId}`)
// 添加学员信息
export const addStudentList = obj => axios.post('students/addstu', obj)

// 修改学员信息
export const updateStudentList = obj => axios.post('/students/updatestu', obj)

// 获取验证码

export const getCaptcha = () => axios.get("/users/getCaptcha")

// 刷新验证码
export const refreshCaptcha = () => axios.get("/users/refreshCaptcha")
// 效验验证码
export const verifyCaptcha = (captcha) => axios.get(`/users/verifyCaptcha?captcha=${captcha}`)


// 头像上传