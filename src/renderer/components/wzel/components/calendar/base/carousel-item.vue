<template>
  <div class="carousel-item">
    <div class="cell-wrapper">
      <div class="cell"
           v-for="(cell, index) in cells"
           :class="_cellClass(cell)"
           :key="index"></div>
    </div>
    <div class="month">
      {{ this.year }} / {{ (this.month % 12) + 1 }}
    </div>
  </div>
</template>

<script>
import { getDayCountOfMonth, getFirstDayOfMonth } from '../../../utils/datetime'
import { deepCopy } from '../../../utils'

export default {
  name: 'CalendarLayoutItem',
  props: {
    date: {},
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

      let day = getFirstDayOfMonth(date)
      day = day === 0 ? 7 : day

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
        type: ''
      }

      if (day !== 7) {
        for (let i = 0; i < day; i++) {
          const cell = deepCopy(cellTemplate)
          cell.type = 'prev-month'
          cell.text = dateCountOfLastMonth - (day - 1) + i
          cells.push(cell)
        }
      }

      for (let i = 1; i <= dateCountOfMonth; i++) {
        const cell = deepCopy(cellTemplate)
        cell.type = 'this-month'
        cell.text = i
        cells.push(cell)
      }

      const nextMonthCount = 42 - cells.length
      for (let i = 1; i <= nextMonthCount; i++) {
        const cell = deepCopy(cellTemplate)
        cell.type = 'next-month'
        cell.text = i
        cells.push(cell)
      }

      return cells
    }
  },
  methods: {
    _cellClass(cell) {
      return cell.type
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
@import '../../../../../style/variables.styl'
@import '../../../../../style/mixins.styl'

.carousel-item
  display inline-block
  width 80px

  .cell-wrapper
    display flex
    flex-wrap wrap
    width 70px
    margin auto

    .cell
      width 10px
      height 10px
      transition all 0.2s

      &.this-month
        background $primary-color

  .month
    margin-top 6px
    width 100%
    text-align center
    font-size 18px
    color $primary-color
</style>
