import {NOTIC,CREAT_NOTIC,DELETE_NOTIC,MODIFY_NOTIC} from './types'
import Vue from 'vue'

export default {
	state:{
		list:[],
		success:true
	},
	mutations:{
		[NOTIC](state,data){
			console.log(data.list)
			state.list=data.list;
		},
		[CREAT_NOTIC](state,data){
			state.success=data;
			console.log(data)
		},
		[MODIFY_NOTIC](state,data){
			state.success=data
		}
	},
	actions:{
		[NOTIC](context,payload){
			return Vue.http({
				method:'get',
				// url:'http://118.178.247.240:6161/api/pvt/1.0.0/notice',
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/notice',//开发环境地址
				body:{
				  id: payload.id,
				  link: payload.link ,
				  title: payload.title 
				},
				headers:{
					Authorization: JSON.parse(localStorage.accesstoken)
				}
			}).then((res) => {
				let data =res.data;
				if(data.code ==='0') {
					context.commit('NOTIC', data.content);
					return 'Success';
				}else{
					return 'Failure';
				}
			}).catch(function (err) {
				 return err.status;
			});
		},
		[CREAT_NOTIC](context,payload){
			return Vue.http({
				method:'post',
				// url:'http://118.178.247.240:6161/api/pvt/1.0.0/notice',
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/notice',
				body:{
				   link: payload.link ,
				   title: payload.title 
				},
				headers:{
					Authorization: JSON.parse(localStorage.accesstoken)
				}
			}).then((res) => {
				let data=res.data;
				if(data.code ==='0'){
					context.commit('CREAT_NOTIC',data.content);
					return 'Success';
				}else{
					return 'Failure';
				}
			}).catch(function (err) {
				return err.status;
			})
		},
		[DELETE_NOTIC](context,payload){
			console.log('Test:', payload+",context"+context);
			return Vue.http({
				method:'delete',
				// url:'http://118.178.247.240:6161/api/pvt/1.0.0/notice/' + payload,
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/notice/' + payload,
				path:{
					id:payload,
				},
				headers:{
					Authorization: JSON.parse(localStorage.accesstoken)
				}
			}).then((res) => {
				let data=res.data;
				if(data.code ==='0'){
					context.commit('DELETE_NOTIC',data.content);
					return 'Success';
				}else{
					return 'Failure';
				}
			}).catch(function (err) {
				 return err.status;
			})
		},
		[MODIFY_NOTIC](context,payload){
			console.log('Test11:', payload+",context"+context);
			return Vue.http({
				method:'patch',
				// url:'http://118.178.247.240:6161/api/pvt/1.0.0/notice/' + payload.id,
				url:'http://10.253.106.182:8081/api/pvt/1.0.0/notice' + payload.id,
				path:{
					id:payload.id,
				},
				body:{
				   link: payload.link ,
				   title: payload.title 
				},
				headers:{
					Authorization: JSON.parse(localStorage.accesstoken)
				}
			}).then((res) => {
				let data=res.data;
				if(data.code ==='0'){
					context.commit('MODIFY_NOTIC',data.content);
					return 'Success';
				}else{
					return 'Failure';
				}
			}).catch(function (err) {
				 return err.status;
			})
		}

	},
}