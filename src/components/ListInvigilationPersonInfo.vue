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
    <el-dialog
      title="添加监考"
      :append-to-body="true"
      :before-close="handleClose"
      :visible.sync="secondDialogTableVisible"
    >
      <el-table
        :data="userInfo"
        style="width: 100%"
        :default-sort="{prop: 'arranged', order: 'ascending'}"
        :max-height="250"
      >
        <el-table-column prop="userName" align="center" label="姓名"></el-table-column>
        <el-table-column prop="position" align="center" label="职位"></el-table-column>
        <el-table-column prop="phoneNumber" align="center" label="电话号"></el-table-column>
        <el-table-column prop="arranged" align="center" label="已分配次数" sortable></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="text" @click="handleInsert(scope.$index, scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="secondDialogTableVisible = false ">取 消</el-button>
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
      userInfo: [],
      secondDialogTableVisible: false,
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
    submit() {},
    handleInsert(index, row) {
      let that = this;
      console.log(row);
      console.log(this.modifyingInvigilationID);
      for (let i in this.invigilationPersonInfo) {
        if (row.userID == this.invigilationPersonInfo[i].userID) {
          this.$message({
              message: "同一场考试不能添加一样的教师",
              type: "error"
            });
            return;
        }
      }
      this.$axios
        .post("/insertInvigilatePerson", {
          invigilationid: this.modifyingInvigilationID,
          userID: row.userID
        })
        .then(res => {
          if (res.data.stateCode == 200) {
            that.$message({
              message: res.data.msg,
              type: "success"
            });
            for (let i in that.invigilationInfo) {
              if (
                that.invigilationInfo[i].invigilationID ==
                that.modifyingInvigilationID
              ) {
                that.invigilationInfo[i].arrangedTeacher++;
              }
            }
            that.invigilationPersonInfo.push({
              phone_number: row.phoneNumber,
              user_name: row.userName,
              position: row.position,
              userID: row.userID
            });
          } else {
            that.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
    },
    newInvigilationPerson() {
      let that = this;
      let invigilationInfo = this.invigilationInfo;
      let modifyingInvigilationID = this.modifyingInvigilationID;
      for (let i in invigilationInfo) {
        if (invigilationInfo[i].invigilationID == modifyingInvigilationID) {
          if (
            invigilationInfo[i].numberOfTeacher ==
            invigilationInfo[i].arrangedTeacher
          ) {
            this.$message({
              message: "分配人数已满，请删除一个后再添加",
              type: "error"
            });
          } else {
            this.$axios
              .get("/getUserNumberOfAllocatedInvigilation")
              .then(res => {
                console.log(res);
                that.secondDialogTableVisible = true;
                that.userInfo = res.data.info;
              });
          }
          break;
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
      let that = this;
      this.$axios
        .post("/deleteInvigilatePerson", {
          invigilationid: that.modifyingInvigilationID,
          userID: row.userID
        })
        .then(function(res) {
          if (res.data.stateCode == 200) {
            that.$message({
              message: "删除成功",
              type: "success"
            });
            for (let i in that.invigilationInfo) {
              if (
                that.invigilationInfo[i].invigilationID ==
                that.modifyingInvigilationID
              ) {
                that.invigilationInfo[i].arrangedTeacher--;
              }
            }
            that.invigilationPersonInfo.splice(index, 1);
            that.$forceUpdate();
          }
        });
    },
    handleClose(done) {
      console.log(done);
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
