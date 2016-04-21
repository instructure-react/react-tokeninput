module.exports = {
  entry: {
    './example-bundle': './example/main.js'
  },
  output: {
    filename: "[name].js"
  },
  debug: true,
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|example/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  devServer: {
    contentBase: './'
  }
};

