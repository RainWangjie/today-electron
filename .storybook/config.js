import { configure } from '@storybook/vue'

import 'font-awesome/css/font-awesome.min.css'
import '../src/renderer/components/wzel/styles/index.styl'

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
