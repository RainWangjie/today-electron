<template>
  <transition name="fade">
    <div class="wz-modal-component" @click.stop="_close" v-show="visible">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          {{ header }}
        </div>
        <div class="modal-body">
          <!-- Display some text if it's a confirm box. -->
          <div v-if="type === 'confirm'">
            <p>{{ text || $t('message.text') }}</p>
          </div>
          <!-- Display an input if it's a dialog box. -->
          <div v-else-if="type === 'dialog'">
            <input-box ref="inputBox" v-model="input" :embedded="true" :placeholder="text || $t('message.text')" @enter="handleEnter" />
          </div>
          <div v-else></div>
        </div>
        <div class="modal-footer">
          <button-base type="inverse" :text="footerCancel" @click="_close" />
          <button-base :type="_footerConfirmType" :text="footerConfirm" @click="handleConfirm" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ButtonBase from '../ButtonBase'
import InputBox from '../InputBox'
import { indeComponentMixin } from '../../utils/mixins/inde-component'

const i18n = {
  messages: {
    en: {
      message: {
        title: 'Modal Title',
        text: 'Modal Placeholder',
        cancelText: 'No',
        confirmText: 'Yes'
      }
    },
    zh: {
      message: {
        title: '模态框标题',
        text: '模态框占位',
        cancelText: '否',
        confirmText: '是'
      }
    }
  }
}

export default {
  name: 'Modal',
  mixins: [indeComponentMixin],
  data: () => ({
    header: 'Header',
    footerCancel: 'Cancel',
    footerConfirm: 'Confirm',
    footerConfirmType: '',
    type: 'confirm',
    text: 'Placeholder',
    input: ''
  }),
  computed: {
    _footerConfirmType() {
      if (this.footerConfirmType) return this.footerConfirmType
      if (this.type === 'confirm') return 'danger'
      if (this.type === 'dialog') return 'primary'
      return 'primary'
    }
  },
  methods: {
    handleConfirm() {
      if (this.type === 'dialog' && this.input === '') return

      if (typeof this.callback === 'function') {
        if (this.type === 'confirm') {
          this.callback()
          this._close()
        }
        if (this.type === 'dialog' && this.callback(this.input) === undefined) {
          this._close()
        }
      } else {
        this._close()
      }
    },
    handleEnter() {}
  },
  components: {
    ButtonBase,
    InputBox
  },
  i18n
}
</script>

<style lang="stylus" scoped>
@import '../../assets/style/mixins.styl';
@import '../../assets/style/variables.styl';

.wz-modal-component {
  full-screen();
  transition-fade();
  justify-content: center;
  align-items: center;
  z-index: 200;
  background: $background-color-mask-grey;

  .modal-container {
    min-width: 320px;
    padding: 20px;
    background: white;
    border-radius: 4px;
    standard-shadow();

    .modal-header {
      line-height: 16px;
      font-size: 16px;

      h1 {
        font-weight: bold;
      }
    }

    .modal-body {
      margin: 18px 0;
      font-size: 16px;
      line-height: 20px;
    }

    .modal-footer {
      text-align: right;
    }
  }
}
</style>
