<template>
  <transition name="noti-fade">
    <div class="notification-item" :style="offsetX" @mouseenter="_clearTimer()" @mouseleave="_resetTimer()" @mousedown="handleMousedown($event)" @mousemove="handleMousemove($event)" @mouseup="handleMouseup($event)" v-show="visible">
      <div class="close" @click="_close()">
        <i class="fa fa-close"></i>
      </div>
      <div class="noti-bar" :class="notiType">
      </div>
      <div class="content">
        <div class="title">
          {{ title }}
        </div>
        <div class="desc" v-if="!rawHTML">{{ desc }}</div>
        <div class="desc" v-else v-html="desc">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { indeComponentMixin } from '../../../utils/mixins/inde-component'
export default {
  name: 'NotificationItem',
  mixins: [indeComponentMixin],
  data() {
    return {
      title: '',
      desc: '',
      duration: 4500, // ms
      type: '',
      verticalOffset: 0,
      timer: null,
      rawHTML: false
    }
  },
  computed: {
    offsetX() {
      return `top: ${this.verticalOffset}px`
    },
    notiType() {
      return [this.type]
    }
  },
  created() {
    // mp is shortFor mousePosition.
    this.mp = {
      on: false,
      x: 0,
      y: 0,
      x2: 0,
      y2: 0
    }
  },
  mounted() {
    // If duration set, notification item would close itself.
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this._close()
        }
      }, this.duration)
    }
  },
  methods: {
    _clearTimer() {
      clearTimeout(this.timer)
    },
    _resetTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this._close()
          }
        }, this.duration)
      }
    },
    handleMousedown(event) {
      this.mp.on = true
      this.mp.x = event.clientX
      this.mp.y = event.clientY
    },
    handleMousemove(event) {
      if (!this.mp.on) return
      this.mp.x2 = event.clientX
      this.mp.y2 = event.clientY
    },
    handleMouseup(event) {
      if (this.mp.on) {
        this.mp.on = false
        const xdiff = this.mp.x2 - this.mp.x
        const ydiff = Math.abs(this.mp.y2 - this.mp.y)
        if (xdiff < 40 || ydiff > xdiff) return
        this._close()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/style/variables.styl';
@import '../../../assets/style/mixins.styl';

.notification-item {
  position: fixed;
  display: flex;
  overflow: hidden;
  right: 20px;
  width: 300px;
  padding: 20px;
  min-height: 20px;
  background: white;
  z-index: 300;
  border-radius: 4px;
  standard-shadow();
  transition: all 0.6s ease;

  &.noti-fade-enter, &.noti-fade-leave-to {
    transform: translateX(120%);
    opacity: 0;
  }

  .noti-bar {
    flex: 0 0 4px;
    margin-right: 8px;
    border-radius: 4px;
    background: $background-color-grey;

    &.alert {
      background: $danger-color;
    }

    &.warn {
      background: $warn-color;
    }

    &.info {
      background: $info-color;
    }

    &.success {
      background: $primary-color;
    }
  }

  .close {
    position: absolute;
    right: 20px;
    top: 22px;
    color: $text-color-dark-grey;
    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
      color: $danger-color;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-size: 18px;
    }

    .desc {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>
