<template>
  <div class="switcher-component">
    <div class="wrapper"
         @click.stop="_toggle">
      <div class="hinter"
           :class="hinterCls">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Switcher',
  props: {
    state: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hinterCls() {
      return this.state ? 'on' : 'off'
    }
  },
  methods: {
    _toggle() {
      this.$emit('switched', !this.state)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../assets/style/mixins.styl';
  @import '../../assets/style/variables.styl';

  .switcher-component {
    display: inline-block;
    width: 48px;
    height: 24px;
    border-radius: 12px;
    border: 1px solid $light-border-color;

    .hinter {
      margin: 3px;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      transition: all 0.2s ease;

      &.off {
        transform: translate3d(0, 0, 0);
        background-color: $background-color-grey;
      }

      &.on {
        transform: translate3d(24px, 0, 0);
        background-color: $primary-color;
      }
    }
  }
</style>
