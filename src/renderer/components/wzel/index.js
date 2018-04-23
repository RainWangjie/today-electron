// components
import Dropdown from './components/dropdown'
import Divider from './components/divider'
import Input from './components/input'
import Segment from './components/segment'
import Select from './components/select'
import Switcher from './components/switcher'

// independent components
import ContextMenu from './components/context-menu'
import Noti from './components/notification'
import Message from './components/message'
import Modal from './components/modal'

// language
import { use } from './locale'

const components = {
  Dropdown,
  Divider,
  Input,
  Segment,
  Select,
  Switcher
}

const install = function(Vue, options) {
  use(options && options.lang)

  // install in-template components
  Object.keys(components).forEach(name => {
    Vue.component(name, components[name])
  })

  // install independent components
  Vue.prototype.$noti = Noti
  Vue.prototype.$message = Message
  Vue.prototype.$confirm = Modal.confirm
  Vue.prototype.$dialog = Modal.dialog
  Vue.prototype.$contextMenu = ContextMenu
}

export default {
  install
}
