var path = require('path');
var webpack = require('webpack');
// 编译后自动打开浏览器
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
// 产出html模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 单独样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');
var http = path.resolve(__dirname, 'app/fetch/http.js');
/**
 * 标识开发环境和生产环境
 * @type {webpack.DefinePlugin}
 */
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var values = require('postcss-modules-values');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './build',
    port: 3003,
    stats: { colors: true }
  },
  entry: {
    index: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:3003',
      path.resolve(__dirname, 'app/index.js')
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js",
    publicPath: '/'
  },
  resolve: {
    extension: ['', '.jsx', '.js', '.json'],
    // 提高webpack搜索的速度
    alias: {}
  },
  devtool: 'source-map',
  'display-error-details': true,
  // 使用externals可以将react分离，然后用<script>单独将react引入
  externals: [],
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime', 'transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react'],
        }
      },
     {
        test: /\.css/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract("style-loader", 'css-loader?modules&localIdentName=[name]__[local]!less!postcss-loader?sourceMap=true')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.eot/, loader: 'file?prefix=font/'
      },
      {
        test: /\.woff/, loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf/, loader: 'file?prefix=font/'
      },
      {
        test: /\.svg/, loader: 'file?prefix=font/'
      }
    ]
  },
  postcss: [
    values
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new HtmlWebpackPlugin({
      title: 'apm',
      template: './app/index.html',
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:3003' }),
    new ExtractTextPlugin("main.css", {
      allChunks: true,
      disable: false
    }),
    new webpack.ProvidePlugin({
      'APM_moment': 'moment',
      'IM': 'immutable',
      '_': 'lodash',
      'http': http
    }),
  ]
};
