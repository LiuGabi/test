import Layout from '../page/layout/';

import Home from '../page/home/';
import Record from '../page/record/';
import Manger from '../page/manger/';
import SignIn from '../page/sign/';
import ErrorPage from '../page/404/';

export default [{
	path: '/',
	meta: {
        requiresAuth: false,
        title: '登录 - 客服'
    },
	component: SignIn
}, {
	path: '/signin/',
	name: 'signin',
	meta: {
        requiresAuth: false,
        title: '登录 - 客服'
    },
	component: SignIn
}, {
	path: '/home/',
	component: Layout,
	children: [{
		path: '/',
		name: 'home',
		meta: {
            requiresAuth: true,
            title: '首页 - 客服'
        },
		component: Home
	}]
}, {
	path: '/record/',
	component: Layout,
	children: [{
		path: '/record/:customerId/:recepTime/:phone',
		name: 'record',
		meta: {
            requiresAuth: true,
            title: '录入来电事件 - 客服'
        },
		component: Record
	}, {
		path: '/',
		meta: {
            requiresAuth: true,
            title: '404 - 客服'
        },
		component: ErrorPage
	}]
},  {
	path: '/manger/',
	component: Layout,
	children: [{
		path: '/',
		name: 'manger',
		meta: {
            requiresAuth: true,
            title: '管理 - 客服'
        },
		component: Manger
	}]
}, {
	path: '*',
	name: '404',
	meta: {
        requiresAuth: true,
        title: '404 - 客服'
    },
	component: ErrorPage
}];