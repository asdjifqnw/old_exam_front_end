<template>
  <div>
    <el-table :data="invigilationInfo" style="width: 100%">
      <el-table-column prop="courseName" label="课程名称" width="auto" align="center"></el-table-column>
      <el-table-column prop="numberOfTeacher" label="需要人数" width="auto" align="center"></el-table-column>
      <el-table-column prop="invigilationBeginTime" label="开始时间" width="auto" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      invigilationInfo: []
    };
  },
  methods: {
    handleDelete(index, row) {
      console.log(row.invigilationID);
      let that = this;
      this.$axios
        .post("/deleteInvigilation", { invigilationID: row.invigilationID })
        .then(function(res) {
          console.log(res.data.stateCode);
          if (res.data.stateCode == 200) {
            that.$message({
              message: "删除成功",
              type: "success"
            });
            function sleep(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
            }
            async function demo() {
              // console.log("Taking a break...");
              await sleep(2000);
              window.location.reload();
              // console.log("Two second later");
            }
            demo();
          }
        });
    },
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
      this.$router.push({
        name: "ModifyInvigilation",
        query: { invigilationInfo: JSON.stringify(row) }
      });
    }
  },
  created: function() {
    let that = this;
    this.$axios.get("/listInvigilationInfo").then(function(res) {
      // console.log(res);
      that.invigilationInfo = res.data;
      for (let i in that.invigilationInfo) {
        that.invigilationInfo[i].invigilationBeginTime = that.invigilationInfo[
          i
        ].invigilationBeginTime.replace("T", " ");
      }
      console.log(that.invigilationInfo);
    });
  }
};
</script>

<style>
</style>
