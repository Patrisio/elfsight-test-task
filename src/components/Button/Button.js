import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import './Button.scss';

export default class Button extends React.Component {
  render() {
    const props = this.props;
    const theme = props.theme || 'light';
    
    return (
      <button
        className={`lightbox__btn lightbox__btn--${theme}`}
        onClick={ props.onClick && props.onClick.bind(this) }
      >
        <Icon
          icon={props.icon}
          size={props.size}
        />
      </button>
    )
  }
}

Button.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number,
  theme: PropTypes.string,
};
