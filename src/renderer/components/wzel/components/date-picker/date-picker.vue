<template>
  <div class="date-picker-component">
    <div class="dropdown-wrapper"
         @mousedown.stop.prevent>
      <dropdown ref="dropdown"
                :auto-hide="false">
        <div class="change-mode-header border-1px horizontal"
             v-if="selectTime">
          <segment :options="options"
                   @segment-changed="_handleModeChange" />
        </div>
        <div class="panel-container"
             @mousedown.stop.prevent>
          <dropdown ref="timeDropdown"
                    :auto-hide="false"
                    class="time-picker-wrapper">
            <div ref="timePicker"></div>
          </dropdown>
          <!-- when picker mode changes, these two panels slide back and forth -->
          <div ref="picker"></div>
        </div>
        <div class="footer border-1px horizontal">
          <wz-button size="small"
                     :text="cancelText"
                     type="inverse"
                     @click="handleCancel"></wz-button>
          <wz-button size="small"
                     :text="confirmText"
                     type="primary"
                     :has-value="true"
                     :value="visualValue"
                     @click="handleConfirm"></wz-button>
        </div>
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
import DatePanel from './panel/date.vue'
import TimePanel from './panel/time.vue'
import { defaultFormatter } from '../../utils/datetime'
import WzButton from '../button'

import { t } from '../../locale'

export default {
  name: 'WzDatePicker',
  components: {
    Dropdown,
    InputBox,
    WzButton,
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
    // set this to true to enable TimePicker
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
      selectMode: 'date', // date or time
      options: [t('date'), t('time')],
      mode: 0
    }
  },
  computed: {
    confirmText() {
      return t('calendar.confirm')
    },
    cancelText() {
      return t('calendar.cancel')
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
    handleConfirm() {
      this.visible = false
      this.valueHolder = this.innerValue
      this.$emit('date-changed', this.innerValue)
    },
    handleCancel() {
      this.visible = false
      this._reset()
    },
    _handleModeChange(value) {
      const dp = this.$refs.timeDropdown
      value === 0 ? dp.hide() : dp.show()
      // everytime timepanel is opened, refresh it so it would tell
      // iscroll to refresh, otherwise iscroll won't work
      this.timePicker.refresh()
    },
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
        // when pickers is shown, give the already exist value to panels
        this.picker.value = this.value
        if (this.timePicker) this.timePicker.value = this.value

        this.picker.$on('date-pick', date => {
          const newDate = new Date(date)
          if (this.innerValue) {
            const oldDate = new Date(this.innerValue)
            const hour = oldDate.getHours()
            const minute = oldDate.getMinutes()
            newDate.setHours(hour)
            newDate.setMinutes(minute)
          }
          this.picker.value = this.innerValue = newDate
        })
      }

      if (this.selectTime && !this.timePicker) {
        this.timePicker = this.timePanel.$mount(this.$refs.timePicker)
        this.timePicker.value = this.value
        this.timePicker.$on('hour-changed', hour => {
          this.innerValue = new Date(this.innerValue).setHours(hour)
        })
        this.timePicker.$on('minute-changed', minute => {
          this.innerValue = new Date(this.innerValue).setMinutes(minute)
        })
      }
    }
  },
  created() {
    this.Panel = new Vue(DatePanel)
    if (this.selectTime) {
      this.timePanel = new Vue(TimePanel)
    }
  },
  watch: {
    // sync value to innerValue, there are times when parent component changes value
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.innerValue = newVal
          // display visual value the next time panel gets opened
          this.visualValue = defaultFormatter(newVal, this.selectTime)
        }
      }
    },
    innerValue(newVal) {
      this.visualValue = defaultFormatter(newVal, this.selectTime)
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
    // we have to destroy the Vue instance manually in case picker is destroyed
    this.picker && this.picker.$destroy()
    this.timePicker && this.timePicker.$destroy()
  }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/mixins.styl'

.date-picker-component
  position relative

  .input-wrapper
    padding 0 14px

  .change-mode-header
    text-align center
    padding-bottom 8px
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

    .panel-container
      // actually determines the width of the panel
      width 320px
      padding 8px 0
      height 240px

    .time-picker-wrapper
      position absolute
      width 50%
      left 50%
      transform translate3d(-50%, 0, 0)

    .footer
      padding 8px 0 0
      top-border($light-border-color)
      text-align right
</style>
