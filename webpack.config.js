module.exports = {
  entry: "./example/main.js",
  output: {
    filename: "./example/bundle.js"
  },
  debug: true,
  devtool: '#source-map',
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
