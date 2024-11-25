'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { useTheme } from '@mui/material/styles'

import { colorsRGBAChart } from '@/views/dashboards/dashboard/src/MetricsColors'

const dayjs = require('dayjs')

const ruLocale = require('dayjs/locale/ru')

//,                         Invalid Date https://day.js.org/docs/en/display/format
//        formatter: function (val) {
//          return dayjs(val).format('MMM DD HH:mm')
//        }

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

//item.color

//{ stats, statsDiff }
const DashboardApexLineChart = ({ series, categories }) => {
  // Hooks
  const theme = useTheme()
  var seriesLocal = series
  var categoriesLocal = categories

  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

  var colorsA = []

  for (var key in colorsRGBAChart) {
    colorsA.push(colorsRGBAChart[key])
  }

  const extractMonth = date => {
    const [dayMonthYear] = date.split(', ')
    const [day, month, year] = dayMonthYear.split('.')

    return new Date(`${year}-${month}-${day}`).toLocaleString('default', { month: 'long' })
  }

  const months = categoriesLocal.map(extractMonth)

  const firstIndex = 0
  const lastIndex = months.length - 1
  const middleIndex = Math.floor(months.length / 2)

  const transformedMonths = months.map((month, index) => {
    if (index === firstIndex + 1 || index === middleIndex || index === lastIndex) {
      return month
    }

    return ''
  })

  const options = {
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      fontSize: '13px',
      markers: {
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      itemMargin: { horizontal: 9 },
      show: false
    },
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
      offsetX: theme.direction === 'rtl' ? 10 : -10
    },

    colors: colorsA,
    stroke: {
      curve: 'smooth',
      width: '3'
    },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 5,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: divider,
      yaxis: {
        lines: { show: true }
      },
      xaxis: {
        lines: {
          show: false
        }
      },

      borderColor: 'rgba(160, 160, 160, 0.5)', // Цвет линий сетки (более темный для четкости)
      strokeDashArray: 8,
      strokeWidth: 1
    },
    tooltip: {
      custom(data) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}</span>
        </div>`
      }
    },
    yaxis: {
      show: false,
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      },
      tickAmount: 5
    },
    xaxis: {
      tooltip: {
        enabled: false // Отключаем тултип для оси X
      },
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        rotate: 0,
        style: { colors: 'black', fontSize: '13px' },
        formatter: function (value, timestamp, index) {
          // Если категория пустая, не отображаем её
          return value === '' ? '' : value
        },
        offsetX: -10
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: transformedMonths
    }
  }

  return (
    <div className=' w-full'>
      <AppReactApexCharts type='line' width='100%' height={417} options={options} series={seriesLocal} />
    </div>
  )
}

export default DashboardApexLineChart
