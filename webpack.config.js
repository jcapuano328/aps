var webpack = require('webpack');
var path = require('path');
var validate = require('webpack-validator');

var BUILD_DIR = path.resolve(__dirname, 'web/server/content/js');
var APP_DIR = path.resolve(__dirname, 'web/client');

var config = {
  entry: APP_DIR + '/main.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
  historyApiFallback: true,
  hot: true,
  inline: true,
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
  plugins: [
    new webpack.HotModuleReplacementPlugin({multiStep: true}),
  ],
  postcss() {
    return [require('autoprefixer')];
  }
};

module.exports = validate(config);
