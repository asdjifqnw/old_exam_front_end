<template>
  <div>
    <el-row type="flex" justify="center" style="padding-top:2rem;">
      <el-col :lg="10">
        <h1 style="color:red;" v-if="taskInfo.task_deadline < now">您已超时，请尽快完成任务</h1>
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
          <el-form-item label="文件上传">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://localhost:8082/fileUpload"
              :limit="1"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :multiple="false"
              :auto-upload="false"
              :headers="headers"
              :file-list="fileList"
              :on-success="success"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
              >上传到服务器</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    {{taskInfo}}<br/>{{object}}
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
      object:{content:"",fileURL:"",isTimeOut:"",taskId:"",taskType:"",userId:""}
    };
  },
  created: function() {
    console.log(this.$route.query.taskInfo);
    this.taskInfo = JSON.parse(this.$route.query.taskInfo);
    this.object.taskId = this.taskInfo.taskid
    this.object.taskType = this.taskInfo.task_type
    this.object.userId = this.$store.state.userInfo.userId
    if(this.taskInfo.task_deadline < this.now){
      this.object.isTimeOut = true
    }else{
      this.object.isTimeOut = false
    }
    // console.log(this.taskInfo)
  },
  methods: {
    submit(){
      let that = this
      if(this.object.content == ""||this.object.content == null){
        this.$message({
            message:"请填写回复内容",
            type:"error"
          })
          return false;
      }
      if(this.object.fileURL == ""||this.object.fileURL == null){
        this.$message({
            message:"请先上传文件",
            type:"error"
          })
          return false;
      }
      for(let i in this.object){
        if(this.object[i]==null||this.object[i]==""){
          this.$message({
            message:"存在错误，请刷新后再试",
            type:"error"
          })
          return false;
        }
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    success(response, file, fileList) {
      console.log(response);
      this.object.fileURL = response[0]
    }
  }
};
</script>

<style>
</style>
