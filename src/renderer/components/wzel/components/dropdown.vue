<template>
  <transition :name="transitionType">
    <div class="dropdown-component"
         v-show="showFlag"
         v-clickoutside="_hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Clickoutside from '../directives/clickoutside'
import { showMixin } from '../../../utils/mixins/show'

export default {
  name: 'Dropdown',
  directives: { Clickoutside },
  mixins: [showMixin],
  props: {
    autoHide: {
      type: Boolean,
      default: true
    },
    transitionType: {
      type: String,
      default: 'topdown'
    }
  },
  methods: {
    _hide() {
      if (this.autoHide && this.showFlag) {
        this.hide()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../style/mixins.styl'

.dropdown-component
  border-radius 4px
  min-width 100px
  padding 8px
  background white
  standard-shadow()
  transition 0.2s all
  z-index 200

  &.topdown-enter, &.topdown-leave-to
    opacity 0
    transform scale3d(0.6, 0.6, 0)
    transform-origin 50% 0 0

  &.topleft-enter, &.topleft-leave-to
    transform scale3d(0, 0, 0)
    transform-origin -12% 0 0

  &.topright-enter, &.topright-leave-to
    transform scale3d(0, 0, 0)
    transform-origin 100% 0 0

  &.topslide-enter, &.topslide-leave
    transform transition3d(0, -100%, 0)
</style>
