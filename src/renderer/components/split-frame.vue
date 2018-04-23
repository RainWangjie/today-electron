<template>
  <div class="split-frame-base">
    <div class="left-column">
      <slot name="left-panel">
        Not implemented: Left panel is blank.
      </slot>
    </div>
    <div class="right-column border-1px vertical"
         :class="{'border': border}">
      <slot name="right-panel">
        Not implemented: Right panel is blank.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplitFrame',
  props: {
    border: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl'
@import '../style/mixins.styl'

.split-frame-base
  full-screen()

  .left-column
    flex 0 0 260px
    overflow hidden

  .right-column
    &.border
      left-border($light-border-color)
      padding-left 1px

    flex 1
    overflow hidden
</style>
