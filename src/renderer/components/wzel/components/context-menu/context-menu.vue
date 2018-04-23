<template>
  <transition name="fade">
    <div class="context-menu" :style="positionStyle" v-show="visible" v-clickoutside="handleClickOutside">
      <ul>
        <context-menu-item v-for="command in commands" :key="command.title" :command="command" @click="handleClick" />
      </ul>
    </div>
  </transition>
</template>

<script>
import ContextMenuItem from './context-menu-item'
import Clickoutside from '../../../utils/directives/clickoutside'
import { indeComponentMixin } from '../../../utils/mixins/inde-component'
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
  computed: {
    positionStyle() {
      return `top: ${this.pos.y}px; left: ${this.pos.x}px;`
    }
  },
  mounted() {
    // In case context menu is too close to window's edge.
    // Though it works, setTimeount is not elegant. But I don't know how to determine the
    // element's width and height in another way (and with a smooth transition) buz the rendering
    // process underhook is unknown.
    setTimeout(() => {
      const { clientWidth, clientHeight } = this.$el
      const { innerWidth, innerHeight } = window

      // add 2 to avoid to get closed by clickoutside directive
      if (innerWidth - this.pos.x < clientWidth) {
        this.pos.x = this.pos.x - clientWidth + 2
      }
      if (innerHeight - this.pos.y < clientHeight) {
        this.pos.y = this.pos.y - clientHeight + 2
      }
    })
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
@import '../../../assets/style/mixins.styl';
@import '../../../assets/style/transitions.styl';

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
