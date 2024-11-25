'use client'

/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from 'prop-types'

import DashboardRadialBarChart from '../../DashboardRadialBarChart'
import ProgressLinearWithLabel from '../../ProgressLinearWithLabel'
import cohortsru from '../../screens/DashboardBuilder/EngageCohort'
import { binaryFormat, midRangeRating } from './../../../../../../app/server/const'
import './style.css'

var percentageDiff = 0
var percentageHigh = 0
var percentageLow = 0
var percentageNot = 0
var percentageSkip = 0
var engageAbs = 8.2

export const TotalRevenue = ({
  className,
  line = '/static/img/line.svg',
  frameClassName,
  text = '86',
  icon = '/static/img/icon-40.svg',
  stats,
  participationPercent,
  participantsQuizPassed,
  participantsQuizAll
}) => {
  percentageDiff = stats[0]
  percentageHigh = stats[1]
  percentageLow = stats[2]
  percentageNot = stats[3]
  percentageSkip = stats[4]
  engageAbs = stats[5]

  function UserBadgeAboveMarket() {
    if (engageAbs > midRangeRating) {
      return (
        <div className='frame-wrapper'>
          <div className='overlap-group-wrapper'>
            <div className='overlap-group-2'>
              <div className='badge-wrapper'>
                <div className='badge-base-wrapper'>
                  <div className='badge-base'>
                    <div className='text'>Выше рынка</div>
                  </div>
                </div>
              </div>
              <img className='icon' alt='Icon' src={icon} />
            </div>
          </div>
        </div>
      )
    }

    return ''
  }

  //console.log('stats.len : Total ' + stats.length)

  return (
    <div className='flex-col flex p-4 pb-10'>
      <span className='text-center w-full text-black text-xl font-medium'>Вовлечённость</span>
      <div className='relative'>
        <DashboardRadialBarChart stats={stats} />
        <div className='absolute bottom-[0px] w-full text-center flex justify-center items-center'>
          {percentageDiff.toFixed(1) > 0 ? (
            <div className='flex items-center mt-1'>
              <div className='w-[20px] h-[20px] rounded-full bg-[rgba(244,239,255,1)] flex items-center justify-center'>
                <img alt='arrow' src='/static/img/arrowTop.svg' />
              </div>{' '}
              <span className='ml-2 mt-1 text-[rgba(151,71,255,1)] text-lg font-medium'>
                {percentageDiff.toFixed(1)}%
              </span>
            </div>
          ) : percentageDiff.toFixed(1) < 0 ? (
            <div className='flex items-center mt-1'>
              <div className='w-[20px] h-[20px] rounded-full bg-[rgba(254,242,242,1)] flex items-center justify-center'>
                <img alt='arrow' className='' src='/static/img/arrowBottom.svg' />
              </div>
              <span className='ml-2 text-[rgba(255,88,88,1)] text-lg font-medium'>{percentageDiff.toFixed(1)}%</span>
            </div>
          ) : (
            <div className='flex items-center mt-1'>
              <div className='w-[20px] h-[20px] rounded-full bg-[rgba(254,242,242,1)] flex items-center justify-center'></div>
              <span className='ml-2 text-gray-400 text-lg font-medium'>{percentageDiff.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
      <div className='mt-4'>
        <div className='text-black text-center font-medium'>Высокая</div>
        <div className='flex justify-center'>
          <div className='bg-[rgba(244,239,255,1)] text-black text-xs py-1 px-6 text-[rgba(151,71,255,1)] text-center w-10/12 flex justify-center  text-nowrap mt-3 rounded-2xl'>
            Выше рынка на 23%
          </div>
        </div>
        <div className='flex flex-col gap-y-2 text-black mt-5'>
          <div className='flex items-center gap-2'>
            <div className='h-[15px] w-[15px] bg-[rgba(65,169,101,1)] rounded-full' />
            <span className='text-sm'>{Math.round(stats[1].toString(binaryFormat))}%</span>
            <span className='text-sm'> {cohortsru['high']}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-[15px] w-[15px] bg-[rgba(255,229,119,1)] rounded-full' />
            <span className='text-sm'>{Math.round(stats[2].toString(binaryFormat))}%</span>
            <span className='text-sm '> {cohortsru['low']}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='h-[15px] w-[15px] bg-[rgba(255,88,88,1)] rounded-full' />
            <span className='text-sm'>{Math.round(stats[3].toString(binaryFormat))}%</span>
            <span className='text-sm'> {cohortsru['not']}</span>
          </div>
          {/* <div className='flex items-center gap-2'>
            <div className='h-[15px] w-[15px] bg-error rounded-full' />
            <span className='text-sm'>{Math.round(stats[4].toString(binaryFormat))}%</span>
            <span className='text-sm'> {cohortsru['skip']}</span>
          </div> */}
        </div>
      </div>
      <div className='mt-9'>
        <ProgressLinearWithLabel value={participationPercent}></ProgressLinearWithLabel>
        <div className='flex justify-between mt-2 items-center'>
          <span className='text-[rgba(160,160,160,1)] text-xs'>Участие</span>
          <span className='text-black text-sm'>{participationPercent}%</span>
          <span className='text-[rgba(160,160,160,1)] text-xs'>
            {participantsQuizPassed}/{participantsQuizAll}
          </span>
        </div>
      </div>
    </div>
  )
}

TotalRevenue.propTypes = {
  line: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string
}
