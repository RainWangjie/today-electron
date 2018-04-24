import TodoItem from '../../models/todo-item'
import ListItemStore from './list_item'

import {
  clearHours,
  getCurrentDatetime,
  getToday
} from '../../components/wzel/utils/datetime'
import { findItemIndexByKey } from '../../utils/array'
import { loadTodoItems, storeTodoItems } from '../../../shared/cache'

export const saveTodoItems = function() {
  storeTodoItems(state.todoItems)
}

const state = {
  todoItems: loadTodoItems(),
  detailedTodoItem: {}
}

const getters = {
  todoItems: state => state.todoItems,
  currentTodoItems: state => {
    const ret = []

    if (ListItemStore.state.currentListItem._id) {
      state.todoItems.forEach(item => {
        if (item.listUUID === ListItemStore.state.currentListItem._id) {
          ret.push(item)
        }
      })
    } else {
      if (ListItemStore.state.currentSpecialListItemTitle === 'Today') {
        const todayDatetime = getToday()
        state.todoItems.forEach(item => {
          if (
            item.planDatetime &&
            ((clearHours(item.planDatetime) <= todayDatetime &&
              !item.completeFlag) ||
              (clearHours(item.completeDatetime) === todayDatetime &&
                item.completeFlag &&
                item.planDatetime))
          ) {
            ret.push(item)
          }
        })
      }
      if (ListItemStore.state.currentSpecialListItemTitle === 'To-Do') {
        state.todoItems.forEach(item => {
          if (!item.listUUID) {
            ret.push(item)
          }
        })
      }
    }
    return ret
  },
  detailedTodoItem: state => state.detailedTodoItem
}

const mutations = {
  ADD_NEW_TODO_ITEM(state, newTodoItem) {
    state.todoItems.push(newTodoItem)
  },
  TOGGLE_COMPLETE(state, todoItem) {
    todoItem.completeFlag = !todoItem.completeFlag
    todoItem.completeDatetime = todoItem.completeFlag
      ? getCurrentDatetime()
      : ''
  },
  SET_TITLE(state, { item, title }) {
    item.title = title
  },
  SET_DESC(state, { item, desc }) {
    item.desc = desc
  },
  SET_DETAILED_TODO_ITEM(state, todoItem) {
    state.detailedTodoItem = todoItem
  },
  SET_DUE_DATETIME(state, { item, date }) {
    item.dueDatetime = date ? clearHours(date) : ''
  },
  SET_PLAN_DATETIME(state, { item, date }) {
    item.planDatetime = date ? new Date(date).getTime() : ''
  },
  SET_NOTI_DATETIME(state, { item, date }) {
    item.notiDatetime = date ? clearHours(date) : ''
  },
  SET_WHOLE_TODO_ITEMS(state, todoItems) {
    state.todoItems = todoItems
  },
  SET_NOTIFY(state, { item, flag }) {
    item.notify = flag
  }
}

const actions = {
  addTodoItem({ commit, state }, title) {
    const listUUID = ListItemStore.state.currentListItem._id
    const newTodoItem = new TodoItem({
      title,
      listUUID
    })
    const listTitle = ListItemStore.state.currentSpecialListItemTitle
    if (listTitle && listTitle === 'Today') {
      newTodoItem.planDatetime = getToday()
    }
    commit('ADD_NEW_TODO_ITEM', newTodoItem)
  },
  deleteTodoItem({ commit, state }, todoItem) {
    const listCopy = state.todoItems.slice()
    const index = findItemIndexByKey(listCopy, todoItem, '_id')
    listCopy.splice(index, 1)
    commit('SET_WHOLE_TODO_ITEMS', listCopy)
  },
  deleteTodoItemByListUUID({ commit, state }, listUUID) {
    const listCopy = state.todoItems.slice()
    const updatedListCopy = []
    listCopy.forEach(item => {
      if (item.listUUID !== listUUID) updatedListCopy.push(item)
    })
    commit('SET_WHOLE_TODO_ITEMS', updatedListCopy)
  },
  selectDetailedTodoItem({ commit, state }, todoItem) {
    commit('SET_DETAILED_TODO_ITEM', todoItem)
  },
  afterDraggingCurrentItems({ commit, state }, list) {
    const listCopy = state.todoItems.slice()
    const updateListCopy = []
    listCopy.forEach(item => {
      if (findItemIndexByKey(list, item, '_id') < 0) updateListCopy.push(item)
    })
    list.forEach(item => {
      updateListCopy.push(item)
    })
    commit('SET_WHOLE_TODO_ITEMS', updateListCopy)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
