<template>
  <div class="calendar-date-table">
    <div class="cell"
         v-for="(cell, index) in cells"
         :class="_cellClass(cell)"
         :key="index"
         @click="handleClick(cell, index)">
      <span class="date">{{ cell.text }}</span>
      <div class="bars">
        <div class="complete bar"
             v-for="(num, index) in cell.completedCount"
             :key="index">
        </div>
        <div class="umcomplete bar"
             v-for="(num, index) in cell.uncompletedCount"
             :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import {
  clearHours,
  defaultFormatter,
  getDayCountOfMonth,
  getFirstDayOfMonth
} from '../../../utils/datetime'
import { deepCopy } from '../../../../../utils/array'

export default {
  name: 'CalendarDateTable',
  props: {
    month: {},
    year: {}
  },
  data() {
    return {
      cells: []
    }
  },
  watch: {
    rawCells: {
      handler(newVal) {
        this.cells = newVal
      },
      immediate: true
    }
  },
  computed: {
    rawCells() {
      const date = new Date(this.year, this.month, 1)
      const today = clearHours(new Date())

      let day = getFirstDayOfMonth(date)
      day = day === 0 ? 7 : day

      let prevMonth = this.month - 1
      let prevYear = this.year
      if (this.month === 0) {
        prevMonth = 1
        prevYear -= 1
      }

      let nextMonth = this.month + 1
      let nextYear = this.year
      if (this.month === 11) {
        nextMonth = 0
        nextYear += 1
      }

      const dateCountOfMonth = getDayCountOfMonth(
        date.getFullYear(),
        date.getMonth()
      )
      const dateCountOfLastMonth = getDayCountOfMonth(
        date.getFullYear(),
        date.getMonth() === 0 ? 11 : date.getMonth() - 1
      )

      let cells = []
      const cellTemplate = {
        text: '',
        type: '',
        completedCount: 0,
        uncompletedCount: 0,
        date: ''
      }

      if (day !== 7) {
        for (let i = 0; i < day; i++) {
          const cell = deepCopy(cellTemplate)
          const date = dateCountOfLastMonth - (day - 1) + i
          const datetime = clearHours(new Date(prevYear, prevMonth, date))
          const summary = this.summaries.find(item => {
            return item.date === datetime
          })
          cell.type = 'prev-month'
          cell.text = dateCountOfLastMonth - (day - 1) + i
          cell.date = datetime
          if (summary) {
            cell.completedCount = summary.completedItems.length
            cell.uncompletedCount = summary.uncompletedItems.length
          }
          cells.push(cell)
        }
      }

      for (let i = 1; i <= dateCountOfMonth; i++) {
        const cell = deepCopy(cellTemplate)
        const datetime = clearHours(new Date(this.year, this.month, i))
        const summary = this.summaries.find(item => {
          if (item.date === datetime) return true
          return false
        })
        cell.type = datetime === today ? 'today' : 'normal'
        cell.text = i
        cell.date = datetime
        if (summary) {
          cell.completedCount = summary.completedItems.length
          cell.uncompletedCount = summary.uncompletedItems.length
        }
        cells.push(cell)
      }

      const nextMonthCount = 42 - cells.length
      for (let i = 1; i <= nextMonthCount; i++) {
        const cell = deepCopy(cellTemplate)
        const datetime = clearHours(new Date(nextYear, nextMonth, i))
        const summary = this.summaries.find(item => {
          if (item.date === datetime) return true
          return false
        })
        cell.type = 'next-month'
        cell.text = i
        cell.date = datetime
        if (summary) {
          cell.completedCount = summary.completedItems.length
          cell.uncompletedCount = summary.uncompletedItems.length
        }
        cells.push(cell)
      }

      return cells
    },
    ...mapGetters(['summaries'])
  },
  methods: {
    _cellClass(cell) {
      return cell.type
    },
    handleClick(cell, index) {
      if (cell.type === 'today' || cell.type === 'normal') {
        const datetime = cell.date
        const summary = this.summaries.find(item => {
          if (item.date === datetime) return true
          return false
        })
        if (
          !summary ||
          (!summary.completedItems.length && !summary.uncompletedItems.length)
        ) {
          return
        }

        let desc = ''
        if (summary.completedItems.length) {
          desc += `<p class="noti-sub-title">${this.$t('calendar.completedTodos')}</p>`
          summary.completedItems.forEach(item => {
            desc += `<li class="noti-item">${item}</li>`
          })
        }
        if (summary.uncompletedItems.length) {
          desc += `<p class="noti-sub-title">${this.$t('calendar.uncompletedTodos')}</p>`
          summary.uncompletedItems.forEach(item => {
            desc += `<li class="noti-item">${item}</li>`
          })
        }
        let type = summary.completedItems.length ? 'success' : ''
        type = summary.uncompletedItems.length ? 'alert' : type
        this.$noti({
          title: defaultFormatter(datetime),
          desc,
          duration: 6000,
          type,
          rawHTML: true
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../style/variables.styl'
@import '../../../../../style/mixins.styl'

.calendar-date-table
  display flex
  flex-wrap wrap
  height 100%

  .cell
    position relative
    flex (100 / 7)% 1
    height (100 / 6)%
    background white
    transition all 0.2s

    &:hover
      transform translate3d(0, -8px, 0)
      z-index 200
      standard-shadow()

    &.prev-month, &.next-month
      .date
        color $text-color-dark-grey

    &.today
      .date
        color white
        text-align center
        background $primary-color

    .date
      position absolute
      right 8px
      top 8px
      width 24px
      height 24px
      line-height 24px
      font-size 14px
      border-radius 50%
      text-align right

    .bars
      display flex
      flex-wrap wrap
      position absolute
      left 12px
      bottom 12px
      right 12px

      .bar
        margin 4px 2px 0 0
        width 14px
        height 6px
        border-radius 3px

      .complete
        background $primary-color

      .umcomplete
        background $red-color
</style>
