import Vue from 'vue'
import MessageTemplate from './MessageItem'

const MessageConstructor = Vue.extend(MessageTemplate)

let newMessage
let messages = []
let seed = 1

const Message = function(options) {
  options = options || {}
  const id = 'message_' + seed++
  let offset = options.offset || 8

  options.onClose = function() {
    Message.close(id)
  }

  newMessage = new MessageConstructor({
    data: options
  })

  newMessage.id = id
  newMessage.vm = newMessage.$mount()
  document.body.appendChild(newMessage.vm.$el)
  newMessage.vm.visible = true
  newMessage.dom = newMessage.vm.$el

  messages.forEach(item => {
    offset += item.$el.clientHeight + 8
  })
  newMessage.verticalOffset = offset
  messages.push(newMessage)
  return newMessage.vm
}

Message.close = function(id) {
  let index = -1
  const len = messages.length
  const messa = messages.filter((message, i) => {
    if (message.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!messa) return

  messages.splice(index, 1)
  const removedHeight = messa.dom.offsetHeight
  for (let i = index; i < len - 1; i++) {
    messages[i].dom.style['top'] =
      parseInt(messages[i].dom.style['top'], 10) - removedHeight - 8 + 'px'
  }
}

export default Message
