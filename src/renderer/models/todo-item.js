import { generateUUID } from '../utils/uuid'
import { getCurrentDatetime } from '../components/wzel/utils/datetime'

export default class TodoItem {
  constructor({ title, listUUID }) {
    this._id = generateUUID()
    this.title = title
    this.createdDatetime = getCurrentDatetime()
    this.listUUID = listUUID || ''
    this.desc = ''
    this.completeFlag = false
    this.completeDatetime = ''
    this.dueDatetime = ''
    this.planDatetime = ''
    this.notify = false
  }
}
