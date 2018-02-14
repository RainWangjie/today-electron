<template>
  <transition name="fade">
    <div class="modal-component" @click="handleClickOutside" v-show="showFlag">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    showFlag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickOutside() {
      this.$emit('quit')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/mixins.styl';
@import '../assets/style/variables.styl';

.modal-component {
  full-screen();
  vertical-flex();
  transition-fade();
  z-index: 100;
  background: $background-color-mask-grey;
}
</style>
