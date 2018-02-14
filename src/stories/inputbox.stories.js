import { storiesOf } from '@storybook/vue'

import InputBox from '../renderer/components/InputBox.vue'

storiesOf('InputBox', module).add('Simple', () => ({
  components: { InputBox },
  template: '<input-box></input-box>'
}))
