<template>
  <div>
    <el-table :data="taskInfo" style="width: 100%">
      <el-table-column prop="taskName" label="任务名称" width="auto" align="center"></el-table-column>
      <el-table-column
        prop="taskType"
        label="任务类型"
        width="auto"
        align="center"
        :formatter="typeFormate"
      ></el-table-column>
      <el-table-column prop="taskDescription" label="任务描述" width="auto" align="center"></el-table-column>
      <el-table-column prop="taskDeadline" label="截止时间" width="auto" align="center"></el-table-column>
      <el-table-column prop="open" label="状态" width="auto" align="center" :formatter="stateFormate"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="text" @click="modifyState(scope.$index, scope.row)">更改状态</el-button>
          <el-button size="text" @click="handleEdit(scope.$index, scope.row)">编辑信息</el-button>
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
      taskInfo: []
    };
  },
  methods: {
    modifyState(index, row) {
      let that = this;
      console.log(row);
      this.$axios.post("/modifyTaskInfo", row).then(function(res) {
        if (res.data.stateCode == 200) {
          that.$message({
            message: res.data.msg,
            type: "success"
          });
          row.open = !row.open;
        } else {
          that.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    stateFormate(row, column) {
      if (row.open) {
        return "开启";
      } else {
        return "关闭";
      }
    },
    typeFormate(row, column) {
      if (row.taskType == "1") {
        return "文件类";
      } else {
        return "回复类";
      }
    },
    handleDelete(index, row) {
      console.log(row.taskID);
      let that = this;
      this.$axios.post("/deleteTaskInfo", {taskID:row.taskID}).then(function(res) {
        if (res.data.stateCode == 200) {
          that.$message({
            message: res.data.msg,
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
        } else {
          that.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "ModifyTaskInfo",
        query: { taskInfo: JSON.stringify(row) }
      });
    }
  },
  mounted: function() {
    let that = this;
    console.log(that.taskInfo);
    this.$axios.get("/getTaskInfo").then(function(res) {
      that.taskInfo = res.data;
      for (let i in that.taskInfo) {
        that.taskInfo[i].taskDeadline = that.taskInfo[i].taskDeadline.replace(
          "T",
          " "
        );
      }
    });
  }
};
</script>

<style>
</style>
