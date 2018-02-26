<template>
  <modal :show-flag="showFlag"
         @quit="hide"
         @keydown.esc="hide">
    <div class="dialog-box-component"
         @click.stop>
      <div class="box-header">
        <h1>{{ title || $t('message.title') }}</h1>
      </div>
      <div class="box-body">
        <input-box ref="inputBox"
                   v-model="input"
                   :placeholder="placeholder || $t('message.placeholder')"
                   @enter="handleEnter"
                   @esc="hide" />
      </div>
      <div class="box-footer">
        <button-base type="inverse"
                     :text="cancelText  || $t('message.cancel')"
                     @click="handleCancel" />
        <button-base :hasValue="true"
                     :text="confirmText || $t('message.confirm')"
                     :value="input"
                     @click="handleConfirm" />
      </div>
    </div>
  </modal>

</template>

<script>
import ButtonBase from './ButtonBase'
import InputBox from './InputBox'
import Modal from './Modal'

import { showMixin } from '../utils/mixins/show'

const i18n = {
  messages: {
    en: {
      message: {
        title: 'Dialog Box Title',
        placeholder: 'Dialog Box Placeholder',
        cancel: 'Cancel',
        confirm: 'Confirm'
      }
    },
    zh: {
      message: {
        title: '对话框标题',
        placeholder: '对话框占位符',
        cancel: '取消',
        confirm: '确认'
      }
    }
  }
}

export default {
  name: 'DialogBox',
  i18n,
  components: {
    ButtonBase,
    InputBox,
    Modal
  },
  mixins: [showMixin],
  props: {
    title: { type: String },
    placeholder: { type: String },
    cancelText: { type: String },
    confirmText: { type: String }
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
