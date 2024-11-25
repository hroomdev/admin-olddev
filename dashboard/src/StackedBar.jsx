'use client'

// Next Imports
import dynamic from 'next/dynamic'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

export const StackedBar = ({ arrFiveValuesPercent }) => {
  var seriesValues = [
    {
      name: '0-3',
      data: [20]
    },
    {
      name: '4-5',
      data: [20]
    },
    {
      name: '6-7',
      data: [20]
    },
    {
      name: '8',
      data: [20]
    },
    {
      name: '9-10',
      data: [20]
    }
  ]

  if (arrFiveValuesPercent == undefined || arrFiveValuesPercent.length != 5) {
    console.error('error values array not defined or length not equals five color code')
  } else {
    for (var i = 0; i < seriesValues.length; i++) {
      seriesValues[i].data[0] = arrFiveValuesPercent[i]
    }
  }

  var options = {
    colors: ['#DD343C', '#FD8F90', '#F6E599', '#7FC192', '#218971'],
    series: seriesValues,
    chart: {
      type: 'bar',
      height: '100%',
      width: '100%',
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: ''
    },
    grid: {
      show: false
    },
    xaxis: {
      categories: [''], //,2008 2009, 2010, 2011, 2012, 2013, 2014,
      show: false,
      labels: {
        show: false
      },
      crosshairs: {
        show: false
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + 'K'
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    }
  }

  return <AppReactApexCharts type='bar' height={40} width={190} series={options.series} options={options} />
}

export default StackedBar
