<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import nodeSchedule from 'node-schedule'

import 'font-awesome/css/font-awesome.css'

import * as types from '../shared/event-types'
import { getToday } from './components/wzel/utils/datetime'

export default {
  name: 'today',
  created() {
    this._bindIpc()
    this._passDayJobs()
  },
  methods: {
    _bindIpc() {
      ipcRenderer.on(types.GO_TO_SUMMARY, () => {
        this.$router.push({
          path: '/summary'
        })
      })
      ipcRenderer.on(types.GO_TO_SETTINGS, () => {
        this.$router.push({
          path: '/settings'
        })
      })
      ipcRenderer.on(types.GO_TO_MAIN, () => {
        this.$router.push({
          path: '/main/today'
        })
      })
      ipcRenderer.on(types.NOTIFICATION, ({ title, text }) => {
        this.$noti({
          title,
          desc: text,
          type: 'info'
        })
      })
    },
    _passDayJobs() {
      const rule = new nodeSchedule.RecurrenceRule()
      rule.hour = 0
      rule.minutes = 0

      nodeSchedule.scheduleJob(rule, () => {
        this.setToday(getToday())
        this.doSummary()
      })
    },
    ...mapGetters(['todoItems']),
    ...mapActions(['doSummary']),
    ...mapMutations({
      setToday: 'SET_TODAY'
    })
  }
}
</script>

<style lang="stylus">
@import 'style/index.styl'
@import 'style/mixins.styl'

#app
  no-flex-full-screen()
</style>
