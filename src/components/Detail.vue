<template>
  <div class="content-details">
    <div>
      <div class="section">
        <div class="location">
          <span>当前位置：</span>
          <a href="/index.html">首页</a> &gt;
          <a href="/goods.html">购物商城</a> &gt;
          <a href="/goods/42/1.html">商品详情</a>
        </div>
      </div>
      <div class="section">
        <div class="wrapper clearfix">
          <div class="wrap-box">
            <div class="left-925">
              <div class="goods-box clearfix">
                <div class="pic-box">
                  <img class="topImg" :src="bigimg||imglist[0].original_path">
                  <div class="minLbo">
                    <el-carousel class="big-box" :interval="2000" type="card" arrow="always">
                      <el-carousel-item v-for="item in imglist" :key="item.id">
                        <img
                          class="boximg"
                          :src="item.original_path"
                          alt
                          @click="topImg(item.original_path)"
                        >
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
                <div class="goods-spec">
                  <h1>{{goodsinfo.title}}</h1>
                  <p class="subtitle">{{goodsinfo.sub_title}}</p>
                  <div class="spec-box">
                    <dl>
                      <dt>货号</dt>
                      <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                    </dl>
                    <dl>
                      <dt>市场价</dt>
                      <dd>
                        <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                      </dd>
                    </dl>
                    <dl>
                      <dt>销售价</dt>
                      <dd>
                        <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                      </dd>
                    </dl>
                  </div>
                  <div class="spec-box">
                    <dl>
                      <dt>购买数量</dt>
                      <el-input-number
                        v-model="goodsinfo.status"
                        :min="1"
                        :max="goodsinfo.stock_quantity"
                        label="描述文字"
                      ></el-input-number>
                      <dd>
                        <span class="stock-txt">
                          库存
                          <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                        </span>
                      </dd>
                    </dl>
                    <dl>
                      <dd>
                        <div id="buyButton" class="btn-buy">
                          <router-link to="/shoppingCart">
                            <button class="buy">立即购买</button>
                          </router-link>
                          <button  class="add">加入购物车</button>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div id="goodsTabs" class="goods-tab bg-wrap">
                <el-tabs v-model="activeName" type="card">
                  <el-tab-pane label="商品介绍" name="first">
                    <div class="tab-content entry" style="display: block;">用户管理</div>
                  </el-tab-pane>
                  <el-tab-pane label="商品评论" name="second">
                    <div class="tab-content entry" style="display: block;">内容</div>
                    <div class="tab-content" style="display: block;">
                      <div class="comment-box">
                        <div id="commentForm" name="commentForm" class="form-box">
                          <div class="avatar-box">
                            <i class="iconfont icon-user-full"></i>
                          </div>
                          <div class="conn-box">
                            <div class="editor">
                              <!-- 文本域 -->
                              <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model.trim="textarea2"
                              ></el-input>
                            </div>
                            <div class="subcon">
                              <!-- 按钮提交 -->  
                              <el-button type="primary" @click="addDiscuss" >提交</el-button>
                            </div>
                          </div>
                        </div>
                        <ul id="commentList" class="list-box">
                          <p
                            v-if="info.totalcount==0"
                            style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                          >暂无评论，快来抢沙发吧！</p>

                          <li v-for="(item, index) in info.msgList" :key="item.id">
                            <div class="avatar-box">
                              <i class="iconfont icon-user-full"></i>
                            </div>
                            <div class="inner-box">
                              <div class="info">
                                <span>{{item.user_name}}</span>
                                <span>{{item.add_time|returnItme}}</span>
                              </div>
                              <p>{{item.content}}</p>
                            </div>
                          </li>
                        </ul>
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :page-sizes="[2, 4, 6,8,10]"
                          :page-size="info.pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="info.totalcount"
                        ></el-pagination>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div class="left-220">
              <div class="bg-wrap nobg">
                <div class="sidebar-box">
                  <h4>推荐商品</h4>
                  <ul class="side-img-list">
                    <li
                      v-for="(item, index) in hotgoodslist"
                      :key="item.id"
                      @click="tiaoZhuang(item.id)"
                    >
                        <router-link :to="'/Detail/'+item.id">
                      <div class="img-box">
                          <img :src="item.img_url">
                      </div>
                      <div class="txt-box">
                        <a href="#" >{{item.title}}</a>
                        <span>{{item.add_time | returnItme}}</span>
                      </div>
                        </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Detail",
  data() {
    return {
      // 商品id
      id: "",
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [
        {
          // 因为上面需要用到,不在这定义一个,hui报original_path未定义
          original_path: ""
        }
      ],

      bigimg: "",
      info: {
        pageIndex: 1,
        pageSize: 2,
        totalcount: 20,
        msgList: []
      },
      data: "",
      activeName: "second",
      // 文本域内容
      textarea2: "",
    
    };
  },
  // 过滤器
  filters: {
    returnItme(value) {
      let newarr = value.split("T");
      return newarr[0];
    }
  },
  created() {
    // 获取url中的id
    this.id = this.$route.params.id;
    //  console.log(    this.$route );
    // 请求商品详情信息
    this.goDetall();
    // 请求评论内容
    this.gosinfo();
    // 请求添加评论

  },
  methods: {
    addDiscuss() {
      if(this.textarea2==""){
        alert('写点东西呗!');
        return;
      }
      
      this.$axios.post(`site/validate/comment/post/goods/${this.id}` ,{"commenttxt":this.textarea2}).then(res=>{
        console.log( res );
        if(res.data.status==0){
          // 显示成功信息
           this.$message({ message:res.data.message,type:'success'});
          //  清空文本域
          this.textarea2='';
          // 刷新评论区
             this.gosinfo();
        }else{
           this.$message(res.data.message);
             this.$message({ message:res.data.message,type:'error'});
        }
      })
    },
    // 封装请求商品详情数据函数
    goDetall() {
      this.$axios.get(`site/goods/getgoodsinfo/${this.id}`).then(res => {
        // console.log(res);
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
      });
    },
    // 封装请求评论数据函数
    gosinfo() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.id}?pageIndex=${
            this.info.pageIndex
          }&pageSize=${this.info.pageSize}`
        )
        .then(res => {
          // console.log(res);
          this.info.pageIndex = res.data.pageIndex;
          this.info.pageSize = res.data.pageSize;
          this.info.totalcount = res.data.totalcount;
          this.info.msgList = res.data.message;
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 改变的值重新赋值
      this.info.pageSize = val;
      // 重新请求数据
      this.gosinfo();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 改变的值重新赋值
      this.info.pageIndex = val;
      // 重新请求数据
      this.gosinfo();
    },

    topImg(v) {
      //  绑定大图与轮播图的每一张图
      this.bigimg = v;
    },
    tiaoZhuang(value) {
      // 获取要跳转的id
      this.id = value;
      // 根据id同时重新渲染商品信息和评论区
      this.goDetall();
      this.gosinfo();
      // this.$router.go(0);
      // this.$router.replace({
      //     path:"supplierAllBack",
      //     name:'supplierAllBack'
      // })
    }
  }
};
</script>
<style lang="scss" >
.content-details {
  .goods-box{
    height: 430px;
    .pic-box {
    width: 450px;
    height: 320px;
    .topImg {
      display: block;
      margin: 0 auto;
      width: 380px;
      height: 320px;
      padding: 0, 20px, 0, 0;
    }
    .minLbo {
      width: 100%;
      height: 100px;
    }
  }
  .goods-spec {
    padding-left: 10px;
    margin: 0px;
  }

  .big-box {
    height: 100px;
  }
  .el-carousel__item {
    width: 220px;
    height: 100px;
  }
  div.el-carousel__container {
    height: 100px;
  }
  .el-carousel__item img.boximg {
    width: 220px;
    height: 100px;
    display: block;
  }
  .el-carousel__indicators--outside {
    display: none;
  }
  }
  .goods-tab {
    .el-tabs__item.is-active {
      border-bottom-color: #0000;
      color: #ffffff;
      background-color: green;
    }
  }
  
}
</style>

