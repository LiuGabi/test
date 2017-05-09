import Vue from 'vue'
import VueRouter from 'vue-router'

import filter from './filter'

import routes from './router/'
import store from './store/'

import ElementUI from 'element-ui'

Vue.use(filter);

Vue.use(ElementUI);

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

        let auth = localStorage.accesstoken && localStorage.accesstoken !== "";

        if (!auth) {
            next({
                name: 'signin'
            });

        } else {
            next();
        }
    } else {
        next();
    }
});

new Vue({
    router,
    store
}).$mount('#app');


