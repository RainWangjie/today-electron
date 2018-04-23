<template>
  <div class="segment-component">
    <div v-for="(option, index) in options"
         :key="index"
         :class="index === currentIndex ? 'current' : 'inverse'"
         class="segment-btn"
         @click="handleSegmentClicked(index)">
      {{ option }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Segment',
  props: {
    options: Array
  },
  data: () => ({
    currentIndex: 0
  }),
  methods: {
    handleSegmentClicked(index) {
      if (this.currentIndex !== index) {
        this.currentIndex = index
        this.$emit('segment-changed', index)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../style/variables.styl'

.segment-component
  .segment-btn
    display inline-block
    text-align center
    color white
    box-sizing border-box
    transition all 0.2s linear
    width 50px
    height 28px
    line-height 28px
    font-size 12px
    border 1px solid $primary-color
    border-left none

    &.current
      background $primary-color

    &.inverse
      color $primary-color
      background white

    &:first-child
      border-left 1px solid $primary-color
      border-top-left-radius 4px
      border-bottom-left-radius 4px

    &:last-child
      border-top-right-radius 4px
      border-bottom-right-radius 4px
</style>
