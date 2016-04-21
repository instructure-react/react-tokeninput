import React from 'react';

const K_ENTER = 13;

function handleClick(onRemove, value) {
  if (typeof onRemove === 'function') {
    onRemove(value);
  }
}

function handleKeyDown(onRemove, value, event) {
  if (event.keyCode === K_ENTER && typeof onRemove === 'function') {
    onRemove(value);
  }
}

export default function Token({ name, value, onRemove }) {
  const clickHandler = handleClick.bind(this, onRemove, value);
  const keyDownHandler = handleKeyDown.bind(this, onRemove, value);

  return (
    <li className="ic-token ic-tokeninput-inline-flex">
      <span
        role="button"
        onClick={clickHandler}
        onKeyDown={keyDownHandler}
        ariaLabel={`Remove '${name}'`}
        className="ic-token-delete-button"
        tabIndex="0"
      >✕</span>
      <span>{name}</span>
    </li>
  );
}

Token.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  onRemove: React.PropTypes.func,
};
