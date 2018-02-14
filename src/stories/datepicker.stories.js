import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withNotes } from '@storybook/addon-notes'

import DatePicker from '../renderer/components/DatePicker'

storiesOf('DatePicker', module)
  .add('Pick Date', () => ({
    components: { DatePicker },
    data: () => ({
      date: ''
    }),
    template: '<date-picker :value="date" @date-changed="handleDateChange"/>',
    methods: {
      handleDateChange(val) {
        action('date picked')(val)
        this.date = val
      }
    }
  }))
  .add(
    'Pick Date & Time',
    withNotes('Set :select-time="true" to select time and date.')(() => ({
      components: { DatePicker },
      data: () => ({
        date: '',
        selectTime: true
      }),
      template:
        '<date-picker :value="date" :select-time="selectTime" @date-changed="handleDateChange"/>',
      methods: {
        handleDateChange(val) {
          action('date picked')(val)
          this.date = val
        }
      }
    }))
  )
