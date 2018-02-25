export const showMixin = {
  data() {
    return {
      showFlag: false,
      lock: false
    }
  },
  methods: {
    show() {
      if (!this.lock) {
        this.showFlag = true
      }
    },
    hide() {
      this.showFlag = false
      this.lock = true
      setTimeout(() => {
        this.lock = false
      }, 200)
    }
  }
}
