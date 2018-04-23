import Vue from 'vue'
import ModalComponent from './Modal'

const ModalConstructor = Vue.extend(ModalComponent)

let modal

window.addEventListener('keydown', event => {
  if (!modal) return
  // esc
  if (event.keyCode === 27) {
    modal._close()
  }
})

const Modal = function(options) {
  if (modal) return

  options.onClose = function() {
    Modal.close()
  }
  modal = new ModalConstructor({ data: options })
  modal.vm = modal.$mount()
  document.body.appendChild(modal.vm.$el)
  modal.vm.visible = true
  return modal.vm
}

Modal.dialog = function(options) {
  options.type = 'dialog'
  return Modal(options)
}

Modal.confirm = function(options) {
  options.type = 'confirm'
  return Modal(options)
}

Modal.close = function() {
  modal = null
}

export default Modal
