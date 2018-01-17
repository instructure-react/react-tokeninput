var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var span = React.createFactory("span");
var li = React.createFactory('li');

module.exports = createReactClass({
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
          onFocus: this.props.onFocus,
          onKeyDown: this.handleKeyDown,
          'aria-label': this.ariaLabelRemove(),
          className: "ic-token-delete-button",
          tabIndex: 0
        }, "✕")
      )
    )
  }
})
