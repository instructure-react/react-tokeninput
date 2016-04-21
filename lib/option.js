import React from 'react';
import classnames from 'classnames';

export default function TokenInputOption(props) {
  const { className, isSelected } = props;
  const divProps = {};

  for (const prop in props) {
    if (!props.hasOwnProperty(prop)) {
      continue;
    }

    if (prop !== 'className' && prop !== 'aiaSelected') {
      divProps[prop] = props[prop];
    }
  }

  const divClassName = classnames(className, 'ic-tokeninput-selected', {
    'ic-tokeninput-selected': isSelected,
  });
  return <div ariaSelected={isSelected} className={divClassName} {...divProps} />;
}

TokenInputOption.propTypes = {
  /**
   * The value that will be sent to the `onSelect` handler of the
   * parent Combobox.
  */
  value: React.PropTypes.any.isRequired,

  /**
   * What value to put into the input element when this option is
   * selected, defaults to its children coerced to a string.
  */
  label: React.PropTypes.string,

  className: React.PropTypes.string,
  isSelected: React.PropTypes.bool,
};

TokenInputOption.defaultProps = {
  role: 'option',
  tabIndex: '-1',
  className: 'ic-tokeninput-option',
  isSelected: false,
};
