<template>
  <div class="select-component"
       @click="handleOpen">
    {{ index > -1 ? visualValue : placeholder}}
    <i class="fa fa-angle-down" />
    <dropdown class="dropdown"
              transition-type="topdown"
              ref="selectDropdown">
      <ul class="options">
        <li class="option"
            v-for="(option, index) in options"
            :key="option.title"
            @click="handleOptionClick(index)">
          {{ option.title }}
        </li>
      </ul>
    </dropdown>
    <i class="fa fa-dropdown" />
  </div>
</template>

<script>
import Dropdown from './dropdown'
import InputBox from './input'

export default {
  name: 'wz-select',
  components: { Dropdown, InputBox },
  props: {
    options: {
      type: Array
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    index: {
      type: Number,
      default: -1
    }
  },
  computed: {
    visualValue() {
      return this.options[this.index].title
    }
  },
  methods: {
    handleOpen() {
      this.$refs.selectDropdown.show()
    },
    handleOptionClick(index) {
      this.$emit('select', index)
      this.$refs.selectDropdown.hide()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../style/variables.styl'

.select-component
  text-align right
  height 44px
  min-width 120px
  line-height 44px

  .dropdown
    position absolute
    right 0
    top 40px
    padding 0
    overflow scroll

  .options
    .option
      line-height 22px
      text-align left
      padding 8px
      transition background-color 0.2s linear

      &:hover
        background-color $background-color-light-grey
</style>
