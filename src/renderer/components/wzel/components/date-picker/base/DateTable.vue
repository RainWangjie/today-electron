<template>
  <div class="date-table">
    <div class="week-hinter">
      <span class="date"
            v-for="day in days"
            :key="day">
        {{ day }}</span>
    </div>
    <div class="cells-wrapper">
      <span class="cell"
            v-for="(cell, index) in cells"
            :class="_cellClass(cell)"
            :key="index"
            @click="handleClick(cell, index)">
        {{ cell.text }}</span>
    </div>
  </div>
</template>

<script>
import {
  clearHours,
  getDayCountOfMonth,
  getFirstDayOfMonth
} from '../../../../utils/datetime'
import { deepCopy } from '../../../../utils/array'

export default {
  name: '',
  props: {
    date: {},
    disabledDate: {}, // A function to calculate disabled dates.
    month: {},
    value: '',
    year: {}
  },
  data() {
    return {
      cells: []
    }
  },
  computed: {
    days() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    rawCells() {
      const date = new Date(this.year, this.month, 1)
      const today = clearHours(new Date())
      const selectedDay = clearHours(new Date(this.value))

      let day = getFirstDayOfMonth(date)
      day = day === 0 ? 7 : day

      let prevMonth = this.month - 1
      let prevYear = this.year
      if (this.month === 0) {
        prevMonth = 11
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
      const disabledDate = this.disabledDate

      let cells = []
      const cellTemplate = {
        text: '',
        type: '',
        selected: false,
        disabled: false
      }

      if (day !== 7) {
        for (let i = 0; i < day; i++) {
          const cell = deepCopy(cellTemplate)
          cell.type = 'prev-month'
          cell.text = dateCountOfLastMonth - (day - 1) + i
          const time = clearHours(new Date(prevYear, prevMonth, cell.text))
          cell.disabled =
            typeof disabledDate === 'function' && disabledDate(new Date(time))
          cells.push(cell)
        }
      }

      for (let i = 1; i <= dateCountOfMonth; i++) {
        const cell = deepCopy(cellTemplate)
        const time = clearHours(new Date(this.year, this.month, i))
        cell.type = time === today ? 'today' : 'normal'
        cell.text = i
        cell.selected = time === selectedDay
        cell.disabled =
          typeof disabledDate === 'function' && disabledDate(new Date(time))
        cells.push(cell)
      }

      const nextMonthCount = 42 - cells.length
      for (let i = 1; i <= nextMonthCount; i++) {
        const cell = deepCopy(cellTemplate)
        const time = clearHours(new Date(nextYear, nextMonth, i))
        cell.type = 'next-month'
        cell.text = i
        cell.disabled =
          typeof disabledDate === 'function' && disabledDate(new Date(time))
        cells.push(cell)
      }

      return cells
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
  methods: {
    _cellClass(cell) {
      const classes = []
      classes.push(cell.type)
      if (cell.disabled) {
        classes.push('disabled')
      }
      if (cell.selected) {
        classes.push('selected')
      }
      return classes
    },
    handleClick(cell, index) {
      if (cell.disabled) return
      this.$emit('date-pick', this._createDateFromCell(cell))
    },
    _createDateFromCell(cell) {
      const date = this.date
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      const pickedDate = cell.text

      let month = this.month
      let year = this.year

      if (cell.type === 'prev-month') {
        if (month === 0) {
          month = 11
          year--
        } else {
          month--
        }
      } else if (cell.type === 'next-month') {
        if (month === 11) {
          month = 0
          year++
        } else {
          month++
        }
      }

      return new Date(year, month, pickedDate, hours, minutes, seconds)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../../assets/style/variables.styl';
  @import '../../../../assets/style/mixins.styl';

  .date-table {
    .week-hinter {
      display: flex;
      width: 100%;

      .date {
        flex: 1;
        width: 22px;
        line-height: 10px;
        font-size: 10px;
        text-align: center;
        color: $text-color-dark-grey;
      }
    }

    .cells-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin-top: 8px;

      .cell {
        flex: 30px 30px 1;
        width: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        border-radius: 2px;
        transition: 0.2s all;

        &.today, &:hover {
          background: $background-color-light-grey;
        }

        &:hover {
          cursor: pointer;
        }

        &.disabled {
          color: $text-color-grey !important;
          disable: disable;

          &:hover {
            background: none;
            cursor: not-allowed;
          }
        }

        &.prev-month, &.next-month {
          color: $text-color-dark-grey;
        }

        &.selected {
          background: $primary-color;
          color: white;
        }
      }
    }
  }
</style>
