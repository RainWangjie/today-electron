<template>
  <li class="list-item-co border-1px horizontal" :class="{'current': currentListItem._id === item._id}" @click="handleClick" @contextmenu.prevent="handleContextMenu">
    <div class="icon-wrapper">
      <i class="fa fa-fw fa-tasks"></i>
    </div>
    <div class="title" v-html="item.title">
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'list-item',
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['currentListItem'])
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/mixins.styl';
@import '../assets/style/variables.styl';

.list-item-co {
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;
  height: 44px;
  background-color: white;
  bottom-border($light-border-color);
  align-items: center;

  &.current, &:hover {
    background: $background-color-light-grey;
  }

  .icon-wrapper {
    flex: 0 0 22px;
    width: 22px;
    height: 22px;
    color: $text-color-grey;
    line-height: 22px;
  }

  .title {
    flex: 1 200px;
    margin-left: 10px;
    line-height: 14px;
    font-size: 14px;
  }

  .counter {
    font-size: 12px;
    line-height: 12px;
    color: $text-color-grey;
    margin-right: 8px;
  }
}
</style>
