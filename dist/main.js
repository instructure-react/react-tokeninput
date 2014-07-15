/** @jsx React.DOM */

var React = require('react')
var Combobox = require('./combobox')
var ComboboxOption = require('./option')
var Token = require('./token')

module.exports = React.createClass({displayName: 'exports',
  propTypes: {
    onInput: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onInput: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      selectedToken: null
    };
  },

  handleClick: function() {
    // TODO: Expand combobox API for focus
    this.refs['combo-li'].getDOMNode().querySelector('input').focus()
  },

  handleInput: function(event) {
    this.props.onInput(event)
  },

  handleSelect: function(event) {
    this.props.onSelect(event)
    this.setState({
      selectedToken: null
    })
  },

  handleRemove: function(event) {
    this.props.onRemove(event)
  },

  render: function() {
    var tokens = this.props.selected.map(function(token) {
      return (
        Token(
          {onRemove:this.handleRemove,
          value:token,
          name:token.name,
          key:token.id} )
      )
    }.bind(this))

    return (
      React.DOM.ul( {className:"ic-tokens", onClick:this.handleClick}, 
        tokens,
        React.DOM.li( {className:"inline-flex", ref:"combo-li"}, 
          Combobox(
            {onInput:this.handleInput,
            onSelect:this.handleSelect,
            autocomplete:"list",
            value:this.state.selectedToken}
          , 
            this.props.menuContent
          )
        )
      )
    );
  }
})
