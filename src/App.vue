<template>
  <div id="app">
    <!-- 头部 -->
    <div class="header">
      <!-- 1.0 导航栏头部 -->
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>黑马买买买</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <span style="display: none;">
              <router-link to="/login">登录</router-link>
              <strong>|</strong>
              <a href class>注册</a>
              <strong>|</strong>
            </span>
            <span>
              <!-- 声明式导航 -->
              <router-link to="/vipCenter">会员中心</router-link>
              <!-- <a href class>会员中心</a> -->
              <strong>|</strong>
              <a @click="outLogin">退出</a>
              <strong>|</strong>
            </span>
            
              <router-link to="/shoppingCart">
              <i class="iconfont icon-cart"></i>购物车(
              <span id="shoppingCartCount">
                <span>{{$store.getters.totalNum}}</span>
              </span>)
              </router-link>
           
          </div>
        </div>
      </div>

      <!-- 2.0 导航条 -->
      <div class="head-nav">
        <div class="section">
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="#" class>
                  <span class="out" style="top: 0px;">首页</span>
                </a>
              </li>
              <li class="news">
                <a href="#" class>
                  <span class="out" style="top: 0px;">每日精选</span>
                </a>
              </li>
              <li class="photo">
                <a href="#" class>
                  <span class="out" style="top: 0px;">秒杀专区</span>
                </a>
              </li>
              <li class="video">
                <a href="#" class>
                  <span class="out" style="top: 0px;">黑马超市</span>
                </a>
              </li>
              <li class="down">
                <a href="#" class>
                  <span class="out" style="top: 0px;">会员权益</span>
                </a>
              </li>
              <li class="goods">
                <a href class="router-link-exact-active">
                  <span class="out" style="top: 0px;">购物商城</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input
                id="keywords"
                name="keywords"
                type="text"
                onkeydown="if(event.keyCode==13){};"
                placeholder="输入关健字"
                x-webkit-speech
              >
            </div>
            <a href="javascript:;">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部 -->
    <div class="footer">
      <div class="section">
        <div class="foot-nav">
          <a href>关于我们</a>
          <strong>|</strong>
          <a href>联系我们</a>
          <strong>|</strong>
          <a href>联系客服</a>
          <strong>|</strong>
          <a href>合作招商</a>
          <strong>|</strong>
          <a href>商家帮助</a>
          <strong>|</strong>
          <a href>营销中心</a>
          <strong>|</strong>
          <a href>隐私政策</a>
        </div>
        <div class="foot-box">
          <div class="copyright">
            <p>版权所有 黑马买买买</p>
            <p>公司地址： 联系电话：</p>
            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
          </div>
          <div class="service">
            <p>周一至周日 9:00-24:00</p>
            <a href="#">
              <i class="iconfont icon-phone"></i>在线客服
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "app",
  methods: {
  // 退出登录事件
  outLogin(){
     // 请求退出
     this.$axios.get('site/account/logout').then(res=>{
  //  console.log( res );
   if(res.data.status==0){
     window.sessionStorage.removeItem('token')
    //  成功退出
       this.$message({
          message: res.data.message,
          type: 'success'
        });
        // 跳转到登录页
        this.$router.push('/login');
   }else if(res.data.status==1){
    //  失败提示
     this.$message.error(res.data.message);
   }
     })
  },
   // 登录判断封装
 
},

};
</script>

<style>
</style>
