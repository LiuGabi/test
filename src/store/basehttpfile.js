import VueResource from 'vue-resource';
import Vue from 'vue';

Vue.use(VueResource);

let httpReq = (method, url, params, body, token, accept) => {
    let setParams = params ? true : false;
    let setBody = body ? true : false;
    let setToken = token ? true : false;
    let setAccept = accept ? true: false;

    // token
    let accesstoken = localStorage.accesstoken ? JSON.parse(localStorage.accesstoken) : '';

    return Vue.http({
        method,
        url,
        params: setParams ? params : {},
        body: setBody ? body : {},
        headers: {
            Authorization: setToken ? accesstoken : '',
            Accept: setAccept ? accept : 'application/json, text/plain, */*'
        }
    }).then((response) => {

        let headers = response.headers.map;
        let filename = JSON.parse((headers['content-disposition'][0] || '').split('filename=')[1]);

        let blob = new Blob([response.data], {type:headers['content-type']});
        let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);

            link.download = filename;
            link.click();
        
        return response.ok;
    }, (error) => {
        // api is not found
        return error.ok;
    }).then(data => {
        // network is wrong
        return data;
    });
};

export default httpReq;