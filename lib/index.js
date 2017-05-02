'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = exports.Option = exports.Combobox = undefined;

var _combobox = require('./combobox');

var _combobox2 = _interopRequireDefault(_combobox);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

var _token = require('./token');

var _token2 = _interopRequireDefault(_token);

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Combobox = _combobox2.default;
exports.Option = _option2.default;
exports.Token = _token2.default;


/**
 * You can't do an import and then immediately export it :(
 * And `export default TokenInput from './main'` doesn't seem to
 * work either :(
 * So this little variable swapping stuff gets it to work.
 */
var TokenInput = _main2.default;
exports.default = TokenInput;