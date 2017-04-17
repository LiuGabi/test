const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.prod.config');
const config = require('../config/');

let compiler = webpack(webpackConfig);
let devServer = new webpackDevServer(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		chunks: true
	},
	contentBase: 'src/',
	historyApiFallback: true,
	proxy: config.prod.proxy
});

devServer.listen(config.prod.port, error => {
	if(error) {
		console.log(error);
		return;
	}
	console.log('http://localhost:' + config.prod.port);
});