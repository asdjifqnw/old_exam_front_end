<template>
  <div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" :lock-scroll="false" width="30%">
      <el-form :rules="rules" ref="Password" :model="Password" class="demo-ruleForm">
        <el-form-item label="新密码" prop="Password">
          <el-input type="password" v-model="Password.Password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="retypePassword">
          <el-input type="password" v-model="Password.retypePassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifyPassword('Password')">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="userName" label="名称" width="90" align="center"></el-table-column>
      <el-table-column prop="position" label="职位" width="90" align="center"></el-table-column>
      <el-table-column
        prop="introduction"
        label="个人介绍"
        header-align="center"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column prop="phoneNumber" label="电话号码" width="180" align="center"></el-table-column>
      <el-table-column prop="superAdmin" label="是否为超级管理员" width="180" align="center"></el-table-column>
      <el-table-column prop="admin" label="是否为管理员" width="180" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="text" @click="handleEdit(scope.$index, scope.row)">编辑信息</el-button>
          <el-button size="text" @click="openDialog(scope.$index, scope.row)">修改密码</el-button>
          <el-button size="text" @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        if (this.retypePassword !== "") {
          this.$refs.Password.validateField("retypePassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.Password.Password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      users: [],
      dialogVisible: false,
      Password: {
        phoneNumber: "",
        Password: "",
        retypePassword: ""
      },
      rules: {
        Password: [{ validator: validatePass, trigger: "blur" }],
        retypePassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleDelete(index, row) {
      let that = this;
      if (row.superAdmin == "是") {
        if (this.$store.state.userInfo.userIsSuperAdmin) {
          that.$message({
            message: "无法删除超级管理员",
            type: "warn"
          });
        } else {
          that.$message({
            message: "无法修改超级管理员的信息",
            type: "warn"
          });
          return false;
        }
      }
    },
    openDialog(index, row) {
      let that = this;
      if (row.superAdmin == "是") {
        if (this.$store.state.userInfo.userIsSuperAdmin) {
        } else {
          that.$message({
            message: "无法修改超级管理员的信息",
            type: "warn"
          });
          return false;
        }
      }
      console.log(row.phoneNumber);
      this.Password.phoneNumber = row.phoneNumber;
      this.dialogVisible = true;
    },
    modifyPassword(Password) {
      let that = this;
      this.$refs[Password].validate(valid => {
        if (valid) {
          that.$axios.post("/", that.Password).then(res => {
            console.log(res);
            if (res.data.stateCode == 200) {
            }
            if (
              that.Password.phoneNumber ==
              that.$store.state.userInfo.userPhoneNumber
            ) {
              that.$message({
                message: "由于您修改了当前用户的信息，请重新登录",
                type: "warn"
              });
              that.$store.commit("Logout");
              that.$router.push({ name: "Login" });
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
    handleEdit(index, row) {
      //   console.log(index+"---"+row.admin)
      let that = this;
      if (row.superAdmin == "是") {
        if (this.$store.state.userInfo.userIsSuperAdmin) {
        } else {
          that.$message({
            message: "无法修改超级管理员的信息",
            type: "warn"
          });
          return false;
        }
      }
      this.$router.push({
        name: "ModifyUserInfo",
        query: {
          userInfo: JSON.stringify(row)
        }
      });
    }
  },
  created: function() {
    let that = this;
    this.$axios.get("/listUser").then(function(res) {
      console.log(res);
      that.users = res.data;
      for (let i in that.users) {
        if (that.users[i].admin == true) {
          that.users[i].admin = "是";
        }
        if (that.users[i].admin == false) {
          that.users[i].admin = "否";
        }
        if (that.users[i].superAdmin == true) {
          that.users[i].superAdmin = "是";
        }
        if (that.users[i].superAdmin == false) {
          that.users[i].superAdmin = "否";
        }
      }
      console.log(that.users);
    });
  }
};
</script>

<style>
</style>
