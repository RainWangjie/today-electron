<template>
  <div class="add-item-component border-1px horizontal"
       @click="handleClick">
    <i class="fa fa-plus"></i>
  </div>
</template>

<script>
  export default {
    name: 'AddItem',
    methods: {
      handleClick () {
        this.$emit('add')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/style/mixins.styl';
  @import '../assets/style/variables.styl';

  .add-item-component {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 100%;
    top-border($light-border-color);
    bottom-border($light-border-color);
    transition: all 0.2s ease;

    &:hover {
      background: $background-color-light-grey;

      // no-border();
      i {
        color: $text-clor-dark-grey;
      }
    }

    i {
      font-size: 12px;
      color: $text-color-grey;
      transition: all 0.2s ease;
    }
  }
</style>
