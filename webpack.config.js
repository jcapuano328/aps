var webpack = require('webpack');
var path = require('path');
var validate = require('webpack-validator');

var CONTENT_DIR = path.resolve(__dirname, 'web/server/content');
var BUILD_DIR = path.join(CONTENT_DIR, 'js');
var APP_DIR = path.resolve(__dirname, 'web/client');

var config = {
  entry: [
      APP_DIR + '/main.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    historyApiFallback: true,
    contentBase: [
        CONTENT_DIR
    ]
    //stats: 'errors-only',
 },
 watchOptions: {
   // Delay the rebuild after the first change
   aggregateTimeout: 300,
   // Poll using interval (in ms, accepts boolean too)
   poll: 1000
 },
 module : {
   preLoaders: [
     { test: /\.json$/, loader: 'json'},
   ],
   loaders : [
     {
         test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
         loader: "url-loader?limit=10000&mimetype=application/font-woff"
     },
     {
         test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
         loader: "file-loader"
     },
     {
       test: /\.css$/,
       loaders: ['style', 'css'],
       include: APP_DIR
     },
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  resolve: {
    root: [
      APP_DIR
    ],
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx']
  },
  postcss() {
    return [require('autoprefixer')];
  }
};

module.exports = validate(config);
