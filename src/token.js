var React = require('react');
var span = React.DOM.span;
var li = React.createFactory('li');

module.exports = React.createClass({
  handleClick: function() {
    this.props.onRemove(this.props.value)
  },

  handleKeyDown: function(key) {
    var enterKey = 13;
    if(key.keyCode === enterKey) this.props.onRemove(this.props.value)
  },

  ariaLabelRemove: function ariaLabelRemove() {
    return this.props.tokenAriaFunc ? this.props.tokenAriaFunc(this.props.name) :
      'Remove \'' + this.props.name + '\'';
  },

  render: function() {
    return (
      li({
        className: "ic-token inline-flex"
      },
        span({className: "ic-token-label"}, this.props.name),
        span({
          role: 'button',
          onClick: this.handleClick,
          onKeyDown: this.handleKeyDown,
          'aria-label': this.ariaLabelRemove(),
          className: "ic-token-delete-button",
          tabIndex: 0
        }, "✕")
      )
    )
  }
})
