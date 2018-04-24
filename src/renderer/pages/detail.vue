<template>
  <transition name="slide">
    <div class="detail-view"
         @click="_quitDetail">
      <div class="content-wrapper"
           @click.stop>
        <div class="content">
          <div class="notify"
               @click="_handleNotify">
            <i class="fa"
               :class="notifyIconCls"></i>
          </div>
          <div class="delete"
               @click="_handleDeleteClick">
            <i class="fa fa-trash"></i>
          </div>
          <div class="quit"
               @click="_quitDetail">
            <i class="fa fa-close"></i>
          </div>
          <div class="content-header">
            <div class="indicator-wrapper"
                 @click="_toggleComplete">
              <indicator :flag="detailedTodoItem.completeFlag" />
            </div>
            <input-box class="title"
                       :border="false"
                       :disabled="detailedTodoItem && detailedTodoItem.completeFlag"
                       :classes="headerClasses"
                       :value="this.detailedTodoItem.title"
                       @enter="_handleResetItemTitle" />
          </div>
          <div class="content-body">
            <div class="picker-container">
              <wz-date-picker ref="duePicker"
                              icon="fa-calendar"
                              :placeholder="$t('detail.pickADueDate')"
                              :classes="dueClasses"
                              :value="dueDate"
                              @date-changed="_handleDueDateChanged" />
            </div>
            <div class="picker-container">
              <wz-date-picker ref="planPicker"
                              :placeholder="$t('detail.pickAPlanDate')"
                              :classes="planClasses"
                              :value="planDate"
                              :select-time="true"
                              @date-changed="_handlePlanDateChanged" />
            </div>
            <div class="desc-container">
              <input-box :placeholder="$t('detail.description')"
                         type="textarea"
                         :value="detailedTodoItem.desc"
                         @input="_handleDescInput" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import WzDatePicker from '../components/wzel/components/date-picker/index'
import Indicator from '../components/indicator'
import InputBox from '../components/wzel/components/input'
import { clearHours, getToday } from '../components/wzel/utils/datetime.js'

