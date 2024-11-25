/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from 'react'

import PropTypes from 'prop-types'

export const Icon13 = ({ color = '#56CA00', opacity = 'unset', className }) => {
  return (
    <svg
      className={`icon-13 ${className}`}
      fill='none'
      height='24'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        className='path-5'
        d='M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z'
        fill={color}
        fillOpacity={opacity}
      />
    </svg>
  )
}

Icon13.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.string
}
