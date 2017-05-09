import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 登陆引入
import Account from './account';
// 产品配置引入
import Banner from './banner';
import Notice from './notice';
import Agreement from './agreement';
// 用户列表
import User from './user';
import Role from './role';
import RoleApprove from './role-approve';
// 上传
import Transmission from './transmission';

export default new Vuex.Store({
    strict: true,
    modules: {
    	Account,
    	Banner,
    	Notice,
    	Agreement,
    	User,
    	Role,
    	RoleApprove,
        Transmission
    }
});