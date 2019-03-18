<template>
  <div>
    <el-row type="flex" justify="center" style="padding-top:2rem;">
      <el-col :lg="10">
        <el-form
          :rules="rules"
          ref="userInfo"
          :model="userInfo"
          label-width="10rem"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-radio-group v-model="userInfo.position">
              <el-radio label="教师"></el-radio>
              <el-radio label="学生"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人介绍" prop="introduction">
            <el-input type="textarea" v-model="userInfo.introduction"></el-input>
          </el-form-item>
          <el-form-item label="电话号" prop="phoneNumber">
            <el-input v-model="userInfo.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="是否为管理员" prop="admin">
            <el-radio-group v-model="userInfo.admin" :disabled="!isSuperAdmin">
              <el-radio label="true">是</el-radio>
              <el-radio label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('userInfo')">修改</el-button>
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
    return {
      isSuperAdmin: this.$store.state.userInfo.userIsSuperAdmin,
      beforePhoneNumber: "",
      userInfo: {},
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "请输入个人描述", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请检查手机号码格式是否正确",
            trigger: "blur"
          }
        ],
        admin: [
          { required: true, message: "请确认是否为管理员", trigger: "blur" }
        ],
        position: [{ required: true, message: "请选择职位", trigger: "blur" }]
      }
    };
  },
  created: function() {
    this.userInfo = JSON.parse(this.$route.query.userInfo);
    this.beforePhoneNumber = this.userInfo.phoneNumber;
    if (this.userInfo.admin == "是") {
      this.userInfo.admin = "true";
    } else {
      this.userInfo.admin = "false";
    }
  },
  methods: {
    onSubmit(userInfo) {
      let that = this;
      this.$refs[userInfo].validate(valid => {
        if (valid) {
          console.log(that.userInfo);
          this.$axios
            .post("/modifyUserInfo", that.userInfo)
            .then(function(res) {
              console.log(res);
              if (res.data.stateCode == 200) {
                that.$message({
                  message: "修改成功",
                  type: "success"
                });
                // console.log(
                //   that.userInfo.userID + " " + that.$store.state.userInfo.userId
                // );
                if (
                  that.beforePhoneNumber ==
                  that.$store.state.userInfo.userPhoneNumber
                ) {
                  if (that.userInfo.phoneNumber != that.beforePhoneNumber) {
                    that.$message({
                      message: "由于您修改了当前用户的信息，请重新登录",
                      type: "warn"
                    });
                    that.$store.commit("Logout");
                    that.$router.push({ name: "Login" });
                  }
                }

                for (let key in that.userInfo) {
                  that.userInfo[key] = "";
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
      for (let key in this.userInfo) {
        this.userInfo[key] = "";
      }
    }
  }
};
</script>

<style>
</style>
