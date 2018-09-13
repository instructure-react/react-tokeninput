(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react"], factory);
	else if(typeof exports === 'object')
		exports["TokenInput"] = factory(require("prop-types"), require("react"));
	else
		root["TokenInput"] = factory(root["prop-types"], root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Token = exports.Option = exports.Combobox = undefined;
	
	var _combobox = __webpack_require__(1);
	
	var _combobox2 = _interopRequireDefault(_combobox);
	
	var _option = __webpack_require__(5);
	
	var _option2 = _interopRequireDefault(_option);
	
	var _token = __webpack_require__(6);
	
	var _token2 = _interopRequireDefault(_token);
	
	var _main = __webpack_require__(7);
	
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PropTypes = __webpack_require__(2);
	var React = __webpack_require__(3);
	var guid = 0;
	var k = function k() {};
	var addClass = __webpack_require__(4);
	var ComboboxOption = __webpack_require__(5);
	
	var Combobox = function (_React$Component) {
	  _inherits(Combobox, _React$Component);
	
	  function Combobox() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Combobox);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Combobox.__proto__ || Object.getPrototypeOf(Combobox)).call.apply(_ref, [this].concat(args))), _this), _this.makeMenu = function (children) {
	      var activedescendant;
	      var isEmpty = true;
	
	      // Should this instead use React.addons.cloneWithProps or React.cloneElement?
	      var _children = React.Children.map(children, function (child, index) {
	        // console.log(child.type, ComboboxOption.type)
	        if (child.type !== ComboboxOption || !child.props.isFocusable) {
	          // allow random elements to live in this list
	          return child;
	        }
	        isEmpty = false;
	        // TODO: cloneWithProps and map instead of altering the children in-place
	        var props = child.props;
	        var newProps = {};
	        if (this.state.value === child.props.value) {
	          // need an ID for WAI-ARIA
	          newProps.id = props.id || 'ic-tokeninput-selected-' + ++guid;
	          newProps.isSelected = true;
	          activedescendant = props.id;
	        }
	        newProps.onBlur = this.handleOptionBlur;
	        newProps.onClick = this.selectOption.bind(this, child);
	        newProps.onFocus = this.handleOptionFocus;
	        newProps.onKeyDown = this.handleOptionKeyDown.bind(this, child);
	        newProps.onMouseEnter = this.handleOptionMouseEnter.bind(this, index);
	
	        return React.cloneElement(child, newProps);
	      }.bind(_this));
	
	      return {
	        children: _children,
	        activedescendant: activedescendant,
	        isEmpty: isEmpty
	      };
	    }, _this.getClassName = function () {
	      var className = addClass(_this.props.className, 'ic-tokeninput');
	      if (_this.state.isOpen) className = addClass(className, 'ic-tokeninput-is-open');
	      return className;
	    }, _this.clearSelectedState = function (cb) {
	      _this.setState({
	        focusedIndex: null,
	        inputValue: null,
	        value: null,
	        matchedAutocompleteOption: null,
	        activedescendant: null
	      }, cb);
	    }, _this.handleInputChange = function () {
	      var value = _this.input.value;
	      _this.clearSelectedState(function () {
	        this.props.onInput(value);
	      }.bind(_this));
	    }, _this.handleInputFocus = function () {
	      _this.props.onFocus();
	      _this.maybeShowList();
	    }, _this.handleInputClick = function () {
	      _this.maybeShowList();
	    }, _this.maybeShowList = function () {
	      if (_this.props.showListOnFocus) {
	        _this.showList();
	      }
	    }, _this.handleInputBlur = function () {
	      var focusedAnOption = _this.state.focusedIndex != null;
	      if (focusedAnOption) return;
	      _this.maybeSelectAutocompletedOption();
	      _this.hideList();
	    }, _this.handleOptionBlur = function () {
	      // don't want to hide the list if we focused another option
	      _this.blurTimer = setTimeout(_this.hideList, 0);
	    }, _this.handleOptionFocus = function () {
	      // see `handleOptionBlur`
	      clearTimeout(_this.blurTimer);
	    }, _this.handleInputKeyUp = function (event) {
	      if (_this.state.menu.isEmpty ||
	      // autocompleting while backspacing feels super weird, so let's not
	      event.keyCode === 8 /*backspace*/ || !_this.props.autocomplete.match(/both|inline/)) return;
	    }, _this.handleButtonClick = function () {
	      _this.state.isOpen ? _this.hideList() : _this.showList();
	      _this.focusInput();
	    }, _this.showList = function () {
	      if (!_this.state.menu.children.length) {
	        return;
	      }
	      _this.setState({ isOpen: true });
	    }, _this.hideList = function () {
	      _this.setState({
	        isOpen: false,
	        focusedIndex: null
	      });
	    }, _this.hideOnEscape = function (event) {
	      _this.hideList();
	      _this.focusInput();
	      event.preventDefault();
	    }, _this.focusInput = function () {
	      _this.input.focus();
	    }, _this.selectInput = function () {
	      _this.input.select();
	    }, _this.inputKeydownMap = {
	      8: 'removeLastToken', // delete
	      13: 'selectOnEnter', // enter
	      188: 'selectOnEnter', // comma
	      27: 'hideOnEscape', // escape
	      38: 'focusPrevious', // up arrow
	      40: 'focusNext' // down arrow
	    }, _this.optionKeydownMap = {
	      13: 'selectOption',
	      27: 'hideOnEscape',
	      38: 'focusPrevious',
	      40: 'focusNext'
	    }, _this.handleKeydown = function (event) {
	      var handlerName = _this.inputKeydownMap[event.keyCode];
	      if (!handlerName) return;
	      _this.setState({ usingKeyboard: true });
	      return _this[handlerName].call(_this, event);
	    }, _this.handleOptionKeyDown = function (child, event) {
	      var handlerName = _this.optionKeydownMap[event.keyCode];
	      if (!handlerName) {
	        // if the user starts typing again while focused on an option, move focus
	        // to the inpute, select so it wipes out any existing value
	        _this.selectInput();
	        return;
	      }
	      event.preventDefault();
	      _this.setState({ usingKeyboard: true });
	      _this[handlerName].call(_this, child);
	    }, _this.handleOptionMouseEnter = function (index) {
	      if (_this.state.usingKeyboard) _this.setState({ usingKeyboard: false });else _this.focusOptionAtIndex(index);
	    }, _this.selectOnEnter = function (event) {
	      event.preventDefault();
	      _this.maybeSelectAutocompletedOption();
	    }, _this.maybeSelectAutocompletedOption = function () {
	      if (!_this.state.matchedAutocompleteOption) {
	        _this.selectText();
	      } else {
	        _this.selectOption(_this.state.matchedAutocompleteOption, { focus: false });
	      }
	    }, _this.selectOption = function (child, options) {
	      options = options || {};
	      _this.setState({
	        // value: child.props.value,
	        // inputValue: getLabel(child),
	        matchedAutocompleteOption: null
	      }, function () {
	        this.props.onSelect(child.props.value, child);
	        this.hideList();
	        this.clearSelectedState(); // added
	        if (options.focus !== false) this.selectInput();
	      }.bind(_this));
	      _this.input.value = ''; // added
	    }, _this.selectText = function () {
	      var value = _this.input.value;
	      if (!value) return;
	      _this.props.onSelect(value);
	      _this.clearSelectedState();
	      _this.input.value = ''; // added
	    }, _this.focusNext = function (event) {
	      if (event.preventDefault) event.preventDefault();
	      if (_this.state.menu.isEmpty) return;
	      var index = _this.nextFocusableIndex(_this.state.focusedIndex);
	      _this.focusOptionAtIndex(index);
	    }, _this.removeLastToken = function () {
	      if (_this.props.onRemoveLast && !_this.input.value) {
	        _this.props.onRemoveLast();
	      }
	      return true;
	    }, _this.focusPrevious = function (event) {
	      if (event.preventDefault) event.preventDefault();
	      if (_this.state.menu.isEmpty) return;
	      var index = _this.previousFocusableIndex(_this.state.focusedIndex);
	      _this.focusOptionAtIndex(index);
	    }, _this.focusSelectedOption = function () {
	      var selectedIndex;
	      React.Children.forEach(_this.props.children, function (child, index) {
	        if (child.props.value === this.state.value) selectedIndex = index;
	      }.bind(_this));
	      _this.showList();
	      _this.setState({
	        focusedIndex: selectedIndex
	      }, _this.focusOption);
	    }, _this.findInitialInputValue = function () {
	      // TODO: might not need this, we should know this in `makeMenu`
	      var inputValue;
	      React.Children.forEach(_this.props.children, function (child) {
	        if (child.props.value === this.props.value) inputValue = getLabel(child);
	      }.bind(_this));
	      return inputValue;
	    }, _this.clampIndex = function (index) {
	      if (index < 0) {
	        return _this.props.children.length - 1;
	      } else if (index >= _this.props.children.length) {
	        return 0;
	      }
	      return index;
	    }, _this.scanForFocusableIndex = function (index, increment) {
	      if (index === null || index === undefined) {
	        index = increment > 0 ? _this.clampIndex(-1) : 0;
	      }
	      var newIndex = index;
	      while (true) {
	        newIndex = _this.clampIndex(newIndex + increment);
	        if (newIndex === index || _this.props.children[newIndex].props.isFocusable) {
	          return newIndex;
	        }
	      }
	    }, _this.nextFocusableIndex = function (index) {
	      return _this.scanForFocusableIndex(index, 1);
	    }, _this.previousFocusableIndex = function (index) {
	      return _this.scanForFocusableIndex(index, -1);
	    }, _this.focusOptionAtIndex = function (index) {
	      if (!_this.state.isOpen && _this.state.value) return _this.focusSelectedOption();
	      _this.showList();
	      var length = _this.props.children.length;
	      if (index === -1) index = length - 1;else if (index === length) index = 0;
	      _this.setState({
	        focusedIndex: index
	      }, _this.focusOption);
	    }, _this.focusOption = function () {
	      var index = _this.state.focusedIndex;
	      _this.list.childNodes[index].focus();
	    }, _this.state = {
	      value: _this.props.value,
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
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(Combobox, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({ menu: this.makeMenu(this.props.children) });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      this.setState({ menu: this.makeMenu(newProps.children) }, function () {
	        if (newProps.children.length && (this.isOpen || document.activeElement === this.input)) {
	          if (!this.state.menu.children.length) {
	            return;
	          }
	          this.setState({
	            isOpen: true
	          }, function () {
	            this.list.scrollTop = 0;
	          }.bind(this));
	        } else {
	          this.hideList();
	        }
	      }.bind(this));
	    }
	
	    /**
	     * We don't create the <ComboboxOption> components, the user supplies them,
	     * so before rendering we attach handlers to facilitate communication from
	     * the ComboboxOption to the Combobox.
	    */
	
	
	    /**
	     * When the user begins typing again we need to clear out any state that has
	     * to do with an existing or potential selection.
	    */
	
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var ariaLabel = this.props['aria-label'] || 'Start typing to search. ' + 'Press the down arrow to navigate results. If you don\'t find an ' + 'acceptable option, you can input an alternative. Once you find or ' + 'input the tag you want, press Enter or Comma to add it.';
	
	      return React.createElement(
	        'div',
	        { className: this.getClassName() },
	        this.props.value,
	        this.state.inputValue,
	        React.createElement('input', {
	          ref: function ref(e) {
	            return _this2.input = e;
	          },
	          autoComplete: 'off',
	          spellCheck: 'false',
	          'aria-label': ariaLabel,
	          'aria-expanded': this.state.isOpen + '',
	          'aria-haspopup': 'true',
	          'aria-activedescendant': this.state.menu.activedescendant,
	          'aria-autocomplete': 'list',
	          'aria-owns': this.state.listId,
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
	          role: 'combobox' }),
	        React.createElement(
	          'span',
	          {
	            'aria-hidden': 'true',
	            className: 'ic-tokeninput-button',
	            onClick: this.handleButtonClick },
	          '\u25BE'
	        ),
	        React.createElement(
	          'div',
	          {
	            id: this.state.listId,
	            ref: function ref(e) {
	              return _this2.list = e;
	            },
	            className: 'ic-tokeninput-list',
	            role: 'listbox' },
	          this.state.menu.children
	        )
	      );
	    }
	  }]);
	
	  return Combobox;
	}(React.Component);
	
	Combobox.propTypes = {
	  onFocus: PropTypes.func,
	
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
	  onInput: PropTypes.func,
	
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
	  onSelect: PropTypes.func,
	
	  /**
	   * Shown when the combobox is empty.
	  */
	  placeholder: PropTypes.string
	};
	Combobox.defaultProps = {
	  autocomplete: 'both',
	  onFocus: k,
	  onInput: k,
	  onSelect: k,
	  value: null,
	  showListOnFocus: false
	};
	
	
	function getLabel(component) {
	  return component.props.label || component.props.children;
	}
	
	function matchFragment(userInput, firstChildLabel) {
	  userInput = userInput.toLowerCase();
	  firstChildLabel = firstChildLabel.toLowerCase();
	  if (userInput === '' || userInput === firstChildLabel) return false;
	  if (firstChildLabel.toLowerCase().indexOf(userInput.toLowerCase()) === -1) return false;
	  return true;
	}
	
	module.exports = Combobox;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = addClass;
	
	function addClass(existing, added) {
	  if (!existing) return added;
	  if (existing.indexOf(added) > -1) return existing;
	  return existing + ' ' + added;
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PropTypes = __webpack_require__(2);
	var React = __webpack_require__(3);
	var addClass = __webpack_require__(4);
	
	var Option = function (_React$Component) {
	  _inherits(Option, _React$Component);
	
	  function Option() {
	    _classCallCheck(this, Option);
	
	    return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
	  }
	
	  _createClass(Option, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      if (props.isSelected) {
	        props.className = addClass(props.className, 'ic-tokeninput-selected');
	        props.ariaSelected = true;
	      }
	      return React.createElement('div', props);
	    }
	  }]);
	
	  return Option;
	}(React.Component);
	
	Option.propTypes = {
	
	  /**
	   * The value that will be sent to the `onSelect` handler of the
	   * parent Combobox.
	  */
	  value: PropTypes.any.isRequired,
	
	  /**
	   * What value to put into the input element when this option is
	   * selected, defaults to its children coerced to a string.
	  */
	  label: PropTypes.string,
	
	  /**
	   * Whether the element should be selectable
	  */
	  isFocusable: PropTypes.bool
	};
	Option.defaultProps = {
	  role: 'option',
	  tabIndex: '-1',
	  className: 'ic-tokeninput-option',
	  isSelected: false,
	  isFocusable: true
	};
	
	
	module.exports = Option;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(3);
	
	var Token = function (_React$Component) {
	  _inherits(Token, _React$Component);
	
	  function Token() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, Token);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Token.__proto__ || Object.getPrototypeOf(Token)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
	      _this.props.onRemove(_this.props.value);
	    }, _this.handleKeyDown = function (key) {
	      var enterKey = 13;
	      if (key.keyCode === enterKey) _this.props.onRemove(_this.props.value);
	    }, _this.ariaLabelRemove = function () {
	      return _this.props.tokenAriaFunc ? _this.props.tokenAriaFunc(_this.props.name) : 'Remove \'' + _this.props.name + '\'';
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(Token, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'li',
	        { className: 'ic-token inline-flex' },
	        React.createElement(
	          'span',
	          { className: 'ic-token-label' },
	          this.props.name
	        ),
	        React.createElement(
	          'span',
	          {
	            role: 'button',
	            onClick: this.handleClick,
	            onFocus: this.props.onFocus,
	            onKeyDown: this.handleKeyDown,
	            'aria-label': this.ariaLabelRemove(),
	            className: 'ic-token-delete-button',
	            tabIndex: 0 },
	          '\u2715'
	        )
	      );
	    }
	  }]);
	
	  return Token;
	}(React.Component);
	
	module.exports = Token;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PropTypes = __webpack_require__(2);
	var React = __webpack_require__(3);
	var Combobox = __webpack_require__(1);
	var Token = __webpack_require__(6);
	var classnames = __webpack_require__(8);
	
	var TokenInput = function (_React$Component) {
	  _inherits(TokenInput, _React$Component);
	
	  function TokenInput() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, TokenInput);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TokenInput.__proto__ || Object.getPrototypeOf(TokenInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      selectedToken: null
	    }, _this.handleClick = function () {
	      // TODO: Expand combobox API for focus
	      _this.comboLi.querySelector('input').focus();
	    }, _this.handleFocus = function () {
	      if (_this.props.onFocus) {
	        _this.props.onFocus();
	      }
	    }, _this.handleInput = function (inputValue) {
	      _this.props.onInput(inputValue);
	    }, _this.handleSelect = function (event, option) {
	      var input = _this.comboLi.querySelector('input');
	      _this.props.onSelect(event, option);
	      _this.setState({
	        selectedToken: null
	      });
	      _this.props.onInput(input.value);
	    }, _this.handleRemove = function (value) {
	      var input = _this.comboLi.querySelector('input');
	      _this.props.onRemove(value);
	      input.focus();
	    }, _this.handleRemoveLast = function () {
	      _this.props.onRemove(_this.props.selected[_this.props.selected.length - 1]);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(TokenInput, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var isDisabled = this.props.isDisabled;
	      var tokens = this.props.selected.map(function (token) {
	        return React.createElement(Token, {
	          tokenAriaFunc: this.props.tokenAriaFunc,
	          onFocus: this.handleFocus,
	          onRemove: this.handleRemove,
	          value: token,
	          name: token.name,
	          key: token.id });
	      }.bind(this));
	
	      var classes = classnames('ic-tokens flex', {
	        'ic-tokens-disabled': isDisabled
	      });
	
	      return React.createElement(
	        'ul',
	        { className: classes, onClick: this.handleClick },
	        tokens,
	        React.createElement(
	          'li',
	          { className: 'inline-flex', ref: function ref(e) {
	              return _this2.comboLi = e;
	            } },
	          React.createElement(
	            Combobox,
	            {
	              id: this.props.id,
	              'aria-label': this.props['combobox-aria-label'],
	              ariaDisabled: isDisabled,
	              onFocus: this.handleFocus,
	              onInput: this.handleInput,
	              showListOnFocus: this.props.showListOnFocus,
	              onSelect: this.handleSelect,
	              onRemoveLast: this.handleRemoveLast,
	              value: this.state.selectedToken,
	              isDisabled: isDisabled,
	              placeholder: this.props.placeholder },
	            this.props.menuContent
	          )
	        ),
	        this.props.isLoading && React.createElement(
	          'li',
	          { className: 'ic-tokeninput-loading flex' },
	          this.props.loadingComponent
	        )
	      );
	    }
	  }]);
	
	  return TokenInput;
	}(React.Component);
	
	TokenInput.propTypes = {
	  isLoading: PropTypes.bool,
	  loadingComponent: PropTypes.any,
	  onFocus: PropTypes.func,
	  onInput: PropTypes.func.isRequired,
	  onSelect: PropTypes.func.isRequired,
	  tokenAriaFunc: PropTypes.func,
	  onRemove: PropTypes.func.isRequired,
	  selected: PropTypes.array.isRequired,
	  menuContent: PropTypes.any,
	  showListOnFocus: PropTypes.bool,
	  placeholder: PropTypes.string
	};
	
	
	module.exports = TokenInput;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2017 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg) && arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			classNames.default = classNames;
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ })
/******/ ])
});
;
//# sourceMappingURL=react-tokeninput.js.map