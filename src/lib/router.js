import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
// 导入组件
import index from '../components/index.vue'
import Detail from '../components/Detail.vue'
import login from '../components/login.vue'
import pay from '../components/pay.vue'
import shoppingCart from '../components/shopping-cart.vue'
import vipCenter from '../components/vipCenter.vue'
import userCerten from '../components/children/userCerten.vue'
import oderList from '../components/children/oderList.vue'
import oderDetails from '../components/children/oderDetails.vue'

// 创建路由实例
let router= new VueRouter({
    // 写路由规则
    routes:[
        {
        path:'/',
        redirect:'index' 
    },
        {
        path:'/index',
        component:index
    },
        {
        path:'/shoppingCart',
        component:shoppingCart
    },
        {
        path:'/pay',
        component:pay
    },
        {
        path:'/login',
        component:login
    },
        {
        path:'/Detail/:id',
        component:Detail
    },
      
        {
        path:'/vipCenter',
        component:vipCenter,
        // 嵌套路由
        children:[
            {
                path:'',
                redirect:'userCerten'
            },
            {
                path:'userCerten',
                component:userCerten
            },
            {
                path:'oderList',
                component:oderList
            },
            {
                path:'oderDetails',
                component:oderDetails
            },
           
        ]
    },
]
})
 
export default router