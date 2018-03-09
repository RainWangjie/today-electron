import Vue from 'vue'
import ModalComponent from './Modal'

const ModalConstructor = Vue.extend(ModalComponent)

let modal

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

Modal.close = function() {
  modal = null
}

export default Modal
