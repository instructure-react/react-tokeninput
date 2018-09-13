var React = require('react');

class Token extends React.Component {
  handleClick = () => {
    this.props.onRemove(this.props.value)
  };

  handleKeyDown = (key) => {
    var enterKey = 13;
    if(key.keyCode === enterKey) this.props.onRemove(this.props.value)
  };

  ariaLabelRemove = () => {
    return this.props.tokenAriaFunc ? this.props.tokenAriaFunc(this.props.name) :
      'Remove \'' + this.props.name + '\'';
  };

  render() {
    return (
      <li className="ic-token inline-flex">
        <span className="ic-token-label">
          {this.props.name}
        </span>
        <span
          role="button"
          onClick={this.handleClick}
          onFocus={this.props.onFocus}
          onKeyDown={this.handleKeyDown}
          aria-label={this.ariaLabelRemove()}
          className="ic-token-delete-button"
          tabIndex={0}>
          ✕
        </span>
      </li>
    );
  }
}

module.exports = Token;
