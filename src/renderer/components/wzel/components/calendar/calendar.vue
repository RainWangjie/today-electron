<template>
  <div class="calendar">
    <date-table :month="month"
                :year="year" />
  </div>
</template>

<script>
import DateTable from './base/date-table'

export default {
  name: 'wz-calendar',
  components: {
    DateTable
  },
  props: {
    month: {},
    year: {}
  }
}
</script>

<style lang="stylus" scoped>
.calendar
  height 100%
</style>
