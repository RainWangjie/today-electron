const ONE_DAY = 3600 * 1000 * 24
const ONE_WEEK = ONE_DAY * 7

export const shortcuts = [
  {
    name: 'Today',
    value: function () {
      return new Date()
    }
  },
  {
    name: 'Tomorrow',
    value: function () {
      const date = new Date()
      date.setTime(date.getTime() + ONE_DAY)
      return date
    }
  },
  {
    name: 'In a week',
    value: function () {
      const date = new Date()
      date.setTime(date.getTime() + ONE_WEEK)
      return date
    }
  }
]
