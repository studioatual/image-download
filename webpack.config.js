const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-0']
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    extensions: ['*', '.js']
  },
  externals: {
    fs: "commonjs fs",
    path: "commonjs path",
    electron: "commonjs electron"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Simple Image Crop',
      template: 'src/index.html',
      filename: 'index.html'
    })
  ]
}
