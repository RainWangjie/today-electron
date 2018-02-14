import { generateUUID } from '../../utils/uuid'
import { clearHours } from '../../utils/datetime'

export default class DailySummary {
  constructor({ date, cItems, uItems }) {
    this._id = generateUUID()
    this.date = clearHours(date)
    this.completedItems = cItems
    this.uncompletedItems = uItems
  }
}
