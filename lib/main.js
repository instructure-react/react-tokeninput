var React = require('react');
var Combobox = require('./combobox');
var Token = require('./token');
var ul = React.DOM.ul;
var li = React.DOM.li;

module.exports = React.createClass({
  propTypes: {
    onInput: React.PropTypes.func,
    onSelect: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    selected: React.PropTypes.array.isRequired,
    menuContent: React.PropTypes.any
  },

  getInitialState: function() {
    return {
      selectedToken: null
    };
  },

  handleClick: function() {
    // TODO: Expand combobox API for focus
    this.refs['combo-li'].getDOMNode().querySelector('input').focus();
  },

  handleInput: function(event) {
    this.props.onInput(event);
  },

  handleSelect: function(event) {
    this.props.onSelect(event)
    this.setState({
      selectedToken: null
    })
  },

  handleRemove: function(value) {
    this.props.onRemove(value);
    this.refs['combo-li'].getDOMNode().querySelector('input').focus();
  },

  handleRemoveLast: function() {
    this.props.onRemove(this.props.selected[this.props.selected.length - 1]);
  },

  render: function() {
    var tokens = this.props.selected.map(function(token) {
      return (
        Token({
          onRemove: this.handleRemove,
          value: token,
          name: token.name,
          key: token.id})
      )
    }.bind(this))

    return ul({className: "ic-tokens", onClick: this.handleClick},
      tokens,
      li({className: "inline-flex", ref: "combo-li"},
        Combobox({
          onInput: this.handleInput,
          onSelect: this.handleSelect,
          onRemoveLast: this.handleRemoveLast,
          autocomplete: "list",
          value: this.state.selectedToken
        },
          this.props.menuContent
        )
      )
    );
  }
})
