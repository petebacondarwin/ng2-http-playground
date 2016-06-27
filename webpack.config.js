var webpack = require('webpack');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    './src/app.js'
  ],
  output: {
    path: './client',
    filename: 'app.js'
  },
  externals: {
    angular: 'angular'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
};