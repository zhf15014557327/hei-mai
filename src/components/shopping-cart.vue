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
                <li class="first" :class="{active:active>=1}">
                  <div class="progress" @click="tag=1">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li :class="{active:active>=2}">
                  <div class="progress" @click="tag=2">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last" :class="{active:active==3}">
                  <div class="progress pay" @click="tag=3">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表 加入-->
          <div class="cart-conten" v-show="tag==1">
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
                  <tr
                    v-for="(item, index) in goodsList"
                    :key="item.id"
                    v-show="goodsList.length!=0"
                  >
                    <td width="100" align="center">
                      <!-- 开关 -->
                      <el-switch
                        v-model="item.isStatus"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      ></el-switch>
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

                      <el-button type="danger" icon="el-icon-delete" circle @click="delit(index)"></el-button>
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
                    <td>
                      <el-switch
                        v-model="isCheckAll"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      ></el-switch>
                    </td>
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
                <button class="button" @click="shopping">继续购物</button>
                <button class="submit" @click="jiesuan">立即结算</button>
              </div>
            </div>
            <!--购物车底部-->
          </div>
          <!-- 下单操作   -->
          <div class="cart-conten" v-show="tag==2">
            <div class="cart-box">
              <el-row class="one">
                <el-col :span="4">
                  <p class="site">1.收货地址</p>
                </el-col>
              </el-row>
              <!-- form表单 -->
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <!-- 名字 -->
                <el-row justify="left" type="flex" :span="24">
                  <el-col :span="14">
                    <el-form-item label="收货人姓名" prop="username">
                      <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4"></el-col>
                  <el-col :span="6">
                    <el-form-item label="*收货人姓名"></el-form-item>
                  </el-col>
                </el-row>
                <!-- 名字 -->
                <!-- 地址 -->
                <el-row justify="left" type="flex" :span="24">
                  <el-col :span="14">
                    <el-form-item label="所属地址" prop="site">
                      <el-input v-model="ruleForm.site"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4"></el-col>
                  <el-col :span="6">
                    <el-form-item label="*所属地址"></el-form-item>
                  </el-col>
                </el-row>
                <!-- 地址 -->
                <!-- 详细地址 -->

                <el-row justify="left" type="flex" :span="24">
                  <el-col :span="14">
                    <el-form-item label="详细地址" prop="dtlSite">
                      <el-input v-model="ruleForm.dtlSite"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4"></el-col>
                  <el-col :span="6">
                    <el-form-item label="*详细地址"></el-form-item>
                  </el-col>
                </el-row>
                <!-- 详细地址 -->
                <!-- 手机号码 -->
                <el-row justify="left" type="flex" :span="24">
                  <el-col :span="14">
                    <el-form-item label="手机号码" prop="mobile">
                      <el-input v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4"></el-col>
                  <el-col :span="6">
                    <el-form-item label="*手机号码"></el-form-item>
                  </el-col>
                </el-row>
                <!-- 手机号码 -->
                <!-- 邮箱 -->
                <el-row justify="left" type="flex" :span="24">
                  <el-col :span="14">
                    <el-form-item label="电子邮箱" prop="email">
                      <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4"></el-col>
                  <el-col :span="6">
                    <el-form-item label="*电子邮箱"></el-form-item>
                  </el-col>
                </el-row>
                <!-- 邮箱 -->
                <!-- 邮政编码 -->
                <el-row justify="left" type="flex" :span="24">
                  <el-col :span="14">
                    <el-form-item label="邮政编码" prop="mailCode">
                      <el-input v-model="ruleForm.mailCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4"></el-col>
                  <el-col :span="6">
                    <el-form-item label="*邮政编码"></el-form-item>
                  </el-col>
                </el-row>
                <!-- 邮政编码 -->
              </el-form>
              <!-- 收货地址底部 -->
              <el-row justify="certen" type="flex" :span="24" class="botton">
               <el-col :span="9"></el-col>
               <el-col :span="6">
                <el-button type="success" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
               </el-col>
                <el-col :span="9"></el-col>
              </el-row>
            </div>
          </div>

          <!-- 支付 -->
          <div class="cart-conten cart-conten3" v-show="tag==3">
            <div class="cart-box cart-box3">
              <div class="conten3-title ">
                <h1>支付中心</h1>
              </div>
              <div class="conten3-centen">
                <div class="conten3-left">
                  <p><span class="left">订单号 :  BD20554454545</span> <span class="right">收货人姓名 :  张兰</span></p>
                  <p><span class="left">送货地址 :  广东省深圳市宝安区福永镇</span> <span class="right">手机号码 :  15014557327</span></p>
                  <p><span class="left">支付金额 :  10406元</span> <span class="right">支付方式 :  在线支付</span></p>
                  <p><span class="left">备注 :  请尽快发货</span> </p>
                </div>
                <div class="conten3-right">
                  <router-link to="/pay">
                  <img src="../assets/logo.png" alt="">
                  </router-link>
                  </div>
              </div>
           
            </div>
          </div>
          <!-- 支付 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "shoppingCart",
  data() {
    return {
      tag:1,
      num: "",
      // 商品信息
      goodsList: [],
      // 选中商品信息
      checkedGoods:[],
      active: 1,
      ruleForm: {
        username: "",
        site: "福永和平村",
        dtlSite: "福永和平村玻璃围",
        mobile: "15014557327",
        email: "1187359992@qq.com",
        mailCode: "123456"
      },
      rules: {
        username: [
          { required: true, message: "收货人姓名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到10 个字符", trigger: "blur" }
        ],
        site: [
          { required: true, message: "收货人地址", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到10 个字符", trigger: "blur" }
        ],
        dtlSite: [
          { required: true, message: "收货人详细地址", trigger: "blur" },
          { min: 8, max: 10, message: "长度在 8 到10 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号码", trigger: "blur" },
          { min: 8, max: 11, message: "长度在 8 到11 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mailCode: [
          { required: true, message: "邮政编码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到8 个字符", trigger: "blur" }
        ]
      }
    };
  },
   // 请求数据
  async created() {
    let ids = "";
    for (const key in this.$store.state.CatrData) {
      ids += key;
      ids += ",";
    }
    // 去掉字符最后的逗号
    ids = ids.slice(0, -1);
    // console.log(ids);
    // 请求购物车信息
    let res = await this.$axios.get(`site/comment/getshopcargoods/${ids}`);
    console.log(res);
    // 动态增加属性
    res.data.message.forEach(v => {
      v.buycount = this.$store.state.CatrData[v.id];
      v.isStatus = false;
    });
    // 赋值到data中(在赋值给data时，Vue会遍历对象的所有属性加上get和set   坑!!!!!!!
    this.goodsList = res.data.message;
    // console.log( this.goodsList );

  },
  // 方法
  methods: {
     jiesuan(){
      //  console.log( this.goodsList.length);
       if(this.goodsList.length==0){
          this.$message({ message:"买点东西呗!!!",type:'success'});
          return;
       }

     this.tag=2;
    },
    // 提交收件人信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
              this.$message({ message:"提交成功",type:'success'});
              this.tag=3;
              this.active=2;
        } else {
          this.$message({ message:"提交失败",type:'success'});
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 删除商品
    delit(index) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.goodsList.splice(index, 1);
        })
        .catch(() => {});
    },
    // 跳转
    shopping() {
      this.$router.push("/index");
    }
  },
 
  //   计算属性
  computed: {
    // 总个数
    totalNum() {
      let total = 0;
      this.goodsList.forEach(v => {
        if (v.isStatus) {
          total += v.buycount;
        }
      });
      return total;
    },
    // 总价
    totalPrice() {
      let totalPrice = 0;
      this.goodsList.forEach(v => {
        if (v.isStatus) {
          totalPrice += v.buycount * v.sell_price;
        }
      });
      return totalPrice;
    },
    // 全选和反选
    isCheckAll: {
      get() {
        // 只要有一个不条件符合就返回false
        return this.goodsList.every(v => {
          return v.isStatus == true;
        });
      },
      // 赋值 切换选中状态时
      set(value) {
        // 让所有商品的选中状态跟自己的一致
        this.goodsList.forEach(v => {
          v.isStatus = value;
        });
      }
    }
  },
  // 侦听器
  watch: {
    goodsList: {
      // 不能用箭头函数,handler不能改
      handler: function(val, oldVal) {
        let data = {};
        this.goodsList.forEach(v => {
          data[v.id] = v.buycount;
        });
        this.$store.commit("upData", data);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
*{
  box-sizing: border-box;
}
.content-shoppingCart {
  .cart-box3{
    width:1160;
    // border: 1px solid #ccc;
    .conten3-title {
      width: 100%;
      
      h1{
        color: #83c44e;
        text-align: center;
        padding: 20px 0;
         border-bottom: 1px solid #ccc;
      }
    }
    .conten3-centen{
      height: 450px;
      display: flex;
      .conten3-left{
        padding-top: 25px;
        flex: 1;
        // border: 1px solid #ccc;
        p{
          padding: 15px 0 15px 20px;
          width: 100%;
          display:flex;
          .left{
            flex: 1
          }
          .right{
            padding-left: 25px;
            flex: 1
          }
        }
      }
      .conten3-right{
        flex: 1;
        // border: 1px solid #ccc;
        img{
          margin: 25px auto;
          display:block;
          width: 400px;
          height: 400px;
        }
       }
    }
  }
  .botton{
    margin: 20px 0px ;
  }
  .one {
    border-bottom: 0.5px solid #ccc;
    margin-bottom: 15px;
    .site {
      font-size: 20px;
      color: #83c44e;
      border-bottom: 1px solid #83c44e;
    }
  }

  .imgs {
    width: 90px;
    height: 100px;
  }
  .jishu {
    margin-right: 10px;
  }
}
</style>

