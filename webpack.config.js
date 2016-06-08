var LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
  entry: './app/js/index.ts',
  output: {
    filename: 'build/js/output_all.js'
  },
	devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
	plugins: [
    new LiveReloadPlugin({})
  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}