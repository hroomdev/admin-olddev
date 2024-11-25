'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports

//{/*colors: ['var(--mui-palette-info-main)'],*/}
// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const DashboardRadialBarChart = ({ stats }) => {
  const ratingMax = 100 // Предположим, что максимальное значение шкалы — 100
  const value = Math.round(stats[5]) * 10

  // Логика для изменения цвета шкалы в зависимости от значения
  const getColorForValue = value => {
    if (value <= 20) {
      return 'rgba(255,88,88,1)' // Красный цвет для значений до 20%
    } else if (value <= 50) {
      return 'rgba(255,229,119,1)' // Оранжевый цвет для значений от 21% до 50%
    } else {
      return 'rgba(65,169,101,1)' // Зеленый цвет для значений от 51% до 100%
    }
  }

  const radialBarColor = getColorForValue(value)

  const series = [value]

  const options = {
    labels: [''],
    chart: {
      sparkline: { enabled: true }
    },
    grid: {
      padding: {
        top: -10,
        bottom: 20
      }
    },
    stroke: {
      lineCap: 'round',
      curve: 'straight'
    },
    colors: [radialBarColor], // Используем динамический цвет
    plotOptions: {
      radialBar: {
        endAngle: 115,
        startAngle: -115,
        hollow: { size: '60%' },
        track: { background: '#f2f2f2' }, // Фон трека
        dataLabels: {
          name: { show: true },
          formatter: function (val, opt) {
            return val.toString().substring(0, val.toString().length - 1)
          },
          value: {
            offsetY: 0,
            fontWeight: 500,
            fontSize: '0.0rem',
            color: 'var(--mui-palette-text-secondary)'
          },
          total: {
            show: true,
            label: `${Math.round(stats[5]).toFixed(0) * 10}%`,
            fontSize: '2.25rem',
            padding: 40
          },
          position: 'bottom'
        }
      }
    },

    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [radialBarColor], // Цветовая заливка трека с динамическим цветом
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    responsive: [
      {
        breakpoint: 700,
        options: {
          grid: {
            padding: {
              left: 20,
              right: 20
            }
          }
        }
      }
    ]
  }

  return (
    <>
      <AppReactApexCharts
        type='radialBar'
        height={242}
        width='100%'
        options={options}
        series={series}
        style={{ position: 'relative', zIndex: '2' }}
      />
    </>
  )
}

export default DashboardRadialBarChart
