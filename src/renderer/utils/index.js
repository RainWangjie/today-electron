export function oneOf(a, from) {
  if (Array.isArray(from) && from.indexOf(a) > -1) {
    return true
  } else if (typeof from === 'object') {
    Object.keys(from).forEach((key) => {
      if (from[key] === a) {
        return true
      }
    })
  }
  return false
}
