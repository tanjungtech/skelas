import path from 'path';
import webpack from 'webpack';

export default {
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '/client/index.jsx')
	],
	output: {
		filename: 'bundle.js',
		path: '/',
		publicPath: '/'
	},
	devServer: {
		historyApiFallback: {
		    index: '/',
		    rewrites: [
		        // shows favicon
		        { from: /favicon.ico/, to: '/public/favicons/favicon.ico' }
		    ]
		}
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				include: [
					path.join(__dirname, 'client'),
					path.join(__dirname, 'server/shared')
				],
				loader: [ 'react-hot-loader', 'babel-loader']
			},
			{
			    test: /\.(png|jpe?g|gif|svg)$/,
			    use: [
			      {
			        loader: 'file-loader',
			        options: {
			          // path where the images will be saved
			          name: path.join(__dirname, '/public/local/[name].[ext]')
			        }
			      },
			      {
			        loader: 'image-webpack-loader',
			        options: {
			          mozjpeg: {
			            quality: 65
			          },
			          pngquant:{
			            quality: "10-20",
			            speed: 4
			          },
			          svgo:{
			            plugins: [
			              {
			                removeViewBox: false
			              },
			              {
			                removeEmptyAttrs: false
			              }
			            ]
			          },
			          gifsicle: {
			            optimizationLevel: 7,
			            interlaced: false
			          },
			          optipng: {
			            optimizationLevel: 7,
			            interlaced: false
			          }
			        }
			      }
			    ]
			 }
		]
	},
	resolve: {
		extensions: [ ' ', '.js', '.jsx']
	}
}