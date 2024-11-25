import { useState } from 'react'

import { compareAsc } from 'date-fns'

import { LinearProgress, MenuItem, Select } from '@mui/material'

import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import metricsru from '../../screens/DashboardBuilder/Metrics'
import teamsru from '../../screens/DashboardBuilder/Teams'
import intervalsru from '../../screens/DashboardBuilder/TimeIntervals'
import { getColor, getVectorFileName } from '../VectorUtils'

var data = [
  {
    stats: '6.1',
    title: 'analytics',
    color: 'warning-opacity-light',
    icon2: '/static/img/vector.svg',
    diff: '1.6'
  },
  {
    stats: '5.2',
    title: 'innersell',
    color: 'success-opacity-light',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '6.7',
    color: 'error-opacity-light',
    title: 'research',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '6.3',
    color: 'error-opacity-light',
    title: 'marketing',
    icon2: '/static/img/vector.svg',
    diff: '1.5'
  },
  {
    stats: '5.4',
    color: 'success-opacity-light',
    title: 'backoffice',
    icon2: '/static/img/vector.svg',
    diff: '0.8'
  },
  {
    stats: '6.1',
    title: 'analytics',
    color: 'warning-opacity-light',
    icon2: '/static/img/vector.svg',
    diff: '1.6'
  },
  {
    stats: '5.2',
    title: 'innersell',
    color: 'success-opacity-light',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '6.7',
    color: 'error-opacity-light',
    title: 'research',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '6.3',
    color: 'error-opacity-light',
    title: 'marketing',
    icon2: '/static/img/vector.svg',
    diff: '1.5'
  },
  {
    stats: '5.4',
    color: 'success-opacity-light',
    title: 'backoffice',
    icon2: '/static/img/vector.svg',
    diff: '0.8'
  },
  {
    stats: '6.1',
    title: 'analytics',
    color: 'warning-opacity-light',
    icon2: '/static/img/vector.svg',
    diff: '1.6'
  },
  {
    stats: '6.7',
    color: 'error-opacity-light',
    title: 'research',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  }
]

