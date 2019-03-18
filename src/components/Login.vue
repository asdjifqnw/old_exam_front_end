<template>
  <div>
    <el-row type="flex" justify="center" style="padding-top:5rem;">
      <el-col :lg="3">
        <div style="padding-top:0.25rem;">
          <span>用户名:</span>
        </div>
        <div style="padding-top:1.15rem;">
          <span>密码:</span>
        </div>
      </el-col>
      <el-col :lg="5">
        <el-input name="username" v-model="userInfo.username" size="small"></el-input>
        <el-input
          type="password"
          v-model="userInfo.password"
          size="small"
          style="padding-top:0.7rem;"
        ></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <div style="padding-top:1rem;">
        <el-button type="primary" @click="login" plain>登录</el-button>
        <el-button type="primary" @click="test">注册</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: "15546313503",
        password: "admin"
      },
      res: {}
    };
  },
  methods: {
    test(){
      
    },
    login() {
      let that = this;
      this.$axios.post("/login", this.userInfo).then(function(res) {
        //do something
        if (res.data.statusCode == "0") {
          console.log("后端错误");
        } else if (res.data.statusCode == "1") {

          console.log(res.data);
          that.$store.commit('setUserInfo',res.data.userInfo)
          that.$store.commit("setToken", res.data.token);
          that.$router.push({ path: "/" });
        } else {
          console.log(res.data.msg);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
