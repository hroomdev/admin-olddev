'use client'

import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import { useTheme } from '@mui/material/styles'

import { metricsru } from './screens/DashboardBuilder/Metrics'
import { teamsru } from './screens/DashboardBuilder/Teams'

const titleru = 'Сравнение с рынком'
const subtitleru = 'По командам'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

//count is Category count
const updDataHeatForTeam = (seriesNameData, teamId, dataHeat, dataHeatDiff) => {
  var categoryCount = dataHeat.length //11 must be 13

  //console.log('categories ' + categoryCount)

  var statsMetricsCount = dataHeat.length //11

  var statsTeamsCount = dataHeat[0].length // 7 and 13 not more than 13

  let i = 0 //metric Id
  const series = []

  //dataHeat i'th is metric id
  //dataHeat j'th is teamId

  while (i < categoryCount) {
    var metricKey = Object.keys(metricsru).at(i)
    var metricName = metricsru[metricKey]

    const x = metricName //`w${(i + 1).toString()}`
    const y = dataHeat[i][teamId].toFixed(1)

    //dataHeatDiff[i][teamId].toFixed(1).
    var diff = dataHeatDiff[i][teamId]

    //console.log('diff ' + diff)
    var description = diff > 0 ? '+' + diff.toFixed(1) : diff.toFixed(1)

    series.push({
      x,
      y,
      description
    })
    i += 1
  }

  var teamKey = Object.keys(teamsru).at(teamId)
  var teamName = teamsru[teamKey]

  var nameData = {
    name: teamName,
    data: series
  }

  seriesNameData.push(nameData)
}

// Vars
var series = []

