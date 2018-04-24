import { ipcRenderer } from 'electron'

import * as types from '../shared/event-types'

export const createOrUpdateNotification = function(todoItem) {
  const { _id, title, planDatetime } = todoItem
  ipcRenderer.send(types.CREATE_NOTIFY, { _id, title, planDatetime })
}

export const deleteNotification = function(todoItem) {
  const { _id } = todoItem
  ipcRenderer.send(types.DELETE_NOTIFY, { _id })
}
