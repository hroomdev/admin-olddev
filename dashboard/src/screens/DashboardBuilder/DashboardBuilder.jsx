'use client'
import { useEffect, useState } from 'react'

import { LinearProgress } from '@mui/material'

import DashboardApexLineChart from '../../DashboardApexLineChart'
import DashboardCard from '../../DashboardCard'
import DashboardHeatmapChart from '../../DashboardHeatmapChart'
import DashboardTransactions from '../../DashboardTransactions'
import Swiper from '../../components/Swiper'
import TeamsTransaction from '../../components/TeamsTransaction'
import { TotalRevenue } from '../../components/TotalRevenue'
import { getStaticProps } from './../../../../../../../src/views/pages/dashboards/index'
import { Item, checkIsAvailable, updateCacheData } from './../../../../../../app/server/dashboarddbcache'
import './style.css'

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

var initialMetricByTeam = 'Ambassadorship'
var initialTimeInterval = 'quarter'

export const DashboardBuilder = ({ companyId, data, initialAdivces, initialInsights, initialCohortsJSONstrs }) => {
  var depVar = 1
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  //ai advices insights
  const [insight1, setInsight1] = useState(initialInsights[0]) // Declare a state variable...
  const [insight2, setInsight2] = useState(initialInsights[1]) // Declare a state variable...
  const [insight3, setInsight3] = useState(initialInsights[2]) // Declare a state variable...

  const [advice1, setAdvice1] = useState(initialAdivces[0]) // Declare a state variable...
  const [advice2, setAdvice2] = useState(initialAdivces[1]) // Declare a state variable...
  const [advice3, setAdvice3] = useState(initialAdivces[2]) // Declare a state variable...

  const [cohortTopic1, setCohort1] = useState(JSON.parse(initialCohortsJSONstrs[0])['theme']) // Declare a state variable...
  const [cohortTopic2, setCohort2] = useState(JSON.parse(initialCohortsJSONstrs[1])['theme']) // Declare a state variable...
  const [cohortTopic3, setCohort3] = useState(JSON.parse(initialCohortsJSONstrs[2])['theme']) // Declare a state variable...

  const [cohort1Percent1, setCohortPercent1] = useState(JSON.parse(initialCohortsJSONstrs[0])['percentage_of_answers']) // Declare a state variable...

  const [cohort1Percent2, setCohortPercent2] = useState(JSON.parse(initialCohortsJSONstrs[1])['percentage_of_answers']) // Declare a state variable...

  const [cohort1Percent3, setCohortPercent3] = useState(JSON.parse(initialCohortsJSONstrs[2])['percentage_of_answers']) // Declare a state variable...

  const [questionText, setQuestionText] = useState(JSON.parse(initialCohortsJSONstrs[0])['related_question']) // Declare a state variable...
  const [respondents, setRespondents] = useState(JSON.parse(initialCohortsJSONstrs[0])['total_employees']) // Declare a state variable...

  //
  var totalEmployes = Number.parseInt(JSON.parse(initialCohortsJSONstrs[0])['total_employees'])
  var responded = Number.parseInt(JSON.parse(initialCohortsJSONstrs[0])['employees_responded'])
  var overallAnsweredPercent = (responded / totalEmployes) * 100

  const [answeredPercentege, setAnsweredPercentege] = useState(overallAnsweredPercent.toString()) // Declare a state variable...

  //user data
  const [selectedEngagementMetricKey, setSelected] = useState(initialMetricByTeam) // Declare a state variable...
  const [selectedTeamTimeIntervalKey, setSelectedTimeInterval] = useState(initialTimeInterval)

  //user data
  const [d, setData] = useState(data) // Declare a state variable...

  //set data to ui elements
  const [curToNow, setCurToNow] = useState(data.curToNow) // Declare a state variable...
  const [nowToNext, setNowToNext] = useState(data.nowToNext) // Declare a state variable...
  const [currentQuizStarts, setCurrentQuizStarts] = useState(data.currentQuizStarts) // Declare a state variable...
  const [nextQuizStarts, setNextQuizStarts] = useState(data.nextQuizStarts) // Declare a state variable...
  const [participationPercent, setParticipationPercent] = useState(data.participationPercent) // Declare a state variable...
  const [participantsQuizPassed, setParticipantsQuizPassed] = useState(data.participantsQuizPassed) // Declare a state variable...
  const [participantsQuizAll, setParticipantsQuizAll] = useState(data.participantsQuizAll) // Declare a state variable...
  const [totalRevenueStats, setTotalRevenueStats] = useState(data.totalRevenueStats) // Declare a state variable...
  const [seriesApexLineMetrics, setSeriesApexLineMetrics] = useState(data.seriesApexLineMetrics) // Declare a state variable...
  const [categoriesApexLineMetrics, setCategoriesApexLineMetrics] = useState(data.categoriesApexLineMetrics) // Declare a state variable...
  const [transactionsMetricStats, setTransactionsMetricStats] = useState(data.transactionsMetricStats) // Declare a state variable...
  const [transactionsMetricDiffStats, setTransactionsMetricDiffStats] = useState(data.transactionsMetricDiffStats) // Declare a state variable...
  const [teamsMetricStats, setTeamsMetricStats] = useState(data.teamsMetricStats) // Declare a state variable...
  const [teamsMetricDiffStats, setTeamsMetricDiffStats] = useState(data.teamsMetricDiffStats) // Declare a state variable...
  const [acutelys, setAcutelys] = useState(data.acutelys) // Declare a state variable...
  const [teamMetricStory, setTeamMetricStory] = useState(data.teamsMetricStory)

  const setSelectedHandle = value => {
    setSelected(value)
  }

  const setSelectedTimeIntervalHandle = value => {
    setSelectedTimeInterval(value)
  }

  useEffect(() => {
    const f = async () => {
      updateCacheData()

      var data = await getStaticProps()

      if ((await checkIsAvailable(companyId)) == false) {
        console.log('useEffect() checkIsAvailable(id) == false : DashboardBuilder ')

        return
      } else {
        console.log('available ' + companyId)
      }

      var data = await Item(companyId)

      if (data == undefined) return

      setCurToNow(data.curToNow)
      setNowToNext(data.nowToNext)
      setCurrentQuizStarts(data.currentQuizStarts)
      setNextQuizStarts(data.nextQuizStarts)
      setParticipationPercent(data.participationPercent)
      setParticipantsQuizPassed(data.participantsQuizPassed)
      setParticipantsQuizAll(data.participantsQuizAll)
      setTotalRevenueStats(data.totalRevenueStats)
      setSeriesApexLineMetrics(data.seriesApexLineMetrics)
      console.log(data.transactionsMetricStats)
      setCategoriesApexLineMetrics(data.categoriesApexLineMetrics)
      setTransactionsMetricStats(data.transactionsMetricStats)
      setTransactionsMetricDiffStats(data.transactionsMetricDiffStats)
      setTeamsMetricStats(data.teamsMetricStats)
      setTeamsMetricDiffStats(data.teamsMetricDiffStats)
      setAcutelys(data.acutelys)
      setTeamMetricStory(data.teamsMetricStory)
    }

    f()

    return () => {}
  }, [depVar])

  //console.log('diffstats : DashboardBuilder ' + JSON.stringify(d.teamsMetricDiffStats))
  return (
    <div className='bg-[rgba(246,244,250,1)] pt-2 px-8'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-black text-2xl lg:text-3xl '>С возращением, Екатерина! 👋</h1>
          <p className='text-[rgba(86,86,86,1)] lg:text-[15px] text-xs w-[75%] lg:w-[100%]'>
            Мы подготовили для тебя данные за всё время по всем командам.
          </p>
        </div>
        <div className='flex'>
          <div className='flex mr-8 items-center'>
            <div className='h-10 w-10 rounded-sm flex items-center justify-center bg-[rgba(178,157,248,1)] mr-4'>
              <img src='/static/img/lastreq.svg' alt='lastreq' />
            </div>
            <div className='flex flex-col'>
              <span className='text-black text-xs font-medium'>Последний опрос</span>
              <span className='text-[rgba(160,160,160,1)] text-xs'>
                {curToNow} назад / {currentQuizStarts}
              </span>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='h-10 w-10 rounded-sm flex items-center justify-center bg-[rgba(178,157,248,1)] mr-4'>
              <img src='/static/img/messages.svg' alt='messages' />
            </div>
            <div className='flex flex-col'>
              <span className='text-black text-xs font-medium'>Следующий опрос</span>
              <span className='text-[rgba(160,160,160,1)] text-xs'>
                {nowToNext != undefined && 'через'} {nowToNext != undefined && nowToNext}{' '}
                {nowToNext != undefined && '/'}
                {nowToNext != undefined && nextQuizStarts != undefined && nextQuizStarts}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 flex w-full justify-between'>
        <div className='bg-white w-[247px] rounded-2xl'>
          <TotalRevenue
            className='total-revenue-instance'
            frameClassName='total-revenue-2'
            icon='/static/img/icon-29.svg'
            line='/static/img/line-2.svg'
            text='8.2'
            stats={totalRevenueStats}
            participationPercent={participationPercent}
            participantsQuizPassed={participantsQuizPassed}
            participantsQuizAll={participantsQuizAll}
          />
        </div>
        <div className='bg-white w-[calc(100%-260px)] ml-6 rounded-2xl flex flex-wrap items-center px-5 pb-6'>
          <div className='w-full pt-4'>
            <span className='text-lg text-black font-medium'>Динамика метрик</span>
          </div>
          <div className='w-[45%] lg:w-[59%] '>
            <DashboardApexLineChart series={seriesApexLineMetrics} categories={categoriesApexLineMetrics} />
          </div>
          <div className='w-[55%] lg:w-[41%]'>
            <DashboardTransactions stats={transactionsMetricStats} statsDiffs={transactionsMetricDiffStats} />
          </div>
        </div>
      </div>
      <div className='pt-8 pb-2 text-black text-lg flex justify-between '>
        <div className='text-lg'>Инсайты искусственного интеллекта</div>
        <div className='text-[rgba(151,71,255,1)] hover:text-[rgba(127,42,238,1)] flex items-center cursor-pointer'>
          Посмотреть все
          <div className='bg-[rgba(151,71,255,1)] ml-2 hover:bg-[rgba(127,42,238,1)] rounded-full w-5 h-5 flex justify-center items-center'>
            <img src='/static/img/arrow-right.svg' alt='icon' />
          </div>
        </div>
      </div>
      <Swiper />
      <div className='w-full flex mt-7 items-start'>
        <div className='bg-white rounded-2xl w-3/5 p-5'>
          <TeamsTransaction
            propSelectedMetric={selectedEngagementMetricKey}
            setSelectedHandle={setSelectedHandle}
            teamStats={teamsMetricStats}
            teamStatsDiff={teamsMetricDiffStats}
            setSelectedTimeInterval={setSelectedTimeIntervalHandle}
            propSelectedMetricId={selectedEngagementMetricKey}
            propSelectedTimeInterval={selectedTeamTimeIntervalKey}
            teamMetricStory={teamMetricStory}
          />
        </div>
        <div className='w-2/5 text-black ml-6'>
          <div className='flex justify-between items-center'>
            <span className='text-lg font-medium'>Советы искусственного интеллекта</span>
            <div className='text-[rgba(151,71,255,1)] flex cursor-pointer hover:text-[rgba(127,42,238,1)]'>
              Посмотреть все
              <div className='bg-[rgba(151,71,255,1)] hover:bg-[rgba(127,42,238,1)] ml-2 rounded-full w-5 h-5 flex justify-center items-center'>
                <img src='/static/img/arrow-right.svg' alt='icon' />
              </div>
            </div>
          </div>
          <DashboardCard
            color={'rgba(255, 88, 88, 1)'}
            title={insight1}
            avatarIcon={'warning'}
            ritoric={'команда Поддержка'}
            chipLabel={'критично'}
            newInfo
            borderColor='rgba(151, 71, 255, 1)'
            chipBackgroundColor='rgba(254, 242, 242, 1)'
          ></DashboardCard>
          <DashboardCard
            color={'rgba(255, 88, 88, 1)'}
            title={insight1}
            avatarIcon={'warning'}
            ritoric={'команда Поддержка'}
            chipLabel={'критично'}
            newInfo
            borderColor='rgba(151, 71, 255, 1)'
            chipBackgroundColor='rgba(254, 242, 242, 1)'
          ></DashboardCard>
          <DashboardCard
            color={'rgba(255, 159, 46, 1)'}
            title={insight2}
            avatarIcon={'important'}
            ritoric={'команда Поддержка'}
            chipLabel={'Важно'}
            chipBackgroundColor='rgba(253, 245, 236, 1)'
          ></DashboardCard>
          <DashboardCard
            color={'rgba(83, 114, 246, 1)'}
            title={insight3}
            avatarIcon={'recomend'}
            ritoric={'команда Поддержка'}
            chipLabel={'Рекомендации'}
            chipBackgroundColor='rgba(236, 242, 253, 1)'
          ></DashboardCard>
        </div>
      </div>
      <div className='w-full overflow-x-auto scrollbar-custom'>
        <div className=' mt-7 pb-2  min-w-[1140px] bg-white rounded-xl'>
          <DashboardHeatmapChart teamsMetricStats={teamsMetricStats} teamsMetricDiffStats={teamsMetricDiffStats} />
        </div>
      </div>
      <div className='w-full'>
        <div className='flex justify-between items-center mt-8'>
          <div className='text-lg font-medium text-black'>Ответы с низкими показателями</div>
          <div className='text-[rgba(151,71,255,1)] hover:text-[rgba(127,42,238,1)] flex items-center cursor-pointer'>
            Посмотреть все ответы
            <div className='bg-[rgba(151,71,255,1)] hover:bg-[rgba(127,42,238,1)] ml-2 rounded-full w-5 h-5 flex justify-center items-center'>
              <img src='/static/img/arrow-right.svg' alt='icon' />
            </div>
          </div>
        </div>
        <div className='flex mt-4 gap-x-4'>
          <div
            className={`${isLargeScreen ? 'w-1/5' : 'w-1/4'} bg-white p-5 h-[303px] flex flex-col justify-between rounded-xl`}
          >
            <div className='text-black'>
              <span className='px-3 py-2 rounded-xl shadow-sm text-xs text-[rgba(151,71,255,1)]'>
                {acutelys[0].submetric}
              </span>
              <div className='text-sm pt-4'>{acutelys[0].question}</div>
              <div className='text-[rgba(160,160,160,1)] pt-2 text-xs'>{acutelys[0].metric}</div>
            </div>
            <div className='border-t border-dashed border-[rgba(225,225,225,1)]'>
              <div className='flex items-center mt-5'>
                <div className=' mr-2 w-[150px]  lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>Да</div>
                <div className=' w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(178, 157, 248, 1)'
                      }
                    }}
                    value={acutelys[0].data[0]}
                  />
                </div>
                <div className='ml-2 text-black text-xs text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[0].data[0]}%</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className=' mr-2 w-[150px]  lg:w-[100px]] text-right text-xs text-[rgba(86,86,86,1)] '>Нет</div>
                <div className='w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(255, 159, 46, 1)'
                      }
                    }}
                    value={acutelys[0].data[1]}
                  />
                </div>
                <div className='text-black text-xs text-[rgba(86,86,86,1)] ml-2 w-[20px]'>{acutelys[0].data[1]}%</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className=' mr-2 w-[150px]  lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)]'>
                  Без ответа
                </div>
                <div className='w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(176, 176, 176, 1)'
                      }
                    }}
                    value={acutelys[0].data[2]}
                  />
                </div>
                <div className='text-black text-xs ml-2 text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[0].data[2]}%</div>
              </div>
            </div>
          </div>
          <div
            className={`${isLargeScreen ? 'w-1/5' : 'w-1/4'} bg-white p-5 h-[303px] flex flex-col justify-between rounded-xl`}
          >
            {' '}
            <div className='text-black'>
              <span className='px-3 py-2 rounded-xl shadow-sm text-xs text-[rgba(151,71,255,1)]'>
                {acutelys[1].submetric}
              </span>
              <div className='text-sm pt-4'>{acutelys[1].question}</div>
              <div className='text-[rgba(160,160,160,1)] pt-2 text-xs'>{acutelys[1].metric}</div>
            </div>
            <div className='border-t border-dashed border-[rgba(225,225,225,1)]'>
              <div className='flex items-center mt-5'>
                <div className=' mr-2 w-[150px]  lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>Да</div>
                <div className=' w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(178, 157, 248, 1)'
                      }
                    }}
                    value={acutelys[1].data[0]}
                  />
                </div>
                <div className='ml-2 text-black text-xs text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[1].data[0]}%</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className=' mr-2 w-[150px] lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>Нет</div>
                <div className='w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(255, 159, 46, 1)'
                      }
                    }}
                    value={acutelys[1].data[1]}
                  />
                </div>
                <div className='text-black text-xs text-[rgba(86,86,86,1)] ml-2 w-[20px]'>{acutelys[1].data[1]}%</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className=' mr-2  w-[150px]  lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>
                  Без ответа
                </div>
                <div className='w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(176, 176, 176, 1)'
                      }
                    }}
                    value={acutelys[1].data[2]}
                  />
                </div>
                <div className='text-black text-xs ml-2 text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[1].data[2]}%</div>
              </div>
            </div>
          </div>
          <div
            className={`${isLargeScreen ? 'w-1/5' : 'w-1/4'} bg-white p-5 h-[303px] flex flex-col justify-between rounded-xl`}
          >
            <div className='text-black'>
              <span className='px-3 py-2 rounded-xl shadow-sm text-xs text-[rgba(151,71,255,1)]'>
                {acutelys[2].submetric}
              </span>
              <div className='text-sm pt-4'>{acutelys[2].question}</div>
              <div className='text-[rgba(160,160,160,1)] pt-2 text-xs'>{acutelys[2].metric}</div>
            </div>
            <div className='border-t border-dashed border-[rgba(225,225,225,1)]'>
              <div className='flex items-center mt-5'>
                <div className=' mr-2 w-[150px]  lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>Да</div>
                <div className=' w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(178, 157, 248, 1)'
                      }
                    }}
                    value={acutelys[2].data[0]}
                  />
                </div>
                <div className='ml-2 text-black text-xs text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[2].data[0]}%</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className=' mr-2 w-[150px] lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>Нет</div>
                <div className='w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(255, 159, 46, 1)'
                      }
                    }}
                    value={acutelys[2].data[1]}
                  />
                </div>
                <div className='text-black text-xs text-[rgba(86,86,86,1)] ml-2 w-[20px]'>{acutelys[2].data[1]}%</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className=' mr-2  w-[150px] lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>
                  Без ответа
                </div>
                <div className='w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(176, 176, 176, 1)'
                      }
                    }}
                    value={acutelys[2].data[2]}
                  />
                </div>
                <div className='text-black text-xs ml-2 text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[2].data[2]}%</div>
              </div>
            </div>
          </div>
          <div
            className={`${isLargeScreen ? 'w-1/5' : 'w-1/4'} bg-white p-5 h-[303px] flex flex-col justify-between rounded-xl`}
          >
            <div className='text-black'>
              <span className='px-3 py-2 rounded-xl shadow-sm text-xs text-[rgba(151,71,255,1)]'>
                {acutelys[3].submetric}
              </span>
              <div className='text-sm pt-4'>{acutelys[3].question}</div>
              <div className='text-[rgba(160,160,160,1)] pt-2 text-xs'>{acutelys[3].metric}</div>
            </div>
            <div className='border-t border-dashed border-[rgba(225,225,225,1)]'>
              <div className='flex items-center mt-5'>
                <div className=' mr-2 w-[150px] lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>Да</div>
                <div className=' w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(178, 157, 248, 1)'
                      }
                    }}
                    value={acutelys[3].data[0]}
                  />
                </div>
                <div className='ml-2 text-black text-xs text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[3].data[0]}%</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className=' mr-2 w-[150px] lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>Нет</div>
                <div className='w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(255, 159, 46, 1)'
                      }
                    }}
                    value={acutelys[3].data[1]}
                  />
                </div>
                <div className='text-black text-xs text-[rgba(86,86,86,1)] ml-2 w-[20px]'>{acutelys[3].data[1]}%</div>
              </div>
              <div className='flex items-center mt-2'>
                <div className=' mr-2  w-[150px] lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>
                  Без ответа
                </div>
                <div className='w-full'>
                  <LinearProgress
                    variant='determinate'
                    sx={{
                      backgroundColor: 'rgba(225, 225, 225, 1)',
                      width: '100%',
                      height: 10,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'rgba(176, 176, 176, 1)'
                      }
                    }}
                    value={acutelys[3].data[2]}
                  />
                </div>
                <div className='text-black text-xs ml-2 text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[3].data[2]}%</div>
              </div>
            </div>
          </div>
          {isLargeScreen ? (
            <div className='w-1/5 bg-white p-5 h-[303px] flex flex-col justify-between rounded-xl'>
              <div className='text-black'>
                <span className='px-3 py-2 rounded-xl shadow-sm text-xs text-[rgba(151,71,255,1)]'>
                  {acutelys[3].submetric}
                </span>
                <div className='text-sm pt-4'>{acutelys[3].question}</div>
                <div className='text-[rgba(160,160,160,1)] pt-2 text-xs'>{acutelys[3].metric}</div>
              </div>
              <div className='border-t border-dashed border-[rgba(225,225,225,1)]'>
                <div className='flex items-center mt-5'>
                  <div className=' mr-2 w-[150px] lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>Да</div>
                  <div className=' w-full'>
                    <LinearProgress
                      variant='determinate'
                      sx={{
                        backgroundColor: 'rgba(225, 225, 225, 1)',
                        width: '100%',
                        height: 10,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'rgba(178, 157, 248, 1)'
                        }
                      }}
                      value={acutelys[3].data[0]}
                    />
                  </div>
                  <div className='ml-2 text-black text-xs text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[3].data[0]}%</div>
                </div>
                <div className='flex items-center mt-2'>
                  <div className=' mr-2 w-[150px] lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>Нет</div>
                  <div className='w-full'>
                    <LinearProgress
                      variant='determinate'
                      sx={{
                        backgroundColor: 'rgba(225, 225, 225, 1)',
                        width: '100%',
                        height: 10,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'rgba(255, 159, 46, 1)'
                        }
                      }}
                      value={acutelys[3].data[1]}
                    />
                  </div>
                  <div className='text-black text-xs text-[rgba(86,86,86,1)] ml-2 w-[20px]'>{acutelys[3].data[1]}%</div>
                </div>
                <div className='flex items-center mt-2'>
                  <div className=' mr-2  w-[150px] lg:w-[100px] text-right text-xs text-[rgba(86,86,86,1)] '>
                    Без ответа
                  </div>
                  <div className='w-full'>
                    <LinearProgress
                      variant='determinate'
                      sx={{
                        backgroundColor: 'rgba(225, 225, 225, 1)',
                        width: '100%',
                        height: 10,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'rgba(176, 176, 176, 1)'
                        }
                      }}
                      value={acutelys[3].data[2]}
                    />
                  </div>
                  <div className='text-black text-xs ml-2 text-[rgba(86,86,86,1)] w-[20px]'>{acutelys[3].data[2]}%</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className='w-full mt-7 flex'>
        <div className='w-[calc(100%-314px-24px)] mr-[24px] bg-white p-5 rounded-2xl'>
          <div className='flex justify-between'>
            <div className='text-lg font-medium text-black'>Обратная связь</div>
            <div className='text-[rgba(151,71,255,1)] flex items-center'>
              Подробнее
              <div className='bg-[rgba(151,71,255,1)] ml-2 rounded-full w-5 h-5 flex justify-center items-center'>
                <img src='/static/img/arrow-right.svg' alt='icon' />
              </div>
            </div>
          </div>
          <p className='text-black text-[rgba(86,86,86,1)]'>{questionText}</p>
          <div className='mt-5 min-h-[144px] flex flex-col justify-start lg:flex-row lg:justify-between lg:items-center'>
            <div className='flex text-black mb-4 lg:mb-0'>
              <div className='mr-[44px]'>
                <div className='text-xs text-[rgba(160,160,160,1)]'>Процент ответов</div>
                <div className='text-black text-4xl font-medium'>{answeredPercentege}%</div>
              </div>
              <div>
                <div className='text-xs text-[rgba(160,160,160,1)]'>Респонденты</div>
                <div className='text-black text-4xl font-medium'>{respondents}</div>
              </div>
            </div>
            <div className='flex gap-x-2 '>
              <div className='h-[144px] w-[160px] text-black flex flex-col justify-between rounded-2xl px-4 py-3 bg-[rgba(248,245,255,1)]'>
                <div className='text-sm font-medium'>{cohortTopic1}</div>
                <div>
                  <div className='text-2xl font-medium'>{cohort1Percent1}</div>
                  <div className='text-sm text-[rgba(160,160,160,1)]'>Возникновения</div>
                </div>
              </div>
              <div className='h-[144px] w-[160px] text-black flex flex-col justify-between rounded-2xl px-4 py-3 bg-[rgba(248,245,255,1)]'>
                <div className='text-sm font-medium'>{cohortTopic2}</div>
                <div>
                  <div className='text-2xl font-medium'>{cohort1Percent2}</div>
                  <div className='text-sm text-[rgba(160,160,160,1)]'>Возникновения</div>
                </div>
              </div>
              <div className='h-[144px] w-[160px] text-black flex flex-col justify-between rounded-2xl px-4 py-3 bg-[rgba(248,245,255,1)]'>
                <div className='text-sm font-medium'>{cohortTopic3}</div>
                <div>
                  <div className='text-2xl font-medium'>{cohort1Percent3}</div>
                  <div className='text-sm text-[rgba(160,160,160,1)]'>Возникновения</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-[314px] bg-white p-5 rounded-2xl'>
          <div className='flex justify-between'>
            <div className='text-black text-lg font-medium'>Волнующие темы</div>
            <img src='/static/img/stars.svg' alt='icon' />
          </div>
          <div className='flex flex-col items-start  mt-2'>
            <span className='bg-[rgba(254,242,242,1)] px-3 py-[2px] rounded-2xl text-sm text-[rgba(255,88,88,1)]'>
              Напряжённая атмосфера
            </span>
            <span className='mt-2 bg-[rgba(244,239,255,1)] px-3 py-[2px] text-sm rounded-2xl text-[rgba(151,71,255,1)]'>
              Добавить спорт в льготы
            </span>
            <span className='mt-2 bg-[rgba(244,239,255,1)] px-3 py-[2px] text-sm rounded-2xl text-[rgba(151,71,255,1)]'>
              Улучшить качество обратной связи
            </span>
            <span className='mt-1 text-sm text-black px-3 py-1'>Сделать прозрачнее план развития</span>
            <span className='mt-1 text-sm text-black px-3 py-1'>Чаще пересматривать зарплаты</span>
            <span className='mt-1 text-sm text-black px-3 py-1'>Увеличить премии</span>
          </div>
        </div>
      </div>
      <div className='w-full mt-7 pb-10'>
        <div className='flex justify-between items-center'>
          <div className='text-black text-lg font-medium'>Что делать дальше?</div>
          <div className='text-[rgba(151,71,255,1)] hover:text-[rgba(127,42,238,1)] flex items-center cursor-pointer'>
            Посмотреть все
            <div className='bg-[rgba(151,71,255,1)] hover:bg-[rgba(127,42,238,1)] ml-2 rounded-full w-5 h-5 flex justify-center items-center cursor-pointer'>
              <img src='/static/img/arrow-right.svg' alt='icon' />
            </div>
          </div>
        </div>
        <div className='w-full mt-6 flex gap-x-[15px] text-black'>
          <div
            className={`${isLargeScreen ? 'w-[25%]' : 'w-[33%]'} min-h-[154px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative p-5 flex flex-col justify-between`}
          >
            <p className='text-sm text-start'>{advice1}</p>
            <div className='flex justify-between pt-2 lg:pt-0'>
              <span className='text-xs text-[rgba(86,86,86,1)]'>Общие советы</span>
              <img src='/static/img/stars.svg' className='size-4' alt='icon' />
            </div>
            <div className='absolute top-[-13px] text-[rgba(151,71,255,1)] right-[10px] text-xs z-50 py-1 px-2 rounded-3xl bg-white border border-[rgba(151,71,255,1)]'>
              Новое
            </div>
          </div>
          <div
            className={`${isLargeScreen ? 'w-[25%]' : 'w-[33%]'} min-h-[154px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative p-5 flex flex-col justify-between`}
          >
            <p className='text-sm text-start'>{advice2}</p>
            <div className='flex justify-between pt-2 lg:pt-0'>
              <span className='text-xs text-[rgba(86,86,86,1)]'>Общие советы</span>
              <img src='/static/img/stars.svg' className='size-4' alt='icon' />
            </div>
          </div>
          <div
            className={`${isLargeScreen ? 'w-[25%]' : 'w-[33%]'} min-h-[154px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative p-5 flex flex-col justify-between`}
          >
            <p className='text-sm text-start'>{advice3}</p>
            <div className='flex justify-between pt-2 lg:pt-00'>
              <span className='text-xs text-[rgba(86,86,86,1)]'>Общие советы</span>
              <img src='/static/img/stars.svg' className='size-4' alt='icon' />
            </div>
          </div>
          {isLargeScreen && (
            <div className='w-[25%] min-h-[154px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative p-5 flex flex-col justify-between'>
              <p className='text-sm text-start'>{advice3}</p>
              <div className='flex justify-between pt-2 lg:pt-0'>
                <span className='text-xs text-[rgba(86,86,86,1)]'>Общие советы</span>
                <img src='/static/img/stars.svg' className='size-4' alt='icon' />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
