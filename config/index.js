const path = require('path');

module.exports = {
	prod: {
		path: path.resolve(__dirname + '../src'),
		pabulicPath: '/src/',
		port: 80,
		proxy: [{
			context: ['/api'],
			target: 'http://139.224.94.110:80/',// 生产环境 api 接口
			secure: false
		}, {
			context: ['/coccinterfaces'],
			target: 'http://115.159.104.208:80/',// 云牛开发 api 接口
            secure: false
		}]
	},
	test: {
		path: path.resolve(__dirname + '../src'),
		pabulicPath: '/src/',
		port: 8089,
		proxy: [{
			context: ['/api'],
			target: 'http://10.253.106.182:8080/',// 测试环境 api 接口
			secure: false
		}, {
			context: ['/coccinterfaces'],
			target: 'http://115.159.104.208:80/',// 云牛开发 api 接口
            secure: false
		}]
	},
	dev: {
		path: path.resolve(__dirname + '../src'),
		pabulicPath: '/src/',
		port: 8081,
		proxy: [{
			context: ['/api'],
			target: 'http://10.253.106.182:8081/',//开发环境 api 接口
			secure: false
		}, {
			context: ['/coccinterfaces'],
			target: 'http://115.159.104.208:80/',// 云牛开发 api 接口
            secure: false
		}]
	}
}