const DashboardHeatmapChart = ({ teamsMetricStats, teamsMetricDiffStats }) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1920)

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1920)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  series = []

  for (var i = 0; i < teamsMetricStats[0].length; i++) {
    updDataHeatForTeam(series, i, teamsMetricStats, teamsMetricDiffStats)
  }

  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      offsetX: theme.direction === 'rtl' ? 10 : -10,
      width: '100%',
      height: '800'
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val, { seriesIndex, dataPointIndex, w }) {
        //
        const desc = w.config.series[seriesIndex].data[dataPointIndex].description

        return [val, desc]

        //return val
      },
      textAnchor: 'middle',
      distributed: true,
      offsetX: 0,
      offsetY: -5,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#000']
      },
      background: {
        enabled: false,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: 'var(--mui-palette-text-secondary)'
      },
      markers: {
        height: 10,
        width: 10,
        offsetY: 0,
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      itemMargin: {
        horizontal: 9
      }
    },
    plotOptions: {
      heatmap: {
        enableShades: false,
        colorScale: {
          ranges: [
            { to: 3, from: 0, name: '0-1', color: '#DD343C' },
            { to: 6, from: 4.1, name: '4-5', color: '#FD8F90' },
            { to: 7, from: 6.1, name: '6-7', color: '#F6E599' },
            { to: 8, from: 8.1, name: '7-8', color: '#7FC192' },
            { to: 10, from: 9.1, name: '9-10', color: '#218971' }
          ]
        }
      }
    },
    grid: {
      padding: { top: -20 }
    },
    yaxis: {
      labels: {
        style: { colors: 'var(--mui-palette-text-disabled)', fontSize: '13px' }
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    }
  }

  return (
    <div className='w-full bg-white'>
      <div className={`px-6 w-full ${isWideScreen ? 'h-[147px]' : 'h-[245px]'} flex items-end justify-between`}>
        <div>
          <div className='text-lg font-medium text-black'>Cравнение с рынком</div>
          <span className='text-xs text-[rgba(86,86,86,1)]'>По командам</span>
        </div>
        <div className='flex items-end gap-x-1'>
          <div className='flex flex-col items-center justify-center '>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Вовлечённость
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/engagement.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Лояльность
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/health.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Удовлетворённость
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/Personal growth.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Счастье
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/Satisfaction.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Самочувствие
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/Loyalty.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col '>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Личностный рост
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/Confession.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Признание
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/management.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Отнош. с руководством
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/colleagues.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Отношение с коллегами
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/сonsistency.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col'>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Согласованность
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/Vector-7.svg' alt='icon' />
            </div>
          </div>
          <div className='flex flex-col '>
            <div
              className={`text-[rgba(86,86,86,1)] text-center ${isWideScreen ? 'w-[117px]' : 'w-16'} ${isWideScreen ? 'mb-[13px]' : 'mb-0'} text-xs`}
              style={{
                transform: isWideScreen ? 'none' : 'translate(0, -32px) rotate(-90deg)'
              }}
            >
              Обратная связь
            </div>
            <div
              className={`${isWideScreen ? 'w-[117px]' : 'w-16'} h-16 bg-[rgba(244,239,255,1)] rounded-xl flex flex-col items-center justify-center`}
            >
              <img src='/static/img/feedback.svg' alt='icon' />
            </div>
          </div>
        </div>
      </div>
      <div class='px-5 overflow-y-scroll overflow-x-hidden  h-[calc(757px-245px-30px)] flex flex-col mt-4 gap-y-1 text-black scrollbar-custom'>
        <div className='flex justify-between'>
          <div className='flex pl-6 pr-4 text-sm justify-between items-center rounded-xl text-[rgba(255,255,255,1)] w-full mr-2 h-[60px] bg-[rgba(178,157,248,1)]'>
            Бенчмарк по отрасли <img src='/static/img/benchmark.svg' alt='icon' />
          </div>
          <div className='flex gap-x-1'>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
            <div
              className={`flex items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'}  h-[60px] bg-[rgba(178,157,248,1)] rounded-xl text-[rgba(255,255,255,1)]`}
            >
              7.8
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-6 pr-4 text-sm justify-between items-center rounded-xl text-[rgba(27,26,28,1)] w-full mr-2 h-[60px] bg-[rgba(248,245,255,1)]'>
            Вся компания
            <img src='/static/img/peoples.svg' alt='icon' />
          </div>
          <div className='flex gap-x-1'>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-6 pr-4 text-sm justify-between items-center rounded-xl text-[rgba(27,26,28,1)] w-full mr-2 h-[60px] bg-[rgba(248,245,255,1)]'>
            Руководители
            <img src='/static/img/Vector-1.svg' alt='icon' />
          </div>
          <div className='flex gap-x-1'>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-6 pr-4 text-sm justify-between items-center rounded-xl text-[rgba(27,26,28,1)] w-full mr-2 h-[60px] bg-[rgba(248,245,255,1)]'>
            Финансы
            <img src='/static/img/Vector-2.svg' alt='icon' />
          </div>
          <div className='flex gap-x-1'>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-6 pr-4 text-sm justify-between items-center rounded-xl text-[rgba(27,26,28,1)] w-full mr-2 h-[60px] bg-[rgba(248,245,255,1)]'>
            Бизнес
            <img src='/static/img/business.svg' alt='icon' />
          </div>
          <div className='flex gap-x-1'>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-6 pr-4 text-sm justify-between items-center rounded-xl text-[rgba(27,26,28,1)] w-full mr-2 h-[60px] bg-[rgba(248,245,255,1)]'>
            Разработка
            <img src='/static/img/Vector-3.svg' alt='icon' />
          </div>
          <div className='flex gap-x-1'>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-6 pr-4 text-sm justify-between items-center rounded-xl text-[rgba(27,26,28,1)] w-full mr-2 h-[60px] bg-[rgba(248,245,255,1)]'>
            Тестирование
            <img src='/static/img/Vector-4.svg' alt='icon' />
          </div>
          <div className='flex gap-x-1'>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-6 pr-4 text-sm justify-between items-center rounded-xl text-[rgba(27,26,28,1)] w-full mr-2 h-[60px] bg-[rgba(248,245,255,1)]'>
            Бизнес
            <img src='/static/img/business.svg' alt='icon' />
          </div>
          <div className='flex gap-x-1'>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(255,88,88,1)]'>-2.3</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex pl-6 pr-4 text-sm justify-between items-center rounded-xl text-[rgba(27,26,28,1)] w-full mr-2 h-[60px] bg-[rgba(248,245,255,1)]'>
            Руководители
            <img src='/static/img/Vector-1.svg' alt='icon' />
          </div>
          <div className='flex gap-x-1'>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
            <div
              className={`flex flex-col items-center justify-center ${isWideScreen ? 'w-[117px]' : 'w-[64px]'} h-[60px] bg-[rgba(248,245,255,1)] rounded-xl text-[rgba(27,26,28,1)]`}
            >
              7.8
              <span className='text-xs text-[rgba(151,71,255,1)]'>+2.3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeatmapChart
