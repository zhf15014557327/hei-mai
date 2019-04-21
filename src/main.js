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
new Vue({
  // 挂载路由
  router,
  render: h => h(App),
}).$mount('#app')
