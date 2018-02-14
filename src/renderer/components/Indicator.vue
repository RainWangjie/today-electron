<template>
  <div class="indicator-component">
    <transition name="bounce">
      <div class="indicator" v-show="flag">
        <i class="fa fa-check"></i>
      </div>
    </transition>
    <!-- TODO: How can I include static resources instead of http service? -->
    <audio ref="audio" src="/static/sounds/complete.m4a" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'indicator',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['playSound'])
  },
  watch: {
    flag(newVal) {
      if (newVal && this.playSound) {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../assets/style/variables.styl';

  @keyframes bounce {
    0% {
      transform: scale(0);
    }

    70% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes bounceback {
    100% {
      transform: scale(0);
    }

    30% {
      transform: scale(1.3);
    }

    0% {
      transform: scale(1);
    }
  }

  .indicator-component {
    border-radius: 50%;
    width: 22px;
    height: 22px;
    background: $background-color-grey;

    .indicator {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background: $primary-color;
      line-height: 24px;
      text-align: center;
      color: white;

      &.bounce-enter-active {
        animation-delay: 0.1s;
        animation: bounce 0.35s ease;
      }

      &.bounce-leave-active {
        animation-delay: 0.1s;
        animation: bounceback 0.35s ease;
      }
    }
  }
</style>
