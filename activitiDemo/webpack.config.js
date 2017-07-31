//webpack配置文件

var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
var ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
var MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
var BUILD_PATH = path.join(ROOT_PATH, './dist'); // 最后输出放置公共资源的目录

//用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var ExtractTextPlugin = require('extract-text-webpack-plugin');//帮助css单独打包
module.exports = {
    entry: [
       // 'webpack/hot/only-dev-server',
        './entry.js'
    ],
    output: {
        path: path.join(__dirname, "dist/"),
        publicPath:"/assets/",
        filename: 'bundle.js'
    },
    module: {
        rules: [
		        {
		            test : /\.css$/,
		           /*loader: ExtractTextPlugin.extract({//单独打包css
		                loader: 'css-loader'
		            })*/
		           loader:ExtractTextPlugin.extract({//单独打包css和less
						fallback:"style-loader",
						loader:"css-loader"
		           })

		        },
				{
					test: /\.less$/,
                    loader:ExtractTextPlugin.extract({//单独打包css和less
                        fallback:"style-loader",
                        loader:"css-loader!less-loader"
                    })

				},
		        { test: /\.js$/, loader: 'babel-loader',exclude: /node_modules/,query: {
		            presets: ['es2015']
		           }

		        },


	            {
	            	test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
					loader: 'file-loader',
                    query:{
                        name:"[name].[ext]?[hash]"//打包到指定目录下并命名
					}
				},
                {
			        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
			        loader: 'file-loader',
			        query: {
			          name: '[name].[ext]?[hash]'
			        }
			      }
                   
        ]
    },

    resolve:{
        extensions:['.css','.js',".vue"]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('styles.css'),//帮助css单独打包
        //new ExtractTextPlugin('./dist/[name].less')
        new webpack.DefinePlugin({ //可以用于在生成环境上改变某些url，只要页面中用到BASEURL的地方会被替换为production
            'BASEURL': JSON.stringify('production')
        })

    ]
	
};
