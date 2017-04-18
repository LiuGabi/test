import Vue from 'vue'
import {GET_CUSTOMER_EVENT, CREATE_CUSTOMER_EVENT, GET_CUSTOMER_EVENT_EXCEL} from './types'
import httpReq from './basehttp'
import httpReqFile from './basehttpfile'

export default {
    state: {
        currentIndex: 1,
        pageCount: 1,
        pageSize: 10,
        totalCount: 0,
        list: [],

        isSuccess: false,
        requestId: '--'
    },
    mutations: {
        [GET_CUSTOMER_EVENT](state, data) {
            state.currentIndex = data.currentIndex ? data.currentIndex : 1;
            state.pageCount = data.pageCount ? data.pageCount : 1;
            state.pageSize = data.pageSize ? data.pageSize : 10;
            state.totalCount = data.totalCount ? data.totalCount : 0;
            state.list = data.list ? data.list : [];
        }
    },
    actions: {
        [GET_CUSTOMER_EVENT](context, payload) {
            return httpReq('get', '/api/pvt/1.0.0/customer-events', payload, false, true).then(data => {
                if(data) {
                    if(data.code === '0') {
                        context.commit('GET_CUSTOMER_EVENT', data.content);
                        return 'Success';
                    } else {
                        return data.error.message ? data.error.message: '不可名的错误 =。=';
                    }
                } else {
                    return '网络或资源路径错误~~~';
                }
            });
        },
        [GET_CUSTOMER_EVENT_EXCEL](context, payload) {
            return httpReqFile('get', '/api/pvt/1.0.0/customer-events', payload, false, true, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').then(data => {
                if(data) {
                    return 'Success';
                } else {
                    return '网络或资源路径错误~~~';
                }
            });
        },
        [CREATE_CUSTOMER_EVENT](context, payload) {
            return httpReq('post', '/api/pvt/1.0.0/customer-events', false, payload, true).then(data => {
                if(data) {
                    if(data.code === '0') {
                        return 'Success';
                    } else {
                        return data.error.message ? data.error.message: '不可名的错误 =。=';
                    }
                } else {
                    return '网络或资源路径错误~~~';
                }
            });
        }
    }
}