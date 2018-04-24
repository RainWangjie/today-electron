<template>
  <div class="date-panel">
    <div class="date-panel-sidebar border-1px vertical"
         v-if="shortcut">
      <ul class="shortcut-list">
        <li class="shortcut-item"
            v-for="shortcut in shortcuts"
            :key="shortcut.name"
            @click="handleShortcutClick(shortcut)">
          {{ shortcut.name }}
        </li>
      </ul>
    </div>
    <div class="date-panel-body">
      <div class="date-panel-body-header border-1px horizontal">
        <span class="fa fa-angle-double-left switcher"
              @click="_changeYear(-1)"></span>
        <span class="fa fa-angle-left switcher"
              @click="_changeMonth(-1)"></span>
        <span class="header-text">
          {{ headerText }}
        </span>
        <span class="fa fa-angle-right switcher"
              @click="_changeMonth(1)"></span>
        <span class="fa fa-angle-double-right switcher"
              @click="_changeYear(1)"></span>
      </div>
      <div class="date-panel-table-container">
        <date-table :date="date"
                    :disabled-date="disabledDate"
                    :month="month"
                    :value="value"
                    :year="year"
                    @date-pick="handleDatePick"></date-table>
      </div>
    </div>
  </div>
</template>

<script>
import DateTable from '../base/DateTable'

import { t } from '../../../locale'
import { getToday, switchMonth } from '../../../utils/datetime'

const ONE_DAY = 3600 * 1000 * 24
const ONE_WEEK = ONE_DAY * 7

export const shortcuts = [
  {
    name: t('calendar.today'),
    value: function() {
      return new Date()
    }
  },
  {
    name: t('calendar.tomorrow'),
    value: function() {
      const date = new Date()
      date.setTime(date.getTime() + ONE_DAY)
      return date
    }
  },
  {
    name: t('calendar.inAWeek'),
    value: function() {
      const date = new Date()
      date.setTime(date.getTime() + ONE_WEEK)
      return date
    }
  }
]

export default {
  name: 'wz-date-panel',
  components: { DateTable },
  props: {
    shortcut: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      date: new Date(getToday()),
      month: null,
      shortcuts,
      value: '',
      year: null
    }
  },
  computed: {
    headerText() {
      if (!this.year) return ''
      return `${this.year} / ${this.month + 1}`
    }
  },
  watch: {
    date(newVal) {
      this._setMonthYear(newVal)
    },
    value(newVal) {
      if (!newVal) return
      newVal = new Date(newVal)
      if (!isNaN(newVal)) {
        this.date = newVal
        this.year = newVal.getFullYear()
        this.month = newVal.getMonth()
      }
    }
  },
  methods: {
    _changeMonth(val) {
      this.date = switchMonth(this.date, val)
    },
    _changeYear(val) {
      this.date = switchMonth(this.date, val * 12)
    },
    handleDatePick(pickedDate) {
      this.$emit('date-pick', new Date(pickedDate.getTime()))
      this.date.setFullYear(pickedDate.getFullYear())
      this.date.setMonth(pickedDate.getMonth())
      this.date.setDate(pickedDate.getDate())
      this.date = new Date(this.date)
    },
    handleShortcutClick(shortcut) {
      if (shortcut.value) {
        this.$emit('date-pick', shortcut.value())
      }
    },
    _setMonthYear(date) {
      this.month = date.getMonth()
      this.year = date.getFullYear()
    }
  },
  created() {
    // init month and year
    if (this.date && !this.year) {
      this._setMonthYear(this.date)
    }
    // all days before today should be disabled
    this.disabledDate = function(date) {
      return date && date.valueOf() < Date.now() - 86400000
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../styles/variables.styl'
@import '../../../styles/mixins.styl'

.date-panel
  display flex
  height 100%
  width 100%

  .date-panel-sidebar
    flex 0 0 50px
    margin-right 12px
    padding-right 12px
    right-border($light-border-color)

    .shortcut-list
      padding-left 0

      .shortcut-item
        list-style none
        padding 6px 8px
        height 24px
        min-width 60px
        line-height 24px
        font-size 14px
        border-radius 4px
        transition all 0.2s

        &:last-child
          margin-bottom 0

        &:hover
          background $background-color-light-grey

  .date-panel-body
    flex 1
    width 210px

    .date-panel-body-header
      display flex
      padding 0 0 8px 0
      bottom-border($light-border-color)
      text-align center

      .switcher
        flex 0 0 20px
        width 20px
        height 20px
        line-height 20px
        text-align center
        font-size 14px
        border-radius 2px
        color $text-color-dark-grey
        transition all 0.2s

        &:hover
          background $background-color-light-grey

      .header-text
        flex 1
        font-size 14px
        line-height 22px
        color $text-color-dark-grey

    .date-panel-table-container
      width 100%
      padding 12px 0 6px
</style>
