import Vue from 'vue'
import App from './App.vue'
// 导入全局样式
import "./assets/css/style.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
