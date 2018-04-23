<template>
  <div class="wz-input">
    <template v-if="type !== 'textarea'">
      <i class="fa input-box-icon"
         :class="icon"
         v-if="icon">
      </i>
      <input ref="input"
             class="input-box"
             :class="inputClasses"
             :disabled="disabled"
             :placeholder="placeholder"
             :type="type"
             :value="value"
             @blur="handleBlur"
             @input="handleInput"
             @focus="handleFocus"
             @keypress.enter="handleEnter"
             @keypress.esc="handleEsc" />
      <i class="fa fa-close input-box-icon"
         v-if="clearBtnFlag && value"
         @click="handleClear">
      </i>
    </template>
    <template v-else>
      <textarea class="input-textarea"
                ref="textarea"
                :disabled="disabled"
                :placeholder="placeholder"
                :value="value"
                @blur="handleBlur"
                @input="handleInput"
                @focus="handleFocus">
      </textarea>
    </template>
  </div>
</template>

<script>
import { oneof } from '../utils'

export default {
  name: 'wz-input',
  directives: { focus },
  props: {
    embedded: {
      type: Boolean,
      default: false
    },
    classes: {
      type: Array
    },
    border: {
      type: Boolean,
      default: true
    },
    clearBtnFlag: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Input'
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return oneof(value, ['text', 'textarea'])
      }
    },
    value: {
      type: [String, Number, Date]
    }
  },
  data: () => ({
    innerValue: ''
  }),
  computed: {
    inputClasses() {
      if (this.classes) {
        if (!this.border) {
          return this.classes.concat(['no-border'])
        }
        return this.classes
      }
      if (!this.border) {
        return 'no-border'
      }
    }
  },
  methods: {
    blur() {
      this.$refs.input.blur()
    },
    focus() {
      setTimeout(() => {
        this.$refs.input.focus()
      })
    },
    handleBlur() {
      this.$emit('blur')
    },
    handleClear() {
      this.$emit('input-clear')
    },
    handleFocus() {
      this.$emit('focus')
    },
    handleInput(event) {
      this.$emit('input', (this.innerValue = event.target.value))
    },
    handleEnter() {
      this.$emit('enter', this.innerValue)
    },
    handleEsc() {
      this.$emit('esc')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../style/variables.styl'

.wz-input
  display flex

  .input-box
    box-sizing border-box
    height 44px
    width 100%
    padding 0 12px
    border 1px solid $light-border-color
    border-radius 4px
    line-height 44px
    font-size 14px
    transition all 0.2s linear

    &:focus
      border-color $primary-color
      outline-style none

    &.no-border
      border none

    &.danger
      color $red-color

    &.warning
      color $orange-color

    &.line-through
      color $text-color-dark-grey
      text-decoration line-through

    &.title
      text-align center
      font-size 24px
      font-weight bold

    &:disabled
      background none

  .input-box-icon
    line-height 44px
    color $text-color-grey

  .input-textarea
    width 100%
    padding 20px
    min-height 180px
    border none
    line-height 22px
    font-size 14px
    resize none

    &:focus
      outline-style none
</style>
