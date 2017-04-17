import header from './header'
import sidebar from './sidebar'

const plugin = {	 
	header,
	sidebar,
}
const install = function (Vue) {
    Object.keys(plugin).forEach((key) => {
    	var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
        Vue.component(`m${name}`, plugin[key])
    });
};

module.exports = Object.assign(plugin, {install});