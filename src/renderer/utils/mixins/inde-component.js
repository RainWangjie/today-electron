export const indeComponentMixin = {
  data: () => ({
    closed: false,
    visible: false,
    callback: null
  }),
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
        setTimeout(() => {
          this._destroyElement()
        }, 200)
      }
    }
  },
  methods: {
    _close() {
      this.closed = true
    },
    _destroyElement() {
      if (typeof this.onClose === 'function') this.onClose()
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
