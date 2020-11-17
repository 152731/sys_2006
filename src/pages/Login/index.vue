<template>
  <div class="login-pages">
    <div class="left"></div>
    
    <div class="loginContainer">
       <h1 class="title">宋小宝的后宫</h1>
      <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
    >
      <!-- 用户名输入框 -->
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <!-- 密码输入框 -->
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        > 
      </el-form-item>
    </el-form>
    </div>

     <video class="bg_video"
           muted
           src="../../assets/video/bg_video.mp4"
           autoplay
           loop
           preload="auto">
     </video>
     
  </div>

</template>

<script>
export default {
  data() {
    // jsDoc
    /**
     * @param {object} rule  就是一个表单验证对象 param参数
     * @param {String} 输入值，用户名输入框里面的值 
     * @param {Function} callback 效验通过不传参，不通过传参
     */
   
    var validataUsername = (rule, value, callback) => {
       var uPattern=/^[a-zA-Z0-9]{0,6}$/;
      //  验证如果不满足callback返回提示，验证通过直接返回callback
       if(!value){
            callback("注意规则")     
       }else{
         callback()
       }
    };
    var validataPassword = (rule, value, callback) => {
      if(!value){
            callback("请输入密码")     
       }else{
         callback()
       }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validataUsername, trigger: "blur" }],
        password: [{ validator: validataPassword, trigger: "blur" }],
      },                      
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.$refs[formName]);//validate一个方法
      this.$refs[formName].validate((valid) => {
        if (valid) {//本地效验通过发送登录请求
          alert("提交成功");
        } else {
          alert("提交失败");
          return false;
        }
      });                                
    },
  },
};
</script>
<style lang="less" >
/*整体表单样式 */
 .el-form{
   width: 400px
 }
 .el-button{
   width: 80%
 }



 .login-pages {
    height: 100%;
    width: 100%;
    background: url("../../assets/imgs/bg.jpg");
    overflow: hidden;
  }
 .loginContainer {
     position: relative;
    z-index: 9;
    width: 25rem;
    height: 30.47619048rem;
    position: absolute;
    top: 50%;
    left: 75%;
      transform: translate(-50%, -50%);
    border-radius: 11px;
    background: rgba(83, 107, 182, 0.46);
    background: rgba(53, 32, 32, 0.2);

 .title {
      color: red;
      margin-top: 100px;
      margin-bottom: 50px;
    }
    h1.title{
      text-align: center;
    }
  .el-button.el-button--primary {
      width: 82%;
      background: linear-gradient(90deg, #1596fb, #002dff);
    }
  .bg_video {
      display: block;
      margin: auto;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.5;
    }
}


    .left {
    width: 50%;
    height: 100%;
    background-image: url("../../assets/imgs/bg2.png");
    background-repeat: no-repeat;
    background-size: 50%;
    // float: left;
    position: absolute;
    opacity: 0.7;
    background-position: 60% 65%;
  }
//  .el-form.demo-loginForm {
//     position: absolute;
//   }
  
</style>
