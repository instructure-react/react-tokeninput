var PropTypes = require('prop-types');
var React = require('react');
var Combobox = require('./combobox');
var Token = require('./token');
var classnames = require('classnames');

class TokenInput extends React.Component {
  static propTypes = {
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
  };

  state = {
    selectedToken: null
  };

  handleClick = () => {
    // TODO: Expand combobox API for focus
    this.comboLi.querySelector('input').focus();
  };

  handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  handleInput = (inputValue) => {
    this.props.onInput(inputValue);
  };

  handleSelect = (event, option) => {
    var input = this.comboLi.querySelector('input');
    this.props.onSelect(event, option)
    this.setState({
      selectedToken: null
    })
    this.props.onInput(input.value);
  };

  handleRemove = (value) => {
    var input = this.comboLi.querySelector('input');
    this.props.onRemove(value);
    input.focus();
  };

  handleRemoveLast = () => {
    this.props.onRemove(this.props.selected[this.props.selected.length - 1]);
  };

  render() {
    var isDisabled = this.props.isDisabled;
    var tokens = this.props.selected.map(function(token) {
      return (
        <Token
          tokenAriaFunc={this.props.tokenAriaFunc}
          onFocus={this.handleFocus}
          onRemove={this.handleRemove}
          value={token}
          name={token.name}
          key={token.id} />
      );
    }.bind(this))

    var classes = classnames('ic-tokens flex', {
      'ic-tokens-disabled': isDisabled
    });

    return (
      <ul className={classes} onClick={this.handleClick}>
        {tokens}
        <li className="inline-flex" ref={e => this.comboLi = e}>
          <Combobox
            id={this.props.id}
            aria-label={this.props['combobox-aria-label']}
            ariaDisabled={isDisabled}
            onFocus={this.handleFocus}
            onInput={this.handleInput}
            showListOnFocus={this.props.showListOnFocus}
            onSelect={this.handleSelect}
            onRemoveLast={this.handleRemoveLast}
            value={this.state.selectedToken}
            isDisabled={isDisabled}
            placeholder={this.props.placeholder}>
            {this.props.menuContent}
          </Combobox>
        </li>
        {this.props.isLoading && <li className="ic-tokeninput-loading flex">
          {this.props.loadingComponent}
        </li>}
      </ul>
    );
  }
}

module.exports = TokenInput
