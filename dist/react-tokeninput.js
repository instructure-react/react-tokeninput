(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "classnames"], factory);
	else if(typeof exports === 'object')
		exports["TokenInput"] = factory(require("react"), require("classnames"));
	else
		root["TokenInput"] = factory(root["React"], root["classnames"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* eslint no-var:0 */
	
	__webpack_require__(2);
	
	var TokenInput = __webpack_require__(6).default;
	TokenInput.Option = __webpack_require__(10).default;
	
	module.exports = TokenInput;

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _combobox = __webpack_require__(8);
	
	var _combobox2 = _interopRequireDefault(_combobox);
	
	var _token = __webpack_require__(11);
	
	var _token2 = _interopRequireDefault(_token);
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TokenInput = function (_React$Component) {
	  _inherits(TokenInput, _React$Component);
	
	  function TokenInput(props, context) {
	    _classCallCheck(this, TokenInput);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TokenInput).call(this, props, context));
	
	    _this.handleClick = _this.handleClick.bind(_this);
	    _this.handleInput = _this.handleInput.bind(_this);
	    _this.handleRemove = _this.handleRemove.bind(_this);
	    _this.handleRemoveLast = _this.handleRemoveLast.bind(_this);
	    _this.handleSelect = _this.handleSelect.bind(_this);
	
	    _this.state = {
	      selectedToken: null
	    };
	    return _this;
	  }
	
	  _createClass(TokenInput, [{
	    key: 'handleClick',
	    value: function handleClick() {
	      // TODO: Expand combobox API for focus
	      this.refs['combo-li'].querySelector('input').focus();
	    }
	  }, {
	    key: 'handleInput',
	    value: function handleInput(inputValue) {
	      this.props.onInput(inputValue);
	    }
	  }, {
	    key: 'handleSelect',
	    value: function handleSelect(event) {
	      var input = this.refs['combo-li'].querySelector('input');
	      this.props.onSelect(event);
	      this.setState({
	        selectedToken: null
	      });
	      this.props.onInput(input.value);
	    }
	  }, {
	    key: 'handleRemove',
	    value: function handleRemove(value) {
	      var input = this.refs['combo-li'].querySelector('input');
	      this.props.onRemove(value);
	      input.focus();
	    }
	  }, {
	    key: 'handleRemoveLast',
	    value: function handleRemoveLast() {
	      this.props.onRemove(this.props.selected[this.props.selected.length - 1]);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var isDisabled = this.props.isDisabled;
	
	
	      var tokens = this.props.selected.map(function (token) {
	        return _react2.default.createElement(_token2.default, {
	          onRemove: _this2.handleRemove,
	          value: token,
	          name: token.name,
	          key: token.id
	        });
	      });
	
	      var classes = (0, _classnames2.default)('ic-tokens ic-tokeninput-flex', {
	        'ic-tokens-disabled': isDisabled
	      });
	
	      var loadingWidget = this.props.isLoading && _react2.default.createElement(
	        'li',
	        { className: 'ic-tokeninput-loading ic-tokeninput-flex' },
	        this.props.loadingComponent
	      );
	
	      return _react2.default.createElement(
	        'ul',
	        { className: classes, onClick: this.handleClick },
	        tokens,
	        _react2.default.createElement(
	          'li',
	          { className: 'ic-tokeninput-inline-flex', ref: 'combo-li' },
	          _react2.default.createElement(
	            _combobox2.default,
	            {
	              id: this.props.id,
	              ariaLabel: this.props.ariaLabel,
	              ariaDisabled: isDisabled,
	              onInput: this.handleInput,
	              showListOnFocus: this.props.showListOnFocus,
	              onSelect: this.handleSelect,
	              onRemoveLast: this.handleRemoveLast,
	              value: this.state.selectedToken,
	              isDisabled: isDisabled,
	              placeholder: this.props.placeholder
	            },
	            this.props.menuContent
	          )
	        ),
	        loadingWidget
	      );
	    }
	  }]);
	
	  return TokenInput;
	}(_react2.default.Component);
	
	exports.default = TokenInput;
	
	
	TokenInput.propTypes = {
	  isLoading: _react2.default.PropTypes.bool,
	  loadingComponent: _react2.default.PropTypes.any,
	  onInput: _react2.default.PropTypes.func,
	  onSelect: _react2.default.PropTypes.func.isRequired,
	  onRemove: _react2.default.PropTypes.func.isRequired,
	  selected: _react2.default.PropTypes.array.isRequired,
	  menuContent: _react2.default.PropTypes.any,
	  showListOnFocus: _react2.default.PropTypes.bool,
	  placeholder: _react2.default.PropTypes.string,
	  isDisabled: _react2.default.PropTypes.bool,
	  ariaLabel: _react2.default.PropTypes.string,
	  id: _react2.default.PropTypes.string
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inputKeydownMap;
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _option = __webpack_require__(10);
	
	var _option2 = _interopRequireDefault(_option);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var guid = 0;
	
	var K_BACKSPACE = 8;
	
	function emptyFunction() {}
	
	var KEYDOWN_MAPS = {
	  inputKeydownMap: (_inputKeydownMap = {}, _defineProperty(_inputKeydownMap, K_BACKSPACE, 'removeLastToken'), _defineProperty(_inputKeydownMap, 13, 'selectOnEnter'), _defineProperty(_inputKeydownMap, 27, 'hideOnEscape'), _defineProperty(_inputKeydownMap, 38, 'focusPrevious'), _defineProperty(_inputKeydownMap, 40, 'focusNext'), _inputKeydownMap),
	
	  optionKeydownMap: {
	    13: 'selectOption',
	    27: 'hideOnEscape',
	    38: 'focusPrevious',
	    40: 'focusNext'
	  }
	};
	
	var ComboBox = function (_React$Component) {
	  _inherits(ComboBox, _React$Component);
	
	  function ComboBox(props, context) {
	    _classCallCheck(this, ComboBox);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ComboBox).call(this, props, context));
	
	    _this.focusOption = _this.focusOption.bind(_this);
	    _this.handleButtonClick = _this.handleButtonClick.bind(_this);
	    _this.handleInputBlur = _this.handleInputBlur.bind(_this);
	    _this.handleInputChange = _this.handleInputChange.bind(_this);
	    _this.handleInputClick = _this.handleInputClick.bind(_this);
	    _this.handleInputFocus = _this.handleInputFocus.bind(_this);
	    _this.handleInputKeyUp = _this.handleInputKeyUp.bind(_this);
	    _this.handleKeydown = _this.handleKeydown.bind(_this);
	    _this.handleOptionBlur = _this.handleOptionBlur.bind(_this);
	    _this.handleOptionFocus = _this.handleOptionFocus.bind(_this);
	    _this.handleOptionKeyDown = _this.handleOptionKeyDown.bind(_this);
	    _this.handleOptionMouseEnter = _this.handleOptionMouseEnter.bind(_this);
	    _this.hideList = _this.hideList.bind(_this);
	    _this.selectOption = _this.selectOption.bind(_this);
	
	    _this.state = {
	      value: props.value,
	      // the value displayed in the input
	      inputValue: _this.findInitialInputValue(),
	      isOpen: false,
	      focusedIndex: null,
	      matchedAutocompleteOption: null,
	      // this prevents crazy jumpiness since we focus options on mouseenter
	      usingKeyboard: false,
	      activedescendant: null,
	      listId: 'ic-tokeninput-list-' + ++guid,
	      menu: {
	        children: [],
	        activedescendant: null,
	        isEmpty: true
	      }
	    };
	    return _this;
	  }
	
	  _createClass(ComboBox, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({ menu: this.makeMenu(this.props.children) });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      var _this2 = this;
	
	      this.setState({ menu: this.makeMenu(newProps.children) }, function () {
	        if (newProps.children.length && (_this2.isOpen || document.activeElement === _this2.refs.input)) {
	          if (!_this2.state.menu.children.length) {
	            return;
	          }
	          _this2.setState({ isOpen: true }, function () {
	            _this2.refs.list.scrollTop = 0;
	          });
	        } else {
	          _this2.hideList();
	        }
	      });
	    }
	  }, {
	    key: 'getClassName',
	    value: function getClassName() {
	      return (0, _classnames2.default)(this.props.className, 'ic-tokeninput', {
	        'ic-tokeninput-is-open': this.state.isOpen
	      });
	    }
	
	    /**
	     * We don't create the <ComboboxOption> components, the user supplies them,
	     * so before rendering we attach handlers to facilitate communication from
	     * the ComboboxOption to the Combobox.
	    */
	
	  }, {
	    key: 'makeMenu',
	    value: function makeMenu(children) {
	      var _this3 = this;
	
	      var activedescendant = void 0;
	      var isEmpty = true;
	
	      // Should this instead use React.addons.cloneWithProps or React.cloneElement?
	      var _children = _react2.default.Children.map(children, function (child, index) {
	        // console.log(child.type, ComboboxOption.type)
	        if (child.type !== _option2.default) {
	          // allow random elements to live in this list
	          return child;
	        }
	        isEmpty = false;
	        // TODO: cloneWithProps and map instead of altering the children in-place
	        var props = child.props;
	
	        var newProps = {
	          onBlur: _this3.handleOptionBlur,
	          onClick: _this3.selectOption.bind(_this3, child),
	          onFocus: _this3.handleOptionFocus,
	          onKeyDown: _this3.handleOptionKeyDown.bind(_this3, child),
	          onMouseEnter: _this3.handleOptionMouseEnter.bind(_this3, index),
	          isSelected: _this3.state.value === props.value
	        };
	
	        if (_this3.state.value === props.value) {
	          // need an ID for WAI-ARIA
	          newProps.id = props.id || 'ic-tokeninput-selected-' + ++guid;
	          activedescendant = props.id;
	        }
	
	        return _react2.default.cloneElement(child, newProps);
	      });
	
	      return {
	        children: _children,
	        activedescendant: activedescendant,
	        isEmpty: isEmpty
	      };
	    }
	
	    /**
	     * When the user begins typing again we need to clear out any state that has
	     * to do with an existing or potential selection.
	    */
	
	  }, {
	    key: 'clearSelectedState',
	    value: function clearSelectedState(cb) {
	      this.setState({
	        focusedIndex: null,
	        inputValue: null,
	        value: null,
	        matchedAutocompleteOption: null,
	        activedescendant: null
	      }, cb);
	    }
	  }, {
	    key: 'handleInputChange',
	    value: function handleInputChange() {
	      var _this4 = this;
	
	      var value = this.refs.input.value;
	
	      this.clearSelectedState(function () {
	        _this4.props.onInput(value);
	      });
	    }
	  }, {
	    key: 'handleInputFocus',
	    value: function handleInputFocus() {
	      this.maybeShowList();
	    }
	  }, {
	    key: 'handleInputClick',
	    value: function handleInputClick() {
	      this.maybeShowList();
	    }
	  }, {
	    key: 'maybeShowList',
	    value: function maybeShowList() {
	      if (this.props.showListOnFocus) {
	        this.showList();
	      }
	    }
	  }, {
	    key: 'handleInputBlur',
	    value: function handleInputBlur() {
	      var focusedAnOption = this.state.focusedIndex !== null && this.state.focusedIndex !== undefined;
	      if (focusedAnOption) {
	        return;
	      }
	      this.maybeSelectAutocompletedOption();
	      this.hideList();
	    }
	  }, {
	    key: 'handleOptionBlur',
	    value: function handleOptionBlur() {
	      // don't want to hide the list if we focused another option
	      this.blurTimer = setTimeout(this.hideList, 0);
	    }
	  }, {
	    key: 'handleOptionFocus',
	    value: function handleOptionFocus() {
	      // see `handleOptionBlur`
	      clearTimeout(this.blurTimer);
	    }
	  }, {
	    key: 'handleInputKeyUp',
	    value: function handleInputKeyUp(event) {
	      if (this.state.menu.isEmpty
	      // autocompleting while backspacing feels super weird, so let's not
	       || event.keyCode === K_BACKSPACE || !this.props.autocomplete.match(/both|inline/)) return;
	    }
	  }, {
	    key: 'handleButtonClick',
	    value: function handleButtonClick() {
	      if (this.state.isOpen) {
	        this.hideList();
	      } else {
	        this.showList();
	      }
	      this.focusInput();
	    }
	  }, {
	    key: 'showList',
	    value: function showList() {
	      if (!this.state.menu.children.length) {
	        return;
	      }
	      this.setState({ isOpen: true });
	    }
	  }, {
	    key: 'hideList',
	    value: function hideList() {
	      this.setState({
	        isOpen: false,
	        focusedIndex: null
	      });
	    }
	  }, {
	    key: 'hideOnEscape',
	    value: function hideOnEscape(event) {
	      this.hideList();
	      this.focusInput();
	      event.preventDefault();
	    }
	  }, {
	    key: 'focusInput',
	    value: function focusInput() {
	      this.refs.input.focus();
	    }
	  }, {
	    key: 'selectInput',
	    value: function selectInput() {
	      this.refs.input.select();
	    }
	  }, {
	    key: 'handleKeydown',
	    value: function handleKeydown(event) {
	      var handlerName = KEYDOWN_MAPS.inputKeydownMap[event.keyCode];
	      if (!handlerName) {
	        return null;
	      }
	      this.setState({ usingKeyboard: true });
	      return this[handlerName].call(this, event);
	    }
	  }, {
	    key: 'handleOptionKeyDown',
	    value: function handleOptionKeyDown(child, event) {
	      var handlerName = KEYDOWN_MAPS.optionKeydownMap[event.keyCode];
	      if (!handlerName) {
	        // if the user starts typing again while focused on an option, move focus
	        // to the inpute, select so it wipes out any existing value
	        this.selectInput();
	        return;
	      }
	      event.preventDefault();
	      this.setState({ usingKeyboard: true });
	      this[handlerName].call(this, child);
	    }
	  }, {
	    key: 'handleOptionMouseEnter',
	    value: function handleOptionMouseEnter(index) {
	      if (this.state.usingKeyboard) {
	        this.setState({ usingKeyboard: false });
	      } else {
	        this.focusOptionAtIndex(index);
	      }
	    }
	  }, {
	    key: 'selectOnEnter',
	    value: function selectOnEnter(event) {
	      event.preventDefault();
	      this.maybeSelectAutocompletedOption();
	    }
	  }, {
	    key: 'maybeSelectAutocompletedOption',
	    value: function maybeSelectAutocompletedOption() {
	      if (!this.state.matchedAutocompleteOption) {
	        this.selectText();
	      } else {
	        this.selectOption(this.state.matchedAutocompleteOption, { focus: false });
	      }
	    }
	  }, {
	    key: 'selectOption',
	    value: function selectOption(child) {
	      var _this5 = this;
	
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      this.setState({
	        // value: child.props.value,
	        // inputValue: getLabel(child),
	        matchedAutocompleteOption: null
	      }, function () {
	        _this5.props.onSelect(child.props.value, child);
	        _this5.hideList();
	        _this5.clearSelectedState(); // added
	        if (options.focus !== false) {
	          _this5.selectInput();
	        }
	      });
	      this.refs.input.value = ''; // added
	    }
	  }, {
	    key: 'selectText',
	    value: function selectText() {
	      var value = this.refs.input.value;
	      if (!value) {
	        return;
	      }
	      this.props.onSelect(value);
	      this.clearSelectedState();
	      this.refs.input.value = ''; // added
	    }
	  }, {
	    key: 'focusNext',
	    value: function focusNext(event) {
	      if (event.preventDefault) {
	        event.preventDefault();
	      }
	
	      if (this.state.menu.isEmpty) {
	        return;
	      }
	
	      var index = this.state.focusedIndex === null ? 0 : this.state.focusedIndex + 1;
	      this.focusOptionAtIndex(index);
	    }
	  }, {
	    key: 'removeLastToken',
	    value: function removeLastToken() {
	      if (this.props.onRemoveLast && !this.refs.input.value) {
	        this.props.onRemoveLast();
	      }
	      return true;
	    }
	  }, {
	    key: 'focusPrevious',
	    value: function focusPrevious(event) {
	      if (event.preventDefault) event.preventDefault();
	      if (this.state.menu.isEmpty) return;
	      var last = this.props.children.length - 1;
	      var index = this.state.focusedIndex === null ? last : this.state.focusedIndex - 1;
	      this.focusOptionAtIndex(index);
	    }
	  }, {
	    key: 'focusSelectedOption',
	    value: function focusSelectedOption() {
	      var _this6 = this;
	
	      var selectedIndex = void 0;
	      _react2.default.Children.forEach(this.props.children, function (child, index) {
	        if (child.props.value === _this6.state.value) {
	          selectedIndex = index;
	        }
	      });
	      this.showList();
	      this.setState({
	        focusedIndex: selectedIndex
	      }, this.focusOption);
	    }
	  }, {
	    key: 'findInitialInputValue',
	    value: function findInitialInputValue() {
	      var _this7 = this;
	
	      // TODO: might not need this, we should know this in `makeMenu`
	      var inputValue = void 0;
	      _react2.default.Children.forEach(this.props.children, function (child) {
	        if (child.props.value === _this7.props.value) {
	          inputValue = child.props.label || child.props.children;
	        }
	      });
	      return inputValue;
	    }
	  }, {
	    key: 'focusOptionAtIndex',
	    value: function focusOptionAtIndex(index) {
	      var focusedIndex = index;
	      if (!this.state.isOpen && this.state.value) {
	        this.focusSelectedOption();
	        return;
	      }
	
	      this.showList();
	      var length = this.props.children.length;
	
	
	      if (focusedIndex === -1) {
	        focusedIndex = length - 1;
	      } else if (index === length) {
	        focusedIndex = 0;
	      }
	      this.setState({ focusedIndex: focusedIndex }, this.focusOption);
	    }
	  }, {
	    key: 'focusOption',
	    value: function focusOption() {
	      var index = this.state.focusedIndex;
	      this.refs.list.childNodes[index].focus();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var ariaLabel = this.props.ariaLabel || 'Start typing to search. ' + 'Press the down arrow to navigate results. If you don\'t find an ' + 'acceptable option, you can enter an alternative.';
	
	      return _react2.default.createElement(
	        'div',
	        { className: this.getClassName() },
	        this.props.value,
	        this.state.inputValue,
	        _react2.default.createElement('input', {
	          ref: 'input',
	          autoComplete: 'off',
	          spellCheck: 'false',
	          ariaLabel: ariaLabel,
	          ariaExpanded: '' + this.state.isOpen,
	          ariaHaspopup: 'true',
	          ariaActivedescendant: this.state.menu.activedescendant,
	          ariaAutocomplete: 'list',
	          ariaOwns: this.state.listId,
	          id: this.props.id,
	          disabled: this.props.isDisabled,
	          className: 'ic-tokeninput-input',
	          onFocus: this.handleInputFocus,
	          onClick: this.handleInputClick,
	          onChange: this.handleInputChange,
	          onBlur: this.handleInputBlur,
	          onKeyDown: this.handleKeydown,
	          onKeyUp: this.handleInputKeyUp,
	          placeholder: this.props.placeholder,
	          role: 'combobox'
	        }),
	        _react2.default.createElement(
	          'span',
	          {
	            ariaHidden: 'true',
	            className: 'ic-tokeninput-button',
	            onClick: this.handleButtonClick
	          },
	          '▾'
	        ),
	        _react2.default.createElement(
	          'div',
	          {
	            id: this.state.listId,
	            ref: 'list',
	            className: 'ic-tokeninput-list',
	            role: 'listbox'
	          },
	          this.state.menu.children
	        )
	      );
	    }
	  }]);
	
	  return ComboBox;
	}(_react2.default.Component);
	
	exports.default = ComboBox;
	
	
	ComboBox.defaultProps = {
	  autocomplete: 'both',
	  onInput: emptyFunction,
	  onSelect: emptyFunction,
	  value: null,
	  showListOnFocus: false
	};
	
	ComboBox.propTypes = {
	  /**
	   * Called when the combobox receives user input, this is your chance to
	   * filter the data and rerender the options.
	   *
	   * Signature:
	   *
	   * ```js
	   * function(userInput){}
	   * ```
	  */
	  onInput: _react2.default.PropTypes.func,
	
	  /**
	   * Called when the combobox receives a selection. You probably want to reset
	   * the options to the full list at this point.
	   *
	   * Signature:
	   *
	   * ```js
	   * function(selectedValue){}
	   * ```
	  */
	  onSelect: _react2.default.PropTypes.func,
	
	  /**
	   * Shown when the combobox is empty.
	  */
	  placeholder: _react2.default.PropTypes.string,
	
	  value: _react2.default.PropTypes.any,
	  children: _react2.default.PropTypes.node,
	  isDisabled: _react2.default.PropTypes.bool,
	  id: _react2.default.PropTypes.string,
	  className: _react2.default.PropTypes.string,
	  ariaLabel: _react2.default.PropTypes.string,
	  onRemoveLast: _react2.default.PropTypes.func,
	  autocomplete: _react2.default.PropTypes.string,
	  showListOnFocus: _react2.default.PropTypes.bool
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = TokenInputOption;
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(9);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function TokenInputOption(props) {
	  var className = props.className;
	  var isSelected = props.isSelected;
	
	  var divProps = {};
	
	  for (var prop in props) {
	    if (!props.hasOwnProperty(prop)) {
	      continue;
	    }
	
	    if (prop !== 'className' && prop !== 'aiaSelected') {
	      divProps[prop] = props[prop];
	    }
	  }
	
	  var divClassName = (0, _classnames2.default)(className, 'ic-tokeninput-selected', {
	    'ic-tokeninput-selected': isSelected
	  });
	  return _react2.default.createElement('div', _extends({ ariaSelected: isSelected, className: divClassName }, divProps));
	}
	
	TokenInputOption.propTypes = {
	  /**
	   * The value that will be sent to the `onSelect` handler of the
	   * parent Combobox.
	  */
	  value: _react2.default.PropTypes.any.isRequired,
	
	  /**
	   * What value to put into the input element when this option is
	   * selected, defaults to its children coerced to a string.
	  */
	  label: _react2.default.PropTypes.string,
	
	  className: _react2.default.PropTypes.string,
	  isSelected: _react2.default.PropTypes.bool
	};
	
	TokenInputOption.defaultProps = {
	  role: 'option',
	  tabIndex: '-1',
	  className: 'ic-tokeninput-option',
	  isSelected: false
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Token;
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var K_ENTER = 13;
	
	function handleClick(onRemove, value) {
	  if (typeof onRemove === 'function') {
	    onRemove(value);
	  }
	}
	
	function handleKeyDown(onRemove, value, event) {
	  if (event.keyCode === K_ENTER && typeof onRemove === 'function') {
	    onRemove(value);
	  }
	}
	
	function Token(_ref) {
	  var name = _ref.name;
	  var value = _ref.value;
	  var onRemove = _ref.onRemove;
	
	  var clickHandler = handleClick.bind(this, onRemove, value);
	  var keyDownHandler = handleKeyDown.bind(this, onRemove, value);
	
	  return _react2.default.createElement(
	    'li',
	    { className: 'ic-token ic-tokeninput-inline-flex' },
	    _react2.default.createElement(
	      'span',
	      {
	        role: 'button',
	        onClick: clickHandler,
	        onKeyDown: keyDownHandler,
	        ariaLabel: 'Remove \'' + name + '\'',
	        className: 'ic-token-delete-button',
	        tabIndex: '0'
	      },
	      '✕'
	    ),
	    _react2.default.createElement(
	      'span',
	      null,
	      name
	    )
	  );
	}
	
	Token.propTypes = {
	  name: _react2.default.PropTypes.string,
	  value: _react2.default.PropTypes.any,
	  onRemove: _react2.default.PropTypes.func
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-tokeninput.js.map