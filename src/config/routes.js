import App from '../pages/app'
import Login from '../pages/login'
/**
 * auth true登录才能访问，false不需要登录，默认true
 */
export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/banner',
                name:'banner',
                meta:{
                    requiresAuth:true,
                    title:"banner配置"
                },
                component: resolve => require(['../pages/banner/'], resolve)
            },
            {
                path: '/notic',
                name:'notic',
                meta:{
                    requiresAuth:true,
                    title:"公告配置"
                },
                component: resolve => require(['../pages/notic/'], resolve)
            },
            {
                path: '/userManagement',
                name:'userManagement',
                meta:{
                    requiresAuth:true,
                    title:"用户管理"
                },
                component: resolve => require(['../pages/userManagement/'], resolve)
            },
            {
                path: '/userApproval',
                name:'userApproval',
                meta:{
                    requiresAuth:true,
                    title:"用户配置"
                },
                component: resolve => require(['../pages/userApproval/'], resolve)
            },
            {
                path: '/roleManagement',
                name:'roleManagement',
                meta:{
                    requiresAuth:true,
                    title:"角色管理"
                },
                component: resolve => require(['../pages/roleManagement/'], resolve)
            },
        ]
    },
    {
        path: '/login',
        name:'login',
        meta:{
            requiresAuth:false,
            title:"登录"
        },
        component: Login
    },
     {
        path: '/',
        meta: {
            requiresAuth: true,
            title:"管理系统"
        },
        redirect: { name: 'banner' }//强制跳转banner页
    },
    //  {
    //     path: '*',
    //     meta: {
    //         requiresAuth: true,
    //         title: '404'
    //     },
    //     component: resolve => require(['../pages/404'], resolve)
    // }
]