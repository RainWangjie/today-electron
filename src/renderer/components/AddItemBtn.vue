<template>
  <div class="add-item-btn-component"
       @click="handleClick">
    <div class="icon-wrapper">
      <i class="fa fa-fw fa-plus"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddItemBtn',
  methods: {
    handleClick() {
      this.$emit('add')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../assets/style/mixins.styl';
  @import '../assets/style/variables.styl';

  .add-item-btn-component {
    position: fixed;
    right: 60px;
    bottom: 40px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    transition: all 0.2s linear;
    background: $primary-color;

    &:hover {
      background: $primary-color-highlighted;
    }

    .icon-wrapper {
      padding-top: 1px; // HACK: not in the middle only using line-height.
      line-height: 44px;
      font-size: 16px;
      text-align: center;
      color: white;
    }
  }
</style>
