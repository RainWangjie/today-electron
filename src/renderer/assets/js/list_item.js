import { generateUUID } from '../../utils/uuid'
import { getCurrentDatetime } from '../../utils/datetime'

export default class ListItem {
  constructor({ title }) {
    this._id = generateUUID()
    this.title = title
    this.createdDatetime = getCurrentDatetime()
  }
}
