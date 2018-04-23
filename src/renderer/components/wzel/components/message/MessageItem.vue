<template>
  <transition name="move">
    <div class="message-item"
         :style="offsetX"
         v-show="visible">
      <div class="content">
        <div class="icon">
          <i class="fa fa-fw"
             :class="iconType"></i>
        </div>
        <div class="desc">
          {{ desc }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { indeComponentMixin } from '../../mixins/inde'

const iconMap = {
  '': 'fa-info',
  warn: 'fa-warning',
  alert: 'fa-ban',
  info: 'fa-info-circle'
}

export default {
  name: 'MessageItem',
  mixins: [indeComponentMixin],
  data() {
    return {
      desc: '',
      duration: 5000,
      type: '',
      verticalOffset: 0,
      timer: null
    }
  },
  computed: {
    offsetX() {
      return `top: ${this.verticalOffset}px`
    },
    notiType() {
      return [this.type]
    },
    iconType() {
      return this.notiType.concat([iconMap[this.type]])
    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      if (!this.closed) {
        this._close()
      }
    }, this.duration)
  }
}
</script>


<style lang="stylus" scoped>
@import '../../styles/variables.styl'
@import '../../styles/mixins.styl'

.message-item
  position fixed
  left 50%
  z-index 200
  transition all 0.6s ease

  &.move-enter, &.move-leave-to
    transform translateY(-120%)
    opacity 0

  .content
    transform translateX(-50%)
    display flex
    padding 10px
    align-items center
    border-radius 4px
    background white
    standard-shadow()
    font-size 13px
    line-height 15px

    .icon
      margin-right 8px

      i
        &.alert
          color $danger-color

        &.warn
          color $warn-color

        &.info
          color $info-color

        &.success
          color $primary-color
</style>
