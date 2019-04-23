<template>
  <div class="content-shoppingCart">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th width="60" align="center">
                    <a>选择</a>
                  </th>
                  <th align="center" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <!-- 购物车商品列表渲染 -->
                <!-- 有商品时显示 -->
                <tr v-for="(item, index) in goodsList" :key="item.id" v-show="goodsList.length!=0">
                  <td width="100" align="center">
                      <!-- 开关 -->
                    <el-switch v-model="item.isStatus" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                  </td>
                  <td align="center" colspan="2" width="100">
                      <!-- 图片 -->
                    <img class="imgs" :src="item.img_url" alt>
                    <p>{{item.title}}</p>
                  </td>
                  <td width="84" align="left">¥{{item.sell_price}}</td>
                  <td width="104" align="center">x{{item.buycount}}</td>
                  <td width="120" align="left">¥{{item.buycount*item.sell_price}}</td>
                  <td width="200" align="center">
                    <!-- 计数器 @change="handleChange"-->
                    <el-input-number
                      v-model="item.buycount"
                      :min="1"
                      :max="100"
                      label="描述文字"
                      size="mini"
                    class="jishu"
                    ></el-input-number>
                    <!-- 删除 -->
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                  </td>
                </tr>
                <!-- 购物车为空显示 -->
                <tr v-show="goodsList.length==0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
    
                    <!-- 全选和反选 -->
                    <td> <el-switch v-model="isCheckAll" active-color="#13ce66" inactive-color="#ff4949"></el-switch></td>
                  <td align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{totalNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{totalPrice}}</b>元
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: "shoppingCart",
  data() {
    return {
        num:'',
      goodsList: []
    };
  },
  
  async created(){
    let ids = "";
    for (const key in this.$store.state.CatrData) {
      ids += key;
      ids += ",";
    }
    // 去掉字符最后的逗号
    ids = ids.slice(0, -1);
    console.log( ids );
    // 请求购物车信息
    let res= await this.$axios.get(`site/comment/getshopcargoods/${ids}`)
    console.log( res );
     // 动态增加属性
    res.data.message.forEach(v => {
            v.buycount=this.$store.state.CatrData[v.id]
            v.isStatus=false
    });
     // 赋值到data中(在赋值给data时，Vue会遍历对象的所有属性加上get和set   坑!!!!!!!
    this.goodsList=res.data.message
    console.log( this.goodsList );
  },
//   计算属性
computed: {
    // 总个数
    totalNum(){
       let total=0;
       this.goodsList.forEach(v=>{
          if(v.isStatus){
              total+=v.buycount
          }
       })
       return total;
    },
    // 总价
    totalPrice(){
       let totalPrice=0;
       this.goodsList.forEach(v=>{
          if(v.isStatus){
              totalPrice+=v.buycount*v.sell_price
          }
       })
       return totalPrice;
    },
    // 全选和反选
    isCheckAll:{
        get(){
            // 只要有一个不条件符合就返回false
          return  this.goodsList.every(v=>{
                return v.isStatus==true;
            })
        },
          // 赋值 切换选中状态时
        set(value){
              // 让所有商品的选中状态跟自己的一致
            this.goodsList.forEach(v=>{
                v.isStatus=value;
            })
        }
    }
},
// 侦听器

};
</script>
<style lang="scss">
.content-shoppingCart{
    .imgs{
        width: 90px;
        height: 100px;
        
    }
    .jishu{
        margin-right: 10px;
    }
}
</style>

