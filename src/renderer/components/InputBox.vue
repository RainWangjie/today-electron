<template>
  <div class="input-box-component">
    <template v-if="type !== 'textarea'">
      <i class="fa input-box-icon"
         :class="icon"
         v-if="icon"></i>
      <input class="input-box"
             :class="inputClasses"
             ref="input"
             :disabled="disabled"
             :placeholder="placeholder"
             :type="type"
             :value="value"
             @blur="handleBlur"
             @input="handleInput"
             @focus="handleFocus"
             @keypress.enter="handleEnter"
             @keydown.esc="handleEsc"
             v-focus="{ focusFlag, embedded }">
      <i class="fa fa-close input-box-icon"
         v-show="clearBtnFlag && value"
         @click="handleClear"></i>
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
import Focus from '../utils/directives/focus'

export default {
  name: 'InputBox',
  directives: { Focus },
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
      default: 'text'
    },
    value: {
      type: [String, Number, Date],
      default: ''
    }
  },
  data: () => ({
    focusFlag: false,
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
      this.focusFlag = false
    },
    focus() {
      this.focusFlag = true
    },
    handleBlur(event) {
      this.$emit('blur')
    },
    handleClear() {
      this.$emit('input-clear')
    },
    handleFocus(event) {
      this.$emit('focus')
    },
    handleInput(event) {
      this.innerValue = event.target.value
      this.$emit('input', this.innerValue)
    },
    handleEnter(event) {
      this.blur()
      this.$emit('enter', this.innerValue)
    },
    handleEsc(event) {
      this.$emit('esc')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../assets/style/variables.styl';

  .input-box-component {
    display: flex;

    .input-box {
      box-sizing: border-box;
      height: 44px;
      width: 100%;
      padding: 0 12px;
      border: 1px solid $light-border-color;
      border-radius: 4px;
      line-height: 44px;
      font-size: 14px;
      transition: all 0.2s linear;

      &:focus {
        border-color: $primary-color;
        outline-style: none;
      }

      &.no-border {
        border: none;
      }

      &.danger {
        color: $red-color;
      }

      &.warning {
        color: $orange-color;
      }

      &.line-through {
        color: $text-color-dark-grey;
        text-decoration: line-through;
      }

      &.title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }

      &:disabled {
        background: none;
      }
    }

    .input-box-icon {
      line-height: 44px;
      color: $text-color-grey;
    }

    .input-textarea {
      width: 100%;
      padding: 20px;
      min-height: 180px;
      border: none;
      line-height: 22px;
      font-size: 14px;
      resize: none;

      &:focus {
        outline-style: none;
      }
    }
  }
</style>