const TeamsTransaction = ({
  propSelectedMetric,
  setSelectedHandle,
  teamStats,
  teamStatsDiff,
  setSelectedTimeInterval,
  propSelectedMetricId,
  propSelectedTimeInterval,
  teamMetricStory
}) => {
  const func = setSelectedHandle
  const [selected, setSelected] = useState(propSelectedMetric)
  const [selectedTimeInterval, setSelectedTime] = useState(propSelectedTimeInterval)

  var seriesData = []
  var xAxisNames = []

  const handleChange = event => {
    var key = Object.keys(metricsru).find(key => metricsru[key] === event.target.value)

    setSelected(key)
    func(key)

    refreshText(key)
  }

  const refreshText = select => {
    var idSel = Object.keys(metricsru).findIndex(key => metricsru[key] == metricsru[select])

    for (var i = 0; i < data.length; i++) {
      data[i].stats = teamStats[idSel][i].toFixed(1)
      data[i].diff = teamStatsDiff[idSel][i].toFixed(1)
      data[i].color = getColor(data[i].diff)
      data[i].icon2 = getVectorFileName(data[i].diff, '/static/img/', 'vector.svg', 'vectorred.svg', 'vectorgrey.svg')
    }
  }

  refreshText(propSelectedMetric)

  const refreshTextPeriod = selectedInterval => {
    var metricsKeyCategorySel = Object.keys(metricsru).findIndex(
      key => metricsru[key] == metricsru[propSelectedMetricId]
    )

    //reset data
    //var xAxisCategories = []
    //var ySeriesData = []
    // дата конкретная по запрошенному отрезку времени - высчитываем до этой даты нас данные из истории не интересуют
    var dateCutoff = new Date()

    if (selectedInterval == 'hour') {
      dateCutoff.setHours(dateCutoff.getHours() - 1)
    } else if (selectedInterval == 'day') {
      dateCutoff.setDate(dateCutoff.getDate() - 1)
    } else if (selectedInterval == 'week') {
      dateCutoff.setDate(dateCutoff.getDate() - 7)
    } else if (selectedInterval == 'month') {
      dateCutoff.setMonth(dateCutoff.getMonth() - 1)
    } else if (selectedInterval == 'quarter') {
      dateCutoff.setMonth(dateCutoff.getMonth() - 3)
    } else console.error('unknown time interval' + selectedInterval)

    //console.log('teamMetricStory.dateStamp.length ' + teamMetricStory.dateStamp.length)

    //отфильтровываем даты которые после выбранной даты в селекторе выбора даты виджета barchart и заполняем из массива с историей всех последних опросов
    var teamMetricStoryFiltered = []

    for (var i = 0; i < teamMetricStory.dateStamp.length; i++) {
      var dateStampParsed = Date.parse(teamMetricStory.dateStamp[i])
      var dateParsed = new Date(dateStampParsed)

      //console.log(i + 'datestamp parsed tolocal ' + dateParsed.toLocaleString(local))
      //console.log('dateCutoff  tolocal ' + dateCutoff.toLocaleString(local))

      const result = compareAsc(dateCutoff, dateParsed)

      //=> -1

      if (result < 0) {
        //console.log()
        teamMetricStoryFiltered.push(teamMetricStory.stats[i])
      } else {
        //console.log('dateParsed ' + dateParsed + ' before date cutoff ' + dateCutoff)
      }
    }

    //console.log('teamMetricStoryFiltered.length ' + teamMetricStoryFiltered.length)

    //var teamMetricAvgInterval = [][]

    var teamMetricAvgInterval = []

    //сколько - то есть отфильтрованных данных по периоду времени - добавляем в массив с усередненными данными и далее - вычисляем средние значения на вывод
    if (teamMetricStoryFiltered.length > 0 && teamMetricStoryFiltered[0].length > 0) {
      teamMetricAvgInterval = new Array(teamMetricStoryFiltered[0].length).fill(0)

      //console.log('teamMetricStoryFiltered[0].length ' + teamMetricStoryFiltered[0].length)

      for (var i = 0; i < teamMetricAvgInterval.length; i++) {
        teamMetricAvgInterval[i] = new Array(teamMetricStoryFiltered[0][0].length).fill(0)

        //console.log('teamMetricStoryFiltered[0][0].length ' + teamMetricStoryFiltered[0][0].length)
      }

      for (var i = 0; i < teamMetricStoryFiltered.length; i++) {
        //9
        for (var j = 0; j < teamMetricStoryFiltered[i].length; j++) {
          //console.log('teamMetricStoryFiltered i  ' + teamMetricStoryFiltered[i][j] + ' i ' + i + ' j ' + j)

          //11
          for (var k = 0; k < teamMetricStoryFiltered[i][j].length; k++) {
            //13
            teamMetricAvgInterval[j][k] =
              teamMetricAvgInterval[j][k] + teamMetricStoryFiltered[i][j][k] / teamMetricStoryFiltered.length
          }
        }
      }
    } else {
      //console.log(
      //'мы отфильтровали все данные по дате ' + selectedInterval + ' выводить в teamMetricAvgInterval нечего'
      //)
    }

    //console.log('teamMetricAvgInterval ' + JSON.stringify(teamMetricAvgInterval))

    //console.log('team metric avg len 1' + teamMetricAvgInterval.length)
    //console.log('team metric avg len 2 ' + teamMetricAvgInterval[0].length)

    var teamStatsFiltered = teamMetricAvgInterval

    seriesData = []
    xAxisNames = []
    var teamCountTiDisplay = 7

    //данных должно быть по всем командам мы выводим только семь по - дизайну надо проверить что они есть - тогда выводим

    if (
      teamStatsFiltered != undefined &&
      teamStatsFiltered.length >= metricsKeyCategorySel &&
      teamStatsFiltered[metricsKeyCategorySel].length >= teamCountTiDisplay
    ) {
      for (var i = 0; i < teamCountTiDisplay; i++) {
        var categoryStatTeam = teamStatsFiltered[metricsKeyCategorySel][i].toFixed(1)

        //console.log(' ' + categoryStatTeam)

        seriesData.push(categoryStatTeam)
        var keyTeamName = Reflect.ownKeys(teamsru)[i]
        var teamName = teamsru[keyTeamName]

        xAxisNames.push(teamName)

        //console.log(' xaxis ' + teamName)
      }
    } else {
      console.error(
        'нет данных чтобы выводить по ' + teamCountTiDisplay + ' командам временной интервал ' + selectedInterval
      )
    }
  }

  const handleChangePeriod = event => {
    var key = Object.keys(intervalsru).find(key => intervalsru[key] === event.target.value)

    //console.log('metric is ' + key)

    refreshTextPeriod(key)

    setSelectedTime(key)
    setSelectedTimeInterval(key)
  }

  refreshTextPeriod(propSelectedTimeInterval)

  return (
    <div className='text-black'>
      <div className='flex justify-between items-center'>
        <div className='flex items-start flex-col-reverse gap-y-1 lg:gap-y-0 lg:flex-row lg:items-center'>
          <Select
            id='demo-simple-select'
            value={metricsru[selected]}
            onChange={handleChange}
            className='border-gray-300 h-10 min-w-[170px] p-3 border border-[rgba(236,242,253,1)] rounded-md font-medium'
            IconComponent={ArrowDropDownIcon}
          >
            <MenuItem value={metricsru['Satisfaction']}>{metricsru['Satisfaction']}</MenuItem>
            <MenuItem value={metricsru['Ambassadorship']}>{metricsru['Ambassadorship']}</MenuItem>
            <MenuItem value={metricsru['Happiness']}>{metricsru['Happiness']}</MenuItem>
            <MenuItem value={metricsru['Relationship with Manager']}>{metricsru['Relationship with Manager']}</MenuItem>
            <MenuItem value={metricsru['Relationship with Peers']}>{metricsru['Relationship with Peers']}</MenuItem>
            <MenuItem value={metricsru['Personal Growth']}>{metricsru['Personal Growth']}</MenuItem>
            <MenuItem value={metricsru['Alignment']}>{metricsru['Alignment']}</MenuItem>
            <MenuItem value={metricsru['Recognition']}>{metricsru['Recognition']}</MenuItem>
            <MenuItem value={metricsru['Feedback']}>{metricsru['Feedback']}</MenuItem>
            <MenuItem value={metricsru['Engagement']}>{metricsru['Engagement']}</MenuItem>
          </Select>
          <span className='text-xs text-[rgba(86,86,86,1)] lg:ml-4'>По командам</span>
        </div>
        <div className='flex items-end flex-col  gap-y-1 lg:gap-y-0 lg:flex-row lg:items-center'>
          <span className='text-xs text-[rgba(86,86,86,1)] lg:mr-4'>Период</span>
          <Select
            id='demo-simple-select'
            value={intervalsru[selectedTimeInterval]}
            onChange={handleChangePeriod}
            className='border-gray-300 h-10 min-w-[131px] p-3 border border-[rgba(236,242,253,1)] rounded-md font-medium'
            IconComponent={ArrowDropDownIcon}
          >
            <MenuItem value={intervalsru['hour']}>{intervalsru['hour']}</MenuItem>
            <MenuItem value={intervalsru['day']}>{intervalsru['day']}</MenuItem>
            <MenuItem value={intervalsru['week']}>{intervalsru['week']}</MenuItem>
            <MenuItem value={intervalsru['month']}>{intervalsru['month']}</MenuItem>
            <MenuItem value={intervalsru['quarter']}>{intervalsru['quarter']}</MenuItem>
          </Select>
        </div>
      </div>
      <div className='mt-8'>
        {data.map((item, index) => {
          const value = seriesData[index] ? seriesData[index] : (Math.random().toFixed(1) * 10).toFixed(1)

          return (
            <div className='w-full flex mt-5 justify-between items-center' key={index}>
              <div className='text-end font-medium text-sm min-w-[180px]'>{teamsru[item.title]}</div>
              <div className='w-full pl-6 pr-3'>
                <LinearProgress
                  variant='determinate'
                  value={value * 10}
                  sx={{
                    width: '100%',
                    height: 12,
                    backgroundColor: 'rgba(225, 225, 225, 1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: item.diff ? 'rgba(178, 157, 248, 1)' : 'rgba(255, 88, 88, 1)' // цвет самой полосы
                    }
                  }}
                />
              </div>
              <div className='flex items-center text-sm'>
                <div className='text-sm font-medium w-[30px] text-center'>{value}</div>
                <div className='w-[45px] ml-2'>
                  {+item.diff > 0 ? (
                    <div className='flex items-center'>
                      <div className='w-[20px] h-[20px] rounded-full bg-[rgba(244,239,255,1)] flex items-center justify-center'>
                        <img alt='arrow' src='/static/img/arrowTop.svg' />
                      </div>
                      <span className='ml-1 text-[rgba(151,71,255,1)] text-sm font-medium'>{+item.diff}</span>
                    </div>
                  ) : item.diff < 0 ? (
                    <div className='flex items-center'>
                      <div className='w-[20px] h-[20px] rounded-full bg-[rgba(254,242,242,1)] flex items-center justify-center'>
                        <img alt='arrow' className='' src='/static/img/arrowBottom.svg' />
                      </div>
                      <span className='ml-1 text-[rgba(255,88,88,1)] text-sm font-medium'>{item.diff}</span>
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <div className='w-[20px] h-[20px] rounded-full bg-gray-100 flex items-center justify-center'></div>
                      <span className='ml-1 text-gray-400 text-sm font-medium'>{item.diff}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TeamsTransaction
