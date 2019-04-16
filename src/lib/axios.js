// 封装axios插件
// 导入axios
import axios from "axios"
// 设置默认基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';
export default {
    install(Vue){
        // Vue的原型上添加方法
        Vue.prototype.$axios=axios
    }
}