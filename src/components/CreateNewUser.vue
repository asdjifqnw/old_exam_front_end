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
          <el-form-item label="职位" prop="userPosition">
            <el-radio-group v-model="userInfo.userPosition">
              <el-radio label="教师"></el-radio>
              <el-radio label="学生"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人介绍" prop="userDescription">
            <el-input type="textarea" v-model="userInfo.userDescription"></el-input>
          </el-form-item>
          <el-form-item label="电话号" prop="userPhoneNumber">
            <el-input v-model="userInfo.userPhoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="是否为管理员" prop="userIsAdmin">
            <el-radio-group v-model="userInfo.userIsAdmin" :disabled="!isSuperAdmin">
              <el-radio label="true">是</el-radio>
              <el-radio label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="密码" prop="userPassword">
            <el-input type="password" v-model="userInfo.userPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="userInfo.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('userInfo')">立即创建</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度最小6位"));
      } else {
        if (this.checkPass !== "") {
          this.$refs.userInfo.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isSuperAdmin: this.$store.state.userInfo.userIsSuperAdmin,
      userInfo: {
        userDescription: "qwe",
        userIsAdmin: "false",
        userPhoneNumber: "15546313503",
        userPosition: "教师",
        userName: "1231",
        userPassword: "123456",
        checkPass: "123456"
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        userDescription: [
          { required: true, message: "请输入个人描述", trigger: "blur" }
        ],
        userPhoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请检查手机号码格式是否正确",
            trigger: "blur"
          }
        ],
        userIsAdmin: [
          { required: true, message: "请确认是否为管理员", trigger: "blur" }
        ],
        userPosition: [
          { required: true, message: "请选择职位", trigger: "blur" }
        ],
        userPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(userInfo) {
      let that = this;
      this.$refs[userInfo].validate(valid => {
        if (valid) {
          this.$axios.post("/addNewUser", that.userInfo).then(function(res) {
            console.log(res.data.stateCode);
            if (res.data.stateCode == 200) {
              that.$message({
                message: "插入成功",
                type: "success"
              });
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
