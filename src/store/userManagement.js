import {QUERY_USER,CREATE_USER,RESET_PASSWORD,LOOK_ROLE,MODIFY_ROLE,ALL_ROLE,USESTUTA} from  './types'
import Vue from 'vue'

export default {
    state:{
        currentIndex: 1,
        pageCount: 1,
        pageSize: 10,
        totalCount: 0,
        list:[],
        success:true
    },
    mutations:{
        [QUERY_USER](state,data){
            state.currentIndex = data.currentIndex;
            state.pageCount = data.pageCount;
            state.pageSize = data.pageSize;
            state.totalCount = data.totalCount;
            state.list=data;
            console.log(data)
        },
        [CREATE_USER](state,data){
            state.success=data;
        },
        [RESET_PASSWORD](state,data){
            state.success=data;
        },
        [LOOK_ROLE](state,data){
             state.success=data;
        },
        [MODIFY_ROLE](state,data){
             state.success=data;
        },
        [ALL_ROLE](state,data){
             state.success=data;
        }
    },
    actions: {
        [QUERY_USER](context, payload){
            return Vue.http({
                method:'get',
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/admin?page_size='+payload.page_size+"&page_no="+
                payload.page_no+"&role="+payload.role+"&account="+payload.account,
                query:{
                    // role: payload.role,
                    // account:payload.account,
                    // page_no: payload.page_no,
                    // page_size: payload.page_size
                },
                headers:{
                    Authorization: JSON.parse(localStorage.accesstoken)
                }
            }).then((res) => {
                console.log(res.data.content.list)
                let data =res.data;
                if(data.code ==='0') {
                    context.commit('QUERY_USER', data.content);
                    return data.content.list;
                }else{
                    return 'Failure';
                }
            }).catch(function (err) {
                return err.status;
            });
        },
        [CREATE_USER](context, payload){
            return Vue.http({
                method:'post',
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/admin',
                body:{
                    account:payload.account,
                    name:payload.name,
                    password:payload.password,
                    phone:payload.phone,
                },
                headers:{
                    Authorization: JSON.parse(localStorage.accesstoken)
                }
            }).then((res) => {
                console.log(res.data.content.list)
                let data =res.data;
                if(data.code ==='0') {
                    context.commit('CREATE_USER', data.content);
                    return "Success";
                }else{
                    return 'Failure';
                }
            }).catch(function (err) {
                return err.status;
            });
        },
        [RESET_PASSWORD](context, payload){
            return Vue.http({
                method:'post',
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/admin/reset-password',
                body:{
                    account:payload.account,
                    password:payload.password,
                },
                headers:{
                    Authorization: JSON.parse(localStorage.accesstoken)
                }
            }).then((res) => {
                console.log(res.data.content)
                let data =res.data;
                if(data.code ==='0') {
                    context.commit('RESET_PASSWORD', data.content);
                    return "Success";
                }else{
                    return 'Failure';
                }
            }).catch(function (err) {
                return err.status;
            });
        },
        [LOOK_ROLE](context, payload){
            return Vue.http({
                method:'get',
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/admin/'+payload.id+'/roles',
                path:{
                    id:payload.id,
                },
                headers:{
                    Authorization: JSON.parse(localStorage.accesstoken)
                }
            }).then((res) => {
                console.log(res.data.content.list)
                let data =res.data;
                if(data.code ==='0') {
                    context.commit('LOOK_ROLE', data.content);
                    return data.content.list;
                }else{
                    return 'Failure';
                }
            }).catch(function (err) {
                return err.status;
            });
        },
        [MODIFY_ROLE](context, payload){
            return Vue.http({
                method:'patch',
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/admin/{{id}}/roles',
                path:{
                    id:payload.id,
                },
                headers:{
                    Authorization: JSON.parse(localStorage.accesstoken)
                }
            }).then((res) => {
                console.log(res.data.content.list)
                let data =res.data;
                if(data.code ==='0') {
                    context.commit('MODIFY_ROLE', data.content);
                    return data.content.list;
                }else{
                    return 'Failure';
                }
            }).catch(function (err) {
                return err.status;
            });
        },
        [ALL_ROLE](context, payload){
            return Vue.http({
                method:'patch',
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/admin/roles',
                body:[{
                    operation:payload.operation,
                    roleId:payload.roleId

                }],
                headers:{
                    Authorization: JSON.parse(localStorage.accesstoken)
                }
            }).then((res) => {
                console.log(res.data.content.list)
                let data =res.data;
                if(data.code ==='0') {
                    context.commit('ALL_ROLE', data.content);
                    return data.content.list;
                }else{
                    return 'Failure';
                }
            }).catch(function (err) {
                return err.status;
            });
        },
    }

}
