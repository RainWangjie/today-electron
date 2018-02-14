import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { action } from '@storybook/addon-actions'

import Switcher from '../renderer/components/Switcher'

storiesOf('Switcher', module).add(
  'Simple',
  withNotes('Switcher do not use vue-model. Instead, there is an event called switched.')(() => ({
    components: { Switcher },
    data: () => ({
      status: true
    }),
    template: '<switcher :state="status" @switched="handleSwitch"></switcher>',
    methods: {
      handleSwitch(val) {
        action('switched')(val)
        this.status = !this.status
      }
    }
  }))
)
