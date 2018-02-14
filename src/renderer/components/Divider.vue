<template>
  <div class="divider-component border-1px horizontal">

  </div>
</template>

<script>
export default {
  name: 'Divider'
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/mixins.styl'
@import '../assets/style/variables.styl'

.divider-component {
  bottom-border($light-border-color)
}
</style>
