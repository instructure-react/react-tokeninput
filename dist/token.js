/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({displayName: 'exports',
  handleClick: function() {
    this.props.onRemove(this.props.value)
  },

  render: function() {
    return (
      React.DOM.li( {className:"ic-token inline-flex"}, 
        React.DOM.span( {onClick:this.handleClick, className:"ic-token-close-button"}, "✕"),
        React.DOM.span( {className:"ic-token-label"}, this.props.name)
      )
    )
  }
})
