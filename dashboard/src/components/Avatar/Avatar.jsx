/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from 'react'

import PropTypes from 'prop-types'

import { RemixIconsLineUserStarSmileLine7 } from '../../icons/RemixIconsLineUserStarSmileLine7'
import './style.css'

export const Avatar = ({ variant, badge, icon, image, className }) => {
  return (
    <div className={`avatar image-${image} badge-${badge} ${variant} icon-${icon} ${className}`}>
      {(badge || (!icon && !image)) && (
        <div className='AK'>
          {!badge && <>AK</>}

          {badge && (
            <div className='overlap-group-6'>
              {(!image || variant === 'rounded') && (
                <div className='div'>
                  {!image && !icon && <div className='text-wrapper'>OP</div>}

                  {icon && <RemixIconsLineUserStarSmileLine7 className='remix-icons-line' color='#2E263D' />}
                </div>
              )}

              <div className='border'>
                {(!image || variant === 'circle' || variant === 'rounded') && <div className='badge' />}
              </div>
            </div>
          )}
        </div>
      )}

      {!badge && icon && <RemixIconsLineUserStarSmileLine7 className='remix-icons-line' color='#2E263D' />}
    </div>
  )
}

Avatar.propTypes = {
  variant: PropTypes.oneOf(['circle', 'rounded', 'square']),
  badge: PropTypes.bool,
  icon: PropTypes.bool,
  image: PropTypes.bool
}
