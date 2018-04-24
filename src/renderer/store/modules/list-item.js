import ListItem from '../../models/list-item'

import { findItemIndexByKey } from '../../utils/array'
import { loadListItems, storeListItems } from '../../../shared/cache'

export const saveListItems = function() {
  storeListItems(state.listItems)
}

const state = {
  currentListItem: {},
  listItems: loadListItems(),
  currentSpecialListItemTitle: 'Today' // When app is initiated, user would go to Today.
}

const mutations = {
  SET_WHOLE_LIST_ITEMS(state, lists) {
    state.listItems = lists
  },
  ADD_NEW_LIST_ITEM(state, newListItem) {
    state.listItems.push(newListItem)
  },
  SET_CURRENT_LIST_ITEM(state, listItem) {
    state.currentListItem = listItem
    state.currentSpecialListItemTitle = ''
  },
  SET_CURRENT_SPECIAL_LIST_ITEM(state, specialTitle) {
    state.currentSpecialListItemTitle = specialTitle
    state.currentListItem = {}
  }
}

const actions = {
  addListItem({ commit, state }, { title }) {
    let newListItem = new ListItem({ title })
    commit('ADD_NEW_LIST_ITEM', newListItem)
    commit('SET_CURRENT_LIST_ITEM', newListItem)
  },

  deleteListItem({ commit, state }, listItem) {
    let listCopy = state.listItems.slice()
    let currentIndex = findItemIndexByKey(
      listCopy,
      state.currentListItem,
      '_id'
    )
    const pivotIndex = findItemIndexByKey(listCopy, listItem, '_id')
    listCopy.splice(pivotIndex, 1)
    if (currentIndex > pivotIndex || currentIndex === listCopy.length) {
      currentIndex--
    }

    commit('SET_WHOLE_LIST_ITEMS', listCopy)
    if (state.listItems.length) {
      commit('SET_CURRENT_LIST_ITEM', state.listItems[currentIndex])
    } else {
      commit('SET_CURRENT_SPECIAL_LIST_ITEM', 'To-Do')
    }
  }
}

const getters = {
  listItems: state => state.listItems,
  currentListItem: state => state.currentListItem,
  currentSpecialListItemTitle: state => state.currentSpecialListItemTitle
}

export default {
  state,
  mutations,
  actions,
  getters
}
