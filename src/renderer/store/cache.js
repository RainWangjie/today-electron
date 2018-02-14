const Store = require('electron-store')
const store = new Store()

const LIST_ITEMS = 'listItems'
const TODO_ITEMS = 'todoItems'
const PREFERENCES = 'preferences'
const DAILY_SUMMARIES = 'dailySummaries'
const LAST_SUMMARY_DATE = 'lastSummaryDate'

export function loadListItems() {
  return store.get(LIST_ITEMS, [])
}
export function storeListItems(listItems) {
  store.set(LIST_ITEMS, listItems)
}

export function loadTodoItems() {
  return store.get(TODO_ITEMS, [])
}
export function storeTodoItems(todoItems) {
  store.set(TODO_ITEMS, todoItems)
}

export function loadPreferences() {
  return store.get(PREFERENCES, {})
}
export function storePreferences(prefObj) {
  store.set(PREFERENCES, prefObj)
}

export function loadDailySummaries() {
  return store.get(DAILY_SUMMARIES, [])
}
export function loadLastSummaryDate() {
  return store.get(LAST_SUMMARY_DATE, '')
}
export function storeDailySummaries(dailySummaries, lastDate) {
  store.set(DAILY_SUMMARIES, dailySummaries)
  store.set(LAST_SUMMARY_DATE, lastDate)
}
