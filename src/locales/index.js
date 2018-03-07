const files = require.context('.', false, /\.js$/)
const locales = {}

files.keys().forEach(key => {
  if (key === 'index') return
  locales[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default locales
