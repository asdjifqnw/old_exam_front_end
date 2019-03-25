<template>
  <div>
    <el-row type="flex" justify="center" style="padding-top:2rem;">
      <el-col>
        <el-table :data="myInvigilationInfo" style="width: 100%">
          <el-table-column prop="course_name" label="考试科目" width="auto" align="center"></el-table-column>
          <el-table-column
            prop="invigilation_begin_time"
            label="开始时间"
            width="auto"
            align="center"
            :formatter="dateTimeFormatter"
          ></el-table-column>
          <el-table-column prop="number_of_teacher" label="需要人数" width="auto" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="text" @click="checkStaff(scope.$index, scope.row)">查看同组人员</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="查看同组人员" :visible.sync="dialogVisible" width="40%">
      <el-table :data="gridData">
        <el-table-column property="user_name" label="用户名" ></el-table-column>
        <el-table-column property="position" label="职位" ></el-table-column>
        <el-table-column property="phone_number" label="电话"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      checkingRow: "",
      myInvigilationInfo: [],
      dialogVisible: false,
      gridData:[]
    };
  },
  created: function() {
    let that = this;
    this.$axios.post("getMyInvogilation", { userId: 3 }).then(res => {
      that.myInvigilationInfo = res.data;
    });
  },
  methods: {
    dateTimeFormatter(row, column) {
      let time = row.invigilation_begin_time.replace("T", " ");
      time = time.replace(".000+0000", "");
      return time;
    },
    checkStaff(index, row) {
      // console.log(row.invigilationid)
      this.checkingRow = row.invigilationid;
      let that = this;
      this.$axios
        .post("/checkStaff", { checkingRow: this.checkingRow })
        .then(res => {
          if (res.data != null) {
            that.gridData = res.data
            that.dialogVisible = true;
            // console.log(res.data);
          } else {
            that.$message({
              msg: "错误!",
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style>
</style>
