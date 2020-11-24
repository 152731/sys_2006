<template>
  <div>
    <template>
      <el-table :data="tableData" style="width: 100%">
      
        <el-table-column prop="username" label="登录账号" width="180">
        </el-table-column>
  
        <el-table-column prop="lastLogin.ip" label="上次登录ip" width="180">
        </el-table-column>
        <el-table-column prop="lastLogin.loginTime" label="上次登录时间"> </el-table-column>
        <el-table-column prop="nowLogin.ip" label="本次登陆ip"> </el-table-column>
        <el-table-column prop="nowLogin.loginTime" label="本次登录时间"> </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { getLoginLog,getClassList,getStudentList} from "@/api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted(){
    getLoginLog()
    .then(res=>{
      this.tableData = res.data.data
    })
getStudentList()
.then(res=>{;
})


  }
};
</script>
<style scoped>
.el-main[data-v-1faf2446] {
  line-height: 0;
}

</style>