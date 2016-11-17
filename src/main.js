var React = require('react');
var Combobox = React.createFactory(require('./combobox'));
var Token = React.createFactory(require('./token'));
var classnames = require('classnames');

var ul = React.DOM.ul;
var li = React.DOM.li;

module.exports = React.createClass({
  propTypes: {
    isLoading: React.PropTypes.bool,
    loadingComponent: React.PropTypes.any,
    onInput: React.PropTypes.func,
    onSelect: React.PropTypes.func.isRequired,
    tokenAriaFunc: React.PropTypes.func,
    onRemove: React.PropTypes.func.isRequired,
    selected: React.PropTypes.array.isRequired,
    menuContent: React.PropTypes.any,
    showListOnFocus: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    hideMenuOnSelect: React.PropTypes.bool
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
          onInput: this.handleInput,
          showListOnFocus: this.props.showListOnFocus,
          onSelect: this.handleSelect,
          onRemoveLast: this.handleRemoveLast,
          value: this.state.selectedToken,
          isDisabled: isDisabled,
          placeholder: this.props.placeholder,
          hideMenuOnSelect: this.props.hideMenuOnSelect
        },
          this.props.menuContent
        )
      ),
      this.props.isLoading && li({className: 'ic-tokeninput-loading flex'}, this.props.loadingComponent)
    );
  }
})
