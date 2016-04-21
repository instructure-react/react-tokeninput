/* eslint-disable */

var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var cssnano = require("cssnano");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var assign = require("object-assign");

function WebPackConfig(babelExclude, webpackOptions) {
  if (typeof this === "undefined") {
    return new WebPackConfig(babelExclude, webpackOptions);
  }

  assign(this, {
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel",
          exclude: babelExclude,
          query: {
            presets: ["es2015", "react"]
          }
        },

        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin("[name].css")
    ],

    postcss: [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ],

    resolve: {
      extensions: ['', '.js', '.css'],
      root: [path.join(__dirname, "./lib")]
    }
  }, webpackOptions);

  if (webpackOptions && webpackOptions.optimize === true) {
    this.plugins.splice(0, 0, new webpack.optimize.UglifyJsPlugin());
    this.postcss.splice(0, 0, cssnano());
  }
}

module.exports = WebPackConfig;
