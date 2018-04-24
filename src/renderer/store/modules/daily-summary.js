import DailySummary from '../../models/daily-summary'
import TodoItemStore from './todo-item'
import PreferencesStore from './preference'
import {
  clearHours,
  getToday,
  ONE_DAY
} from '../../components/wzel/utils/datetime'
import {
  loadDailySummaries,
  loadLastSummaryDate,
  storeDailySummaries
} from '../../../shared/cache'

export const saveDailySummaries = function() {
  storeDailySummaries(state.summaries, state.lastDatetime)
}

const state = {
  lastDatetime: loadLastSummaryDate(),
  summaries: loadDailySummaries()
}

const getters = {
  lastDatetime: state => state.lastDatetime,
  summaries: state => state.summaries
}

const mutations = {
  ADD_NEW_SUMMARY(state, summary) {
    state.summaries.push(summary)
  },
  SET_LAST_DATE(state, date) {
    state.lastDatetime = date
  }
}

const actions = {
  doSummary({ commit, state }) {
    const today = getToday()
    let lastDate = clearHours(
      state.lastDatetime || PreferencesStore.state.startUsingDatetime
    )

    if (lastDate === today) return
    const todoItems = []
    const dates = []

    TodoItemStore.state.todoItems.forEach(item => {
      if (item.planDatetime) {
        const datetime = clearHours(item.planDatetime)
        if (datetime < today && datetime >= lastDate) {
          todoItems.push(item)
        }
      }
    })

    while (lastDate < today) {
      dates.push(new Date(lastDate))
      lastDate += ONE_DAY
    }

    dates.forEach(date => {
      const completedItems = []
      const uncompletedItems = []
      const datetime = clearHours(date)

      todoItems.forEach(item => {
        const planDatetime = clearHours(item.planDatetime)
        if (planDatetime <= datetime) {
          // We only deal with todoItems whose planDate is before current date.
          if (
            item.completeFlag &&
            clearHours(item.completeDatetime) === datetime
          ) {
            // If todoItem is completed and it's completed on current date,
            // push it into completedItems.
            completedItems.push(item.title)
          } else if (
            item.completeFlag &&
            clearHours(item.completeDatetime) < datetime
          ) {
            // If todoItem is completed but it's completed before current date,
            // ignore it by doing nothing.
          } else {
            // if todoItem is not completed yet or completed after current date,
            // push it into uncompletedItems.
            uncompletedItems.push(item.title)
          }
        }
      })

      commit(
        'ADD_NEW_SUMMARY',
        new DailySummary({
          date,
          cItems: completedItems,
          uItems: uncompletedItems
        })
      )
    })

    commit('SET_LAST_DATE', today)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
