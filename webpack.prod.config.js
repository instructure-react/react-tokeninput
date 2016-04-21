/* eslint-disable */

var path = require("path");
var WebPackConfig = require("./webpack.base.config");

module.exports = new WebPackConfig(/node_modules|example/, {
  entry: {
    'react-tokeninput.min': ['./index'],
    'themes/default.min': ['./css-default-theme']
  },
  output: {
    library: "TokenInput",
    libraryTarget: "umd",
    filename: "[name].js",
    path: path.join(__dirname, "./dist")
  },

  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      },

      "classnames": true
    }
  ],

  debug: true,

  devtool: "source-map",

  optimize: true
});
