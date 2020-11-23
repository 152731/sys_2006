<template>
  <div class="parent">
    <!-- 输入框 -->
    <el-input
      placeholder="请输入你要搜的名字"
      v-model="val"
      class="input-with-select"
     
      >
      &nbsp;
      <el-button slot="append" icon="el-icon-search" ></el-button> &nbsp;
    </el-input>
    <el-button type="primary" @click="dialogFormVisible = true" class="button1">添加项目</el-button> &nbsp;
    <br />
    <!-- 添加学员 -->
    <el-dialog   title="增加学员信息" :visible.sync="dialogFormVisible" width="600px">

    头像： <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
       </el-upload>
    <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
        <el-form :model="form">
        姓名： <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
        <el-form :model="form">
        项目地址： <el-input v-model="form.productUrl" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
        <el-form :model="form">
        班级： <el-input v-model="form.class" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
        <el-form :model="form">
        年龄： <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
        <el-form :model="form">
        城市： <el-input v-model="form.city" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
        <el-form :model="form">
        学历： <el-input v-model="form.degree" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
        <el-form :model="form">
        描述： <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" class="hh">取 消</el-button>
        <el-button type="primary"  @click="confirm" class="hh">确 定</el-button>
    </div>
 </el-dialog>
 <!-- 文字 -->
  <div class="size">
    <span>雨纷纷</span>
    <el-divider direction="vertical"></el-divider>
    <span>旧故里</span>
    <el-divider direction="vertical"></el-divider>
    <span>草木深</span>
  </div>
    <!-- 选择框 -->
    选择班级：
      <el-select v-model="value" filterable placeholder="请选择" @claick="selected(label)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.class"
      :value="item.value">
    </el-option>
  </el-select>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="degree" label="学历" width="250">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="250"> </el-table-column>
      <el-table-column prop="class" label="班级" width="250"> </el-table-column>
      <el-table-column prop="productUrl" label="项目" width="250">
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button   size="mini" class="primary" @click="handleClick(scope.$index, scope.row)"
            >查看</el-button
          > 
          <el-button size="mini"  class="new_primary" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >

                
      <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
</el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import router from "@/router/index";
import {
  getStudentList,
  delStudentList,
  getLoginLog,
  addStudentList,
  updateStudentList,
} from "@/api";
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      select: "",
      // 监听变量
      val:'',
      // 
      label:[],
      options: [],

      tableData: [],
      value: "",
      dialogFormVisible: false,
      //   添加学员信息的对象
      form: {},
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  // 监听事件
  watch:{
        val(newVal){
         let  newTableData=this.tableData.filter((item,index,array)=>{
           return item.name.indexOf(newVal) !==-1
         })
        
        if(newVal){
          this.tableData=newTableData

        }else{
            window.location.reload();
        }
        }
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.$router.push("/StudentManager/studentProfile");
    },
    selected(index){
        console.log(111111);
        console.log(index);
    },
    // 修改数据
    handleEdit(index, row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.form = row;
    },
    
    // 删除数据
    handleDelete(index, row) {
      // console.log(index,row);//index为数据的第几个，row是你点击那一行的数据
      
      delStudentList(row.sId)
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
    },
    cancel(){
        this.dialogFormVisible = false
        this.form = {}
    },
    // 修改信息
    confirm() {
      if (this.form) {
          updateStudentList(this.form)
          .then(res=>{
              this.dialogFormVisible = false
              this.form = {}
          })
      } 
// 添加数据，点击之后获取输入框中的对象，然后发送到服务器，完成添加操作
        let obj = this.form;
        // console.log("////////");
        // console.log(obj);
        addStudentList(obj).then((res) => {
          this.dialogFormVisible = false;
           window.location.reload();
        });
      
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },

  mounted() {
    getStudentList().then((res) => {
      this.tableData = res.data.data;
      this.options=res.data.data
    });




  },
};
</script>
<style scoped>
.new_primary {
  background-color: gray;
  color: blue;
  font-size: 10px;
}
.primary {
  background-color: gray;
  color: green;
}
.button1 {
  width: 100px;
}

input.el-input__inner {
  width: 20px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
  width: 200px;
}
.input-with-select {
  width: 300px;
}

main.el-main[data-v-1faf2446] {
  line-height: 60px;
}
.el-select {
  line-height: 50px;
}
.el-table__body .el-button {
  width: 20%;
}
</style>