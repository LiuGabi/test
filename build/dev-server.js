const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.dev.config');
const config = require('../config/');

webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");

let compiler = webpack(webpackConfig);
let devServer = new webpackDevServer(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		chunks: true
	},
	contentBase: 'src/',
	hot: true,
	historyApiFallback: true,
	proxy: config.dev.proxy
});

devServer.listen(config.dev.port, error => {
	if(error) {
		console.log(error);
		return;
	}
	console.log('http://localhost:' + config.dev.port);
});