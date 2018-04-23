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
  i18n: {
    messages: {
      en: {
        message: {
          empty: 'Empty'
        }
      },
      zh: {
        message: {
          empty: '空'
        }
      }
    }
  },
  props: {
    info: {
      type: String,
      default: 'Empty'
    }
  },
  computed: {
    displayed() {
      if (this.info) return this.info
      return this.$t('message.empty')
    }
  }
}
</script>

<style lang="stylus" scoped>
.blank-view
  display flex
  flex 1
  width 100%
  height 100%
  flex-direction column
  justify-content center

  .logo
    margin auto
    width 100px
    text-align center
    color #d8d8d8
</style>
