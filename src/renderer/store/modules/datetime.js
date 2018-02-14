import { clearHours, getToday } from '../../utils/datetime'

const state = {
  today: getToday()
}

const getters = {
  today: state => state.today
}

const mutations = {
  SET_TODAY(state, date) {
    state.today = clearHours(date)
  }
}

export default {
  state,
  getters,
  mutations
}
