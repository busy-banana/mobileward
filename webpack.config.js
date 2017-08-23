// webpack.config.js
var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/app.js',
  	output: {
  		path: path.resolve(__dirname,'build'),
    	filename: 'bundle.js' ,
  	},
  	module: {
    	loaders: [
    		{
        		test: /\.js$/,
        		loader: 'babel-loader',
        		exclude: /node_modules/,
        		query: {
        			presets: ['es2015', 'react']
          		}
        	},
          	{
            	test: /\.css$/,
            	loader: 'style-loader!css-loader'
        	},
        	{
            	test: /\.(png|jpg)$/,
            	loader: 'url-loader'
        	}
    	]
  	},
//   plugins: [
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       }
// 	}),
// 	new webpack.DefinePlugin({
// 		"process.env": { 
// 		   NODE_ENV: JSON.stringify("production") 
// 		 }
// 	})
//   ]
}