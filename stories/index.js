import { storiesOf } from '@storybook/vue'

import WzDatePicker from '../src/renderer/components/wzel/components/date-picker'

storiesOf('Welcome').add('WZEL', () => ({
  template:
    '<p>Welcome to WZEL, the component library used in today-electron.</p>'
}))

storiesOf('Date Picker')
  .add('Date', () => ({
    template: '<wz-date-picker></wz-date-picker>',
    components: {
      WzDatePicker
    }
  }))
  .add('Date and Time', () => ({
    template: '<wz-date-picker :select-time="true"></wz-date-picker>',
    components: {
      WzDatePicker
    }
  }))
