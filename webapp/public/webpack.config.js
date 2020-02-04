const path = require('path');

//雪碧图
var SpritesmithPlugin = require('webpack-spritesmith');

//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//css生成新文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//入口配置
var entry = require('./entry');

module.exports = {
	entry: entry
	,output: {
		path: __dirname + '/dist',
		filename: '[name].js'
	}
	,module: {
		rules: [
			{
	            test: /\.art$/,
	            loader: "art-template-loader",
	            options: {
	            	htmlResourceRules: false,
	            	escape: false
	                // art-template options (if necessary)
	                // @see https://github.com/aui/art-template
	            }
	        }
			,{
		    	test: /\.js$/,
		    	exclude: /(node_modules|bower_components)/,
		    	use: {
			        loader: 'babel-loader',
			        options: {
			        	presets: ['@babel/preset-env'],
			        	//plugins: [require('@babel/plugin-proposal-object-rest-spread')]
			        	//plugins: ['@babel/plugin-transform-runtime']
			        }
		    	}
		    }
			,{
	        	test: /\.less$/,
	        	loader:ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
	        }
			/*,{
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 1
		            }
		          }
		        ]
		    }*/
			,{
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'file-loader',
		            options: {
		            	outputPath: 'img/',
		            	publicPath: '../../dist/img/'
		            }
		          }
		        ]
		    }
		    /*,{
		        test: /\.css$/,
		        use: [
		        	MiniCssExtractPlugin.loader,
		            "css-loader"
		        ]
		    }*/
	    ]
	}
	,resolve: {
		extensions: ['.js', '.jsx', '.less']
	}
	,plugins: [
		new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: path.resolve(__dirname, './src/img/sprite'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: path.resolve(__dirname, './dist/img/sprite/sprite.png'),
                css: path.resolve(__dirname, './src/css/sprite.css')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '/dist/img/sprite/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down'
            }
        })
	    /*,new MiniCssExtractPlugin({
	    	filename: "[name].css"
	    	,chunkFilename: "[id].css"
	    })*/
		,new ExtractTextPlugin("[name].css")
		,new OptimizeCssAssetsPlugin({
	        cssProcessor: require('cssnano'),
	        cssProcessorOptions: { discardComments: {removeAll: true } },
	        canPrint: true
		})
	],
};
