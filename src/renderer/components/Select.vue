<template>
  <div class="select-component" @click="handleFocus">
    <input-box :value="innerValue" :embedded="true" :editable="false" :border="false"></input-box>
    <dropdown class="dropdown" transition-type="topdown" ref="selectDropdown">
      <ul class="options">
        <li class="option" v-for="option in options" :key="option.title" @click="handleOptionClick(option)">
          {{ option.title }}
        </li>
      </ul>
    </dropdown>
  </div>
</template>

<script>
import Dropdown from './Dropdown'
import InputBox from './InputBox'

export default {
  name: 'Select',
  components: { Dropdown, InputBox },
  props: {
    options: {
      type: Array
    }
  },
  data: () => ({
    innerValue: ''
  }),
  methods: {
    handleFocus() {
      this.$refs.selectDropdown.show()
    },
    handleOptionClick(option) {
      this.innerValue = option.title
      this.$emit('select', option.title)
      this.$refs.selectDropdown.hide()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/variables.styl';

.select-component {
  .dropdown {
    position: absolute;
    right: 0;
    top: 44px;
    padding: 0;
    overflow: scroll;
  }

  .options {
    .option {
      padding: 8px;
      transition: background-color 0.2s linear;

      &:hover {
        background-color: $background-color-light-grey;
      }
    }
  }
}
</style>
