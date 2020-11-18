<template>
  <div class="home">
    <!-- 侧边栏 -->
        <el-container>
          <el-aside width="200">
            <el-menu  default-active="1-4-1"
            class="el-menu-vertical-demo" 
            :router="true"
           :collapse="isCollapse">
          
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group> 
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu> 
          <!-- 二级菜单 -->
           <el-menu-item index="/student">学员信息</el-menu-item>
    </el-menu>
    </el-aside>
<el-container>
        <!-- 顶部栏 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"
              ><div class="grid-content bg-purple " > <i class="iconfont icon-shouqi"
                   @click="isCollapse=!isCollapse"></i></div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">宋小宝</div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <!-- <el-avatar
                 :size="35" 
                  fit="fill"
                 :src="circleUrl">
                </el-avatar> -->
                <span>欢迎您</span>
                <span >{{userInfo.nickname}} </span>
                <span class="quit" @click="quit">退出</span>
                </div></el-col
            >
          </el-row>
        </el-header>
        <!-- 主区域 -->
        <el-main>
        <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div> 
</template>  

<script>
import { getLoginLog } from "../../api/index";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      isCollapse: false,
    };
  },

  methods: {
    quit() {
      localStorage.removeItem("simon");
      localStorage.removeItem("song");
      this.$router.push("/login");
    },
  },
  mounted() {
    getLoginLog().then((res) => {
      console.log(res.data.data);
      this.arr = res.data.data;
    });
  },
};
</script>


<style lang="less" scoped>
.quit {
  cursor: pointer;
  color: hotpink;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header,
.el-footer {
  background-color: green;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-row {
  /* margin-bottom: 20px; */
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: green;
}
.bg-purple {
  background: green;
}
.bg-purple-light {
  background: green;
}
.grid-content {
  border-radius: 4px;
  min-height: 20px;
}
.row-bg {
  /* padding: 10px 0; */
  background-color: green;
  background-color: green;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
 
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>