export default {
  name: 'DetailView',
  components: {
    WzDatePicker,
    Indicator,
    InputBox
  },
  computed: {
    desc() {
      const item = this.detailedTodoItem
      if (item && item.desc) {
        return item.desc
      }
    },
    headerClasses() {
      if (this.detailedTodoItem.completeFlag) {
        return ['complete']
      }
    },
    dueClasses() {
      const item = this.detailedTodoItem
      const ret = []
      const dueDatetime = item.dueDatetime
      const today = getToday()
      if (item.completeFlag) return
      if (dueDatetime) {
        if (dueDatetime < today) {
          ret.push('danger')
        }
        if (dueDatetime === today) {
          ret.push('warning')
        }
      }
      return ret
    },
    planClasses() {
      const item = this.detailedTodoItem
      const ret = []
      const planDatetime = clearHours(item.planDatetime)
      const today = getToday()
      if (item.completeFlag) return
      if (planDatetime) {
        if (planDatetime < today) {
          ret.push('danger')
        }
        if (planDatetime === today) {
          ret.push('warning')
        }
      }
      return ret
    },
    dueDate() {
      const item = this.detailedTodoItem
      if (item && item.dueDatetime) {
        return new Date(item.dueDatetime)
      } else {
        return null
      }
    },
    planDate() {
      const item = this.detailedTodoItem
      if (item && item.planDatetime) {
        return new Date(item.planDatetime)
      } else {
        return null
      }
    },
    notifyIconCls() {
      return this.detailedTodoItem.notify
        ? ['fa-bell', 'activated']
        : ['fa-bell-o']
    },
    ...mapGetters(['detailedTodoItem', 'currentListItem'])
  },
  created() {
    if (!this.detailedTodoItem._id) {
      this.$router.push({
        path: '/main/today'
      })
    }
  },
  methods: {
    _handleDescInput(value) {
      this.setDesc({
        item: this.detailedTodoItem,
        desc: value
      })
    },
    _handleDeleteClick() {
      this.$confirm({
        header: this.$t('detail.deleteTitle'),
        text: this.$t('detail.deleteText'),
        footerConfirm: this.$t('detail.deleteConfirm'),
        callback: () => {
          this.deleteTodoItem(this.detailedTodoItem)
          this._quitDetail()
        }
      })
    },
    _handleDueDateChanged(date) {
      const item = this.detailedTodoItem
      this.setDueDatetime({ item, date })
      this._checkDatetime()
    },
    _handlePlanDateChanged(date) {
      const item = this.detailedTodoItem
      this.setPlanDatetime({ item, date })
      this._checkDatetime()
    },
    _handleResetItemTitle(newTitle) {
      this.setTitle({
        item: this.detailedTodoItem,
        title: newTitle
      })
    },
    _quitDetail() {
      this.setDetailedTodoItem({})
      this.$router.push({
        path: `/main/${this.currentListItem._id}`
      })
    },
    _toggleComplete() {
      this.toggleComplete(this.detailedTodoItem)
    },
    _checkDatetime() {
      const dueDatetime = this.detailedTodoItem.dueDatetime
      const planDatetime = this.detailedTodoItem.planDatetime
      if (dueDatetime && planDatetime && dueDatetime < planDatetime) {
        this.$message({
          type: 'warn',
          desc: this.$t('detail.alertOverdue')
        })
      }
    },
    _handleNotify() {
      const item = this.detailedTodoItem
      if (!item.planDatetime) {
        this.$message({
          type: 'warn',
          desc: "You haven't set a plan date yet"
        })
        return
      }
      const flag = !item.notify
      this.$message({
        type: 'info',
        desc: flag
          ? this.$t('detail.willNotify')
          : this.$t('detail.cancelNotify')
      })
      this.setNotify({ item, flag })
      // TODO: send a message to the scheduller module
    },
    ...mapMutations({
      setDetailedTodoItem: 'SET_DETAILED_TODO_ITEM',
      toggleComplete: 'TOGGLE_COMPLETE',
      setDueDatetime: 'SET_DUE_DATETIME',
      setPlanDatetime: 'SET_PLAN_DATETIME',
      setNotiDatetime: 'SET_NOTI_DATETIME',
      setDesc: 'SET_DESC',
      setTitle: 'SET_TITLE',
      setNotify: 'SET_NOTIFY'
    }),
    ...mapActions(['deleteTodoItem'])
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixins.styl'
@import '../style/variables.styl'

fix-button($color = $red-color)
  position absolute
  top 32px
  width 22px
  height 22px
  line-height 22px
  font-size 18px
  color $text-color-dark-grey
  transition all 0.2s

  &:hover
    color $color
    transform translateY(-2px)

.detail-view
  position fixed
  right 0
  top 0
  bottom 0
  left 0
  z-index 300
  transition all 0.2s ease
  background rgba(120, 120, 120, 0.3)
  backdrop-filter blur(10px)

  &.slide-enter, &.slide-leave-to
    opacity 0

    .content-wrapper
      opacity 1
      transform translate3d(100%, 0, 0)

  &.slide-enter-active, &.slide-leave-active
    transition all 0.3s ease

    .content-wrapper
      transition all 0.3s ease

  .content-wrapper
    position absolute
    right 0
    height 100%
    max-width 100%
    width 450px
    background white
    overflow scroll

    .content
      margin 20px

      .notify
        right 92px
        fix-button($primary-color)

        i.activated
          color $primary-color

      .quit
        right 20px
        fix-button()

      .delete
        right 56px
        fix-button()

      .content-header
        display flex
        align-items center
        padding-right 75px

        .indicator-wrapper
          flex 0 0 22px
          width 22px
          height 22px
          background $text-color-grey
          border-radius 50%

        .title
          flex 1

          &.completed
            text-decoration line-through
            color $text-color-dark-grey

      .content-body
        margin-top 20px

        .picker-container, .desc-container
          margin 5px 0 15px
          standard-shadow()
</style>
