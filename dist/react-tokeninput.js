(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["TokenInput"] = factory(require("react"), require("react-dom"));
	else
		root["TokenInput"] = factory(root["react"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_15__) {
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
	
	var _option = __webpack_require__(13);
	
	var _option2 = _interopRequireDefault(_option);
	
	var _token = __webpack_require__(14);
	
	var _token2 = _interopRequireDefault(_token);
	
	var _main = __webpack_require__(16);
	
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
	
	var React = __webpack_require__(2);
	var createReactClass = __webpack_require__(3);
	var PropTypes = __webpack_require__(8);
	var guid = 0;
	var k = function k() {};
	var addClass = __webpack_require__(12);
	var ComboboxOption = __webpack_require__(13);
	
	var div = React.createFactory('div');
	var span = React.createFactory('span');
	var input = React.createFactory('input');
	
	module.exports = createReactClass({
	  displayName: 'exports',
	
	
	  propTypes: {
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
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      autocomplete: 'both',
	      onFocus: k,
	      onInput: k,
	      onSelect: k,
	      value: null,
	      showListOnFocus: false
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      value: this.props.value,
	      // the value displayed in the input
	      inputValue: this.findInitialInputValue(),
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
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.setState({ menu: this.makeMenu(this.props.children) });
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    this.setState({ menu: this.makeMenu(newProps.children) }, function () {
	      if (newProps.children.length && (this.isOpen || document.activeElement === this.refs.input)) {
	        if (!this.state.menu.children.length) {
	          return;
	        }
	        this.setState({
	          isOpen: true
	        }, function () {
	          this.refs.list.scrollTop = 0;
	        }.bind(this));
	      } else {
	        this.hideList();
	      }
	    }.bind(this));
	  },
	
	  /**
	   * We don't create the <ComboboxOption> components, the user supplies them,
	   * so before rendering we attach handlers to facilitate communication from
	   * the ComboboxOption to the Combobox.
	  */
	  makeMenu: function makeMenu(children) {
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
	    }.bind(this));
	
	    return {
	      children: _children,
	      activedescendant: activedescendant,
	      isEmpty: isEmpty
	    };
	  },
	
	  getClassName: function getClassName() {
	    var className = addClass(this.props.className, 'ic-tokeninput');
	    if (this.state.isOpen) className = addClass(className, 'ic-tokeninput-is-open');
	    return className;
	  },
	
	  /**
	   * When the user begins typing again we need to clear out any state that has
	   * to do with an existing or potential selection.
	  */
	  clearSelectedState: function clearSelectedState(cb) {
	    this.setState({
	      focusedIndex: null,
	      inputValue: null,
	      value: null,
	      matchedAutocompleteOption: null,
	      activedescendant: null
	    }, cb);
	  },
	
	  handleInputChange: function handleInputChange() {
	    var value = this.refs.input.value;
	    this.clearSelectedState(function () {
	      this.props.onInput(value);
	    }.bind(this));
	  },
	
	  handleInputFocus: function handleInputFocus() {
	    this.props.onFocus();
	    this.maybeShowList();
	  },
	
	  handleInputClick: function handleInputClick() {
	    this.maybeShowList();
	  },
	
	  maybeShowList: function maybeShowList() {
	    if (this.props.showListOnFocus) {
	      this.showList();
	    }
	  },
	
	  handleInputBlur: function handleInputBlur() {
	    var focusedAnOption = this.state.focusedIndex != null;
	    if (focusedAnOption) return;
	    this.maybeSelectAutocompletedOption();
	    this.hideList();
	  },
	
	  handleOptionBlur: function handleOptionBlur() {
	    // don't want to hide the list if we focused another option
	    this.blurTimer = setTimeout(this.hideList, 0);
	  },
	
	  handleOptionFocus: function handleOptionFocus() {
	    // see `handleOptionBlur`
	    clearTimeout(this.blurTimer);
	  },
	
	  handleInputKeyUp: function handleInputKeyUp(event) {
	    if (this.state.menu.isEmpty ||
	    // autocompleting while backspacing feels super weird, so let's not
	    event.keyCode === 8 /*backspace*/ || !this.props.autocomplete.match(/both|inline/)) return;
	  },
	
	  handleButtonClick: function handleButtonClick() {
	    this.state.isOpen ? this.hideList() : this.showList();
	    this.focusInput();
	  },
	
	  showList: function showList() {
	    if (!this.state.menu.children.length) {
	      return;
	    }
	    this.setState({ isOpen: true });
	  },
	
	  hideList: function hideList() {
	    this.setState({
	      isOpen: false,
	      focusedIndex: null
	    });
	  },
	
	  hideOnEscape: function hideOnEscape(event) {
	    this.hideList();
	    this.focusInput();
	    event.preventDefault();
	  },
	
	  focusInput: function focusInput() {
	    this.refs.input.focus();
	  },
	
	  selectInput: function selectInput() {
	    this.refs.input.select();
	  },
	
	  inputKeydownMap: {
	    8: 'removeLastToken', // delete
	    13: 'selectOnEnter', // enter
	    188: 'selectOnEnter', // comma
	    27: 'hideOnEscape', // escape
	    38: 'focusPrevious', // up arrow
	    40: 'focusNext' // down arrow
	  },
	
	  optionKeydownMap: {
	    13: 'selectOption',
	    27: 'hideOnEscape',
	    38: 'focusPrevious',
	    40: 'focusNext'
	  },
	
	  handleKeydown: function handleKeydown(event) {
	    var handlerName = this.inputKeydownMap[event.keyCode];
	    if (!handlerName) return;
	    this.setState({ usingKeyboard: true });
	    return this[handlerName].call(this, event);
	  },
	
	  handleOptionKeyDown: function handleOptionKeyDown(child, event) {
	    var handlerName = this.optionKeydownMap[event.keyCode];
	    if (!handlerName) {
	      // if the user starts typing again while focused on an option, move focus
	      // to the inpute, select so it wipes out any existing value
	      this.selectInput();
	      return;
	    }
	    event.preventDefault();
	    this.setState({ usingKeyboard: true });
	    this[handlerName].call(this, child);
	  },
	
	  handleOptionMouseEnter: function handleOptionMouseEnter(index) {
	    if (this.state.usingKeyboard) this.setState({ usingKeyboard: false });else this.focusOptionAtIndex(index);
	  },
	
	  selectOnEnter: function selectOnEnter(event) {
	    event.preventDefault();
	    this.maybeSelectAutocompletedOption();
	  },
	
	  maybeSelectAutocompletedOption: function maybeSelectAutocompletedOption() {
	    if (!this.state.matchedAutocompleteOption) {
	      this.selectText();
	    } else {
	      this.selectOption(this.state.matchedAutocompleteOption, { focus: false });
	    }
	  },
	
	  selectOption: function selectOption(child, options) {
	    options = options || {};
	    this.setState({
	      // value: child.props.value,
	      // inputValue: getLabel(child),
	      matchedAutocompleteOption: null
	    }, function () {
	      this.props.onSelect(child.props.value, child);
	      this.hideList();
	      this.clearSelectedState(); // added
	      if (options.focus !== false) this.selectInput();
	    }.bind(this));
	    this.refs.input.value = ''; // added
	  },
	
	  selectText: function selectText() {
	    var value = this.refs.input.value;
	    if (!value) return;
	    this.props.onSelect(value);
	    this.clearSelectedState();
	    this.refs.input.value = ''; // added
	  },
	
	  focusNext: function focusNext(event) {
	    if (event.preventDefault) event.preventDefault();
	    if (this.state.menu.isEmpty) return;
	    var index = this.nextFocusableIndex(this.state.focusedIndex);
	    this.focusOptionAtIndex(index);
	  },
	
	  removeLastToken: function removeLastToken() {
	    if (this.props.onRemoveLast && !this.refs.input.value) {
	      this.props.onRemoveLast();
	    }
	    return true;
	  },
	
	  focusPrevious: function focusPrevious(event) {
	    if (event.preventDefault) event.preventDefault();
	    if (this.state.menu.isEmpty) return;
	    var index = this.previousFocusableIndex(this.state.focusedIndex);
	    this.focusOptionAtIndex(index);
	  },
	
	  focusSelectedOption: function focusSelectedOption() {
	    var selectedIndex;
	    React.Children.forEach(this.props.children, function (child, index) {
	      if (child.props.value === this.state.value) selectedIndex = index;
	    }.bind(this));
	    this.showList();
	    this.setState({
	      focusedIndex: selectedIndex
	    }, this.focusOption);
	  },
	
	  findInitialInputValue: function findInitialInputValue() {
	    // TODO: might not need this, we should know this in `makeMenu`
	    var inputValue;
	    React.Children.forEach(this.props.children, function (child) {
	      if (child.props.value === this.props.value) inputValue = getLabel(child);
	    }.bind(this));
	    return inputValue;
	  },
	
	  clampIndex: function clampIndex(index) {
	    if (index < 0) {
	      return this.props.children.length - 1;
	    } else if (index >= this.props.children.length) {
	      return 0;
	    }
	    return index;
	  },
	
	  scanForFocusableIndex: function scanForFocusableIndex(index, increment) {
	    if (index === null || index === undefined) {
	      index = increment > 0 ? this.clampIndex(-1) : 0;
	    }
	    var newIndex = index;
	    while (true) {
	      newIndex = this.clampIndex(newIndex + increment);
	      if (newIndex === index || this.props.children[newIndex].props.isFocusable) {
	        return newIndex;
	      }
	    }
	  },
	
	  nextFocusableIndex: function nextFocusableIndex(index) {
	    return this.scanForFocusableIndex(index, 1);
	  },
	
	  previousFocusableIndex: function previousFocusableIndex(index) {
	    return this.scanForFocusableIndex(index, -1);
	  },
	
	  focusOptionAtIndex: function focusOptionAtIndex(index) {
	    if (!this.state.isOpen && this.state.value) return this.focusSelectedOption();
	    this.showList();
	    var length = this.props.children.length;
	    if (index === -1) index = length - 1;else if (index === length) index = 0;
	    this.setState({
	      focusedIndex: index
	    }, this.focusOption);
	  },
	
	  focusOption: function focusOption() {
	    var index = this.state.focusedIndex;
	    this.refs.list.childNodes[index].focus();
	  },
	
	  render: function render() {
	    var ariaLabel = this.props['aria-label'] || 'Start typing to search. ' + 'Press the down arrow to navigate results. If you don\'t find an ' + 'acceptable option, you can input an alternative. Once you find or ' + 'input the tag you want, press Enter or Comma to add it.';
	
	    return div({ className: this.getClassName() }, this.props.value, this.state.inputValue, input({
	      ref: 'input',
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
	      role: 'combobox'
	    }), span({
	      'aria-hidden': 'true',
	      className: 'ic-tokeninput-button',
	      onClick: this.handleButtonClick
	    }, '▾'), div({
	      id: this.state.listId,
	      ref: 'list',
	      className: 'ic-tokeninput-list',
	      role: 'listbox'
	    }, this.state.menu.children));
	  }
	});
	
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var React = __webpack_require__(2);
	var factory = __webpack_require__(4);
	
	if (typeof React === 'undefined') {
	  throw Error(
	    'create-react-class could not find the React object. If you are using script tags, ' +
	      'make sure that React is being loaded before create-react-class.'
	  );
	}
	
	// Hack to grab NoopUpdateQueue from isomorphic React
	var ReactNoopUpdateQueue = new React.Component().updater;
	
	module.exports = factory(
	  React.Component,
	  React.isValidElement,
	  ReactNoopUpdateQueue
	);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(5);
	
	var emptyObject = __webpack_require__(6);
	var _invariant = __webpack_require__(7);
	
	if (false) {
	  var warning = require('fbjs/lib/warning');
	}
	
	var MIXINS_KEY = 'mixins';
	
	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}
	
	var ReactPropTypeLocationNames;
	if (false) {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	} else {
	  ReactPropTypeLocationNames = {};
	}
	
	function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
	  /**
	   * Policies that describe methods in `ReactClassInterface`.
	   */
	
	  var injectedMixins = [];
	
	  /**
	   * Composite components are higher-level components that compose other composite
	   * or host components.
	   *
	   * To create a new type of `ReactClass`, pass a specification of
	   * your new class to `React.createClass`. The only requirement of your class
	   * specification is that you implement a `render` method.
	   *
	   *   var MyComponent = React.createClass({
	   *     render: function() {
	   *       return <div>Hello World</div>;
	   *     }
	   *   });
	   *
	   * The class specification supports a specific protocol of methods that have
	   * special meaning (e.g. `render`). See `ReactClassInterface` for
	   * more the comprehensive protocol. Any other properties and methods in the
	   * class specification will be available on the prototype.
	   *
	   * @interface ReactClassInterface
	   * @internal
	   */
	  var ReactClassInterface = {
	    /**
	     * An array of Mixin objects to include when defining your component.
	     *
	     * @type {array}
	     * @optional
	     */
	    mixins: 'DEFINE_MANY',
	
	    /**
	     * An object containing properties and methods that should be defined on
	     * the component's constructor instead of its prototype (static methods).
	     *
	     * @type {object}
	     * @optional
	     */
	    statics: 'DEFINE_MANY',
	
	    /**
	     * Definition of prop types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    propTypes: 'DEFINE_MANY',
	
	    /**
	     * Definition of context types for this component.
	     *
	     * @type {object}
	     * @optional
	     */
	    contextTypes: 'DEFINE_MANY',
	
	    /**
	     * Definition of context types this component sets for its children.
	     *
	     * @type {object}
	     * @optional
	     */
	    childContextTypes: 'DEFINE_MANY',
	
	    // ==== Definition methods ====
	
	    /**
	     * Invoked when the component is mounted. Values in the mapping will be set on
	     * `this.props` if that prop is not specified (i.e. using an `in` check).
	     *
	     * This method is invoked before `getInitialState` and therefore cannot rely
	     * on `this.state` or use `this.setState`.
	     *
	     * @return {object}
	     * @optional
	     */
	    getDefaultProps: 'DEFINE_MANY_MERGED',
	
	    /**
	     * Invoked once before the component is mounted. The return value will be used
	     * as the initial value of `this.state`.
	     *
	     *   getInitialState: function() {
	     *     return {
	     *       isOn: false,
	     *       fooBaz: new BazFoo()
	     *     }
	     *   }
	     *
	     * @return {object}
	     * @optional
	     */
	    getInitialState: 'DEFINE_MANY_MERGED',
	
	    /**
	     * @return {object}
	     * @optional
	     */
	    getChildContext: 'DEFINE_MANY_MERGED',
	
	    /**
	     * Uses props from `this.props` and state from `this.state` to render the
	     * structure of the component.
	     *
	     * No guarantees are made about when or how often this method is invoked, so
	     * it must not have side effects.
	     *
	     *   render: function() {
	     *     var name = this.props.name;
	     *     return <div>Hello, {name}!</div>;
	     *   }
	     *
	     * @return {ReactComponent}
	     * @required
	     */
	    render: 'DEFINE_ONCE',
	
	    // ==== Delegate methods ====
	
	    /**
	     * Invoked when the component is initially created and about to be mounted.
	     * This may have side effects, but any external subscriptions or data created
	     * by this method must be cleaned up in `componentWillUnmount`.
	     *
	     * @optional
	     */
	    componentWillMount: 'DEFINE_MANY',
	
	    /**
	     * Invoked when the component has been mounted and has a DOM representation.
	     * However, there is no guarantee that the DOM node is in the document.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been mounted (initialized and rendered) for the first time.
	     *
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidMount: 'DEFINE_MANY',
	
	    /**
	     * Invoked before the component receives new props.
	     *
	     * Use this as an opportunity to react to a prop transition by updating the
	     * state using `this.setState`. Current props are accessed via `this.props`.
	     *
	     *   componentWillReceiveProps: function(nextProps, nextContext) {
	     *     this.setState({
	     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	     *     });
	     *   }
	     *
	     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	     * transition may cause a state change, but the opposite is not true. If you
	     * need it, you are probably looking for `componentWillUpdate`.
	     *
	     * @param {object} nextProps
	     * @optional
	     */
	    componentWillReceiveProps: 'DEFINE_MANY',
	
	    /**
	     * Invoked while deciding if the component should be updated as a result of
	     * receiving new props, state and/or context.
	     *
	     * Use this as an opportunity to `return false` when you're certain that the
	     * transition to the new props/state/context will not require a component
	     * update.
	     *
	     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	     *     return !equal(nextProps, this.props) ||
	     *       !equal(nextState, this.state) ||
	     *       !equal(nextContext, this.context);
	     *   }
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @return {boolean} True if the component should update.
	     * @optional
	     */
	    shouldComponentUpdate: 'DEFINE_ONCE',
	
	    /**
	     * Invoked when the component is about to update due to a transition from
	     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	     * and `nextContext`.
	     *
	     * Use this as an opportunity to perform preparation before an update occurs.
	     *
	     * NOTE: You **cannot** use `this.setState()` in this method.
	     *
	     * @param {object} nextProps
	     * @param {?object} nextState
	     * @param {?object} nextContext
	     * @param {ReactReconcileTransaction} transaction
	     * @optional
	     */
	    componentWillUpdate: 'DEFINE_MANY',
	
	    /**
	     * Invoked when the component's DOM representation has been updated.
	     *
	     * Use this as an opportunity to operate on the DOM when the component has
	     * been updated.
	     *
	     * @param {object} prevProps
	     * @param {?object} prevState
	     * @param {?object} prevContext
	     * @param {DOMElement} rootNode DOM element representing the component.
	     * @optional
	     */
	    componentDidUpdate: 'DEFINE_MANY',
	
	    /**
	     * Invoked when the component is about to be removed from its parent and have
	     * its DOM representation destroyed.
	     *
	     * Use this as an opportunity to deallocate any external resources.
	     *
	     * NOTE: There is no `componentDidUnmount` since your component will have been
	     * destroyed by that point.
	     *
	     * @optional
	     */
	    componentWillUnmount: 'DEFINE_MANY',
	
	    // ==== Advanced methods ====
	
	    /**
	     * Updates the component's currently mounted DOM representation.
	     *
	     * By default, this implements React's rendering and reconciliation algorithm.
	     * Sophisticated clients may wish to override this.
	     *
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     * @overridable
	     */
	    updateComponent: 'OVERRIDE_BASE'
	  };
	
	  /**
	   * Mapping from class specification keys to special processing functions.
	   *
	   * Although these are declared like instance properties in the specification
	   * when defining classes using `React.createClass`, they are actually static
	   * and are accessible on the constructor instead of the prototype. Despite
	   * being static, they must be defined outside of the "statics" key under
	   * which all other static methods are defined.
	   */
	  var RESERVED_SPEC_KEYS = {
	    displayName: function(Constructor, displayName) {
	      Constructor.displayName = displayName;
	    },
	    mixins: function(Constructor, mixins) {
	      if (mixins) {
	        for (var i = 0; i < mixins.length; i++) {
	          mixSpecIntoComponent(Constructor, mixins[i]);
	        }
	      }
	    },
	    childContextTypes: function(Constructor, childContextTypes) {
	      if (false) {
	        validateTypeDef(Constructor, childContextTypes, 'childContext');
	      }
	      Constructor.childContextTypes = _assign(
	        {},
	        Constructor.childContextTypes,
	        childContextTypes
	      );
	    },
	    contextTypes: function(Constructor, contextTypes) {
	      if (false) {
	        validateTypeDef(Constructor, contextTypes, 'context');
	      }
	      Constructor.contextTypes = _assign(
	        {},
	        Constructor.contextTypes,
	        contextTypes
	      );
	    },
	    /**
	     * Special case getDefaultProps which should move into statics but requires
	     * automatic merging.
	     */
	    getDefaultProps: function(Constructor, getDefaultProps) {
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps = createMergedResultFunction(
	          Constructor.getDefaultProps,
	          getDefaultProps
	        );
	      } else {
	        Constructor.getDefaultProps = getDefaultProps;
	      }
	    },
	    propTypes: function(Constructor, propTypes) {
	      if (false) {
	        validateTypeDef(Constructor, propTypes, 'prop');
	      }
	      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	    },
	    statics: function(Constructor, statics) {
	      mixStaticSpecIntoComponent(Constructor, statics);
	    },
	    autobind: function() {}
	  };
	
	  function validateTypeDef(Constructor, typeDef, location) {
	    for (var propName in typeDef) {
	      if (typeDef.hasOwnProperty(propName)) {
	        // use a warning instead of an _invariant so components
	        // don't show up in prod but only in __DEV__
	        if (false) {
	          warning(
	            typeof typeDef[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	              'React.PropTypes.',
	            Constructor.displayName || 'ReactClass',
	            ReactPropTypeLocationNames[location],
	            propName
	          );
	        }
	      }
	    }
	  }
	
	  function validateMethodOverride(isAlreadyDefined, name) {
	    var specPolicy = ReactClassInterface.hasOwnProperty(name)
	      ? ReactClassInterface[name]
	      : null;
	
	    // Disallow overriding of base class methods unless explicitly allowed.
	    if (ReactClassMixin.hasOwnProperty(name)) {
	      _invariant(
	        specPolicy === 'OVERRIDE_BASE',
	        'ReactClassInterface: You are attempting to override ' +
	          '`%s` from your class specification. Ensure that your method names ' +
	          'do not overlap with React methods.',
	        name
	      );
	    }
	
	    // Disallow defining methods more than once unless explicitly allowed.
	    if (isAlreadyDefined) {
	      _invariant(
	        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
	        'ReactClassInterface: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be due ' +
	          'to a mixin.',
	        name
	      );
	    }
	  }
	
	  /**
	   * Mixin helper which handles policy validation and reserved
	   * specification keys when building React classes.
	   */
	  function mixSpecIntoComponent(Constructor, spec) {
	    if (!spec) {
	      if (false) {
	        var typeofSpec = typeof spec;
	        var isMixinValid = typeofSpec === 'object' && spec !== null;
	
	        if (process.env.NODE_ENV !== 'production') {
	          warning(
	            isMixinValid,
	            "%s: You're attempting to include a mixin that is either null " +
	              'or not an object. Check the mixins included by the component, ' +
	              'as well as any mixins they include themselves. ' +
	              'Expected object but got %s.',
	            Constructor.displayName || 'ReactClass',
	            spec === null ? null : typeofSpec
	          );
	        }
	      }
	
	      return;
	    }
	
	    _invariant(
	      typeof spec !== 'function',
	      "ReactClass: You're attempting to " +
	        'use a component class or function as a mixin. Instead, just use a ' +
	        'regular object.'
	    );
	    _invariant(
	      !isValidElement(spec),
	      "ReactClass: You're attempting to " +
	        'use a component as a mixin. Instead, just use a regular object.'
	    );
	
	    var proto = Constructor.prototype;
	    var autoBindPairs = proto.__reactAutoBindPairs;
	
	    // By handling mixins before any other properties, we ensure the same
	    // chaining order is applied to methods with DEFINE_MANY policy, whether
	    // mixins are listed before or after these methods in the spec.
	    if (spec.hasOwnProperty(MIXINS_KEY)) {
	      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	    }
	
	    for (var name in spec) {
	      if (!spec.hasOwnProperty(name)) {
	        continue;
	      }
	
	      if (name === MIXINS_KEY) {
	        // We have already handled mixins in a special case above.
	        continue;
	      }
	
	      var property = spec[name];
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      validateMethodOverride(isAlreadyDefined, name);
	
	      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	        RESERVED_SPEC_KEYS[name](Constructor, property);
	      } else {
	        // Setup methods on prototype:
	        // The following member methods should not be automatically bound:
	        // 1. Expected ReactClass methods (in the "interface").
	        // 2. Overridden methods (that were mixed in).
	        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	        var isFunction = typeof property === 'function';
	        var shouldAutoBind =
	          isFunction &&
	          !isReactClassMethod &&
	          !isAlreadyDefined &&
	          spec.autobind !== false;
	
	        if (shouldAutoBind) {
	          autoBindPairs.push(name, property);
	          proto[name] = property;
	        } else {
	          if (isAlreadyDefined) {
	            var specPolicy = ReactClassInterface[name];
	
	            // These cases should already be caught by validateMethodOverride.
	            _invariant(
	              isReactClassMethod &&
	                (specPolicy === 'DEFINE_MANY_MERGED' ||
	                  specPolicy === 'DEFINE_MANY'),
	              'ReactClass: Unexpected spec policy %s for key %s ' +
	                'when mixing in component specs.',
	              specPolicy,
	              name
	            );
	
	            // For methods which are defined more than once, call the existing
	            // methods before calling the new property, merging if appropriate.
	            if (specPolicy === 'DEFINE_MANY_MERGED') {
	              proto[name] = createMergedResultFunction(proto[name], property);
	            } else if (specPolicy === 'DEFINE_MANY') {
	              proto[name] = createChainedFunction(proto[name], property);
	            }
	          } else {
	            proto[name] = property;
	            if (false) {
	              // Add verbose displayName to the function, which helps when looking
	              // at profiling tools.
	              if (typeof property === 'function' && spec.displayName) {
	                proto[name].displayName = spec.displayName + '_' + name;
	              }
	            }
	          }
	        }
	      }
	    }
	  }
	
	  function mixStaticSpecIntoComponent(Constructor, statics) {
	    if (!statics) {
	      return;
	    }
	    for (var name in statics) {
	      var property = statics[name];
	      if (!statics.hasOwnProperty(name)) {
	        continue;
	      }
	
	      var isReserved = name in RESERVED_SPEC_KEYS;
	      _invariant(
	        !isReserved,
	        'ReactClass: You are attempting to define a reserved ' +
	          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	          'as an instance property instead; it will still be accessible on the ' +
	          'constructor.',
	        name
	      );
	
	      var isInherited = name in Constructor;
	      _invariant(
	        !isInherited,
	        'ReactClass: You are attempting to define ' +
	          '`%s` on your component more than once. This conflict may be ' +
	          'due to a mixin.',
	        name
	      );
	      Constructor[name] = property;
	    }
	  }
	
	  /**
	   * Merge two objects, but throw if both contain the same key.
	   *
	   * @param {object} one The first object, which is mutated.
	   * @param {object} two The second object
	   * @return {object} one after it has been mutated to contain everything in two.
	   */
	  function mergeIntoWithNoDuplicateKeys(one, two) {
	    _invariant(
	      one && two && typeof one === 'object' && typeof two === 'object',
	      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	    );
	
	    for (var key in two) {
	      if (two.hasOwnProperty(key)) {
	        _invariant(
	          one[key] === undefined,
	          'mergeIntoWithNoDuplicateKeys(): ' +
	            'Tried to merge two objects with the same key: `%s`. This conflict ' +
	            'may be due to a mixin; in particular, this may be caused by two ' +
	            'getInitialState() or getDefaultProps() methods returning objects ' +
	            'with clashing keys.',
	          key
	        );
	        one[key] = two[key];
	      }
	    }
	    return one;
	  }
	
	  /**
	   * Creates a function that invokes two functions and merges their return values.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createMergedResultFunction(one, two) {
	    return function mergedResult() {
	      var a = one.apply(this, arguments);
	      var b = two.apply(this, arguments);
	      if (a == null) {
	        return b;
	      } else if (b == null) {
	        return a;
	      }
	      var c = {};
	      mergeIntoWithNoDuplicateKeys(c, a);
	      mergeIntoWithNoDuplicateKeys(c, b);
	      return c;
	    };
	  }
	
	  /**
	   * Creates a function that invokes two functions and ignores their return vales.
	   *
	   * @param {function} one Function to invoke first.
	   * @param {function} two Function to invoke second.
	   * @return {function} Function that invokes the two argument functions.
	   * @private
	   */
	  function createChainedFunction(one, two) {
	    return function chainedFunction() {
	      one.apply(this, arguments);
	      two.apply(this, arguments);
	    };
	  }
	
	  /**
	   * Binds a method to the component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   * @param {function} method Method to be bound.
	   * @return {function} The bound method.
	   */
	  function bindAutoBindMethod(component, method) {
	    var boundMethod = method.bind(component);
	    if (false) {
	      boundMethod.__reactBoundContext = component;
	      boundMethod.__reactBoundMethod = method;
	      boundMethod.__reactBoundArguments = null;
	      var componentName = component.constructor.displayName;
	      var _bind = boundMethod.bind;
	      boundMethod.bind = function(newThis) {
	        for (
	          var _len = arguments.length,
	            args = Array(_len > 1 ? _len - 1 : 0),
	            _key = 1;
	          _key < _len;
	          _key++
	        ) {
	          args[_key - 1] = arguments[_key];
	        }
	
	        // User is trying to bind() an autobound method; we effectively will
	        // ignore the value of "this" that the user is trying to use, so
	        // let's warn.
	        if (newThis !== component && newThis !== null) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): React component methods may only be bound to the ' +
	                'component instance. See %s',
	              componentName
	            );
	          }
	        } else if (!args.length) {
	          if (process.env.NODE_ENV !== 'production') {
	            warning(
	              false,
	              'bind(): You are binding a component method to the component. ' +
	                'React does this for you automatically in a high-performance ' +
	                'way, so you can safely remove this call. See %s',
	              componentName
	            );
	          }
	          return boundMethod;
	        }
	        var reboundMethod = _bind.apply(boundMethod, arguments);
	        reboundMethod.__reactBoundContext = component;
	        reboundMethod.__reactBoundMethod = method;
	        reboundMethod.__reactBoundArguments = args;
	        return reboundMethod;
	      };
	    }
	    return boundMethod;
	  }
	
	  /**
	   * Binds all auto-bound methods in a component.
	   *
	   * @param {object} component Component whose method is going to be bound.
	   */
	  function bindAutoBindMethods(component) {
	    var pairs = component.__reactAutoBindPairs;
	    for (var i = 0; i < pairs.length; i += 2) {
	      var autoBindKey = pairs[i];
	      var method = pairs[i + 1];
	      component[autoBindKey] = bindAutoBindMethod(component, method);
	    }
	  }
	
	  var IsMountedPreMixin = {
	    componentDidMount: function() {
	      this.__isMounted = true;
	    }
	  };
	
	  var IsMountedPostMixin = {
	    componentWillUnmount: function() {
	      this.__isMounted = false;
	    }
	  };
	
	  /**
	   * Add more to the ReactClass base class. These are all legacy features and
	   * therefore not already part of the modern ReactComponent.
	   */
	  var ReactClassMixin = {
	    /**
	     * TODO: This will be deprecated because state should always keep a consistent
	     * type signature and the only use case for this, is to avoid that.
	     */
	    replaceState: function(newState, callback) {
	      this.updater.enqueueReplaceState(this, newState, callback);
	    },
	
	    /**
	     * Checks whether or not this composite component is mounted.
	     * @return {boolean} True if mounted, false otherwise.
	     * @protected
	     * @final
	     */
	    isMounted: function() {
	      if (false) {
	        warning(
	          this.__didWarnIsMounted,
	          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
	            'subscriptions and pending requests in componentWillUnmount to ' +
	            'prevent memory leaks.',
	          (this.constructor && this.constructor.displayName) ||
	            this.name ||
	            'Component'
	        );
	        this.__didWarnIsMounted = true;
	      }
	      return !!this.__isMounted;
	    }
	  };
	
	  var ReactClassComponent = function() {};
	  _assign(
	    ReactClassComponent.prototype,
	    ReactComponent.prototype,
	    ReactClassMixin
	  );
	
	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  function createClass(spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function(props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.
	
	      if (false) {
	        warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	            'JSX instead. See: https://fb.me/react-legacyfactory'
	        );
	      }
	
	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }
	
	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;
	
	      this.state = null;
	
	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.
	
	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (false) {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (
	          initialState === undefined &&
	          this.getInitialState._isMockFunction
	        ) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      _invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      );
	
	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];
	
	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
	
	    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
	    mixSpecIntoComponent(Constructor, spec);
	    mixSpecIntoComponent(Constructor, IsMountedPostMixin);
	
	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }
	
	    if (false) {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }
	
	    _invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    );
	
	    if (false) {
	      warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	          'The name is phrased as a question because the function is ' +
	          'expected to return a value.',
	        spec.displayName || 'A component'
	      );
	      warning(
	        !Constructor.prototype.componentWillRecieveProps,
	        '%s has a method called ' +
	          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
	        spec.displayName || 'A component'
	      );
	    }
	
	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }
	
	    return Constructor;
	  }
	
	  return createClass;
	}
	
	module.exports = factory;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	var emptyObject = {};
	
	if (false) {
	  Object.freeze(emptyObject);
	}
	
	module.exports = emptyObject;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var validateFormat = function validateFormat(format) {};
	
	if (false) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	if (false) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;
	
	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };
	
	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(9)();
	}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(10);
	var invariant = __webpack_require__(7);
	var ReactPropTypesSecret = __webpack_require__(11);
	
	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,
	
	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim
	  };
	
	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;
	
	  return ReactPropTypes;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */
	
	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};
	
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};
	
	module.exports = emptyFunction;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';
	
	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
	
	module.exports = ReactPropTypesSecret;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = addClass;
	
	function addClass(existing, added) {
	  if (!existing) return added;
	  if (existing.indexOf(added) > -1) return existing;
	  return existing + ' ' + added;
	}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var createReactClass = __webpack_require__(3);
	var PropTypes = __webpack_require__(8);
	var addClass = __webpack_require__(12);
	var div = React.createFactory('div');
	
	module.exports = createReactClass({
	  displayName: 'exports',
	
	
	  propTypes: {
	
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
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      role: 'option',
	      tabIndex: '-1',
	      className: 'ic-tokeninput-option',
	      isSelected: false,
	      isFocusable: true
	    };
	  },
	
	  render: function render() {
	    var props = this.props;
	    if (props.isSelected) {
	      props.className = addClass(props.className, 'ic-tokeninput-selected');
	      props.ariaSelected = true;
	    }
	    return div(props);
	  }
	
	});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(15);
	var createReactClass = __webpack_require__(3);
	var span = React.createFactory("span");
	var li = React.createFactory('li');
	
	module.exports = createReactClass({
	  displayName: 'exports',
	
	  handleClick: function handleClick() {
	    this.props.onRemove(this.props.value);
	  },
	
	  handleKeyDown: function handleKeyDown(key) {
	    var enterKey = 13;
	    if (key.keyCode === enterKey) this.props.onRemove(this.props.value);
	  },
	
	  ariaLabelRemove: function ariaLabelRemove() {
	    return this.props.tokenAriaFunc ? this.props.tokenAriaFunc(this.props.name) : 'Remove \'' + this.props.name + '\'';
	  },
	
	  render: function render() {
	    return li({
	      className: "ic-token inline-flex"
	    }, span({ className: "ic-token-label" }, this.props.name), span({
	      role: 'button',
	      onClick: this.handleClick,
	      onFocus: this.props.onFocus,
	      onKeyDown: this.handleKeyDown,
	      'aria-label': this.ariaLabelRemove(),
	      className: "ic-token-delete-button",
	      tabIndex: 0
	    }, "✕"));
	  }
	});

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(15);
	var createReactClass = __webpack_require__(3);
	var PropTypes = __webpack_require__(8);
	var Combobox = React.createFactory(__webpack_require__(1));
	var Token = React.createFactory(__webpack_require__(14));
	var classnames = __webpack_require__(17);
	
	var ul = React.createFactory("ul");
	var li = React.createFactory("li");
	
	module.exports = createReactClass({
	  displayName: 'exports',
	
	  propTypes: {
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
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      selectedToken: null
	    };
	  },
	
	  handleClick: function handleClick() {
	    // TODO: Expand combobox API for focus
	    this.refs['combo-li'].querySelector('input').focus();
	  },
	
	  handleFocus: function handleFocus() {
	    if (this.props.onFocus) {
	      this.props.onFocus();
	    }
	  },
	
	  handleInput: function handleInput(inputValue) {
	    this.props.onInput(inputValue);
	  },
	
	  handleSelect: function handleSelect(event, option) {
	    var input = this.refs['combo-li'].querySelector('input');
	    this.props.onSelect(event, option);
	    this.setState({
	      selectedToken: null
	    });
	    this.props.onInput(input.value);
	  },
	
	  handleRemove: function handleRemove(value) {
	    var input = this.refs['combo-li'].querySelector('input');
	    this.props.onRemove(value);
	    input.focus();
	  },
	
	  handleRemoveLast: function handleRemoveLast() {
	    this.props.onRemove(this.props.selected[this.props.selected.length - 1]);
	  },
	
	  render: function render() {
	    var isDisabled = this.props.isDisabled;
	    var tokens = this.props.selected.map(function (token) {
	      return Token({
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
	
	    return ul({ className: classes, onClick: this.handleClick }, tokens, li({ className: 'inline-flex', ref: 'combo-li' }, Combobox({
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
	      placeholder: this.props.placeholder
	    }, this.props.menuContent)), this.props.isLoading && li({ className: 'ic-tokeninput-loading flex' }, this.props.loadingComponent));
	  }
	});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
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
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
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