export default {
  update(el, binding, vnode) {
    const value = binding.value
    if (typeof value === 'object') {
      if (value.embedded) return
      if (value.focusFlag) {
        el.focus()
      } else {
        el.blur()
      }
    } else {
      if (value) {
        el.focus()
      } else {
        el.blur()
      }
    }
  }
}
