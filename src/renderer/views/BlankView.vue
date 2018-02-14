<template>
  <div class="blank-view">
    <div class="logo">
      {{ info }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlankView',
  props: {
    info: {
      type: String,
      default: 'Empty'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .blank-view {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;

    .logo {
      margin: auto;
      width: 100px;
      text-align: center;
      color: #d8d8d8;
    }
  }
</style>
