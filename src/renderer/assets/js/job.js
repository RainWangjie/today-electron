import { generateUUID } from '../../utils/uuid'

export default class NotificationJob {
  constructor({ todoUUID, datetime }) {
    this._id = generateUUID()
    this.todoUUID = todoUUID
  }
}
