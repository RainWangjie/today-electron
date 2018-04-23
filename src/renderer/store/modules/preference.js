import { getToday } from '../../components/wzel/utils/datetime'
import { loadPreferences, storePreferences } from '../../../shared/cache'

export const savePreferences = function() {
  storePreferences(state)
}

const state = loadPreferences()

const getters = {
  initFlag: state => state.initFlag,
  username: state => state.username,
  startUsingDatetime: state => state.startUsingDatetime,
  sortMode: state => state.sortMode,
  playSound: state => state.playSound,
  avatarCode: state => state.avatarCode,
  openAni: state => state.openAni
}

const mutations = {
  SET_INIT_FLAG(state, flag) {
    state.initFlag = flag
  },
  SET_USERNAME(state, username) {
    state.username = username
  },
  SET_START_USING_DATETIME(state) {
    state.startUsingDatetime = getToday()
  },
  SET_SORT_MODE(state, mode) {
    state.sortMode = mode
  },
  SET_PLAY_SOUND(state, mode) {
    state.playSound = mode
  },
  SET_AVATAR_CODE(state, code) {
    state.avatarCode = code
  },
  SET_OPEN_ANI(state, mode) {
    state.openAni = mode
  }
}

const actions = {
  initializeApplication({ commit, state }, { username }) {
    commit('SET_INIT_FLAG', true)
    commit('SET_USERNAME', username)
    commit('SET_START_USING_DATETIME')
    commit('SET_SORT_MODE', 'none')
    commit('SET_PLAY_SOUND', true)
    commit('SET_OPEN_ANI', true)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
