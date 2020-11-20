<template>
  <div class="home">
    <!-- 侧边栏 -->
        <el-container>
           <el-aside width="200">
            <el-menu  :default-active="$route.path"
            class="el-menu-vertical-demo" 
            :router="true"
           :collapse="isCollapse">
           <qf-sub-menu :sideMenu="menuList" ></qf-sub-menu>
          <!-- <el-submenu index="1">
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
          
           <el-menu-item index="/student">学员信息</el-menu-item> -->
    </el-menu>

    
    </el-aside>


<el-container>
        <!-- 顶部栏 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"
              ><div class="grid-content bg-purple " > 
                
      
       <i class="iconfont "v-if="!isCollapse"  @click="isCollapse=!isCollapse">&#xe504;</i>
        <i class="iconfont icon-shouqi"  v-else="isCollapse" @click="isCollapse=!isCollapse"></i>
                   
                   </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple-light size">宋小宝的后宫</div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                  <el-avatar  :size="40" 
                           fit="fit"
                           src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605802576858&di=c977d22630ee68f82c347e68ed0da246&imgtype=0&src=http%3A%2F%2Fwww.faxingnet.com%2Fupimg%2Fallimg%2F190711%2F13-1ZG1101Gc39.jpg">
                 </el-avatar>
                <span class="welcome">欢迎您:</span>
                <span class="fine" >{{userInfo.nickname}} </span>
                <span class="quit" @click="quit">退出</span>
                </div></el-col
            >
          </el-row>
        </el-header>
        <!-- 主区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:crumb.path}"   v-for="crumb in crumbs">

             {{crumb.meta.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
        <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div> 
</template>  

<script>
// import { getLoginLog } from "../../api/index";
import { mapState } from "vuex";
import subMenu from '../../components/subMenu.vue';
export default {
  components: { subMenu },
  computed: {
    ...mapState(["userInfo",'menuList','crumbs']),
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
      // 刷新页面
      window.location.reload()
    },
  },
  mounted() {
    // getLoginLog().then((res) => {
    //   console.log(res.data.data);
    // });
  },
};
</script>


<style lang="less" scoped>
.size{
  font-size: 25px;
}
.welcome{
  color: rgb(20, 220, 120);
  padding: 0 5px;
}
.fine{
  color: aqua;
  font:10px;
  text-decoration: underline;
  text-decoration-color: red;
  cursor: pointer;
  padding: 0 10px;
}
.el-avatar{
vertical-align: middle;

}



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
  color:black;
  text-align:left;
  line-height: 60px;
  padding: 0 5px;
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
.el-breadcrumb{
  line-height: 3;
  background-color: hotpink;
}
.iconfont{
   font-size: 25px;
  text-align: left;
  padding: 0 5px;
}
.icon-shouqi{
  font-size: 25px;
  text-align: left;
}

</style>


