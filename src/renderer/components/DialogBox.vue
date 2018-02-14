<template>
  <modal :show-flag="showFlag" @quit="hide" @keydown.esc="hide">
    <div class="dialog-box-component" @click.stop>
      <div class="box-header">
        <h1>{{ title }}</h1>
      </div>
      <div class="box-body">
        <input-box ref="inputBox" v-model="input" :placeholder="placeholder" @enter="handleEnter" @esc="hide" />
      </div>
      <div class="box-footer">
        <button-base type="inverse" :text="cancelText" @click="handleCancel" />
        <button-base :hasValue="true" :text="confirmText" :value="input" @click="handleConfirm" />
      </div>
    </div>
  </modal>

</template>

<script>
import ButtonBase from './ButtonBase'
import InputBox from './InputBox'
import Modal from './Modal'

import { showMixin } from '../utils/mixins/show'

export default {
  name: 'DialogBox',
  components: {
    ButtonBase,
    InputBox,
    Modal
  },
  mixins: [showMixin],
  props: {
    title: {
      type: String,
      default: 'Dialog Box Title'
    },
    placeholder: {
      type: String,
      default: 'Dialog Box Placeholder'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    }
  },
  data() {
    return {
      input: ''
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.$refs.inputBox.focus()
    },
    hide() {
      this.$refs.inputBox.blur()
      this.showFlag = false
      setTimeout(() => {
        this.input = ''
      }, 320)
    },
    handleConfirm() {
      this.$emit('confirm', this.input)
      this.hide()
    },
    handleCancel() {
      this.hide()
    },
    handleEnter() {
      this.$emit('confirm', this.input)
      this.hide()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/mixins.styl';
@import '../assets/style/variables.styl';

.dialog-box-component {
  dialog-box();
}
</style>
