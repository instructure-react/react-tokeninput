/* eslint-disable */

var path = require("path");
var WebPackConfig = require("./webpack.base.config");

module.exports = new WebPackConfig(/node_modules/, {
  entry: {
    'react-tokeninput': ['./index'],
    'themes/default': ['./css-default-theme'],
    'example-bundle': "./example/main.js"
  },
  output: {
    library: "TokenInput",
    libraryTarget: "umd",
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    publicPath: "/"
  },

  debug: true,

  devtool: "inline-source-map",

  devServer: {
    contentBase: "./example"
  }
});
