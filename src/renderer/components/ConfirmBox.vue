<template>
  <modal :show-flag="showFlag" @quit="hide">
    <div class="confirm-box-component" @click.stop>
      <div class="box-header">
        <div class="box-header">
          <h1>{{ title }}</h1>
        </div>
        <div class="box-body">
          <p>{{ text }}</p>
        </div>
        <div class="box-footer">
          <button-base type="inverse" :text="cancelText" @click="handleCancel" />
          <button-base type="danger" :text="confirmText" @click="handleConfirm" />
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import ButtonBase from './ButtonBase'
import Modal from './Modal'

import { showMixin } from '../utils/mixins/show'

export default {
  name: 'ConfirmBox',
  components: {
    ButtonBase,
    Modal
  },
  mixins: [showMixin],
  props: {
    title: {
      type: String,
      default: 'Confirm Box Title'
    },
    text: {
      type: String,
      default: 'Are you sure to do this?'
    },
    cancelText: {
      type: String,
      default: 'No'
    },
    confirmText: {
      type: String,
      default: 'Yes'
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm')
      this.hide()
    },
    handleCancel() {
      this.hide()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/mixins.styl';
@import '../assets/style/variables.styl';

.confirm-box-component {
  dialog-box();
}
</style>
