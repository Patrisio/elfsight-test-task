import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../../utils/iconConstants';

const Icon = ({ icon, size, children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox={`-6 -6 36 36`}
  >
    {children}
    {icons[icon].map(path => <path key={path} d={path}/> )}
  </svg>
);

export default Icon;

Icon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.number,
  children: PropTypes.node,
};