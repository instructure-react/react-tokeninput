module.exports = {
  entry: "./example/main.js",
  output: {
    filename: "dist/main.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
