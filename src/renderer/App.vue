<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapActions, mapMutations } from 'vuex'
import nodeSchedule from 'node-schedule'
import 'font-awesome/css/font-awesome.css'

import { getToday } from './utils/datetime'

export default {
  name: 'VueTodo',
  created() {
    this.passDayJobs()
    this.bindRoutingMenuCommands()
  },
  methods: {
    bindRoutingMenuCommands() {
      ipcRenderer.on('go-to-summary-view', () => {
        this.$router.push({
          path: '/summary'
        })
      })
      ipcRenderer.on('go-to-settings-view', () => {
        this.$router.push({
          path: '/settings'
        })
      })
      ipcRenderer.on('go-to-main-view', () => {
        this.$router.push({
          path: '/main/today'
        })
      })
    },
    passDayJobs() {
      const rule = new nodeSchedule.RecurrenceRule()
      rule.hour = 0
      rule.minutes = 0

      /* eslint-disable no-unused-vars */
      nodeSchedule.scheduleJob(rule, () => {
        this.setToday(getToday())
        this.doSummary()
      })
    },
    ...mapActions(['doSummary']),
    ...mapMutations({
      setToday: 'SET_TODAY'
    })
  }
}
</script>

<style lang="stylus">
@import 'assets/style/index.styl';
@import 'assets/style/mixins.styl';

#app {
  no-flex-full-screen();
}
</style>
