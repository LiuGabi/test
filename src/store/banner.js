import {BANNER,CREAT_BANNER,DELETE_BANNER,MODIFY_BANNER} from './types'
import Vue from 'vue'

export default {
	state:{
		list:[],
		success:true
	},
	mutations:{
		[BANNER](state,data){
			console.log(data.list)
			state.list=data.list;
		},
		[CREAT_BANNER](state,data){
			state.success=data;
			console.log(data)
		},
		[MODIFY_BANNER](state,data){
			state.success=data
		}
	},
	actions:{
		[BANNER](context,payload){
			return Vue.http({
				method:'get',
				// url:'http://10.253.106.182:8080/api/pvt/1.0.0/banners',//测试环境
                url:'http://10.253.106.182:8081/api/pvt/1.0.0/banners',//开发环境内网地址
				body:{
				  id: payload.id,
				  imageCode:payload.imageCode,
				  name: payload.name,
				  type: payload.type
				},
				headers:{
					Authorization: JSON.parse(localStorage.accesstoken)
				}
			}).then((res) => {
				console.log(res.data)
				//console.log(getCookie("token"));
				//getCookie("token");
				let data =res.data;
				if(data.code ==='0') {
					context.commit('BANNER', data.content);
					return 'Success';
				}else if(data.code ==='400003'){
					alert("登陆超时。请重新登陆！")
					this.$router.replace({ path: '/login' })				
				}else{
					return 'Failure';
				}
			}).catch(function (err) {
				 return err.status;
			});
		},
		[CREAT_BANNER](context,payload){
			return Vue.http({
				method:'post',
				url:'http://10.253.106.182:8081/api/pvt/1.0.0/banners',
				body:{
				  imageCode:payload.imageCode,
				  imageLink:payload.imageLink,
				  imageOrder:payload.imageOrder,
				  imageUrl:payload.imageUrl,
				  name: payload.name,
				  type: payload.type
				},
				headers:{
					Authorization: JSON.parse(localStorage.accesstoken)
				}
			}).then((res) => {
				let data=res.data;
				if(data.code ==='0'){
					context.commit('CREAT_BANNER',data.content);
					return 'Success';
				}else if(data.code ==='400003'){
					alert("登陆超时。请重新登陆！")
					this.$router.replace({ path: '/login' })				
				}else{
					return 'Failure';
				}
			}).catch(function (err) {
				return err.status;
			})
		},
		[DELETE_BANNER](context,payload){
			console.log('Test:', payload+",context"+context);
			return Vue.http({
				method:'delete',
				url:'http://10.253.106.182:8081/api/pvt/1.0.0/banners/' + payload,
				path:{
					id:payload,
				},
				headers:{
					Authorization: JSON.parse(localStorage.accesstoken)
				}
			}).then((res) => {
				let data=res.data;
				if(data.code ==='0'){
					context.commit('DELETE_BANNER',data.content);
					return 'Success';
				}else if(data.code ==='400003'){
					alert("登陆超时。请重新登陆！")
					this.$router.replace({ path: '/login' })				
				}else{
					return 'Failure';
				}
			}).catch(function (err) {
				 return err.status;
			})
		},
		[MODIFY_BANNER](context,payload){
			console.log('Test11:', payload+",context"+context);
			return Vue.http({
				method:'patch',
				url:'http://10.253.106.182:8081/api/pvt/1.0.0/banners/' + payload.id,
				path:{
					id:payload.id,
				},
				body:{
				  imageCode:payload.imageCode,
				  imageLink:payload.imageLink,
				  imageOrder:payload.imageOrder,
				  imageUrl:payload.imageUrl,
				  name: payload.name,
				  type: payload.type
				},
				headers:{
					Authorization: JSON.parse(localStorage.accesstoken)
				}
			}).then((res) => {
				let data=res.data;
				if(data.code ==='0'){
					context.commit('MODIFY_BANNER',data.content);
					return 'Success';
				}else if(data.code ==='400003'){
					alert("登陆超时。请重新登陆！")
					this.$router.replace({ path: '/login' })				
				}else{
					return 'Failure';
				}
			}).catch(function (err) {
				 return err.status;
			})
		}

	},
}

/**
 * 获取cookie值
 * @param c_name
 * @returns {string}
 */
function getCookie(c_name)
{
    if (document.cookie.length>0)
    {

    var c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
        var  c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}