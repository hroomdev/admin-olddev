/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/
import React from 'react'

import PropTypes from 'prop-types'

export const RemixIconsLineBusinessBarChartBoxLine = ({ color = '#2E263D', className }) => {
  return (
    <svg
      className={`remix-icons-line-business-bar-chart-box-line ${className}`}
      fill='none'
      height='22'
      viewBox='0 0 22 22'
      width='22'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        className='path-5'
        d='M2.75001 2.75H19.25C19.4931 2.75 19.7263 2.84658 19.8982 3.01849C20.0701 3.19039 20.1667 3.42355 20.1667 3.66667V18.3333C20.1667 18.5764 20.0701 18.8096 19.8982 18.9815C19.7263 19.1534 19.4931 19.25 19.25 19.25H2.75001C2.5069 19.25 2.27374 19.1534 2.10183 18.9815C1.92992 18.8096 1.83334 18.5764 1.83334 18.3333V3.66667C1.83334 3.42355 1.92992 3.19039 2.10183 3.01849C2.27374 2.84658 2.5069 2.75 2.75001 2.75ZM3.66668 4.58333V17.4167H18.3333V4.58333H3.66668ZM6.41668 11.9167H8.25001V15.5833H6.41668V11.9167ZM10.0833 6.41667H11.9167V15.5833H10.0833V6.41667ZM13.75 9.16667H15.5833V15.5833H13.75V9.16667Z'
        fill={color}
        fillOpacity='0.9'
      />
    </svg>
  )
}

RemixIconsLineBusinessBarChartBoxLine.propTypes = {
  color: PropTypes.string
}
