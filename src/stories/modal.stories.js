import { storiesOf } from '@storybook/vue'
import ButtonBase from '../renderer/components/ButtonBase'
import Modal from '../renderer/components/Modal/Modal'

storiesOf('Modal', module).add('Confirm Box Modal', () => ({
  components: { Modal, ButtonBase },
  template: `<div>
  <button-base text="Open" @click="handleOpenModal" />
    <modal ref="modal" type="confirm" />
  </div>`,
  methods: {
    handleOpenModal() {
      this.$refs.modal.show()
    }
  }
}))
