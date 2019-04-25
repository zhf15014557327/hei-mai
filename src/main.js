import Vue from 'vue'
import App from './App.vue'
// 导入饿了吗ui
import ElementUI from 'element-ui';
// 导入饿了吗样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入全局样式
import "./assets/css/style.css"
// 导入vue插件axios
import VueAxios from './lib/axios'
// use一下
Vue.use(VueAxios);
Vue.config.productionTip = false;
// 导入ruter-vue全局路由
import router from "./lib/router"
// 导入仓库
import store from "./lib/store"
// 注册全局过滤器 方便使用
// 导入 moment
import moment from 'moment';
Vue.filter("returnItme", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  console.log(moment(value).format("YYYY😘MM😘DD👍"));
  //   return '😁😁😁😁😁';
  return moment(value).format("YYYY-MM-DD😁");
});
new Vue({
  // 挂载路由
  router,
  // 挂载仓库
  store,
  render: h => h(App),
}).$mount('#app')
