'use client'

/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, { useReducer } from 'react'

import PropTypes from 'prop-types'

import { RemixIconsLineSystemArrowDownSLine25 } from '../../icons/RemixIconsLineSystemArrowDownSLine25'
import { RemixIconsLineSystemArrowDownSLine69 } from '../../icons/RemixIconsLineSystemArrowDownSLine69'
import './style.css'

export const SelectCustome = ({
  inputText = 'Input',
  labelText = 'Label',
  supportingText = 'Help text',
  iconRight = true,
  placeholderText = 'Placeholder',
  showSupportingText = true,
  iconLeft = false,
  stateProp,
  textConfigurations,
  size,
  className,
  hasFormLabel = true,
  inputTextClassName,
  inputType = 'text'
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || 'disabled',
    textConfigurations: textConfigurations || 'placeholder-text',
    size: size || 'SM'
  })

  return (
    <div
      className={`select-custome ${state.state} ${className}`}
      onMouseEnter={() => {
        dispatch('mouse_enter')
      }}
      onMouseLeave={() => {
        dispatch('mouse_leave')
      }}
      onClick={() => {
        dispatch('click')
      }}
    >
      <div className={`text-field ${state.textConfigurations} state-${state.state} ${state.size}`}>
        <div className='form-control'>
          {((state.size === 'LG' && state.textConfigurations === 'input-text') ||
            (state.size === 'SM' && state.textConfigurations === 'input-text') ||
            (state.size === 'm' && state.state === 'disabled' && state.textConfigurations === 'input-text') ||
            (state.size === 'm' && state.state === 'error' && state.textConfigurations === 'input-text') ||
            (state.size === 'm' && state.state === 'focus' && state.textConfigurations === 'input-text') ||
            (state.size === 'm' && state.state === 'hover' && state.textConfigurations === 'input-text') ||
            (state.size === 'm' && state.state === 'success' && state.textConfigurations === 'input-text') ||
            (state.state === 'focus' && state.textConfigurations === 'label-text') ||
            state.textConfigurations === 'placeholder-text') && (
            <div className='form-label'>
              <div className='label-text-2'>{labelText}</div>
            </div>
          )}

          {state.state === 'default' && state.textConfigurations === 'input-text' && state.size === 'm' && (
            <>
              <>
                {hasFormLabel && (
                  <div className='label-text-wrapper'>
                    <div className='label-text-3'>{labelText}</div>
                  </div>
                )}
              </>
            </>
          )}

          <div className='content'>
            <div
              className={`placeholder-text-2 ${
                state.state === 'default' && state.textConfigurations === 'input-text' && state.size === 'm'
                  ? inputTextClassName
                  : undefined
              }`}
            >
              {(state.state === 'default' ||
                state.state === 'disabled' ||
                (state.state === 'error' && state.textConfigurations === 'label-text') ||
                (state.state === 'error' && state.textConfigurations === 'placeholder-text') ||
                (state.state === 'focus' && state.textConfigurations === 'placeholder-text') ||
                state.state === 'hover' ||
                (state.state === 'success' && state.textConfigurations === 'label-text') ||
                (state.state === 'success' && state.textConfigurations === 'placeholder-text')) && (
                <div className='placeholder-text-3'>
                  {state.textConfigurations === 'placeholder-text' && <>{placeholderText}</>}

                  {state.textConfigurations === 'input-text' && <>{inputText}</>}

                  {state.textConfigurations === 'label-text' && <>{labelText}</>}
                </div>
              )}

              {state.textConfigurations === 'label-text' && state.state === 'focus' && (
                <img className='caret' alt='Caret' src='/static/img/caret.svg' />
              )}

              {state.textConfigurations === 'input-text' && ['error', 'focus', 'success'].includes(state.state) && (
                <>
                  <input className='input' placeholder={inputText} type={inputType} />
                  <img className='caret-2' alt='Caret' src='/static/img/caret.svg' />
                </>
              )}
            </div>
          </div>
          {iconRight && (
            <>
              <>
                {['default', 'error', 'focus', 'hover', 'success'].includes(state.state) && (
                  <RemixIconsLineSystemArrowDownSLine25
                    className={`${state.size === 'm' ? 'class' : state.size === 'LG' ? 'class-2' : 'class-3'}`}
                    color='#2E263D'
                    opacity='0.9'
                  />
                )}

                {state.state === 'disabled' && (
                  <RemixIconsLineSystemArrowDownSLine69
                    className={`${state.size === 'm' ? 'class' : state.size === 'LG' ? 'class-2' : 'class-3'}`}
                  />
                )}
              </>
            </>
          )}
        </div>
      </div>
      {showSupportingText && (
        <div className='form-text'>
          <div className='supporting-text'>{supportingText}</div>
        </div>
      )}
    </div>
  )
}

