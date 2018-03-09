<template>
  <transition name="slide">
    <div class="detail-view" @click="_quitDetail">
      <div class="content-wrapper" @click.stop>
        <div class="content">
          <div class="delete" @click="handleDeleteClick">
            <i class="fa fa-trash"></i>
          </div>
          <div class="quit" @click="_quitDetail">
            <i class="fa fa-close"></i>
          </div>
          <div class="content-header">
            <div class="indicator-wrapper" @click="_toggleComplete">
              <indicator :flag="detailedTodoItem.completeFlag" />
            </div>
            <input-box class="title" :border="false" :disabled="detailedTodoItem && detailedTodoItem.completeFlag" :classes="headerClasses" :value="this.detailedTodoItem.title" @enter="handleResetItemTitle" />
          </div>
          <div class="content-body">
            <div class="picker-container">
              <date-picker ref="duePicker" icon="fa-calendar" placeholder="Pick a due date" :classes="dueClasses" :value="dueDate" @date-changed="handleDueDateChanged" />
            </div>
            <div class="picker-container">
              <date-picker ref="planPicker" placeholder="I'm going to do this on" :classes="planClasses" :value="planDate" @date-changed="handlePlanDateChanged" />
            </div>
            <div class="desc-container">
              <input-box placeholder="Description" type="textarea" :value="detailedTodoItem.desc" @input="handleDescInput" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import DatePicker from '../components/DatePicker/index'
import Indicator from '../components/Indicator'
import InputBox from '../components/InputBox'

import { clearHours, getToday } from '../utils/datetime.js'

export default {
  name: 'DetailView',
  components: {
    DatePicker,
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
    handleDescInput(value) {
      this.setDesc({
        item: this.detailedTodoItem,
        desc: value
      })
    },
    handleDeleteClick() {
      this.$modal({
        type: 'confirm',
        callback: () => {
          this.deleteTodoItem(this.detailedTodoItem)
          this._quitDetail()
        }
      })
    },
    handleDueDateChanged(date) {
      const item = this.detailedTodoItem
      this.setDueDatetime({ item, date })
      this._checkDatetime()
    },
    handlePlanDateChanged(date) {
      const item = this.detailedTodoItem
      this.setPlanDatetime({ item, date })
      this._checkDatetime()
    },
    handleResetItemTitle(newTitle) {
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
          desc: 'Are you going to do this overdue?'
        })
      }
    },
    ...mapMutations({
      setDetailedTodoItem: 'SET_DETAILED_TODO_ITEM',
      toggleComplete: 'TOGGLE_COMPLETE',
      setDueDatetime: 'SET_DUE_DATETIME',
      setPlanDatetime: 'SET_PLAN_DATETIME',
      setNotiDatetime: 'SET_NOTI_DATETIME',
      setDesc: 'SET_DESC',
      setTitle: 'SET_TITLE'
    }),
    ...mapActions(['deleteTodoItem'])
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/mixins.styl';
@import '../assets/style/variables.styl';

fix-button() {
  position: absolute;
  top: 32px;
  width: 22px;
  height: 22px;
  line-height: 22px;
  font-size: 18px;
  color: $text-color-dark-grey;
  transition: all 0.2s;

  &:hover {
    color: $red-color;
    transform: translateY(-2px);
  }
}

.detail-view {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 300;
  transition: all 0.2s ease;
  background: rgba(120, 120, 120, 0.3);
  backdrop-filter: blur(10px);

  &.slide-enter, &.slide-leave-to {
    opacity: 0;

    .content-wrapper {
      opacity: 1;
      transform: translate3d(100%, 0, 0);
    }
  }

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s ease;

    .content-wrapper {
      transition: all 0.3s ease;
    }
  }

  .content-wrapper {
    position: absolute;
    right: 0;
    height: 100%;
    max-width: 100%;
    width: 450px;
    background: white;
    overflow: scroll;

    .content {
      margin: 20px;

      .quit {
        right: 20px;
        fix-button();
      }

      .delete {
        right: 56px;
        fix-button();
      }

      .content-header {
        display: flex;
        align-items: center;
        padding-right: 75px;

        .indicator-wrapper {
          flex: 0 0 22px;
          width: 22px;
          height: 22px;
          background: $text-color-grey;
          border-radius: 50%;
        }

        .title {
          flex: 1;

          &.completed {
            text-decoration: line-through;
            color: $text-color-dark-grey;
          }
        }
      }

      .content-body {
        margin-top: 20px;

        .picker-container, .desc-container {
          margin: 5px 0 15px;
          standard-shadow();
        }
      }
    }
  }
}
</style>
