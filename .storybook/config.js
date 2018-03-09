import { configure } from '@storybook/vue'

import 'font-awesome/css/font-awesome.css'
import '../src/renderer/assets/style/index.styl'

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
