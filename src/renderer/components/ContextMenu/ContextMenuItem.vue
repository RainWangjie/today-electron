<template>
  <li class="context-menu-item border-1px horizontal" :class="command.type" @click="handleClick">
    <i class="fa fa-fw fa-margin-fix" :class="command.icon"></i>
    <span class="text">{{ command.title }}</span>
  </li>
</template>

<script>
export default {
  props: {
    command: {
      type: Object,
      default: function() {
        return {
          title: 'Menu Item',
          icon: 'fa-bars',
          hook: 'event'
        }
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', this.command.hook)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/style/mixins.styl';
@import '../../assets/style/variables.styl';

.context-menu-item {
  display: flex;
  box-sizing: border-box;
  padding: 11px 20px;
  bottom-border($light-border-color);
  align-items: center;
  transition: all 0.1s linear;

  &:hover, &.current {
    background: $background-color-light-grey;
  }

  &:last-child {
    no-border();
  }

  &.danger {
    color: $red-color;
  }

  &.important {
    color: $orange-color;
  }

  .text {
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
