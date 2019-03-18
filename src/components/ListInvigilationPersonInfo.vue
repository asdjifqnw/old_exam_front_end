<template>
  <div>
    <el-table :data="invigilationInfo" style="width: 100%">
      <el-table-column prop="courseName" align="center" label="课程名称"></el-table-column>
      <el-table-column prop="invigilationBeginTime" align="center" label="考试开始时间"></el-table-column>
      <el-table-column prop="numberOfTeacher" align="center" label="需要人数"></el-table-column>
      <el-table-column prop="arrangedTeacher" align="center" label="已分配人数"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="监考人信息" :before-close="handleClose" :visible.sync="dialogTableVisible">
      <el-table :data="invigilationPersonInfo" style="width: 100%">
        <el-table-column prop="user_name" align="center" label="姓名"></el-table-column>
        <el-table-column prop="position" align="center" label="职位"></el-table-column>
        <el-table-column prop="phone_number" align="center" label="电话号"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="newInvigilationPerson">新 增</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      invigilationInfo: [],
      invigilationPersonInfo: [],
      dialogTableVisible: false,
      modifyingInvigilationID: ""
    };
  },
  created: function() {
    let that = this;
    this.$axios.get("/getInvigilatePerson").then(function(res) {
      that.invigilationInfo = res.data.InvigilatePersonInfo;
      for (let i in that.invigilationInfo) {
        let j = that.invigilationInfo[i].invigilationBeginTime.replace(
          "T",
          " "
        );
        that.invigilationInfo[i].invigilationBeginTime = j;
      }
    });
  },
  methods: {
    newInvigilationPerson() {
      let invigilationInfo = this.invigilationInfo;
      let modifyingInvigilationID = this.modifyingInvigilationID;
      for (let i in invigilationInfo) {
        if ((invigilationInfo[i].invigilationID == modifyingInvigilationID)) {
          if (
            invigilationInfo[i].numberOfTeacher ==
            invigilationInfo[i].arrangedTeacher
          ) {
            this.$message({
              message: "分配人数已满，请删除一个后再添加",
              type: "error"
            });
          }else{

          }
          break
        }
      }
    },
    handleEdit(index, row) {
      console.log(row);
      let that = this;
      this.modifyingInvigilationID = row.invigilationID;
      this.$axios
        .post("/getInvigilatePersonInfo", { id: row.invigilationID })
        .then(function(res) {
          that.dialogTableVisible = true;
          console.log(res.data);
          that.invigilationPersonInfo = res.data.info;
        });
    },
    handleDelete(index, row) {
      //   this.dialogTableVisible = true;
      this.$message({
        message: "删除成功",
        type: "success"
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
</style>
