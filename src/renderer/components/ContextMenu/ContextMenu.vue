<template>
  <transition name="fade">
    <div class="context-menu" ref="contextMenuContainer" v-show="showFlag" v-clickoutside="hide" @click.stop @contextmenu.stop>
      <ul>
        <context-menu-item v-for="command in commands" :key="command.title" :command="command" @click="emit">
        </context-menu-item>
      </ul>
    </div>
  </transition>
</template>

<script>
import ContextMenuItem from './ContextMenuItem'
import { showMixin } from '../../utils/mixins/show'
import Clickoutside from '../../utils/directives/clickoutside'

export default {
  name: 'ContextMenu',
  components: {
    ContextMenuItem
  },
  mixins: [showMixin],
  directives: {
    Clickoutside
  },
  props: {
    commands: {
      type: Array,
      default: function() {
        return [
          {
            title: 'Rename',
            icon: 'fa-pencil',
            event: 'rename',
            type: 'normal'
          },
          {
            title: 'Delete',
            icon: 'fa-trash',
            event: 'delete',
            type: 'danger'
          }
        ]
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    show(pos) {
      this.$refs.contextMenuContainer.style.left = `${pos.x}px`
      this.$refs.contextMenuContainer.style.top = `${pos.y}px`
      this.showFlag = true
    },
    emit(eventName) {
      this.$emit('select', eventName)
      this.hide()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/style/mixins.styl';

.context-menu {
  position: fixed;
  min-width: 200px;
  background: white;
  border-radius: 4px;
  overflow: hidden; // So that children's background would not overflow.
  z-index: 200;
  standard-shadow();

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: opacity 0.12s linear;
  }
}
</style>
