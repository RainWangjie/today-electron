const files = require.context('./lang', false, /\.js$/)
const locales = {}

files.keys().forEach(key => {
  if (key === 'index') return
  locales[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

// let merged = false
let lang = 'zh-CN'

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g

function hasOwn(obj, key) {
  return Object.hasOwnProperty.call(obj, key)
}

function format(string, ...args) {
  if (args.length === 1 && typeof args[0] === 'object') {
    args = args[0]
  }

  if (!args || !args.hasOwnProperty) {
    args = {}
  }

  return string.replace(RE_NARGS, (match, prefix, i, index) => {
    let result

    if (string[index - 1] === '{' && string[index + match.length] === '}') {
      return i
    } else {
      result = hasOwn(args, i) ? args[i] : null
      if (result === null || result === undefined) {
        return ''
      }

      return result
    }
  })
}

export const t = function(path, options) {
  let value
  let current = locales[lang]
  const array = path.split('.')

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i]
    value = current[property]
    if (!value) return path
    if (i === j - 1) {
      return format(value, options)
    }
    current = value
  }
  return ''
}

export const use = function(l) {
  lang = l || lang
}
