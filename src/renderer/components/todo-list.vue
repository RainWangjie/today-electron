<template>
  <transition name="fade">
    <div class="todo-item-view">
      <div class="item-header-wrapper">
        <todo-item-header />
      </div>
      <transition name="fade">
        <div class="item-wrapper" key="items" v-if="currentTodoItems.length">
          <draggable v-model="draggableTodoItems">
            <transition-group name="move" tag="ul">
              <todo-item class="todo-item" v-for="item in draggableTodoItems" :key="item._id" :item="item" @select="handleTodoItemSelect" @contextmenu="_handleContextMenu" />
            </transition-group>
          </draggable>
        </div>
        <!-- Show a blank view if there's no todos in this list. -->
        <div class="blank-view-wrapper" key="blank" v-else>
          <blank-view :info="$t('message.blankInfo')" />
        </div>
      </transition>
      <add-item-btn key="add" @add="_handleAddTodoItem" />
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
import { ipcRenderer } from 'electron'
import Draggable from 'vuedraggable'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import BlankView from './BlankView'
import TodoItem from '../components/TodoItem'
import TodoItemHeader from './todo-item-header'
import AddItemBtn from '../components/AddItemBtn'

const commands = [
  {
    title: 'Do It Today!',
    icon: 'fa-sun-o',
    hook: 'today',
    type: 'important'
  },
  {
    title: 'Delete',
    icon: 'fa-trash',
    hook: 'delete',
    type: 'danger'
  }
]

const sorters = {
  plan: (itemA, itemB) => {
    return itemA.planDatetime > itemB.planDatetime
  },
  due: (itemA, itemB) => {
    return itemA.dueDatetime > itemB.dueDatetime
  },
  complete: (itemA, itemB) => {
    return itemA.completeFlag && !itemB.completeFlag
  }
}

const i18n = {
  messages: {
    en: {
      message: {
        addTodoTitle: 'Add New Task',
        addTodoPlaceholder: 'Task Description',
        addTodoConfirm: 'Add',
        blankInfo: 'No Tasks'
      }
    },
    zh: {
      message: {
        blankInfo: '暂无任务',
        addTodoTitle: '添加新任务',
        addTodoPlaceholder: '任务描述',
        addTodoConfirm: '添加'
      }
    }
  }
}

export default {
  name: 'todo-item-view',
  i18n,
  computed: {
    draggableTodoItems: {
      get() {
        return this.currentTodoItems.sort(sorters[this.sortMode])
      },
      set(list) {
        if (this.sortMode !== 'none') {
          this.$message({
            type: 'warn',
            desc: 'Sort by Default.'
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
  },
  methods: {
    _handleAddTodoItem() {
      this.$modal({
        type: 'dialog',
        callback: title => {
          this.addTodoItem(title)
        }
      })
    },
    _handleContextMenu(todoItem, { x, y }) {
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
            this.deleteTodoItem(todoItem)
          }
        }
      })
    },
    handleTodoItemSelect(todoItem) {
      this.selectDetailedTodoItem(todoItem)
      this.$router.push({
        path: `/main/${this.currentListItem._id}/${todoItem._id}`
      })
    },
    ...mapMutations({
      setPlanDatetime: 'SET_PLAN_DATETIME',
      setSortMode: 'SET_SORT_MODE'
    }),
    ...mapActions([
      'addTodoItem',
      'deleteTodoItem',
      'selectDetailedTodoItem',
      'afterDraggingCurrentItems'
    ])
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
@import '../assets/style/mixins.styl';

.todo-item-view {
  position: relative;
  height: 100%;
  background: white;
  transition-fade();

  .item-header-wrapper {
    height: 204px;
    width: 100%;
  }

  .item-wrapper, .blank-view-wrapper {
    position: absolute;
    top: 204px;
    bottom: 0;
    width: 100%;
    transition-fade();
  }

  .item-wrapper {
    width: 100%;
    overflow: scroll;
  }
}
</style>
