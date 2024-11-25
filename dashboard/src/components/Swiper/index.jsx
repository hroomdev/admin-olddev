'use client'

import { useEffect, useState } from 'react'

import { Swiper as LibSwiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import './styles.css'

import { Pagination } from 'swiper/modules'

export default function Swiper() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='w-full overflow-hidden'>
      <LibSwiper pagination={true} modules={[Pagination]} className='bg-none max-w-full overflow-hidden'>
        <SwiperSlide>
          <div className='flex w-full gap-x-4 justify-between text-black pt-4 pb-10'>
            <div
              className={`${isLargeScreen ? 'w-[25%]' : 'w-[32%]'} h-[200px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative box-border p-5 flex flex-col justify-between`}
            >
              <p className='text-sm text-start'>
                Вопросы, касающиеся личной инициативы и самоорганизации, вызывают смешанные реакции среди сотрудников,
                что указывает на необходимость более ясного определения ролей и ожиданий.
              </p>
              <div className='flex justify-between'>
                <span className='text-xs text-[rgba(86,86,86,1)]'>Все команды</span>
                <img src='/static/img/stars.svg' className='size-4' alt='icon' />
              </div>
              <div className='absolute top-[-13px] text-[rgba(151,71,255,1)]  right-[10px] text-xs z-50 py-1 px-2 rounded-3xl bg-white border border-[rgba(151,71,255,1)]'>
                Новое
              </div>
            </div>
            <div
              className={`${isLargeScreen ? 'w-[25%]' : 'w-[32%]'} h-[200px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative box-border p-5 flex flex-col justify-between`}
            >
              <p className='text-sm text-start'>
                Вопросы, касающиеся личной инициативы и самоорганизации, вызывают смешанные реакции среди сотрудников,
                что указывает на необходимость более ясного определения ролей и ожиданий.
              </p>
              <div className='flex justify-between'>
                <span className='text-xs text-[rgba(86,86,86,1)]'>Все команды</span>
                <img src='/static/img/stars.svg' className='size-4' alt='icon' />
              </div>
              <div className='absolute top-[-13px] text-[rgba(151,71,255,1)]  right-[10px] text-xs z-50 py-1 px-2 rounded-3xl bg-white border border-[rgba(151,71,255,1)]'>
                Новое
              </div>
            </div>
            <div
              className={`${isLargeScreen ? 'w-[25%]' : 'w-[32%]'} h-[200px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative box-border p-5 flex flex-col justify-between`}
            >
              <p className='text-sm text-start'>
                Сотрудники компании высоко оценивают возможности для профессионального роста, но выражают
                неудовлетворенность в области обратной связи и четкости целей.
              </p>
              <div className='flex justify-between'>
                <span className='text-xs text-[rgba(86,86,86,1)]'>Все команды</span>
                <img src='/static/img/stars.svg' className='size-4' alt='icon' />
              </div>
            </div>
            {isLargeScreen ? (
              <div className='w-[25%] h-[200px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative box-border p-5 flex flex-col justify-between'>
                <p className='text-sm text-start'>
                  Сотрудники компании высоко оценивают возможности для профессионального роста, но выражают
                  неудовлетворенность в области обратной связи и четкости целей.
                </p>
                <div className='flex justify-between'>
                  <span className='text-xs text-[rgba(86,86,86,1)]'>Все команды</span>
                  <img src='/static/img/stars.svg' className='size-4' alt='icon' />
                </div>
              </div>
            ) : null}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex w-full gap-x-4 justify-between text-black pt-4 pb-10'>
            <div className='w-[32%] h-[200px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative p-5 flex flex-col justify-between'>
              <p className='text-sm text-start'>
                Вопросы, касающиеся личной инициативы и самоорганизации, вызывают смешанные реакции среди сотрудников,
                что указывает на необходимость более ясного определения ролей и ожиданий.
              </p>
              <div className='flex justify-between'>
                <span className='text-xs text-[rgba(86,86,86,1)]'>Все команды</span>
                <img src='/static/img/stars.svg' className='size-4' alt='icon' />
              </div>
              <div className='absolute top-[-13px] text-[rgba(151,71,255,1)]  right-[10px] text-xs z-50 py-1 px-2 rounded-3xl bg-white border border-[rgba(151,71,255,1)]'>
                Новое
              </div>
            </div>
            <div className='w-[32%] h-[200px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative p-5 flex flex-col justify-between'>
              <p className='text-sm text-start'>
                Вопросы, касающиеся личной инициативы и самоорганизации, вызывают смешанные реакции среди сотрудников,
                что указывает на необходимость более ясного определения ролей и ожиданий.
              </p>
              <div className='flex justify-between'>
                <span className='text-xs text-[rgba(86,86,86,1)]'>Все команды</span>
                <img src='/static/img/stars.svg' className='size-4' alt='icon' />
              </div>
              <div className='absolute top-[-13px] text-[rgba(151,71,255,1)]  right-[10px] text-xs z-50 py-1 px-2 rounded-3xl bg-white border border-[rgba(151,71,255,1)]'>
                Новое
              </div>
            </div>
            <div className='w-[32%] h-[200px] bg-white border border-[rgba(151,71,255,1)] rounded-3xl relative p-5 flex flex-col justify-between'>
              <p className='text-sm text-start'>
                Сотрудники компании высоко оценивают возможности для профессионального роста, но выражают
                неудовлетворенность в области обратной связи и четкости целей.
              </p>
              <div className='flex justify-between'>
                <span className='text-xs text-[rgba(86,86,86,1)]'>Все команды</span>
                <img src='/static/img/stars.svg' className='size-4' alt='icon' />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </LibSwiper>
    </div>
  )
}
