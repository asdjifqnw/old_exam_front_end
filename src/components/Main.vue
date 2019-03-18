<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="center">
        <el-col :lg="8" :offset="8">
          <span>管理系统</span>
        </el-col>
        <el-col :lg="8">
          <el-button
            v-if="userInfo.userName==''"
            type="text"
            style="margin-left:85%;"
            @click="login"
          >登录</el-button>
          <el-dropdown v-else style="margin-left:80%;" @command="handleCommand">
            <span>{{userInfo.userName}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item command="Exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="auto" v-if="userInfo.userName!=''">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          v-if="userInfo.userIsAdmin==true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="createNewUser">新增用户信息</el-menu-item>
              <el-menu-item index="1-2" @click="ModifyUserInfo">修改用户信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>监考信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="CreateInvigilation">新增监考信息</el-menu-item>
              <el-menu-item index="2-2" @click="ListInvigilationInfo">修改监考信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title" @click="ListInvigilationPersonInfo">监考人员分配</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>公告系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">新增公告信息</el-menu-item>
              <el-menu-item index="1-2">修改公告信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          v-else
        >
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">个人信息管理</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>监考信息查询</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">监考信息总览</el-menu-item>
              <el-menu-item index="2-2">我的监考信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>公告信息查询</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">查看所有公告信息</el-menu-item>
              <el-menu-item index="1-2">查看完成情况</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- <span v-if="userInfo.userName!=''&& path =='/'">请在右侧选择你需要的功能</span> -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      token: this.$store.state.Token,
      userInfo: this.$store.state.userInfo
      // path: this.$route.paths
    };
  },
  methods: {
    ListInvigilationPersonInfo() {
      this.$router.push({ name: "ListInvigilationPersonInfo" });
    },
    CreateInvigilation() {
      this.$router.push({ name: "CreateInvigilation" });
    },
    ListInvigilationInfo() {
      this.$router.push({ name: "ListInvigilationInfo" });
    },
    ModifyUserInfo() {
      this.$router.push({ name: "ListUserInfo" });
    },
    createNewUser() {
      this.$router.push({ name: "CreateNewUser" });
    },
    handleCommand(index) {
      if (index == "changePassword") {
        console.log(index);
      }
      if (index == "Exit") {
        this.$store.commit("Logout");
        this.$router.push({ name: "Login" });
        // window.location.reload()
      }
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
