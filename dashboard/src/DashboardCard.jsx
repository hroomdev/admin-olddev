'use client'

import { useState } from 'react'

// MUI Imports
import MuiCard from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import './../../../../app/globals.css'

//Component Imports
import PropTypes from 'prop-types'

//styling

//sb imports

const Card = styled(MuiCard)(({ bbcolor }) => ({
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, margin 0.3s ease-in-out',
  borderBottomWidth: '2px',
  borderBottomColor: `var(--mui-palette-` + bbcolor + `-main)`,
  '[data-skin="bordered"] &:hover': {
    boxShadow: 'none'
  },
  '&:hover': {
    borderBottomWidth: '3px',
    borderBottomColor: 'var(--mui-palette-' + bbcolor + '-main)',
    boxShadow: 'var(--mui-customShadows-xl)',
    marginBlockEnd: '-1px'
  }
}))

const MyChip = styled(Chip)(({ backcolor }) => ({
  fontWeight: 500,
  backgroundColor: 'var(--mui-palette-' + backcolor + ')'
}))

const titleDefault = 'Найдите слабые метрики команд и ознакомьтесь с советами помощника.'

const ritoricDefault = 'Что делать дальше'
const chipLabelDefault = 'рекомендация'
const borderColorDefault = 'primary'
const chipBackgroundColorDefault = 'action-selected'
const showAvatarIconDefault = ''

const DashboardCard = props => {
  // Props
  const [showAcatarIcon, setShowAvatarIcon] = useState(true) // Declare a state variable...

  const {
    title = titleDefault,
    avatarIcon = showAvatarIconDefault,
    borderColor = borderColorDefault,
    ritoric = ritoricDefault,
    chipLabel = chipLabelDefault,
    chipBackgroundColor = chipBackgroundColorDefault,
    color,
    newInfo
  } = props

  if (showAcatarIcon == true && avatarIcon == '') {
    setShowAvatarIcon(false)
  }

  return (
    <div
      className='w-full min-h-[118px] bg-white p-5 flex flex-col justify-between rounded-2xl mt-4 relative'
      style={{ border: borderColor ? `1px solid ${borderColor}` : '' }}
    >
      <div className='flex items-start'>
        <p className='text-sm'>{title}</p>
        <img alt='icons' src={`/static/img/${avatarIcon}.svg`} className='ml-4' />
      </div>
      <div className='flex items-center justify-between mt-4 lg:mt-2'>
        <span
          className='px-2 py-1 rounded-2xl text-xs bloc'
          style={{ backgroundColor: chipBackgroundColor || 'red', color: color }}
        >
          {chipLabel}
        </span>
        <p className='text-[rgba(160,160,160,1)] text-sm'>{ritoric}</p>
      </div>
      {newInfo ? (
        <div className='absolute top-[-13px] right-[10px] text-xs z-50 py-1 px-2 rounded-3xl bg-white border border-[rgba(151,71,255,1)]'>
          Новое
        </div>
      ) : null}
    </div>
  )
}

export default DashboardCard

DashboardCard.propTypes = {
  /**
   * Текст основной самой подсказки
   */
  title: PropTypes.string.isRequired,

  /**
   * Иконка название remix icon https://icon-sets.iconify.design/ri/ с префиксом ri- так же список доступен в файле src\assets\iconify-icons\generated-icons.css
   */
  avatarIcon: PropTypes.string,

  /**
   * Текст - подсазка
   */
  ritoric: PropTypes.string.isRequired,

  /**
   * Текст - название подсказки
   */
  chipLabel: PropTypes.string.isRequired,

  /**
   * Цвет - обводки карточки снизу
   */
  borderColor: PropTypes.string.isRequired,

  /**
   * Цвет - наполнитель фишки
   */
  chipBackground: PropTypes.string.isRequired
}
