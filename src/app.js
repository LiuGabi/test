import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import routes from './config/routes'
import store from './store/'
import components from './components/'

import filter from './filter'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import './css/index.less'

Vue.use(ElementUI)
Vue.use(components)
Vue.use(filter)
Vue.use(VueResource)
Vue.use(VueRouter)

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    // mode: 'history',//HTML5 History 模式
    routes, // （缩写）相当于 routes: routes
    linkActiveClass: 'active'
})

//在全局导航钩子中检查 meta 字段，以此来判断是否需要跳转授权：
router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {

        let auth = localStorage.accesstoken && localStorage.accesstoken!=""

        if (!auth) {
            next({
                name: 'login'
            });

        } else {
            next();
        }
    } else {
        next();
    }
})

router.afterEach((route) => {
    document.title = route.meta.title;
})

new Vue({ store, router}).$mount('#app')


