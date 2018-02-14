<template>
  <div class="calendar-view">
    <div class="calendar-layout-wrapper">
      <calendar-layout :month="month"
                       :year="year"
                       @month-change="handleMonthChange"></calendar-layout>
    </div>
    <div class="calendar-wrapper">
      <calendar :month="month"
                :year="year"></calendar>
    </div>
  </div>
</template>

<script>
  import Calendar from '../components/Calendar/index'
  import CalendarLayout from '../components/Calendar/CalendarCarousel'

  export default {
    name: 'CalendarView',
    components: {
      Calendar,
      CalendarLayout
    },
    data () {
      return {
        month: (new Date()).getMonth(),
        year: (new Date()).getFullYear()
      }
    },
    methods: {
      handleMonthChange (diff) {
        if (this.month === 11 && diff === 1) {
          this.year += 1
          this.month = 0
        } else if (this.month === 0 && diff === -1) {
          this.year -= 1
          this.month = 11
        } else {
          this.month += diff
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/style/mixins.styl';
  @import '../assets/style/variables.styl';

  .calendar-view {
    display: flex;
    flex-direction: column;
    height: 100%;

    .calendar-layout-wrapper {
      flex: 0 0 140px;
      height: 140px;
    }

    .calendar-wrapper {
      flex: 1;
      padding: 10px;
    }
  }
</style>
