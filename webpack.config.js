module.exports = {
	entry: ['whatwg-fetch','./src/index.js'],
	output: {
		path: './js',
		filename: 'app.bundle.js'
	},
	module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
				presets: ['es2015', 'react']
			}
        }]
     }
};