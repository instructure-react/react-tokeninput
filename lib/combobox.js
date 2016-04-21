import React from 'react';
import classnames from 'classnames';
import ComboboxOption from './option';

let guid = 0;

const K_BACKSPACE = 8;

function emptyFunction() {

}

const KEYDOWN_MAPS = {
  inputKeydownMap: {
    [K_BACKSPACE]: 'removeLastToken',
    13: 'selectOnEnter',
    27: 'hideOnEscape',
    38: 'focusPrevious',
    40: 'focusNext',
  },

  optionKeydownMap: {
    13: 'selectOption',
    27: 'hideOnEscape',
    38: 'focusPrevious',
    40: 'focusNext',
  },
};

export default class ComboBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.focusOption = this.focusOption.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleOptionBlur = this.handleOptionBlur.bind(this);
    this.handleOptionFocus = this.handleOptionFocus.bind(this);
    this.handleOptionKeyDown = this.handleOptionKeyDown.bind(this);
    this.handleOptionMouseEnter = this.handleOptionMouseEnter.bind(this);
    this.hideList = this.hideList.bind(this);
    this.selectOption = this.selectOption.bind(this);

    this.state = {
      value: props.value,
      // the value displayed in the input
      inputValue: this.findInitialInputValue(),
      isOpen: false,
      focusedIndex: null,
      matchedAutocompleteOption: null,
      // this prevents crazy jumpiness since we focus options on mouseenter
      usingKeyboard: false,
      activedescendant: null,
      listId: `ic-tokeninput-list-${++guid}`,
      menu: {
        children: [],
        activedescendant: null,
        isEmpty: true,
      },
    };
  }

  componentWillMount() {
    this.setState({ menu: this.makeMenu(this.props.children) });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ menu: this.makeMenu(newProps.children) }, () => {
      if (newProps.children.length && (this.isOpen || document.activeElement === this.refs.input)) {
        if (!this.state.menu.children.length) {
          return;
        }
        this.setState({ isOpen: true }, () => {
          this.refs.list.scrollTop = 0;
        });
      } else {
        this.hideList();
      }
    });
  }

  getClassName() {
    return classnames(this.props.className, 'ic-tokeninput', {
      'ic-tokeninput-is-open': this.state.isOpen,
    });
  }

  /**
   * We don't create the <ComboboxOption> components, the user supplies them,
   * so before rendering we attach handlers to facilitate communication from
   * the ComboboxOption to the Combobox.
  */
  makeMenu(children) {
    let activedescendant;
    let isEmpty = true;

    // Should this instead use React.addons.cloneWithProps or React.cloneElement?
    const _children = React.Children.map(children, (child, index) => {
      // console.log(child.type, ComboboxOption.type)
      if (child.type !== ComboboxOption) {
        // allow random elements to live in this list
        return child;
      }
      isEmpty = false;
      // TODO: cloneWithProps and map instead of altering the children in-place
      const { props } = child;
      const newProps = {
        onBlur: this.handleOptionBlur,
        onClick: this.selectOption.bind(this, child),
        onFocus: this.handleOptionFocus,
        onKeyDown: this.handleOptionKeyDown.bind(this, child),
        onMouseEnter: this.handleOptionMouseEnter.bind(this, index),
        isSelected: this.state.value === props.value,
      };

      if (this.state.value === props.value) {
        // need an ID for WAI-ARIA
        newProps.id = props.id || `ic-tokeninput-selected-${++guid}`;
        activedescendant = props.id;
      }

      return React.cloneElement(child, newProps);
    });

    return {
      children: _children,
      activedescendant,
      isEmpty,
    };
  }

  /**
   * When the user begins typing again we need to clear out any state that has
   * to do with an existing or potential selection.
  */
  clearSelectedState(cb) {
    this.setState({
      focusedIndex: null,
      inputValue: null,
      value: null,
      matchedAutocompleteOption: null,
      activedescendant: null,
    }, cb);
  }

  handleInputChange() {
    const { value } = this.refs.input;
    this.clearSelectedState(() => {
      this.props.onInput(value);
    });
  }

  handleInputFocus() {
    this.maybeShowList();
  }

  handleInputClick() {
    this.maybeShowList();
  }

  maybeShowList() {
    if (this.props.showListOnFocus) {
      this.showList();
    }
  }

  handleInputBlur() {
    const focusedAnOption = this.state.focusedIndex !== null
      && this.state.focusedIndex !== undefined;
    if (focusedAnOption) {
      return;
    }
    this.maybeSelectAutocompletedOption();
    this.hideList();
  }

  handleOptionBlur() {
    // don't want to hide the list if we focused another option
    this.blurTimer = setTimeout(this.hideList, 0);
  }

  handleOptionFocus() {
    // see `handleOptionBlur`
    clearTimeout(this.blurTimer);
  }

  handleInputKeyUp(event) {
    if (
      this.state.menu.isEmpty
      // autocompleting while backspacing feels super weird, so let's not
      || event.keyCode === K_BACKSPACE
      || !this.props.autocomplete.match(/both|inline/)
    ) return;
  }

  handleButtonClick() {
    if (this.state.isOpen) {
      this.hideList();
    } else {
      this.showList();
    }
    this.focusInput();
  }

  showList() {
    if (!this.state.menu.children.length) {
      return;
    }
    this.setState({ isOpen: true });
  }

  hideList() {
    this.setState({
      isOpen: false,
      focusedIndex: null,
    });
  }

  hideOnEscape(event) {
    this.hideList();
    this.focusInput();
    event.preventDefault();
  }

  focusInput() {
    this.refs.input.focus();
  }

  selectInput() {
    this.refs.input.select();
  }

  handleKeydown(event) {
    const handlerName = KEYDOWN_MAPS.inputKeydownMap[event.keyCode];
    if (!handlerName) {
      return null;
    }
    this.setState({ usingKeyboard: true });
    return this[handlerName].call(this, event);
  }

  handleOptionKeyDown(child, event) {
    const handlerName = KEYDOWN_MAPS.optionKeydownMap[event.keyCode];
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

  handleOptionMouseEnter(index) {
    if (this.state.usingKeyboard) {
      this.setState({ usingKeyboard: false });
    } else {
      this.focusOptionAtIndex(index);
    }
  }

  selectOnEnter(event) {
    event.preventDefault();
    this.maybeSelectAutocompletedOption();
  }

  maybeSelectAutocompletedOption() {
    if (!this.state.matchedAutocompleteOption) {
      this.selectText();
    } else {
      this.selectOption(this.state.matchedAutocompleteOption, { focus: false });
    }
  }

  selectOption(child, options = {}) {
    this.setState({
      // value: child.props.value,
      // inputValue: getLabel(child),
      matchedAutocompleteOption: null,
    }, () => {
      this.props.onSelect(child.props.value, child);
      this.hideList();
      this.clearSelectedState(); // added
      if (options.focus !== false) {
        this.selectInput();
      }
    });
    this.refs.input.value = ''; // added
  }

  selectText() {
    const value = this.refs.input.value;
    if (!value) {
      return;
    }
    this.props.onSelect(value);
    this.clearSelectedState();
    this.refs.input.value = ''; // added
  }

  focusNext(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }

    if (this.state.menu.isEmpty) {
      return;
    }

    const index = this.state.focusedIndex === null ?
      0 : this.state.focusedIndex + 1;
    this.focusOptionAtIndex(index);
  }

  removeLastToken() {
    if (this.props.onRemoveLast && !this.refs.input.value) {
      this.props.onRemoveLast();
    }
    return true;
  }

  focusPrevious(event) {
    if (event.preventDefault) event.preventDefault();
    if (this.state.menu.isEmpty) return;
    const last = this.props.children.length - 1;
    const index = this.state.focusedIndex === null ?
      last : this.state.focusedIndex - 1;
    this.focusOptionAtIndex(index);
  }

  focusSelectedOption() {
    let selectedIndex;
    React.Children.forEach(this.props.children, (child, index) => {
      if (child.props.value === this.state.value) {
        selectedIndex = index;
      }
    });
    this.showList();
    this.setState({
      focusedIndex: selectedIndex,
    }, this.focusOption);
  }

  findInitialInputValue() {
    // TODO: might not need this, we should know this in `makeMenu`
    let inputValue;
    React.Children.forEach(this.props.children, (child) => {
      if (child.props.value === this.props.value) {
        inputValue = child.props.label || child.props.children;
      }
    });
    return inputValue;
  }

  focusOptionAtIndex(index) {
    let focusedIndex = index;
    if (!this.state.isOpen && this.state.value) {
      this.focusSelectedOption();
      return;
    }

    this.showList();
    const { length } = this.props.children;

    if (focusedIndex === -1) {
      focusedIndex = length - 1;
    } else if (index === length) {
      focusedIndex = 0;
    }
    this.setState({ focusedIndex }, this.focusOption);
  }

  focusOption() {
    const index = this.state.focusedIndex;
    this.refs.list.childNodes[index].focus();
  }

  render() {
    const ariaLabel = this.props.ariaLabel || 'Start typing to search. ' +
      'Press the down arrow to navigate results. If you don\'t find an ' +
      'acceptable option, you can enter an alternative.';

    return (
      <div className={this.getClassName()}>
        {this.props.value}
        {this.state.inputValue}
        <input
          ref="input"
          autoComplete="off"
          spellCheck="false"
          ariaLabel={ariaLabel}
          ariaExpanded={`${this.state.isOpen}`}
          ariaHaspopup="true"
          ariaActivedescendant={this.state.menu.activedescendant}
          ariaAutocomplete="list"
          ariaOwns={this.state.listId}
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
          role="combobox"
        />
        <span
          ariaHidden="true"
          className="ic-tokeninput-button"
          onClick={this.handleButtonClick}
        >▾</span>
        <div
          id={this.state.listId}
          ref="list"
          className="ic-tokeninput-list"
          role="listbox"
        >{this.state.menu.children}</div>
      </div>
    );
  }
}

ComboBox.defaultProps = {
  autocomplete: 'both',
  onInput: emptyFunction,
  onSelect: emptyFunction,
  value: null,
  showListOnFocus: false,
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
  onInput: React.PropTypes.func,

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
  onSelect: React.PropTypes.func,

  /**
   * Shown when the combobox is empty.
  */
  placeholder: React.PropTypes.string,

  value: React.PropTypes.any,
  children: React.PropTypes.node,
  isDisabled: React.PropTypes.bool,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  ariaLabel: React.PropTypes.string,
  onRemoveLast: React.PropTypes.func,
  autocomplete: React.PropTypes.string,
  showListOnFocus: React.PropTypes.bool,
};
