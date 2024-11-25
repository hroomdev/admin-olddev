'use client'

const local = 'ru-RU'
const en = 'en-GB'

import { useState } from 'react'

import dynamic from 'next/dynamic'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { compareAsc } from 'date-fns'

// Next Imports
// Components Imports
import MenuItem from '@mui/material/MenuItem'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTheme } from '@mui/material/styles'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

import { metricsru } from './screens/DashboardBuilder/Metrics'
import { teamsru } from './screens/DashboardBuilder/Teams'
import { intervalsru } from './screens/DashboardBuilder/TimeIntervals'

const byTeamru = 'по командам'
const perioudru = 'Период'

var seriesDataInitial = [] //700, 350, 480, 600, 210, 550, 150
var xAxisCategoriesInitial = [] //'Mon, 11', 'Thu, 14', 'Fri, 15', 'Mon, 18', 'Wed, 20', 'Fri, 21', 'Mon, 23'

const DashboardBarChart = ({
  propSelectedMetricId,
  propSelectedTimeInterval,
  setSelectedTimeInterval,
  teamStats,
  teamMetricStory
}) => {
  //console.log(JSON.stringify(teamMetricStory))

  var seriesData = []
  var xAxisNames = []

  const [selectedTimeInterval, setSelected] = useState(propSelectedTimeInterval) // Declare a state variable...
  //const [seriesData, setSeriesData] = useState(seriesDataInitial) // Declare a state variable...
  //const [xAxisNames, setXAxisNames] = useState(xAxisCategoriesInitial) // Declare a state variable...

  const refreshText = selectedInterval => {
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

  const handleChange = event => {
    var key = Object.keys(intervalsru).find(key => intervalsru[key] === event.target.value)

    //console.log('metric is ' + key)

    refreshText(key)

    setSelected(key)
    setSelectedTimeInterval(key)
  }

  //initialise refresh
  refreshText(propSelectedTimeInterval)

  // Hooks
  const theme = useTheme()

  // Vars
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      offsetX: theme.direction === 'rtl' ? 10 : -10
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
        barHeight: '30%',
        horizontal: true
      }
    },
    grid: {
      borderColor: divider,
      xaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10
      }
    },
    yaxis: {
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      categories: xAxisNames,
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      }
    }
  }

  return (
    <Card>
      <FormControl className='infoi' style={{ paddingLeft: '450px', width: '20%', alignItems: 'end' }}>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={intervalsru[selectedTimeInterval]}
          label={intervalsru[selectedTimeInterval]}
          onChange={e => handleChange(e)}
        >
          <MenuItem value={intervalsru['hour']}>{intervalsru['hour']}</MenuItem>
          <MenuItem value={intervalsru['day']}>{intervalsru['day']}</MenuItem>
          <MenuItem value={intervalsru['week']}>{intervalsru['week']}</MenuItem>
          <MenuItem value={intervalsru['month']}>{intervalsru['month']}</MenuItem>
          <MenuItem value={intervalsru['quarter']}>{intervalsru['quarter']}</MenuItem>
        </Select>
      </FormControl>

      <CardHeader
        title={metricsru[propSelectedMetricId]}
        subheader={byTeamru}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />

      <CardContent>
        <AppReactApexCharts type='bar' width='100%' height={400} options={options} series={[{ data: seriesData }]} />
      </CardContent>
    </Card>
  )
}

export default DashboardBarChart
