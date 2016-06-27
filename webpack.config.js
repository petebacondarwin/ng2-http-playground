module.exports = {
  devtool: 'sourcemap',
  entry: [
    './src/app.ts'
  ],
  output: {
    path: './client',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
       { test: /\.js|ts$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: []
};