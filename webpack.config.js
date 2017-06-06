// webpack.config.js
var path = require('path');

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
  	}
}