export const oneof = function(target, from) {
  if (Array.isArray(from) && from.indexOf(target) !== -1) return true
  if (typeof from === 'object') {
    Object.keys(from).forEach(key => {
      if (from[key] === target) return true
    })
  }
  return false
}

export const on = function(element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false)
  }
}

export const deepCopy = function(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}
