import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import Segment from '../renderer/components/Segment.vue'

storiesOf('Segment', module).add('Simple', () => ({
  components: { Segment },
  data() {
    return {
      options: ['First', 'Second', 'Third']
    }
  },
  template:
    '<segment :options="options" @segment-changed="handleSegmentChanged"/>',
  methods: {
    handleSegmentChanged(val) {
      action('segment-changed')(val)
    }
  }
}))
