export const on = function(element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}
