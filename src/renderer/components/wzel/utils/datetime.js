import { t } from '../locale'

export const ONE_DAY = 3600 * 1000 * 24
// const ONE_WEEK = ONE_DAY * 7

export const clearHours = function(date) {
  const cloneDate = date ? new Date(date) : new Date()
  cloneDate.setHours(0, 0, 0, 0)
  return cloneDate.getTime()
}

export const getToday = function() {
  return clearHours(new Date())
}

export const getCurrentDatetime = function() {
  return new Date().getTime()
}

export const countDatesToTodayFrom = function(date) {
  return Math.floor((getToday() - clearHours(date)) / ONE_DAY) + 1
}

export const defaultFormatter = function(date, showTime = false) {
  let ret = '' // returned string
  const pureDate = clearHours(date)
  const today = getToday()
  const yesterday = today - ONE_DAY
  const tomorrow = today + ONE_DAY

  ret =
    pureDate === today
      ? t('today')
      : pureDate === tomorrow
        ? t('tomorrow')
        : pureDate === yesterday ? t('yesterday') : getFormattedDate(date)

  if (showTime) {
    ret += ` ${getFormattedTime(date)}`
  }

  return ret
}

export const getFormattedDate = function(date) {
  const innerDate = date ? new Date(date) : new Date()
  return `${innerDate.getFullYear()}/${innerDate.getMonth() +
    1}/${innerDate.getDate()}`
}

export const getFormattedTime = function(date) {
  if (!date) return ''
  const innerDate = new Date(date)
  return `${innerDate.getHours()}:${innerDate.getMinutes()}`
}

export const getDayCountOfMonth = function(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30
  }
  if (month === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29
    }
    return 28
  }
  return 31
}

export const getFirstDayOfMonth = function(date) {
  const temp = new Date(date.getTime())
  temp.setDate(1)
  return temp.getDay()
}

export const switchMonth = function(oldDate, diff) {
  const oldDateCopy = new Date(oldDate)
  const newMonth = oldDateCopy.getMonth() + diff
  const newMonthDayCount = getDayCountOfMonth(
    oldDateCopy.getFullYear(),
    newMonth
  )
  if (newMonthDayCount < oldDateCopy.getDate()) {
    oldDateCopy.setDate(newMonthDayCount)
  }
  oldDateCopy.setMonth(newMonth)
  return oldDateCopy
}
