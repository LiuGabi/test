import Vue from 'vue'
import {RECEPTIONIST} from './types'
import httpReq from './basehttp'

export default {
    state: {
        eventCount: '0',
        name: '--',
        receptionCount: '0',
        satisfaction: '0',
        upTime: '0'
    },
    mutations: {
        [RECEPTIONIST] (state, data) {
            state.eventCount = data.eventCount ? data.eventCount : '0';
            state.name = data.name ? data.name : '0';
            state.receptionCount = data.receptionCount ? data.receptionCount : '0';
            state.satisfaction = data.satisfaction ? data.satisfaction : '0';
            state.upTime = data.upTime ? data.upTime : '0';
        }
    },
    actions: {
        [RECEPTIONIST](context, payload) {
            return httpReq('get', '/api/pvt/1.0.0/receptionist', false, false, true).then(data => {
                if(data) {
                    if(data.code === '0') {
                        context.commit('RECEPTIONIST', data.content);
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