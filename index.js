/* eslint no-var:0 */

require('./lib/css/base.css');

var TokenInput = require('./lib/token-input').default;
TokenInput.Option = require('./lib/option').default;

module.exports = TokenInput;
