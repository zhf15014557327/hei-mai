import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
// 导入组件
import index from '../components/index.vue'
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