import Vue from 'vue'
import {SIGNIN, CLEAR_PASSWORD, CHANGE_PASSWORD} from './types'
import httpReq from './basehttp'

export default {
    state: {},
    mutations: {
        [SIGNIN] (state, data) {
            let accesstoken = data.tokenType + ' ' + data.token;

            localStorage.setItem('username', JSON.stringify(data.params.userName));
            localStorage.setItem('accesstoken', JSON.stringify(accesstoken));
            localStorage.setItem('permissions', JSON.stringify(data.params.permissions));
        }
    },
    actions: {
        [SIGNIN](context, payload) {
            return httpReq('post', '/api/pub/1.0.0/admin/token', payload).then(data => {
                if(data) {
                    if(data.code === '0') {
                        context.commit('SIGNIN', data.content);
                        return 'Success';
                    } else {
                        return data.error.message ? data.error.message: '不可名的错误 =。=';
                    }
                } else {
                    return '网络或资源路径错误~~~';
                }
            });
        },
        [CLEAR_PASSWORD]() {
            localStorage.removeItem('username');
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('permissions');
        },
        [CHANGE_PASSWORD](context, payload) {
            return httpReq('patch', '/api/pvt/1.0.0/admin/password', false, payload, true).then(data => {
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