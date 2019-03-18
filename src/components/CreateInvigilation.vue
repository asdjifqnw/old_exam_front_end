<template>
  <div>
    <el-row type="flex" justify="center" style="padding-top:2rem;">
      <el-col :lg="10">
        <el-form
          :rules="rules"
          ref="invigilationInfo"
          :model="invigilationInfo"
          label-width="10rem"
          class="demo-ruleForm"
        >
          <el-form-item label="课程名" prop="courseName">
            <el-input v-model="invigilationInfo.courseName"></el-input>
          </el-form-item>
          <el-form-item label="需要的教师人数" prop="numberOfTeacher">
            <el-input v-model="invigilationInfo.numberOfTeacher"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="beginTime">
            <el-date-picker @change="change" v-model="invigilationInfo.beginTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('invigilationInfo')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>{{invigilationInfo}}
    </el-row>
    <!-- {{isSuperAdmin}} -->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      invigilationInfo: {
        courseName: "移动物联网开发",
        numberOfTeacher: 2,
        beginTime: ""
      },
      rules: {
        courseName: [
          { required: true, message: "请输入课程名", trigger: "blur" }
        ],
        numberOfTeacher: [
          { required: true, message: "请输入需要教师人数", trigger: "blur" }
        ],
        beginTime:[
          { required: true, message: "请输入起始时间", trigger: "blur" }

        ]
      }
    };
  },
  methods: {
    change(){
    },
    onSubmit(invigilationInfo) {
      let that = this;
      this.$refs[invigilationInfo].validate(valid => {
        if (valid) {
          this.$axios.post("/insertNewInvigilation", that.invigilationInfo).then(function(res) {
            console.log(res.data.stateCode);
            if (res.data.stateCode == 200) {
              that.$message({
                message: "插入成功",
                type: "success"
              });
              for (let key in that.invigilationInfo) {
                that.invigilationInfo[key] = "";
              }
            }
            if (res.data.stateCode == 401) {
              that.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          });
        } else {
          that.$message({
            message: "请按要求输入信息",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm() {
      for (let key in this.invigilationInfo) {
        this.invigilationInfo[key] = "";
      }
    }
  }
};
</script>

<style>
</style>
