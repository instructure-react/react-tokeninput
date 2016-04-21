/* eslint-disable */

module.exports = {
  entry: {
    "example-bundle": "./example/main.js"
  },
  output: {
    filename: "[name].js",
    publicPath: "/"
  },
  debug: true,
  devtool: "inline-source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },

  devServer: {
    contentBase: "./example"
  }
};
