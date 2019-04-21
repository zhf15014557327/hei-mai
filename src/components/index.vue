<template>
  <div class="content-index">
    <div>
      <div class="section">
        <div class="location">
          <span>当前位置：</span>
          <a href="#/" class="router-link-active">首页</a> &gt;
          <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
        </div>
      </div>
      <div class="section">
        <div class="wrapper">
          <div class="wrap-box">
            <div class="left-220" style="margin: 0px;">
              <div class="banner-nav">
                <ul>
                  <li v-for="(item, index) in catelist" :key="item.id">
                    <h3>
                      <i class="iconfont icon-arrow-right"></i>
                      <span>{{item.title}}</span>
                      <p>
                        <span v-for="(itm, xiab) in item.subcates" :key="xiab">{{itm.title}}&nbsp;</span>
                      </p>
                    </h3>
                    <div class="item-box">
                      <dl>
                        <dt>
                          <a href="/goods/40.html">{{item.title}}</a>
                        </dt>
                        <dd>
                          <a
                            href="/goods/43.html"
                            v-for="(itm, xiab) in item.subcates"
                            :key="xiab"
                          >{{itm.title}}</a>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!--幻灯片-->
            <div class="left-705">
              <el-carousel :interval="2000" arrow="always" >
                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                <img :src="item.img_url" alt="" class="image">
                </el-carousel-item>
              </el-carousel>
            </div>
            <!--/幻灯片-->
            <div class="left-220">
              <ul class="side-img-list">
                <li v-for="(item, index) in toplist" :key="item.id">
                  <div class="img-box">
                    <label>{{index+1}}</label>
                    <router-link :to="'/Detail/'+item.id">
                      <img :src="item.img_url">
                    </router-link>
                  </div>
                  <div class="txt-box">
                    <a href="/goods/show-98.html">{{item.title}}</a>
                    <span>{{item.add_time|retuTiem}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="section" v-for="(item, index) in catetitles" :key="item.level1cateid">
        <div class="main-tit">
          <h2>{{item.catetitle}}</h2>
          <p>
            <a href="/goods/43.html"v-for="(ite, inde) in item.level2catelist" :key="ite.subcateid">{{ite.subcatetitle}}</a>
              更多
              <i>+</i>
            </a>
          </p>
        </div>
        <div class="wrapper clearfix">
          <div class="wrap-box">
            <ul class="img-list">
              <li v-for="(it, ind) in item.datas" :key="it.artID">
                 <router-link :to="'/Detail/'+it.artID">
                     <div class="img-box">
                    <img
                      :src="it.img_url"
                    >
                  </div>
                  <div class="info">
                    <h3>{{it.artTitle}}</h3>
                    <p class="price">
                      <b>{{it.sell_price}}</b>元
                    </p>
                    <p>
                      <strong>库存 {{it.stock_quamtity}}</strong>
                      <span>
                        市场价：
                        <s>{{it.market_price}}</s>
                      </span>
                    </p>
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
</template>
<script>
export default {
  name: "index",
  data(){
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      catetitles:[]
    };
  },

  filters: {
    retuTiem(value) {
      // console.log( value );
      let newArr = value.split("T");
      return newArr[0];
    }
  },
  created() {
    console.log(this.$axios);
    
    this.$axios.get("site/goods/gettopdata/goods").then(res => {
      console.log( res );
      this.catelist = res.data.message.catelist;
      this.sliderlist = res.data.message.sliderlist;
      this.toplist = res.data.message.toplist;
    });
    this.$axios.get("site/goods/getgoodsgroup").then(res=>{
      // console.log( res );
      this.catetitles=res.data.message
    })
  },
 
};
</script>
<style  lang="scss" >
.content-index{
.el-carousel{
  height: 341px;
}
  .el-carousel__item img {
  width: 705px;
  height: 341px;
  display: block;
}
.is-active{
  background-color: #ccc;
}
.el-carousel__button{
  background-color: aqua;
}
}

</style>

