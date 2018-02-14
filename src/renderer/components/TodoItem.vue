<template>
  <li class="todo-item-co border-1px horizontal"
      :class="{'current': detailedTodoItem._id === item._id}"
      @click="handleClick" @contextmenu.prevent="handleContextMenu">
    <div class="indicator-wrapper" @click.stop="handleToggle">
      <indicator :flag="item.completeFlag"></indicator>
    </div>
    <div class="content">
      <div class="title" :class="{'completed': item.completeFlag}" v-html="item.title"></div>
      <div class="info">
        <transition-group name="fade" tag="div">
          <span v-if="currentSpecialListItemTitle === 'Today'" class="info-item" key="list">
            <i class="fa fa-tasks"></i>
            {{ listName }}
          </span>
          <span v-if="item.planDatetime" class="info-item" key="plan">
            <i class="fa fa-clock-o"></i>
            {{ item.planDatetime | date }}
          </span>
          <span v-if="item.dueDatetime" class="info-item" key="due">
            <i class="fa fa-calendar"></i>
            {{ item.dueDatetime | date }}
          </span>
          <span v-if="item.desc" class="info-item" key="desc">
            <i class="fa fa-sticky-note-o"></i>
            Detail
          </span>
        </transition-group>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Indicator from '@/components/Indicator'

export default {
  name: 'todo-item',
  components: {
    Indicator
  },
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  computed: {
    listName() {
      const puuid = this.item.listUUID
      let title = ''

      if (!puuid) {
        title = 'To-Do'
      } else {
        const lists = this.listItems
        lists.forEach(item => {
          if (item._id === puuid) {
            title = item.title
          }
        })
      }

      return title
    },
    ...mapGetters([
      'detailedTodoItem',
      'currentSpecialListItemTitle',
      'listItems'
    ])
  },
  methods: {
    handleClick() {
      this.$emit('select', this.item)
    },
    handleContextMenu(event) {
      this.$emit('contextmenu', this.item, {
        x: event.pageX,
        y: event.pageY
      })
    },
    handleToggle() {
      this.toggleComplete(this.item)
    },
    ...mapMutations({
      toggleComplete: 'TOGGLE_COMPLETE'
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '../assets/style/mixins.styl';
  @import '../assets/style/variables.styl';

  .todo-item-co {
    display: flex;
    padding: 0 20px;
    height: 44px;
    box-sizing: border-box;
    bottom-border($light-border-color);
    background: white;
    align-items: center;
    transition: background all 0.2s;

    &.move-enter-active, &.move-leave-active {
      transition: all 0.2s;
    }

    &.move-enter-active {
      transition-delay: 0.2s;
    }

    &.move-enter, &.move-leave-to {
      height: 0;
      opacity: 0;
    }

    &.current {
      background: $background-color-light-grey;
    }

    .indicator-wrapper {
      flex: 0 0 22px;
      width: 22px;
      height: 22px;
      margin-right: 16px;
    }

    .content {
      flex: 1;

      .title {
        line-height: 14px;
        font-size: 14px;

        &.completed {
          text-decoration: line-through;
          color: $text-color-dark-grey;
        }
      }

      .info {
        color: $text-color-dark-grey;

        .info-item {
          display: inline-block;
          padding-top: 2px;
          margin-right: 10px;
          font-size: $text-small;

          &.fade-enter, &.fade-leave-to {
            transform: translateX(-100%);
            opacity: 0;
          }

          &.fade-enter-active, &.fade-leave-active {
            transition: all 0.2s;
          }
        }

        .fa {
          margin-right: 2px;
        }
      }
    }
  }
</style>
