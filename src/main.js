var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var Combobox = React.createFactory(require('./combobox'));
var Token = React.createFactory(require('./token'));
var classnames = require('classnames');

var ul = React.createFactory("ul");
var li = React.createFactory("li");

module.exports = createReactClass({
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

  getInitialState: function() {
    return {
      selectedToken: null
    };
  },

  handleClick: function() {
    // TODO: Expand combobox API for focus
    this.refs['combo-li'].querySelector('input').focus();
  },

  handleFocus: function() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  },

  handleInput: function(inputValue) {
    this.props.onInput(inputValue);
  },

  handleSelect: function(event, option) {
    var input = this.refs['combo-li'].querySelector('input');
    this.props.onSelect(event, option)
    this.setState({
      selectedToken: null
    })
    this.props.onInput(input.value);
  },

  handleRemove: function(value) {
    var input = this.refs['combo-li'].querySelector('input');
    this.props.onRemove(value);
    input.focus();
  },

  handleRemoveLast: function() {
    this.props.onRemove(this.props.selected[this.props.selected.length - 1]);
  },

  render: function() {
    var isDisabled = this.props.isDisabled;
    var tokens = this.props.selected.map(function(token) {
      return (
        Token({
          tokenAriaFunc: this.props.tokenAriaFunc,
          onFocus: this.handleFocus,
          onRemove: this.handleRemove,
          value: token,
          name: token.name,
          key: token.id})
      )
    }.bind(this))

    var classes = classnames('ic-tokens flex', {
      'ic-tokens-disabled': isDisabled
    });

    return ul({className: classes, onClick: this.handleClick},
      tokens,
      li({className: 'inline-flex', ref: 'combo-li'},
        Combobox({
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
        },
          this.props.menuContent
        )
      ),
      this.props.isLoading && li({className: 'ic-tokeninput-loading flex'}, this.props.loadingComponent)
    );
  }
})
