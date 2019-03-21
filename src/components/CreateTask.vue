<template>
  <div>
    <el-row type="flex" justify="center" style="padding-top:2rem;">
      <el-col :lg="10">
        <el-form
          :rules="rules"
          ref="taskInfo"
          :model="taskInfo"
          label-width="10rem"
          class="demo-ruleForm"
        >
          <el-form-item label="任务名" prop="taskName">
            <el-input v-model="taskInfo.taskName"></el-input>
          </el-form-item>
          <el-form-item label="任务类型" prop="taskType">
            <el-radio-group v-model="taskInfo.taskType">
              <el-radio label="1">文件类</el-radio>
              <el-radio label="2">回复类</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="任务描述" prop="taskDescription">
            <el-input v-model="taskInfo.taskDescription"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="taskDeadline">
            <el-date-picker
              v-model="taskInfo.taskDeadline"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('taskInfo')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- {{isSuperAdmin}} -->
  </div>
</template>
<script>
export default {
  data: function() {
    var dateCheck = (rule, value, callback) => {
      let date = new Date().Format("yyyy-MM-dd hh:mm:ss");
      if (value > date) {
        callback();
      } else {
        callback(new Error("大于"));
      }
    };
    return {
      taskInfo: {
        taskType: "",
        taskDescription: "",
        taskName: "",
        taskDeadline: ""
      },
      rules: {
        taskType: [
          { required: true, message: "请选择任务类型", trigger: "change" }
        ],
        taskDescription: [
          { required: true, message: "请输入任务描述", trigger: "blur" }
        ],
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" }
        ],
        taskDeadline: [
          { required: true, message: "请选择截止时间", trigger: "blur" },
          {
            validator: dateCheck,
            message: "日期应大于现在的时间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(taskInfo) {
      let that = this;
      this.$refs[taskInfo].validate(valid => {
        if (valid) {
          that.$axios.post("/insertNewTask", that.taskInfo).then(res => {
            if (res.data.stateCode == 200) {
              that.$message({
                message: res.data.msg,
                type: "success"
              });
            }else{
              that.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        } else {
          console.log("input error");
        }
      });
    }
  }
};
</script>

<style>
</style>
