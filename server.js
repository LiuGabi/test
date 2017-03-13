const Webpack = require("webpack")
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require("./webpack.config")
const config = require('./config/')

var compiler = Webpack(webpackConfig)
var server = new WebpackDevServer(compiler, {
    publicPath: config.publicPath,
    stats: {
        colors: true //显示不同的颜色区分打包的文件
    },
    // contentBase: 'src/',
    // historyApiFallback: true,
    proxy: [{
        context: ['/api'],
        target: 'http://10.253.106.182:8081/',//开发环境 api 接口
        secure: false
    }, {
        context: ['/coccinterfaces'],
        target: 'http://115.159.104.208:80/',// 云牛开发 api 接口
        secure: false
    }]
})

server.listen(8089, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('http://localhost:8089' + config.publicPath)
})