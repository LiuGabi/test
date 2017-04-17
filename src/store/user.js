import {SIGNIN, SIGNOUT,MODIFY_PASSWORD} from './types'
import Vue from 'vue'


export default {
    state: {
        permissions: []
    },
    mutations: {
        [SIGNIN] (state, data) {
            localStorage.setItem('permissions', JSON.stringify(data));
        }
    },
    actions: {
        [SIGNIN](context, payload) {

              return  Vue.http({
                    method: 'post',
                    // url: 'http://10.253.106.182:8080/api/pub/1.0.0/admin/token',//测试环境
                    url: 'http://10.253.106.182:8081/api/pub/1.0.0/admin/token',//开发环境
                    params: {
                        user: payload.username,
                        password: payload.password
                    },
                }).then(response => {
                    return response.json();
                }, error => {
                    return error.ok;
                }).then(data => {
                    console.log(data)
                    if (data) {
                        if (data.code == '0') {
                            console.log(data)
                            let accesstoken = data.content.tokenType +' '+ data.content.token;
                            localStorage.setItem('username', JSON.stringify(data.content.params.userName));
                            localStorage.setItem('accesstoken', JSON.stringify(accesstoken));
                            setCookie("token",accesstoken,2*60*60*1000);
                            // console.log(setCookie("token",accesstoken,2*60*60*1000))
                            console.log(getCookie('token'));
                            context.commit('SIGNIN', data.content.params.permissions);

                            return 'Success';
                        } else{
                            return data.error.message ? data.error.message: '不可名的错误 =。=';
                        }
                    } else {
                        return '网络或资源路径错误~~~';
                    }
                });
        },
        [SIGNOUT]() {
            localStorage.removeItem('username');
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('permissions');
        },
        [MODIFY_PASSWORD](context,payload){
            console.log("password"+payload)
            return Vue.http({
                method:'PATCH',
                url:'http://118.178.247.240:6161/api/pvt/1.0.0/admin/password',
                body:{
                  newPassword: payload.newPassword,
                  originPassword: payload.originPassword
                },
                headers:{
                    Authorization: JSON.parse(localStorage.accesstoken)
                }
            }).then((res) => {
                let data =res.data;
                if(data.code ==='0') {
                    context.commit('MODIFY_PASSWORD', data.content);
                    return 'Success';
                }else{
                    return 'Failure';
                }
            }).catch(function (err) {
                 return err.status;
            });
        }
    }
}

/**
 * 设置cookie值
 * @param c_name  cookie名称
 * @param value cookie值
 * @param expiredays cookie有效值
 */
function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
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