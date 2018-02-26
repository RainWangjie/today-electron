import { storiesOf } from '@storybook/vue'
// import { withNotes } from '@storybook/addon-notes'
import { action } from '@storybook/addon-actions'
import WzSelect from '../renderer/components/Select'

storiesOf('Select', module).add('Demo', () => ({
  components: { WzSelect },
  data: () => ({
    options: [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }]
  }),
  template: `<div>
  <wz-select :options="options" @select="handleSelect"></wz-select>
  </div>`,
  methods: {
    handleSelect(value) {
      action('select')(value)
    }
  }
}))
