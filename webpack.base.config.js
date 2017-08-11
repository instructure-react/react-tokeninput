'use strict';
/* eslint-env node */

/**
 * Webpack configuration base class
 */
const fs = require('fs');
const path = require('path');

const npmBase = path.join(__dirname, './node_modules');

class WebpackBaseConfig {
  constructor() {
    this._config = {};
  }

  /**
   * Get the list of included packages
   * @return {Array} List of included packages
   */
  get includedPackages() {
    return [].map((pkg) => fs.realpathSync(path.join(npmBase, pkg)));
  }

  /**
   * Set the config data.
   * This will always return a new config
   * @param {Object} data Keys to assign
   * @return {Object}
   */
  set config(data) {
    this._config = Object.assign({}, this.defaultSettings, data);
    return this._config;
  }

  /**
   * Get the global config
   * @return {Object} config Final webpack config
   */
  get config() {
    return this._config;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dev';
  }

  /**
   * Get the absolute path to src directory
   * @return {String}
   */
  get srcPathAbsolute() {
    return path.resolve('../src');
  }

  /**
   * Get the absolute path to tests directory
   * @return {String}
   */
  get testPathAbsolute() {
    return path.resolve('./test');
  }

  /**
   * Get the default settings
   * @return {Object}
   */
  get defaultSettings() {
    return {
      // context: this.srcPathAbsolute,
      devtool: 'eval',
      module: {
        loaders: [
          {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
        ]
      },
      output: {
        path: path.resolve('./example'),
        filename: '[name].js',
      },
      plugins: [],
    };
  }
}

module.exports = WebpackBaseConfig;
