<template>
  <div class="time-panel">
    <div class="ruler"></div>
    <div class="column "
         ref="hourWrapper">
      <ul class="container">
        <li class="cell border-1px horizontal"
            v-for="(i, index) in hours"
            :key="index"
            @click="changeHour(i)">
          {{ i }}
        </li>
      </ul>
    </div>
    <div class="column"
         ref="minuteWrapper">
      <ul class="container">
        <li class="cell"
            v-for="i in minutes"
            :key="i"
            @click="changeMinute(i)">
          {{ i }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll'

const createIntegerArray = function(length) {
  // three gaps for
  return Array.from(new Array(length), (x, i) => i)
}

const CELL_HEIGHT = 30
const BOUNCE_SPEED = 800

const createRegulator = function(vm, scrollerName) {
  let lastDest = 0
  const scroller = vm[scrollerName]

  return function() {
    const diff = Math.abs(scroller.y)
    let dest = parseInt(diff / CELL_HEIGHT)
    if (dest === lastDest) return
    lastDest = dest
    scrollerName === 'hourScroll' ? vm.changeHour(dest) : vm.changeMinute(dest)
  }
}

export default {
  name: 'wz-time-panel',
  props: {
    value: {
      type: Date
    }
  },
  data: () => ({
    hours: createIntegerArray(24),
    minutes: createIntegerArray(60)
  }),
  methods: {
    changeHour(i) {
      this.hourScroll &&
        this.hourScroll.scrollTo(0, -i * CELL_HEIGHT, BOUNCE_SPEED)
      this.$emit('hour-changed', i)
    },
    changeMinute(i) {
      this.minuteScroll &&
        this.minuteScroll.scrollTo(0, -i * CELL_HEIGHT, BOUNCE_SPEED)
      this.$emit('minute-changed', i)
    },
    refresh() {
      // triggered by date-picker when time panel appears,
      // tell iscroll to recalculate and scroll to a specific position
      setTimeout(() => {
        this.hourScroll.refresh()
        this.minuteScroll.refresh()
        const value = new Date(this.value)
        if (value) {
          this.changeHour(value.getHours())
          this.changeMinute(value.getMinutes())
        }
      }, 400)
    }
  },
  mounted() {
    // init scroll when DOM is actually loaded, so iscroll
    // could get the container's height correctly
    // we don't need scrollers to be responsive
    setTimeout(() => {
      this.hourScroll = new IScroll(this.$refs.hourWrapper, {
        mouseWheel: true
      })
      this.minuteScroll = new IScroll(this.$refs.minuteWrapper, {
        mouseWheel: true
      })
      // when scroller finished to scroll, scroll to the nereast cell
      this.hourScroll.on('scrollEnd', createRegulator(this, 'hourScroll'))
      this.minuteScroll.on('scrollEnd', createRegulator(this, 'minuteScroll'))
    }, 200)
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../styles/variables.styl'
@import '../../../styles/mixins.styl'

.time-panel
  display flex
  justify-content center

  .column
    width 60px
    height 210px
    overflow hidden

    .container
      box-sizing border-box
      padding 90px 0

      .cell
        height 30px
        line-height 30px
        font-size 14px
        text-align center

  .ruler
    position absolute
    top 98px
    width 140px
    height 30px
    left 50%
    transform translate3d(-50%, 0, 0)
    border-top 1px solid $primary-color
    border-bottom 1px solid $primary-color
</style>
