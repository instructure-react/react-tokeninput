import React from 'react'
import PropTypes from 'prop-types'

import Combobox from './combobox'
import Token from './token'

export class Main extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    loadingComponent: PropTypes.any,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onInput: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    tokenAriaFunc: PropTypes.func,
    onRemove: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    menuContent: PropTypes.any,
    showListOnFocus: PropTypes.bool,
    placeholder: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedToken: null
    }

    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    // TODO: Expand combobox API for focus
    this.refs['combo-li'].querySelector('input').focus();
  }

  handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  handleBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  handleInput = (inputValue) => {
    this.props.onInput(inputValue);
  }

  handleSelect = (event, option) => {
    var input = this.refs['combo-li'].querySelector('input');
    this.props.onSelect(event, option)
    this.setState({
      selectedToken: null
    })
    this.props.onInput(input.value);
  }

  handleRemove = (value) => {
    var input = this.refs['combo-li'].querySelector('input');
    this.props.onRemove(value);
    input.focus();
  }

  handleRemoveLast = () => {
    this.props.onRemove(this.props.selected[this.props.selected.length - 1]);
  }

  render() {
    var isDisabled = this.props.isDisabled;
    var tokens = this.props.selected.map((token) => {
      return (
        <Token
          tokenAriaFunc={this.props.tokenAriaFunc}
          onFocus={this.handleFocus}
          onRemove={this.handleRemove}
          value={token}
          name={token.name}
          key={token.id}
        />
      )
    })

    let classes = 'ic-tokens flex'
    classes += isDisabled ? ' ic-tokens-disabled' : ''

    return (
      <ul className={classes} onClick={this.handleClick}>
        {tokens}
        <li className='inline-flex' ref='combo-li'>
          <Combobox
            id={this.props.id}
            aria-label={this.props['combobox-aria-label']}
            ariaDisabled={isDisabled}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
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

        {this.props.isLoading &&
          <li className='ic-tokeninput-loading flex'>{this.props.loadingComponent}</li>
        }
      </ul>
    )
  }
}

export default Main
