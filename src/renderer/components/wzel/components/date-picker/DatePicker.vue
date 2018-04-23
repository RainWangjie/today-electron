<template>
  <div class="date-picker-component">
    <div class="dropdown-wrapper"
         @mousedown.stop.prevent>
      <dropdown ref="dropdown"
                :auto-hide="false">
        <div class="change-mode-header border-1px horizontal"
             v-if="selectTime">
          <segment :options="['Date', 'Time']"
                   @segment-changed="handleSwitchMode" />
        </div>
        <div ref="picker"></div>
      </dropdown>
    </div>
    <div class="input-wrapper">
      <input-box ref="input"
                 :border="false"
                 :classes="classes"
                 :clear-btn-flag="true"
                 :icon="icon"
                 :placeholder="placeholder"
                 :value="visualValue"
                 @blur="handleBlur"
                 @enter="handleBlur"
                 @focus="handleFocus"
                 @input-clear="handleClear" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Dropdown from '../dropdown.vue'
import InputBox from '../input.vue'
import Segment from '../segment.vue'
import ButtonBase from '../button.vue'
import DatePanel from './panel/Date.vue'
import TimePanel from './panel/Time.vue'
import { defaultFormatter } from '../../utils/datetime'

export default {
  name: 'WzDatePicker',
  components: {
    Dropdown,
    InputBox,
    ButtonBase,
    Segment
  },
  props: {
    classes: {
      type: Array
    },
    icon: {
      type: String,
      default: 'fa-clock-o'
    },
    placeholder: {
      type: String,
      default: 'Pick a Date'
    },
    // set this to true to enable TimePicker.
    selectTime: {
      type: Boolean,
      default: false
    },
    value: {}
  },
  data() {
    return {
      innerValue: this.value,
      visible: false,
      visualValue: '',
      valueHolder: this.value, // hold the value for closing datepicker
      selectMode: 'date' // date or time
    }
  },
  methods: {
    handleBlur() {
      this.visible = false
      this._reset()
    },
    handleClear() {
      this.$emit('date-changed')
      this.visualValue = ''
    },
    handleFocus() {
      this.visible = true
    },
    handleSwitchMode(val) {
      this.selectMode = val === 0 ? 'Date' : 'Time'
      this.Panel.$destroy()
      if (val === 0) {
        this.Panel = new Vue(DatePanel)
      }
      if (val === 1) {
        this.Panel = new Vue(TimePanel)
      }
      this.picker = this.Panel.$mount(this.$refs.picker)
    },
    // if user changes nothing, reset datepicker
    _reset() {
      this.innerValue = this.valueHolder
      this.$nextTick(() => {
        if (!this.valueHolder) {
          this.visualValue = ''
        }
      })
    },
    showPicker() {
      if (!this.picker) {
        this.picker = this.Panel.$mount(this.$refs.picker)
        this.picker.value = this.value

        // Bind event listeners.
        this.picker.$on('date-pick', date => {
          this.innerValue = date
          this.picker.value = date
        })
        this.picker.$on('pick-cancel', () => {
          this.visible = false
          this._reset()
        })
        this.picker.$on('pick-confirm', () => {
          this.visible = false
          this.valueHolder = this.innerValue
          this.$emit('date-changed', this.innerValue)
        })
      }
    }
  },
  created() {
    this.Panel = new Vue(DatePanel)
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.innerValue = newVal
          this.visualValue = defaultFormatter(this.innerValue)
        }
      }
    },
    innerValue(newVal) {
      this.visualValue = defaultFormatter(newVal)
    },
    visible(newVal) {
      if (newVal) {
        this.showPicker()
        this.$refs.dropdown.show()
      } else {
        this.$refs.dropdown.hide()
        this.$refs.input.blur()
      }
    }
  },
  beforeDestroy() {
    if (this.picker) {
      this.picker.$destroy()
    } // We have to destroy the Vue instance manually.
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../style/variables.styl'
@import '../../../../style/mixins.styl'

.date-picker-component
  position relative

  .input-wrapper
    padding 0 14px

  .change-mode-header
    padding 8px 8px 16px
    margin-bottom 8px
    text-align center
    bottom-border($light-border-color)

    .title
      flex 1
      font-size 14px
      color $text-color-dark-grey

    .switcher-wrapper
      flex 0 0 48px

  .dropdown-wrapper
    position absolute
    top 36px
    left 36px
    z-index 200
</style>
