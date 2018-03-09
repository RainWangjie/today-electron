<template>
  <transition name="fade">
    <div class="context-menu" ref="container" v-show="visible" v-clickoutside="handleClickOutside">
      <ul>
        <context-menu-item v-for="command in commands" :key="command.title" :command="command" @click="handleClick" />
      </ul>
    </div>
  </transition>
</template>

<script>
import ContextMenuItem from './ContextMenuItem'
import Clickoutside from '../../utils/directives/clickoutside'
import { indeComponentMixin } from '../../utils/mixins/inde-component'

export default {
  name: 'ContextMenu',
  mixins: [indeComponentMixin],
  directives: {
    Clickoutside
  },
  data: () => ({
    commands: [
      {
        title: 'Rename',
        icon: 'fa-pencil',
        hook: 'rename',
        type: 'normal'
      },
      {
        title: 'Delete',
        icon: 'fa-trash',
        hook: 'delete',
        type: 'danger'
      }
    ],
    pos: null
  }),
  mounted() {
    this.$refs.container.style.left = `${this.pos.x}px`
    this.$refs.container.style.top = `${this.pos.y}px`
  },
  methods: {
    changePosition() {
      this.showFlag = true
    },
    handleClickOutside() {
      if (this.visible) this._close()
    },
    handleClick(hook) {
      this.visible = false
      if (typeof this.callback === 'function') this.callback(hook)
      this.closed = true
    },
    outside() {
      console.log('outside')
    }
  },
  components: {
    ContextMenuItem
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/style/mixins.styl';
@import '../../assets/style/transitions.styl';

.context-menu {
  position: fixed;
  min-width: 200px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  z-index: 200;
  standard-shadow();
  fade-transition();
}
</style>
