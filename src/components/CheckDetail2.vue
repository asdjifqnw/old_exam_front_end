<template>
  <div>
    <el-row type="flex" justify="center" style="padding-top:2rem;">
      <el-col :lg="10">
        <h1 style="color:red;" v-if="taskInfo.task_deadline < now && isSubmited == false">您已超时，请尽快完成任务</h1>
        <el-form ref="taskInfo" :model="taskInfo" label-width="10rem" class="demo-ruleForm">
          <el-form-item label="任务名" prop="taskName">{{taskInfo.task_name}}</el-form-item>
          <el-form-item label="任务类型" prop="task_type">
            <span v-if="taskInfo.task_type == 1">文件类</span>
            <span v-else>回复类</span>
          </el-form-item>
          <el-form-item label="任务描述" prop="task_description">{{taskInfo.task_description}}</el-form-item>
          <el-form-item
            label="结束时间"
            prop="task_deadline"
          >{{taskInfo.task_deadline.replace("T"," ").replace(".000+0000","")}}</el-form-item>
          <el-form-item label="回复内容" prop="task_description">
            <el-input type="textarea" :rows="2" placeholder="请输入回复内容" v-model="object.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    {{taskInfo}}
    <br>
    {{object}}
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      taskInfo: {},
      fileList: [],
      headers: { Authorization: this.$store.state.Token },
      now: new Date().Format("yyyy-MM-dd hh:mm:ss"),
      object: {
        content: "",
        isTimeOut: "",
        taskId: "",
        fileURL: "",
        taskType: "",
        userId: ""
      },
      isSubmited: false
    };
  },
  created: function() {
    let that = this;
    this.taskInfo = JSON.parse(this.$route.query.taskInfo);
    this.object.taskId = this.taskInfo.taskid;
    this.object.taskType = this.taskInfo.task_type;
    this.object.userId = this.$store.state.userInfo.userId;
    if (this.taskInfo.task_deadline < this.now) {
      this.object.isTimeOut = true;
    } else {
      this.object.isTimeOut = false;
    }
    this.$axios
      .post("/getContent", {
        taskId: this.object.taskId,
        userId: this.object.userId
      })
      .then(res => {
        if (res.data != "") {
          console.log(res);
          that.isSubmited = true;
          that.object.content = res.data[0].content;
        }
      });
    // console.log(this.taskInfo)
  },
  methods: {
    submit() {
      let that = this;
      if (this.object.content == "" || this.object.content == null) {
        this.$message({
          message: "请填写回复内容",
          type: "error"
        });
        return false;
      } else {
        this.$axios.post("/UserAndTaskInfo", this.object).then(res => {
          that.$message({
            message: res.data.msg,
            type: "success"
          });
        });
      }
    }
  }
};
</script>

<style>
</style>
