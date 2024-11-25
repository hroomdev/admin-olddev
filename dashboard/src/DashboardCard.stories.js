import { fn } from '@storybook/test'

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from '@mui/material/styles'

import DashboardCard from './DashboardCard'

const themeext = extendTheme({
  colorSchemes: { light: true, dark: true },
  cssVarPrefix: 'mui'
})

//themeext.vars.palette.primary.main = 'red'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Dashboard/Card',
  component: DashboardCard,
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      // 👇 Make it configurable by reading the theme value from parameters
      return (
        <CssVarsProvider theme={themeext}>
          <Story />
        </CssVarsProvider>
      )
    }
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],

  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    borderColor: { control: 'select', options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'] },
    chipBackgroundColor: {
      control: 'select',
      options: [
        'action-selected',
        'divider',
        'primary-main',
        'background-default',
        'action-disabled',
        'action-hover',
        'info-main',
        'info-mainChannel',
        'rose-main'
      ]
    }
  }

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //args: { onClick: fn() }
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AdviceStats = {
  args: {
    title: 'Проанализируйте срезы в разделе Аналитика, чтобы исследовать слабые метрики глубже. ',
    avatarIcon: 'ri-car-line',
    ritoric: 'Что делать дальше',
    chipLabel: 'рекомендация',
    chipBackgroundColor: 'action-selected'
  }
}

export const InsightStats = {
  args: {
    title:
      'Сотрудники компании высоко оценивают возможности для профессионального роста, но выражают неудовлетворенность в области обратной связи и четкости целей. ',
    avatarIcon: 'ri-error-warning-line',
    ritoric: 'все команды',
    chipLabel: 'критично',
    chipBackgroundColor: 'rose-main'
  }
}

export const TeamActionStats = {
  args: {
    title: 'Улучшите обратную связь от руководства для повышения вовлеченности ',
    ritoric: 'Продажи',
    chipLabel: 'критично',
    chipBackgroundColor: 'rose-main'
  }
}
