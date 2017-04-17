import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import user from './user'
//产品配置
import banner from './banner'
import notic from './notic'
//用户中心
import userManagement from './userManagement'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    modules: {
        user,
        banner,
        notic,
        userManagement
    }
})