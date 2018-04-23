<template>
  <transition name="fade">
    <div class="wz-modal-component"
         @click.stop="_close"
         v-show="visible">
      <div class="modal-container"
           @click.stop>
        <div class="modal-header">
          {{ header }}
        </div>
        <div class="modal-body">
          <!-- Display some text if it's a confirm box. -->
          <div v-if="type === 'confirm'">
            <p>{{ text }}</p>
          </div>
          <!-- Display an input if it's a dialog box. -->
          <div v-else-if="type === 'dialog'">
            <input-box ref="input"
                       v-model="input"
                       :placeholder="text"
                       @enter="handleEnter" />
          </div>
        </div>
        <div class="modal-footer">
          <wz-button type="inverse"
                     :text="footerCancel"
                     @click="_close" />
          <wz-button :type="_footerConfirmType"
                     :text="footerConfirm"
                     @click="handleConfirm" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import WzButton from '../button'
import InputBox from '../input'
import { t } from '../../locale'
import { indeComponentMixin } from '../../mixins/inde'

export default {
  name: 'Modal',
  mixins: [indeComponentMixin],
  data: function() {
    return {
      header: t('header'),
      footerCancel: t('cancel'),
      footerConfirm: t('confirm'),
      footerConfirmType: '',
      type: t('confirm'),
      text: t('placeholder'),
      input: ''
    }
  },
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
        // if it's a dialog box, it should be closed if caller returns something
        if (this.type === 'dialog' && this.callback(this.input) === undefined) {
          this._close()
        }
      } else {
        this._close()
      }
    },
    handleEnter() {
      this.handleConfirm()
    },
    focus() {
      this.$refs.input.focus()
    }
  },
  mounted() {
    if (this.type === 'dialog') this.focus()
  },
  components: {
    WzButton,
    InputBox
  }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/mixins.styl'
@import '../../styles/variables.styl'

.wz-modal-component
  full-screen()
  transition-fade()
  justify-content center
  align-items center
  z-index 200
  background $background-color-mask-grey

  .modal-container
    min-width 320px
    max-width 450px
    padding 20px
    background white
    border-radius 4px
    standard-shadow()

    .modal-header
      line-height 16px
      font-size 16px

      h1
        font-weight bold

    .modal-body
      margin 18px 0
      font-size 16px
      line-height 20px

    .modal-footer
      text-align right
</style>
