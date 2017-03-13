const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config/');

module.exports = {
	entry: {
		app: [
			'./src/app'
		],
		vendors: ['vue', 'vue-router']
	},
	output: {
		path: config.dev.path,
		publicPath: config.dev.pabulicPath,
		filename: '[name].js',
		chunkFilename: '[name].chunk.js'
	},
	module: {
		loaders: [
			{ test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /^node_modules$/ },
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192'},
            { test: /\.(html|tpl)$/, loader: 'html-loader' }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("[name].css",{ allChunks : true,resolve : ['modules'] }),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
	],
	vue: {
		loaders: {
            css: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader?sourceMap",
                {
                    publicPath: config.root + config.test.pabulicPath
                }
            ),
            less: ExtractTextPlugin.extract(
                'vue-style-loader',
                'css-loader!less-loader'
            ),
            js: 'babel'
        }
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		alias: {
			vue: 'vue/dist/vue.js'
		}
	}
};