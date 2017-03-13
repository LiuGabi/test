import VueResource from 'vue-resource';
import Vue from 'vue';

Vue.use(VueResource);

let httpReq = (method, url, params, body, token) => {
    let setParams = params ? true : false;
    let setBody = body ? true : false;
    let setToken = token ? true : false;

    // token
    let accesstoken = localStorage.accesstoken ? JSON.parse(localStorage.accesstoken) : '';

    return Vue.http({
        method,
        url,
        params: setParams ? params : {},
        body: setBody ? body : {},
        headers: {
            Authorization: setToken ? accesstoken : ''
        }
    }).then((response) => {

        // 根据返回的 code 判断登陆是否登陆失效
        let code = typeof response.data == "object" ? response.data.code : JSON.parse(response.data).code;
        if (code == '400001' || code == '400002' || code == '400003' || code == '400004' || code == '400005' || code == '400006') {
            // 刷新当前页面
            window.location = window.location;
            // 清空 localStorage
            localStorage.removeItem('username');
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('permissions');
        }

        return response.json();
    }, (error) => {
        // api is not found
        return error.ok;
    }).then(data => {
        // network is wrong
        return data;
    });
};

export default httpReq;