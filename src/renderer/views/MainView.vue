<template>
  <transition name="scale">
    <div class="main-view">
      <split-frame>
        <list-item-view slot="left-panel"></list-item-view>
        <router-view slot="right-panel"></router-view>
      </split-frame>
    </div>
  </transition>
</template>

<script>
import ListItemView from './ListItemView'
import SplitFrame from '../components/SplitFrame'

export default {
  name: 'MainView',
  components: {
    ListItemView,
    SplitFrame
  }
}
</script>

<style lang="stylus" scoped>
.main-view {
  width: 100%;
  height: 100%;
  background: white;

  &.scale-enter-active, &.scale-leave-active {
    transition: all 0.2s;
  }

  &.scale-enter-active {
    transition-delay: 0.15s;
  }

  &.scale-enter, &.scale-leave-to {
    transform: scale3d(0.95, 0.95, 0);
    transform-origin: 50% 50%;
    opacity: 0;
  }
}
</style>
