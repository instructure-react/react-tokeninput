var PropTypes = require('prop-types');
var React = require('react');
var guid = 0;
var k = function(){};
var addClass = require('./add-class');
var ComboboxOption = require('./option');

class Combobox extends React.Component {
  static propTypes = {
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

  static defaultProps = {
    autocomplete: 'both',
    onFocus: k,
    onInput: k,
    onSelect: k,
    value: null,
    showListOnFocus: false
  };

  componentWillMount() {
    this.setState({menu: this.makeMenu(this.props.children)});
  }

  componentWillReceiveProps(newProps) {
    this.setState({menu: this.makeMenu(newProps.children)}, function() {
      if(newProps.children.length && (this.isOpen || document.activeElement === this.input)) {
        if(!this.state.menu.children.length) {
          return
        }
        this.setState({
          isOpen: true
        }, function() {
          this.list.scrollTop = 0;
        }.bind(this))
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
  makeMenu = (children) => {
    var activedescendant;
    var isEmpty = true;

    // Should this instead use React.addons.cloneWithProps or React.cloneElement?
    var _children = React.Children.map(children, function(child, index) {
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
        newProps.id = props.id || 'ic-tokeninput-selected-'+(++guid);
        newProps.isSelected = true
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
  };

  getClassName = () => {
    var className = addClass(this.props.className, 'ic-tokeninput');
    if (this.state.isOpen)
      className = addClass(className, 'ic-tokeninput-is-open');
    return className;
  };

  /**
   * When the user begins typing again we need to clear out any state that has
   * to do with an existing or potential selection.
  */
  clearSelectedState = (cb) => {
    this.setState({
      focusedIndex: null,
      inputValue: null,
      value: null,
      matchedAutocompleteOption: null,
      activedescendant: null
    }, cb);
  };

  handleInputChange = () => {
    var value = this.input.value;
    this.clearSelectedState(function() {
      this.props.onInput(value);
    }.bind(this));
  };

  handleInputFocus = () => {
    this.props.onFocus();
    this.maybeShowList();
  };

  handleInputClick = () => {
    this.maybeShowList();
  };

  maybeShowList = () => {
    if (this.props.showListOnFocus){
      this.showList()
    }
  };

  handleInputBlur = () => {
    var focusedAnOption = this.state.focusedIndex != null;
    if (focusedAnOption)
      return;
    this.maybeSelectAutocompletedOption();
    this.hideList();
  };

  handleOptionBlur = () => {
    // don't want to hide the list if we focused another option
    this.blurTimer = setTimeout(this.hideList, 0);
  };

  handleOptionFocus = () => {
    // see `handleOptionBlur`
    clearTimeout(this.blurTimer);
  };

  handleInputKeyUp = (event) => {
    if (
      this.state.menu.isEmpty ||
      // autocompleting while backspacing feels super weird, so let's not
      event.keyCode === 8 /*backspace*/ ||
      !this.props.autocomplete.match(/both|inline/)
    ) return;
  };

  handleButtonClick = () => {
    this.state.isOpen ? this.hideList() : this.showList();
    this.focusInput();
  };

  showList = () => {
    if(!this.state.menu.children.length) {
      return
    }
    this.setState({isOpen: true})
  };

  hideList = () => {
    this.setState({
      isOpen: false,
      focusedIndex: null
    });
  };

  hideOnEscape = (event) => {
    this.hideList();
    this.focusInput();
    event.preventDefault();
  };

  focusInput = () => {
    this.input.focus();
  };

  selectInput = () => {
    this.input.select();
  }

  inputKeydownMap = {
    8: 'removeLastToken', // delete
    13: 'selectOnEnter', // enter
    188: 'selectOnEnter', // comma
    27: 'hideOnEscape', // escape
    38: 'focusPrevious', // up arrow
    40: 'focusNext' // down arrow
  }

  optionKeydownMap = {
    13: 'selectOption',
    27: 'hideOnEscape',
    38: 'focusPrevious',
    40: 'focusNext'
  }

  handleKeydown = (event) => {
    var handlerName = this.inputKeydownMap[event.keyCode];
    if (!handlerName)
      return
    this.setState({usingKeyboard: true});
    return this[handlerName].call(this,event);
  };

  handleOptionKeyDown = (child, event) => {
    var handlerName = this.optionKeydownMap[event.keyCode];
    if (!handlerName) {
      // if the user starts typing again while focused on an option, move focus
      // to the inpute, select so it wipes out any existing value
      this.selectInput();
      return;
    }
    event.preventDefault();
    this.setState({usingKeyboard: true});
    this[handlerName].call(this, child);
  };

  handleOptionMouseEnter = (index) => {
    if (this.state.usingKeyboard)
      this.setState({usingKeyboard: false});
    else
      this.focusOptionAtIndex(index);
  };

  selectOnEnter = (event) => {
    event.preventDefault();
    this.maybeSelectAutocompletedOption()
  };

  maybeSelectAutocompletedOption = () => {
    if (!this.state.matchedAutocompleteOption) {
      this.selectText()
    } else {
      this.selectOption(this.state.matchedAutocompleteOption, {focus: false});
    }
  };

  selectOption = (child, options) => {
    options = options || {};
    this.setState({
      // value: child.props.value,
      // inputValue: getLabel(child),
      matchedAutocompleteOption: null
    }, function() {
      this.props.onSelect(child.props.value, child);
      this.hideList();
      this.clearSelectedState(); // added
      if (options.focus !== false)
        this.selectInput();
    }.bind(this));
    this.input.value = '' // added
  };

  selectText = () => {
    var value = this.input.value;
    if(!value) return;
    this.props.onSelect(value);
    this.clearSelectedState();
    this.input.value = '' // added
  };

  focusNext = (event) => {
    if(event.preventDefault) event.preventDefault();
    if (this.state.menu.isEmpty) return;
    var index = this.nextFocusableIndex(this.state.focusedIndex)
    this.focusOptionAtIndex(index);
  };

  removeLastToken = () => {
    if(this.props.onRemoveLast && !this.input.value) {
      this.props.onRemoveLast()
    }
    return true
  };

  focusPrevious = (event) => {
    if(event.preventDefault) event.preventDefault();
    if (this.state.menu.isEmpty) return;
    var index = this.previousFocusableIndex(this.state.focusedIndex)
    this.focusOptionAtIndex(index);
  };

  focusSelectedOption = () => {
    var selectedIndex;
    React.Children.forEach(this.props.children, function(child, index) {
      if (child.props.value === this.state.value)
        selectedIndex = index;
    }.bind(this));
    this.showList();
    this.setState({
      focusedIndex: selectedIndex
    }, this.focusOption);
  };

  findInitialInputValue = () => {
    // TODO: might not need this, we should know this in `makeMenu`
    var inputValue;
    React.Children.forEach(this.props.children, function(child) {
      if (child.props.value === this.props.value)
        inputValue = getLabel(child);
    }.bind(this));
    return inputValue;
  };

  clampIndex = (index) => {
    if (index < 0) {
      return this.props.children.length - 1
    } else if (index >= this.props.children.length) {
      return 0
    }
    return index
  };

  scanForFocusableIndex = (index, increment) => {
    if (index === null || index === undefined) {
      index = increment > 0 ? this.clampIndex(-1) : 0
    }
    var newIndex = index
    while (true) {
      newIndex = this.clampIndex(newIndex + increment)
      if (newIndex === index ||
          this.props.children[newIndex].props.isFocusable)
      {
        return newIndex
      }
    }
  };

  nextFocusableIndex = (index) => {
    return this.scanForFocusableIndex(index, 1)
  };

  previousFocusableIndex = (index) => {
    return this.scanForFocusableIndex(index, -1)
  };

  focusOptionAtIndex = (index) => {
    if (!this.state.isOpen && this.state.value)
      return this.focusSelectedOption();
    this.showList();
    var length = this.props.children.length;
    if (index === -1)
      index = length - 1;
    else if (index === length)
      index = 0;
    this.setState({
      focusedIndex: index
    }, this.focusOption);
  };

  focusOption = () => {
    var index = this.state.focusedIndex;
    this.list.childNodes[index].focus();
  };

  state = {
    value: this.props.value,
    // the value displayed in the input
    inputValue: this.findInitialInputValue(),
    isOpen: false,
    focusedIndex: null,
    matchedAutocompleteOption: null,
    // this prevents crazy jumpiness since we focus options on mouseenter
    usingKeyboard: false,
    activedescendant: null,
    listId: 'ic-tokeninput-list-'+(++guid),
    menu: {
      children: [],
      activedescendant: null,
      isEmpty: true
    }
  }

  render() {
    var ariaLabel = this.props['aria-label'] || 'Start typing to search. ' +
      'Press the down arrow to navigate results. If you don\'t find an ' +
      'acceptable option, you can input an alternative. Once you find or ' +
      'input the tag you want, press Enter or Comma to add it.'

    return (
      <div className={this.getClassName()}>
        {this.props.value}
        {this.state.inputValue}
        <input
          ref={e => this.input = e}
          autoComplete="off"
          spellCheck="false"
          aria-label={ariaLabel}
          aria-expanded={this.state.isOpen+''}
          aria-haspopup="true"
          aria-activedescendant={this.state.menu.activedescendant}
          aria-autocomplete="list"
          aria-owns={this.state.listId}
          id={this.props.id}
          disabled={this.props.isDisabled}
          className="ic-tokeninput-input"
          onFocus={this.handleInputFocus}
          onClick={this.handleInputClick}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleKeydown}
          onKeyUp={this.handleInputKeyUp}
          placeholder={this.props.placeholder}
          role="combobox" />
        <span
          aria-hidden="true"
          className="ic-tokeninput-button"
          onClick={this.handleButtonClick}>
          ▾
        </span>
        <div
          id={this.state.listId}
          ref={e => this.list =e}
          className="ic-tokeninput-list"
          role="listbox">
          {this.state.menu.children}
        </div>
      </div>
    );
  }
}

function getLabel(component) {
  return component.props.label || component.props.children;
}

function matchFragment(userInput, firstChildLabel) {
  userInput = userInput.toLowerCase();
  firstChildLabel = firstChildLabel.toLowerCase();
  if (userInput === '' || userInput === firstChildLabel)
    return false;
  if (firstChildLabel.toLowerCase().indexOf(userInput.toLowerCase()) === -1)
    return false;
  return true;
}

module.exports = Combobox;