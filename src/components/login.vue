<template>
  <div class="contern-login">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div id="loginform" name="loginform" class="login-box">
            <div class="input-box">
              <input
                id="txtUserName"
                v-model.trim="userName"
                name="txtUserName"
                type="text"
                placeholder="用户名/手机/邮箱"
                maxlength="50"
              >
            </div>
            <div class="input-box">
              <input
                id="txtPassword"
                v-model.trim="password"
                name="txtPassword"
                type="password"
                placeholder="输入登录密码"
                maxlength="16"
              >
            </div>
            <div class="btn-box">
              <input id="btnSubmit" name="btnSubmit" @click="login" type="submit" value="立即登录">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    async login() {
      if (this.useName == "" || this.password == "") {
        this.$message({
          message: "写点东西呗!",
          type: "warning"
        });
        return;
      }
      let res= await this.$axios.post("site/account/login",{user_name:this.userName,password:this.password})
      // console.log( res );
      if(res.data.status==1){
         this.$message.error('用户名或密码错误');
      }else{
        // 造一个token
       window.sessionStorage.setItem("token", res.data.status);
           this.$message({
          message: '登陆成功',
          type: 'success'
        });
        this.$router.go(-1)||this.$router.push('/index');
      }
    }
  }
};
</script>
<style lang="scss">
</style>
