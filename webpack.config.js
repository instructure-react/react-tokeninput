/* eslint-disable */

module.exports = {
  entry: "./index.js",
  output: {
      library: "TokenInput",
    libraryTarget: "umd"
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
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules|example/,
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
};
