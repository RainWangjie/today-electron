<template>
  <transition name="fade">
    <div class="todo-item-view">
      <div class="item-header-wrapper">
        <todo-item-header />
      </div>
      <transition name="fade">
        <div class="item-wrapper"
             key="content"
             v-if="currentTodoItems.length"
             @click="_handleDeselect"
             v-clickoutside="_handleDeselect">
          <draggable v-model="draggableTodoItems">
            <transition-group name="move"
                              tag="ul">
              <todo-item class="todo-item"
                         v-for="(item, index) in draggableTodoItems"
                         :key="item._id"
                         :item="item"
                         :selected="_checkSelectedFor(index)"
                         @click="_handleSelected"
                         @shift-click="_handleShiftSelected"
                         @contextmenu="_handleContextMenu" />
            </transition-group>
          </draggable>
        </div>
        <div class="blank-view-wrapper"
             key="blank"
             v-else>
          <blank-view :info="$t('todoList.blankInfo')" />
        </div>
      </transition>
      <add-item-btn key="add"
                    @add="_handleAddTodoItem" />
      <!-- detail -->
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import { ipcRenderer } from 'electron'
import Draggable from 'vuedraggable'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import clickoutside from '../components/wzel/directives/clickoutside'

import BlankView from '../pages/blank'
import TodoItem from './todo-item'
import TodoItemHeader from './todo-item-header'
import AddItemBtn from './add-todo-btn'

const commands = [
  {
    title: 'doItToday',
    icon: 'fa-sun-o',
    hook: 'today',
    type: 'important'
  },
  {
    title: 'delete',
    icon: 'fa-trash',
    hook: 'delete',
    type: 'danger'
  }
]

const sorters = {
  plan: ($1, $2) => {
    return $1.planDatetime > $2.planDatetime
  },
  due: ($1, $2) => {
    return $1.dueDatetime > $2.dueDatetime
  },
  complete: ($1, $2) => {
    return $1.completeFlag && !$2.completeFlag
  }
}

export default {
  name: 'todo-item-view',
  data: () => ({
    selectedRange: { start: -1, end: -1 }
  }),
  computed: {
    draggableTodoItems: {
      get() {
        return this.currentTodoItems.sort(sorters[this.sortMode])
      },
      set(list) {
        if (this.sortMode !== 'none') {
          this.$message({
            type: 'warn',
            desc: this.$t('todoList.sortByDefault')
          })
        }
        this.setSortMode('none')
        this.afterDraggingCurrentItems(list)
      }
    },
    ...mapGetters(['currentListItem', 'currentTodoItems', 'sortMode'])
  },
  created() {
    ipcRenderer.on('create-new-todo', event => {
      this._handleAddTodoItem()
    })
    // use vue-i18n to locale commands names
    commands.forEach(commandItem => {
      commandItem.title = this.$t(`todoList.commands.${commandItem.title}`)
    })
  },
  methods: {
    _handleAddTodoItem() {
      this.$dialog({
        header: this.$t('todoList.addTodoTitle'),
        text: this.$t('todoList.addTodoPlaceholder'),
        footerConfirm: this.$t('todoList.addTodoConfirm'),
        callback: title => {
          this.addTodoItem(title)
        }
      })
    },
    _handleContextMenu(todoItem, { x, y }) {
      const range = this.selectedRange
      if (range.start === -1) {
        const index = this.currentTodoItems.indexOf(todoItem)
        range.start = range.end = index
      }

      // remember the indexes here, because when a context menu item
      // is clicked, _resetRange() would be called before the callback
      const { start, end } = range
      this.$contextMenu({
        commands,
        pos: { x, y },
        callback: hook => {
          if (hook === 'today') {
            this.setPlanDatetime({
              item: todoItem,
              date: new Date()
            })
          }
          if (hook === 'delete') {
            this._deleteTodoItemInRange(start, end)
          }
        }
      })
    },
    _handleSelected(todoItem) {
      this.selectDetailedTodoItem(todoItem)
      this.$router.push({
        path: `/main/${this.currentListItem._id}/${todoItem._id}`
      })
    },
    _handleShiftSelected(todoItem) {
      const selectedRange = this.selectedRange
      const index = this.currentTodoItems.indexOf(todoItem)
      if (selectedRange.start === -1) {
        selectedRange.start = selectedRange.end = index
      } else {
        const [low, end] = [this.selectedRange.start, index].sort()
        selectedRange.start = low
        selectedRange.end = end
      }
    },
    _handleDeselect() {
      this._resetRange()
    },
    _resetRange() {
      this.selectedRange = { start: -1, end: -1 }
    },
    _deleteTodoItemInRange(start, end) {
      // delete from the end to start
      for (let i = end; i >= start; i--) {
        this.deleteTodoItem(this.currentTodoItems[i])
      }
    },
    ...mapMutations({
      setPlanDatetime: 'SET_PLAN_DATETIME',
      setSortMode: 'SET_SORT_MODE'
    }),
    _checkSelectedFor(index) {
      const selectedRange = this.selectedRange
      const ret = index >= selectedRange.start && index <= selectedRange.end
      return ret
    },
    ...mapActions([
      'addTodoItem',
      'deleteTodoItem',
      'selectDetailedTodoItem',
      'afterDraggingCurrentItems'
    ])
  },
  directives: {
    clickoutside
  },
  components: {
    Draggable,
    BlankView,
    TodoItemHeader,
    TodoItem,
    AddItemBtn
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/mixins.styl'

.todo-item-view
  position relative
  height 100%
  background white
  transition-fade()

  .item-header-wrapper
    height 204px
    width 100%

  .item-wrapper, .blank-view-wrapper
    position absolute
    top 204px
    bottom 0
    width 100%
    transition-fade()

  .item-wrapper
    width 100%
    overflow scroll
</style>
