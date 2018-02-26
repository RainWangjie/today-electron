import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { action } from '@storybook/addon-actions'
import ButtonBase from '../renderer/components/ButtonBase'

storiesOf('Button', module)
  .add('of Different Size', () => ({
    components: { ButtonBase },
    template: `<div>
<button-base text="Big" size="big" @click="handleButtonClicked"></button-base>
<button-base text="Medium" @click="handleButtonClicked"></button-base>
<button-base text="Small" size="small" @click="handleButtonClicked"></button-base>
</div>`,
    methods: {
      handleButtonClicked() {
        action('clicked')()
      }
    }
  }))
  .add('of Differenct Color', () => ({
    components: { ButtonBase },
    template: `<div>
<button-base text="Primary" type="primary"></button-base>
<button-base text="Secondary" type="secondary"></button-base>
<button-base text="Inverse" type="inverse"></button-base>
</div>`
  }))
  .add(
    'slot',
    withNotes(
      `You don't have to set title, wrap some text in tag pair is allowed, like a HTML default button.
    But title property enables you to pass a dynamic title.`
    )(() => ({
      components: { ButtonBase },
      template: `<button-base>Something</button-base>`
    }))
  )
