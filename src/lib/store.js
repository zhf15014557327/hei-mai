// 安装下载 npm i vuex --save
// 导入vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 初始化一个store仓库
let store = new Vuex.Store({
    // 数据
    state: {
        // 短路运算
        CatrData:JSON.parse(window.localStorage.getItem('cartInfo'))||{}
      },
//    方法
      mutations: {
        //   加入购物车
        add2Catr (state,data) {
          if(state.CatrData[data.goods_id]){
            state.CatrData[data.goods_id]+=data.goods_num
          }else{
            //   vue无法跟踪
            // state.CatrData[goodsId]=data.goodsNum
            // 使用vue的set方法告诉vue数据的改变(监听数据变化)
            Vue.set(state.CatrData,data.goods_id,data.goods_num);
          }
        }
      },
    //   计算属性
      getters:{
        totalNum(state){
            // 计算总数
          let total=0;
        for (const key in state.CatrData) {
            total+=state.CatrData[key];
        };
        return total;
        }
      }
});
// 页面即将关闭保存数据
window.onbeforeunload=function(){
     alert(store.state.CatrData)
    window.localStorage.setItem('cartInfo',JSON.stringify(store.state.CatrData))
}

// 暴露出去
export default store