import Vue from 'vue'
import ContextMenuComponent from './context-menu'

const ContextMenuConstructor = Vue.extend(ContextMenuComponent)

let contextMenu

const ContextMenu = function(options) {
  if (contextMenu) return

  options.onClose = function() {
    ContextMenu.close()
  }
  contextMenu = new ContextMenuConstructor({data: options})
  contextMenu.vm = contextMenu.$mount()
  document.body.appendChild(contextMenu.vm.$el)
  contextMenu.vm.visible = true
  return contextMenu.vm
}

ContextMenu.close = function() {
  contextMenu = null
}

export default ContextMenu
