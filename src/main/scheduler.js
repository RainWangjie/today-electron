import nodeSchedule from 'node-schedule'
import { pushNotification } from './notification'
import { loadTodoItems } from '../shared/cache'
import i18n from './i18n'

const t = i18n.$t
const getCurrent = () => new Date().getTime()
const jobs = []

export const initScheduler = function() {
  const todoItems = loadTodoItems()
  todoItems.forEach(todo => {
    if (
      todo.planDatetime &&
      todo.planDatetime >= getCurrent() &&
      todo.notify &&
      !todo.completeFlag
    ) {
      createOrUpdateNotification(todo)
    }
  })
}

export const createOrUpdateNotification = function({
  _id,
  planDatetime,
  title
}) {
  // fisrt check if there's a scheduled job with given _id, if so
  // remove that notification and create a new one
  deleteNotification({ _id })

  const newJob = nodeSchedule.scheduleJob(new Date(planDatetime), () => {
    pushNotification(title, t('ontimeNotification'))
    deleteNotification({ _id }) // remove itself once invoked
  })
  newJob._id = _id
  jobs.push(newJob)
}

export const deleteNotification = function({ _id }) {
  const index = jobs.findIndex(job => job._id === _id)
  if (index !== -1) {
    const job = jobs[index]
    job.cancel()
    jobs.splice(index, 1)
  }
}
