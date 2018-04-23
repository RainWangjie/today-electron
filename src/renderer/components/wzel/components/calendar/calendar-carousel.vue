<template>
  <div class="calendar-carousel-component">
    <div class="content">
      <i class="fa fa-fw fa-arrow-left arrow"
         @click="handleClick(-1)"></i>
      <div class="items-wrapper">
        <item :date="date"
              :month="month"
              :year="year"></item>
      </div>
      <i class="fa fa-fw fa-arrow-right arrow"
         @click="handleClick(1)"></i>
    </div>
  </div>
</template>

<script>
import Item from './base/carousel-item'

export default {
  name: 'wz-calendar-carousel',
  components: {
    Item
  },
  props: {
    date: {},
    month: {},
    year: {}
  },
  computed: {},
  methods: {
    handleClick(diff) {
      this.$emit('month-change', diff)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/mixins.styl'

.calendar-carousel-component
  display flex
  flex-direction column
  justify-content center
  height 100%

  .content
    display flex
    flex-direction center

    .arrow
      flex 0 0 58px
      line-height 68px
      transition all 0.2s
      color $text-color-dark-grey

      &:hover
        color $primary-color
        transform translateY(-2px)

    .items-wrapper
      flex 1
      text-align center
</style>
