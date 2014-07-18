var React = require('react');
var span = React.DOM.span;
var li = React.DOM.li;

module.exports = React.createClass({
  handleClick: function() {
    this.props.onRemove(this.props.value)
  },

  render: function() {
    return (
      li({className: "ic-token inline-flex"},
        span({onClick: this.handleClick, className: "ic-token-close-button"}, "✕"),
        span({className: "ic-token-label"}, this.props.name)
      )
    )
  }
})
