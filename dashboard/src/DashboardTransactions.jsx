//MUI Imports

//styles
//import styles from './DashboardTransactions.module.css'
//import './DashboardTransactions.css'

import './components/Transactions/style.css'
import metricsru from './screens/DashboardBuilder/Metrics'

// Components Imports

var styleClassPrefixTransactions = '.transactions '

// Vars
const data = [
  {
    stats: '5.1',
    title: 'Satisfaction',
    bg: 'rgba(230,119,171,1)',
    icon: '/static/img/smile.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '12.5',
    title: 'Ambassadorship',
    bg: 'rgba(244, 239, 255, 1)',
    icon: '/static/img/eyes.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '6.3',
    title: 'Happiness',
    bg: 'rgba(104,187,245,1)',
    icon: '/static/img/heard.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    title: 'Relationship with Manager',
    bg: 'rgba(244, 239, 255, 1)',
    icon: '/static/img/eyes.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    title: 'Wellness',
    bg: 'rgba(208, 223, 34, 1)',
    icon: '/static/img/star.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '7.7',
    title: 'Relationship with Peers',
    bg: 'rgba(244, 239, 255, 1)',
    icon: '/static/img/eyes.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '7.7',
    title: 'Personal Growth',
    bg: 'rgba(255, 159, 46, 1)',
    icon: '/static/img/sun.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '7.7',
    title: 'Alignment',
    bg: 'rgba(244, 239, 255, 1)',
    icon: '/static/img/eyes.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '7.7',
    title: 'Recognition',
    bg: 'rgba(244, 239, 255, 1)',
    icon: '/static/img/eyes.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    title: 'Feedback',
    bg: 'rgba(244, 239, 255, 1)',
    icon: '/static/img/eyes.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  }
]

const DashboardTransactions = ({ stats, statsDiffs }) => {
  return (
    <div className='text-black grid grid-cols-2 gap-y-4 justify-between'>
      {data.map((item, index) => (
        <div className='min-h-[60px] flex' key={index}>
          <div
            className={`rounded-2xl min-w-[40px] h-[40px] flex justify-center items-center`}
            style={{ backgroundColor: item.bg }}
          >
            <img className='size-4' alt='Icon' src={item.icon} />
          </div>
          <div className='ml-3'>
            <div className='text-lg font-medium flex items-center'>
              <div className='pr-2'>{stats[index].toFixed(1)}</div>
              {statsDiffs[index].toFixed(1) > 0 ? (
                <div className='w-[20px] h-[20px] rounded-full bg-[rgba(244,239,255,1)] flex items-center justify-center'>
                  <img alt='arrow' src='/static/img/arrowTop.svg' />
                </div>
              ) : statsDiffs[index].toFixed(1) < 0 ? (
                <div className='w-[20px] h-[20px] rounded-full bg-[rgba(254,242,242,1)] flex items-center justify-center'>
                  <img alt='arrow' className='' src='/static/img/arrowBottom.svg' />
                </div>
              ) : (
                <div className='w-[20px] h-[20px] rounded-full bg-[rgba(254,242,242,1)] flex items-center justify-center'></div>
              )}
              <div
                className='text-sm pl-1'
                style={{
                  color:
                    statsDiffs[index].toFixed(1) > 0
                      ? 'rgba(151, 71, 255, 1)'
                      : statsDiffs[index].toFixed(1) < 0
                        ? 'rgba(255, 88, 88, 1)'
                        : 'gray'
                }}
              >
                {statsDiffs[index].toFixed(1)}
              </div>
            </div>
            <div className='text-xs text-[rgba(86,86,86,1)]'>{metricsru[item.title]}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardTransactions
