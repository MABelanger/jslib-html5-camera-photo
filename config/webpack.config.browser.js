var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var createWebpackConfig = function(options) {
  return {
    entry: './src/lib/index.js',
    output: {
        filename:'jslib-html5-camera-photo.min.js',
        libraryTarget:'umd',
        umdNamedDefine: true,
        library: "JslibHtml5CameraPhoto",
        path: path.join(__dirname, '../', 'dist'),
    },
    module: {
      rules: [
        {
          test: /.js$/,
          include: path.join(__dirname, '../'),
          exclude: /node_modules/,
          loaders: 'babel-loader',
          query: {
            presets: [
              [ "babel-preset-env", {
                  modules: false,
                  targets: {
                    browsers: "since 2012"
                  }
                }
              ],
            ]
          }
        },
      ]
    },
    // this is for the sourcemaps
    devtool:'source-map', // you can also choose inline-source-map
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true,
        sourceMap: true
      })
    ]
  }
};

module.exports = createWebpackConfig;
