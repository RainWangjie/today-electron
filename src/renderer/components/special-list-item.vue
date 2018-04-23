<template>
  <li class="list-item border-1px horizontal"
      :class="{'current': currentSpecialListItemTitle === title}"
      @click="handleClick">
    <div class="icon-wrapper">
      <i class="fa fa-fw"
         :class="iconClass">
      </i>
    </div>
    <div class="title"
         v-html="title">
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'list-item',
  props: {
    title: {
      type: String,
      default: 'List'
    }
  },
  computed: {
    iconClass() {
      if (this.title === 'Today') {
        return ['fa-sun-o', 'yellow']
      }
      if (this.title === 'To-Do') {
        return ['fa-check-square-o', 'blue']
      }
    },
    ...mapGetters(['currentSpecialListItemTitle'])
  },
  methods: {
    handleClick() {
      this.$emit('select-special-list-item', this.title)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixins.styl'
@import '../style/variables.styl'

.list-item
  display flex
  box-sizing border-box
  padding 0 20px
  height 44px
  background-color white
  bottom-border($light-border-color)
  align-items center

  &.current, &:hover
    background $background-color-light-grey

  .icon-wrapper
    flex 0 0 22px
    width 22px
    height 22px
    color $text-color-grey
    line-height 22px

    .yellow
      color $orange-color

    .blue
      color $blue-color

  .title
    flex 1
    margin-left 10px
    line-height 14px
    font-size 14px

  .handler
    width 22px
    height 22px
    background #d8d8d8
</style>
