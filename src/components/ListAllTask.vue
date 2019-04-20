<template>
  <div>
    <el-table :data="taskInfo" style="width: 100%">
      <el-table-column prop="task_name" label="任务名称" width="auto" align="center"></el-table-column>
      <el-table-column
        prop="task_type"
        label="任务类型"
        width="auto"
        align="center"
        :formatter="typeFormate"
      ></el-table-column>
      <el-table-column prop="task_description" label="任务描述" width="auto" align="center"></el-table-column>
      <el-table-column
        prop="task_deadline"
        label="截止时间"
        width="auto"
        align="center"
        :formatter="dateTimeFormatter"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="text" @click="checkDetail(scope.$index, scope.row)">查看详细信息</el-button>
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
    typeFormate(row, column) {
      if (row.task_type == "1") {
        return "文件类";
      } else {
        return "回复类";
      }
    },
    checkDetail(index, row) {
      console.log(row);
      if (row.task_type == 1) {
        this.$router.push({
          name: "CheckDetail",
          query: { taskInfo: JSON.stringify(row) }
        });
      } else {
        this.$router.push({
          name: "CheckDetail2",
          query: { taskInfo: JSON.stringify(row) }
        });
      }
    },
    dateTimeFormatter(row, column) {
      let time = row.task_deadline.replace("T", " ");
      time = time.replace(".000+0000", "");
      return time;
    }
  },
  created: function() {
    let that = this;  
    this.$axios.post("/getAllTask").then(function(res) {
      that.taskInfo = res.data;
      // console.log(res.data);
    });
  }
};
</script>

<style>
</style>
