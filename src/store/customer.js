import Vue from 'vue'
import {GET_CUSTOMER_ID_INFO, GET_CUSTOMER_INFO, GET_APPLY_LIST, GET_REPAY_LIST, GET_CUSTOMER_LOAN_INFO, GET_CUSTOMER_LOAN_DETAIL} from './types'
import httpReq from './basehttp'

export default {
    state: {
        customerIdInfo: {
            customerId: 0, // 0 表示无此客户 ID
            customerName: '非注册用户'
        },
        info: {
            cellphone: '00000000000',
            completion: {
                completion: 0,
                required: {
                    baiRongScore: "0",
                    bindCard: false,
                    contact: false,
                    face: false,
                    identity: false,
                    job: false,
                    operators: false,
                    realName: false,
                    residence: false,
                    zhiMa: false,
                    zhiMaScore: "0"
                }
            },
            creditLine: {
                approvedTime: 0,
                available: 0,
                frozen: 0,
                id: '',
                status: 0,
                total: 0,
                used: 0,
                userId: 0
            },
            creditLineExist: false,
            inLoanCount: 0,
            userId: 0,
            name: '无无无',
            sex: '--',
            repayableAmount: 0,
            daysOverdue: 0
        },
        apply: {
            currentIndex: 1,
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            list: [],
        },
        repay: {
            currentIndex: 1,
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            list: [],
        },
        loanInfo: {
            alreadyRepaidAmount: 0,
            detailInfos: [],
            discountTotalAmount: 0,
            notYetTotalAmount: 0
        },
        loanDetail: [],
    },
    mutations: {
        [GET_CUSTOMER_ID_INFO](state, data) {
            state.customerIdInfo.customerId = data.userId ? data.userId : 0;
            state.customerIdInfo.customerName = data.userProfileIdentityInfo ? (data.userProfileIdentityInfo.name ? data.userProfileIdentityInfo.name: '非注册用户') : '非注册用户';
        },
        [GET_CUSTOMER_INFO](state, data) {
            state.info.cellphone = data.cellphone ? data.cellphone : '00000000000';
            state.info.completion.completion = data.completion ? (data.completion.completion ? data.completion.completion :0) : 0;

            state.info.completion.required.baiRongScore = data.completion ? (data.completion.required ? (data.completion.required.baiRongScore ? data.completion.required.baiRongScore : '0') :'0') : '0';
            state.info.completion.required.bindCard = data.completion ? (data.completion.required ? (data.completion.required.bindCard ? data.completion.required.bindCard : false) : false) : false;
            state.info.completion.required.contact = data.completion ? (data.completion.required ? (data.completion.required.contact ? data.completion.required.contact : false) : false) : false;
            state.info.completion.required.face = data.completion ? (data.completion.required ? (data.completion.required.face ? data.completion.required.face : false) : false) : false;
            state.info.completion.required.identity = data.completion ? (data.completion.required ? (data.completion.required.identity ? data.completion.required.identity : false) : false) : false;
            state.info.completion.required.job = data.completion ? (data.completion.required ? (data.completion.required.job ? data.completion.required.job : false) : false) : false;
            state.info.completion.required.operators = data.completion ? (data.completion.required ? (data.completion.required.operators ? data.completion.required.operators : false) : false) : false;
            state.info.completion.required.realName = data.completion ? (data.completion.required ? (data.completion.required.realName ? data.completion.required.realName : false) : false) : false;
            state.info.completion.required.residence = data.completion ? (data.completion.required ? (data.completion.required.residence ? data.completion.required.residence : false) : false) : false;
            state.info.completion.required.zhiMa = data.completion ? (data.completion.required ? (data.completion.required.zhiMa ? data.completion.required.zhiMa : false) : false) : false;
            state.info.completion.required.zhiMaScore = data.completion ? (data.completion.required ? (data.completion.required.zhiMaScore ? data.completion.required.zhiMaScore : '0') : '0') : '0';


            state.info.creditLine = data.creditLine ? data.creditLine : {};
            state.info.creditLineExist = data.creditLineExist;
            state.info.inLoanCount = data.inLoanCount ? data.inLoanCount : 0;
            state.info.userId = data.userId ? data.userId : 0;
            state.info.name = data.name ? data.name : '无无无';
            state.info.sex = data.sex ? data.sex : '--';
            state.info.repayableAmount = data.repayableAmount ? data.repayableAmount : 0;
            state.info.daysOverdue = data.daysOverdue ? data.daysOverdue : 0;
        },
        [GET_APPLY_LIST](state, data) {
            state.apply.currentIndex = data.currentIndex ? data.currentIndex : 1;
            state.apply.pageCount = data.pageCount ? data.pageCount : 1;
            state.apply.pageSize = data.pageSize ? data.pageSize : 10;
            state.apply.totalCount = data.totalCount ? data.totalCount : 0;
            state.apply.list = data.list ? data.list : [];
        },
        [GET_REPAY_LIST](state, data) {
            state.repay.currentIndex = data.currentIndex ? data.currentIndex : 1;
            state.repay.pageCount = data.pageCount ? data.pageCount : 1;
            state.repay.pageSize = data.pageSize ? data.pageSize : 10;
            state.repay.totalCount = data.totalCount ? data.totalCount : 0;
            state.repay.list = data.list ? data.list : [];
        },
        [GET_CUSTOMER_LOAN_INFO](state, data) {
            state.loanInfo.alreadyRepaidAmount = data.alreadyRepaidAmount ? data.alreadyRepaidAmount : 0;
            state.loanInfo.detailInfos = data.detailInfos ? data.detailInfos : [];
            state.loanInfo.discountTotalAmount = data.discountTotalAmount ? data.discountTotalAmount : 0;
            state.loanInfo.notYetTotalAmount = data.notYetTotalAmount ? data.notYetTotalAmount : 0;
        },
        [GET_CUSTOMER_LOAN_DETAIL](state, data) {
            state.loanDetail = data.documentList ? data.documentList : [];
        }
    },
    actions: {
        [GET_CUSTOMER_ID_INFO](context, payload) {
            return httpReq('get', '/api/pvt/1.0.0/customers', payload, false, true).then(data => {
                if(data) {
                    if(data.code === '0') {
                        context.commit('GET_CUSTOMER_ID_INFO', data.content);
                        return 'Success';
                    } else {
                        // 请求失败时传空数据
                        context.commit('GET_CUSTOMER_ID_INFO', '');
                        return data.error.message ? data.error.message: '不可名的错误 =。=';
                    }
                } else {
                    // 请求失败时传空数据
                    context.commit('GET_CUSTOMER_ID_INFO', '');
                    return '网络或资源路径错误~~~';
                }
            });
        },
        [GET_CUSTOMER_INFO](context, payload) {
            return httpReq('get', '/api/pvt/1.0.0/customers/' + payload, false, false, true).then(data => {
                if(data) {
                    if(data.code === '0') {
                        context.commit('GET_CUSTOMER_INFO', data.content);
                        return 'Success';
                    } else {
                        return data.error.message ? data.error.message: '不可名的错误 =。=';
                    }
                } else {
                    return '网络或资源路径错误~~~';
                }
            });
        },
        [GET_APPLY_LIST](context, payload) {
            return httpReq('get', '/api/pvt/1.0.0/customers/' + payload.customerId + '/loans/', payload.params, false, true).then(data => {
                if(data) {
                    if(data.code === '0') {
                        context.commit('GET_APPLY_LIST', data.content);
                        return 'Success';
                    } else {
                        return data.error.message ? data.error.message: '不可名的错误 =。=';
                    }
                } else {
                    return '网络或资源路径错误~~~';
                }
            });
        },
        [GET_REPAY_LIST](context, payload) {
            return httpReq('get', '/api/pvt/1.0.0/customers/' + payload.customerId + '/repayments/', payload.params, false, true).then(data => {
                if(data) {
                    if(data.code === '0') {
                        context.commit('GET_REPAY_LIST', data.content);
                        return 'Success';
                    } else {
                        return data.error.message ? data.error.message: '不可名的错误 =。=';
                    }
                } else {
                    return '网络或资源路径错误~~~';
                }
            });
        },
        [GET_CUSTOMER_LOAN_INFO](context, payload) {
            return httpReq('get', '/api/pvt/1.0.0/customers/' + payload.id + '/repayments/' + payload.plan_id + '/charges/', false, false, true).then(data => {
                if(data) {
                    if(data.code === '0') {
                        context.commit('GET_CUSTOMER_LOAN_INFO', data.content);
                        return 'Success';
                    } else {
                        return data.error.message ? data.error.message: '不可名的错误 =。=';
                    }
                } else {
                    return '网络或资源路径错误~~~';
                }
            });
        },
        [GET_CUSTOMER_LOAN_DETAIL](context, payload) {
            return httpReq('get', '/api/pvt/1.0.0/customers/' + payload.id + '/repayments/' + payload.plan_id, payload.params, false, true).then(data => {
                if(data) {
                    if(data.code === '0') {
                        context.commit('GET_CUSTOMER_LOAN_DETAIL', data.content);
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