function reducer(state, action) {
  if (state.size === 'SM' && state.state === 'hover' && state.textConfigurations === 'placeholder-text') {
    switch (action) {
      case 'mouse_leave':
        return {
          size: 'SM',
          state: 'default',
          textConfigurations: 'placeholder-text'
        }
    }
  }

  if (state.size === 'SM' && state.state === 'default' && state.textConfigurations === 'placeholder-text') {
    switch (action) {
      case 'mouse_enter':
        return {
          size: 'SM',
          state: 'hover',
          textConfigurations: 'placeholder-text'
        }
    }
  }

  if (state.size === 'SM' && state.state === 'hover' && state.textConfigurations === 'label-text') {
    switch (action) {
      case 'mouse_leave':
        return {
          size: 'SM',
          state: 'default',
          textConfigurations: 'label-text'
        }
    }
  }

  if (state.size === 'SM' && state.state === 'default' && state.textConfigurations === 'label-text') {
    switch (action) {
      case 'mouse_enter':
        return {
          size: 'SM',
          state: 'hover',
          textConfigurations: 'label-text'
        }
    }
  }

  if (state.size === 'SM' && state.state === 'hover' && state.textConfigurations === 'input-text') {
    switch (action) {
      case 'mouse_leave':
        return {
          size: 'SM',
          state: 'default',
          textConfigurations: 'input-text'
        }
    }
  }

  if (state.size === 'SM' && state.state === 'default' && state.textConfigurations === 'input-text') {
    switch (action) {
      case 'mouse_enter':
        return {
          size: 'SM',
          state: 'hover',
          textConfigurations: 'input-text'
        }
    }
  }

  if (state.size === 'm' && state.state === 'hover' && state.textConfigurations === 'placeholder-text') {
    switch (action) {
      case 'mouse_leave':
        return {
          size: 'm',
          state: 'default',
          textConfigurations: 'placeholder-text'
        }
    }
  }

  if (state.size === 'm' && state.state === 'default' && state.textConfigurations === 'placeholder-text') {
    switch (action) {
      case 'mouse_enter':
        return {
          size: 'm',
          state: 'hover',
          textConfigurations: 'placeholder-text'
        }
    }
  }

  if (state.size === 'm' && state.state === 'hover' && state.textConfigurations === 'label-text') {
    switch (action) {
      case 'mouse_leave':
        return {
          size: 'm',
          state: 'default',
          textConfigurations: 'label-text'
        }
    }
  }

  if (state.size === 'm' && state.state === 'default' && state.textConfigurations === 'label-text') {
    switch (action) {
      case 'mouse_enter':
        return {
          size: 'm',
          state: 'hover',
          textConfigurations: 'label-text'
        }
    }
  }

  if (state.size === 'm' && state.state === 'hover' && state.textConfigurations === 'input-text') {
    switch (action) {
      case 'mouse_leave':
        return {
          size: 'm',
          state: 'default',
          textConfigurations: 'input-text'
        }
    }
  }

  if (state.size === 'm' && state.state === 'default' && state.textConfigurations === 'input-text') {
    switch (action) {
      case 'mouse_enter':
        return {
          size: 'm',
          state: 'hover',
          textConfigurations: 'input-text'
        }
    }
  }

  if (state.size === 'LG' && state.state === 'hover' && state.textConfigurations === 'placeholder-text') {
    switch (action) {
      case 'mouse_leave':
        return {
          size: 'LG',
          state: 'default',
          textConfigurations: 'placeholder-text'
        }
    }
  }

  if (state.size === 'LG' && state.state === 'default' && state.textConfigurations === 'placeholder-text') {
    switch (action) {
      case 'mouse_enter':
        return {
          size: 'LG',
          state: 'hover',
          textConfigurations: 'placeholder-text'
        }
    }
  }

  if (state.size === 'LG' && state.state === 'hover' && state.textConfigurations === 'label-text') {
    switch (action) {
      case 'mouse_leave':
        return {
          size: 'LG',
          state: 'default',
          textConfigurations: 'label-text'
        }
    }
  }

  if (state.size === 'LG' && state.state === 'default' && state.textConfigurations === 'label-text') {
    switch (action) {
      case 'mouse_enter':
        return {
          size: 'LG',
          state: 'hover',
          textConfigurations: 'label-text'
        }
    }
  }

  if (state.size === 'LG' && state.state === 'hover' && state.textConfigurations === 'input-text') {
    switch (action) {
      case 'mouse_leave':
        return {
          size: 'LG',
          state: 'default',
          textConfigurations: 'input-text'
        }
    }
  }

  if (state.size === 'LG' && state.state === 'default' && state.textConfigurations === 'input-text') {
    switch (action) {
      case 'mouse_enter':
        return {
          size: 'LG',
          state: 'hover',
          textConfigurations: 'input-text'
        }
    }
  }

  switch (action) {
    case 'click':
      return {
        ...state,
        state: 'focus'
      }
  }

  return state
}

SelectCustome.propTypes = {
  inputText: PropTypes.string,
  labelText: PropTypes.string,
  supportingText: PropTypes.string,
  iconRight: PropTypes.bool,
  placeholderText: PropTypes.string,
  showSupportingText: PropTypes.bool,
  iconLeft: PropTypes.bool,
  stateProp: PropTypes.oneOf(['default', 'success', 'focus', 'hover', 'error', 'disabled']),
  textConfigurations: PropTypes.oneOf(['input-text', 'label-text', 'placeholder-text']),
  size: PropTypes.oneOf(['m', 'SM', 'LG']),
  hasFormLabel: PropTypes.bool,
  inputType: PropTypes.string
}
