<template>
  <modal :show-flag="showFlag"
         @quit="hide">
    <div class="confirm-box-component"
         @click.stop>
      <div class="box-header">
        <div class="box-header">
          <h1>{{ title || $t('message.title') }}</h1>
        </div>
        <div class="box-body">
          <p>{{ text || $t('message.text') }}</p>
        </div>
        <div class="box-footer">
          <button-base type="inverse"
                       :text="cancelText || $t('message.cancelText')"
                       @click="handleCancel" />
          <button-base type="danger"
                       :text="confirmText || $t('message.confirmText')"
                       @click="handleConfirm" />
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import ButtonBase from './ButtonBase'
import Modal from './Modal'

import { showMixin } from '../utils/mixins/show'

const i18n = {
  messages: {
    en: {
      message: {
        title: 'Confirm Box Title',
        text: 'Are you sure to do this?',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    },
    zh: {
      message: {
        title: '确认框标题',
        text: '你的真的要这样做吗',
        cancelText: '否',
        confirmText: '是'
      }
    }
  }
}

export default {
  name: 'ConfirmBox',
  i18n,
  components: {
    ButtonBase,
    Modal
  },
  mixins: [showMixin],
  props: {
    title: {
      type: String
    },
    text: {
      type: String
    },
    cancelText: {
      type: String
    },
    confirmText: {
      type: String
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
