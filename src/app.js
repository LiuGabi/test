import Vue from 'vue';
import VueRouter from 'vue-router';

import filter from './utils/filter';

import routes from './route';
import store from './store';

import EleUI from 'element-ui';

/** Filter data **/
Vue.use(filter);

/** Use ele ui **/
Vue.use(EleUI);

/** Use vue router **/
Vue.use(VueRouter);
const router = new VueRouter({
	// mode: 'history',
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

