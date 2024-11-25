import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Components Imports
import MenuItem from '@mui/material/MenuItem'

import { metricsru } from './screens/DashboardBuilder/Metrics'
import { teamsru } from './screens/DashboardBuilder/Teams'
import { getVectorFileName, getScaleVec, getColor } from './../src/components/VectorUtils'

// Vars
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
    stats: '5.4',
    color: 'success-opacity-light',
    title: 'administration',
    icon2: '/static/img/vector.svg',
    diff: '0.8'
  },
  {
    stats: '5.4',
    color: 'success-opacity-light',
    title: 'anotherteam',
    icon2: '/static/img/vector.svg',
    diff: '0.8'
  }
]

const TeamsTransactions = ({ propSelectedMetric, setSelectedHandle, teamStats, teamStatsDiff }) => {
  const func = setSelectedHandle
  const [selected, setSelected] = useState(propSelectedMetric) // Declare a state variable...

  const refreshText = select => {
    var idSel = Object.keys(metricsru).findIndex(key => metricsru[key] == metricsru[select])

    //all in all 7 teams i'th team stats and diff is displayed in this widget
    for (var i = 0; i < data.length; i++) {
      data[i].stats = teamStats[idSel][i].toFixed(1)
      data[i].diff = teamStatsDiff[idSel][i].toFixed(1)
      data[i].color = getColor(data[i].diff)
      data[i].icon2 = getVectorFileName(data[i].diff, '/static/img/', 'vector.svg', 'vectorred.svg', 'vectorgrey.svg')
    }
  }

  const handleChange = event => {
    var key = Object.keys(metricsru).find(key => metricsru[key] === event.target.value)

    setSelected(key)
    func(key)

    refreshText(key)
  }

  refreshText(propSelectedMetric)

  //fullWidth
  return (
    <div className='transactions-5'>
      <FormControl style={{ width: '80%', paddingTop: '24px', alignSelf: 'center' }}>
        {/*<InputLabel id='demo-simple-select-label'>{metricsru['Tip']}</InputLabel>*/}
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={metricsru[selected]}
          label={metricsru[selected]}
          onChange={e => handleChange(e)}
          defaultValue={'Satisfaction'}
          multiple={false}
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
      </FormControl>
      <div></div>
      <div></div>

      <Grid container spacing={4} style={{ padding: '2em 0em 0em 0em' }}>
        {data.map((item, index) => (
          <Grid item xs={12} md={12} gap={4} key={index} style={{ padding: '1em 0em 0em 2.5em' }}>
            <div className='flex items-start gap-3'>
              <Grid container spacing={1} flex justifyContent='flex-start' alignItems='center'>
                <Grid item xs='auto'>
                  {/*<div class='ellipse-3'></div>*/}
                </Grid>
                <Grid item xs='auto'>
                  <Typography>{teamsru[item.title]}</Typography>
                </Grid>
              </Grid>
            </div>
            <div className='flex items-start gap-3'>
              <Grid
                container
                spacing={1}
                flex
                justifyContent='flex-start'
                alignItems='center'
                style={{ padding: '0em 0em 0em 1.0em' }}
              >
                <Grid item xs='auto'>
                  <Typography variant='h6'>{item.stats}</Typography>
                </Grid>
                <Grid item xs='auto'>
                  <img className='vector' alt='Vector' src={item.icon2} style={{ transform: getScaleVec(item.diff) }} />
                </Grid>
                <Grid item xs='auto'>
                  <div className='percentage' style={{ color: getColor(item.diff) }}>
                    <Typography variant='h7'>{item.diff}</Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default TeamsTransactions
