import React from 'react';
import Combobox from './combobox';
import Token from './token';
import classnames from 'classnames';

export default class TokenInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRemoveLast = this.handleRemoveLast.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      selectedToken: null,
    };
  }

  handleClick() {
    // TODO: Expand combobox API for focus
    this.refs['combo-li'].querySelector('input').focus();
  }

  handleInput(inputValue) {
    this.props.onInput(inputValue);
  }

  handleSelect(event) {
    const input = this.refs['combo-li'].querySelector('input');
    this.props.onSelect(event);
    this.setState({
      selectedToken: null,
    });
    this.props.onInput(input.value);
  }

  handleRemove(value) {
    const input = this.refs['combo-li'].querySelector('input');
    this.props.onRemove(value);
    input.focus();
  }

  handleRemoveLast() {
    this.props.onRemove(this.props.selected[this.props.selected.length - 1]);
  }

  render() {
    const { isDisabled } = this.props;

    const tokens = this.props.selected.map(token => (
      <Token
        onRemove={this.handleRemove}
        value={token}
        name={token.name}
        key={token.id}
      />
    ));

    const classes = classnames('ic-tokens ic-tokeninput-flex', {
      'ic-tokens-disabled': isDisabled,
    });

    const loadingWidget = this.props.isLoading
        && <li className="ic-tokeninput-loading ic-tokeninput-flex">{this.props.loadingComponent}</li>;

    return (
      <ul className={classes} onClick={this.handleClick}>
        {tokens}
        <li className="ic-tokeninput-inline-flex" ref="combo-li">
          <Combobox
            id={this.props.id}
            ariaLabel={this.props.ariaLabel}
            ariaDisabled={isDisabled}
            onInput={this.handleInput}
            showListOnFocus={this.props.showListOnFocus}
            onSelect={this.handleSelect}
            onRemoveLast={this.handleRemoveLast}
            value={this.state.selectedToken}
            isDisabled={isDisabled}
            placeholder={this.props.placeholder}
          >
            {this.props.menuContent}
          </Combobox>
        </li>
        {loadingWidget}
      </ul>
    );
  }
}

TokenInput.propTypes = {
  isLoading: React.PropTypes.bool,
  loadingComponent: React.PropTypes.any,
  onInput: React.PropTypes.func,
  onSelect: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  selected: React.PropTypes.array.isRequired,
  menuContent: React.PropTypes.any,
  showListOnFocus: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  isDisabled: React.PropTypes.bool,
  ariaLabel: React.PropTypes.string,
  id: React.PropTypes.string,
};
