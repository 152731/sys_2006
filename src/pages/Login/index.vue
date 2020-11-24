<template>
  <div class="login-pages">
    <div class="left"></div>

    <div class="loginContainer">
      <h1 class="title">宋小宝的后宫</h1>
      <el-form
        :model="loginForm"
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
            @keydown.native.enter="submitForm('loginForm')"
          ></el-input>
        </el-form-item>

        <!-- 验证码输入框 -->
        <el-form-item label="验证码" prop="captcha">
          <el-input
            class="captcha"
            type="password"
            v-model="loginForm.captcha"
            autocomplete="off"
            @keydown.native.enter="submitForm('loginForm')"
          ></el-input>
          <span
            @click="refreshCaptcha"
            class="captcha-svg"
            v-html="captchaSvg"
          ></span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <video
      class="bg_video"
      muted
      src="../../assets/video/bg_video.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
  </div>
</template>

<script>
// 登录逻辑的实现
// 1：收集用户信息输入的username&password传递给后台
// 2登录通过后，将后端返回的token存到本地
// 3每次请求的时候，携带token到请求头authorization
// 4展示token效验正确的数据
// 5效验不通过，跳转到登入页面
import { login, getCaptcha, verifyCaptcha, refreshCaptcha } from "@/api";
import { mapMutations } from "vuex";
export default {
  data() {
    // jsDoc
    /**
     * @param {object} rule  就是一个表单验证对象 param参数
     * @param {String} 输入值，用户名输入框里面的值
     * @param {Function} callback 效验通过不传参，不通过传参
     */

    var validataUsername = (rule, value, callback) => {
      var uPattern = /^[a-zA-Z0-9]{0,6}$/;
      //  验证如果不满足callback返回提示，验证通过直接返回callback
      if (!value) {
        callback("注意规则");
      } else {
        callback();
      }
    };
    // 效验用户密码
    var validataPassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    // 效验验证码
    var validataCaptcha = (rule, value, callback) => {
      if (!value || value.length !== 5) {
        callback("请输正确的验证码");
      } else {
        callback();
      }
    };
    return {
      captchaSvg: "", //从服务器获取下来的capchasvg
      loginForm: {
        username: "",
        password: "",
        captcha: "",
      },
      rules: {
        username: [{ validator: validataUsername, trigger: "blur" }],
        password: [{ validator: validataPassword, trigger: "blur" }],
        captcha: [{ validator: validataCaptcha, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.set_captcha();
  },
  methods: {
    // 刷新验证码
    refreshCaptcha() {
      this.set_captcha();
    },
    // 设置验证码
    set_captcha() {
      getCaptcha().then((res) => {
        this.captchaSvg = res.data.img;
      });
    },
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      //validate一个方法
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //本地效验通过发送登录请求
          // 通过打开加载
          // 先验证验证码
          let verifyRes = await verifyCaptcha(this.loginForm.captcha);
          console.log(verifyRes);
          if (!verifyRes.data.state) {
            this.$message.error("请重新输入验证码");
            // return
          } else {
            this.$router.push("/");
          }
          const loading = this.$loading({
            lock: true,
            text: "主人，拼命加载中",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          //请求区域
          console.log(this.loginForm.username, this.loginForm.password);
          login(this.loginForm.username, this.loginForm.pass)
            // 每一次请求成功都会携带一个cookie
            .then((res) => {
              loading.close();
              if (res.data.state) {
                this.$message.success("登录成功");
                // res.data.state=true时登录成功
                // 2登录通过后，将后端返回的token存到本地,登录成功后跳转到主页
                localStorage.setItem("simon", res.data.token);
                localStorage.setItem("song", JSON.stringify(res.data.userInfo));

                // 设置更改vuexstate["userInfo"]的值res.data.userInfo=payload
                this.SET_USERINFO(res.data.userInfo);

                this.$router.push("/Welcome");
              } else {
                this.$message.error("您登录的账号或者密码不正确，请重新登录");
              }
            })
            .catch((err) => {
              console.log(err);
            });
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
.captcha-svg {
  height: 44px;
  width: 130px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
/*整体表单样式 */
.el-form {
  width: 400px;
}
.el-button {
  width: 80%;
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
  h1.title {
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

</style>
