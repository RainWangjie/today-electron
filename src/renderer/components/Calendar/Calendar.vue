<template>
  <div class="calendar">
    <date-table :month="month" :year="year" />
  </div>
</template>

<script>
import DateTable from './base/DateTable'

export default {
  name: 'Calendar',
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
.calendar {
  height: 100%;
}
</style>
