'use strict';

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./webpack.base.config');
var path = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin');

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      devtool: 'cheap-module-source-map',
      devServer: {
        contentBase: path.join(__dirname, './example'),
        // contentBase: '../out',
        publicPath: '',
        historyApiFallback: true,
        hot: true,
        inline: true,
        overlay: true,
        port: 8000
      },
      entry: {
        example: path.resolve(__dirname, './src/example.js'),
        app: path.resolve(__dirname, './src/index.js'),
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new DashboardPlugin()
      ]
    };
  }
}

module.exports = WebpackDevConfig;
