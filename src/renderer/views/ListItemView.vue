<template>
  <div class="list-item-view">
    <user-info></user-info>
    <ul class="list-wrapper">
      <special-list-item v-for="item in specialListItems" :key="item" :title="item" @select-special-list-item="handleSelectSpecialListItem">
      </special-list-item>
      <draggable v-model="draggableListItems">
        <transition-group name="move">
          <list-item class="list-item" ref="listItems" v-for="listItem in draggableListItems" :item="listItem" :key="listItem._id" @contextmenu="_handleContextMenu" @select="handleSelectListItem" />
        </transition-group>
      </draggable>
    </ul>
    <div class="add-item-wrapper">
      <add-item @add="_addListItem" />
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import Draggable from 'vuedraggable'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import AddItem from '../components/AddItem'
import ListItem from '../components/ListItem'
import SpecialListItem from '../components/SpecialListItem'
import UserInfo from '../components/UserInfo'

const specialListItems = ['Today', 'To-Do']

const i18n = {
  messages: {
    en: {
      message: {
        addConfirm: 'Add',
        addTitle: 'Add List',
        addPlaceholder: 'List Name',
        renameConfirm: 'Rename',
        renameTitle: 'Rename List',
        renamePlaceholder: 'List Name',
        deleteText:
          'Are you sure to delete this list? All todo in this list would be deleted as well.',
        deleteTitle: 'Delete List'
      }
    },
    zh: {
      message: {
        addConfirm: '添加',
        addTitle: '添加列表',
        addPlaceholder: '列表名',
        renameConfirm: '重命名',
        renameTitle: '重命名列表',
        renamePlaceholder: '列表名',
        deleteText:
          '你真的要删除这个列表吗？该列表下的所有待办事项都会被删除。',
        deleteTitle: '删除列表'
      }
    }
  }
}

export default {
  name: 'list-item-view',
  i18n,
  components: {
    Draggable,
    AddItem,
    ListItem,
    SpecialListItem,
    UserInfo
  },
  computed: {
    draggableListItems: {
      get() {
        return this.listItems
      },
      set(value) {
        this.$store.commit('SET_WHOLE_LIST_ITEMS', value)
      }
    },
    ...mapGetters(['currentListItem', 'listItems'])
  },
  created() {
    this.specialListItems = specialListItems
    ipcRenderer.on('create-new-list', event => {
      this._addListItem()
    })
  },
  methods: {
    _addListItem() {
      this.$modal({
        type: 'dialog',
        callback: title => {
          if (title) {
            this.addListItem({ title })
            this.$router.push({
              path: `/main/${this.currentListItem._id}`
            })
          }
        }
      })
    },
    _handleContextMenu(listItem, { x, y }) {
      this.$contextMenu({
        pos: { x, y },
        callback: hook => {
          if (hook === 'delete') {
            this._deleteListItem(listItem)
          }
          if (hook === 'rename') {
            this._renameListItem(listItem)
          }
        }
      })
    },
    _renameListItem(listItem) {
      this.$modal({
        type: 'dialog',
        callback: title => {
          if (title) {
            listItem.title = title
            this.forceStoreListItems()
          }
        }
      })
    },
    _deleteListItem(listItem) {
      this.$modal({
        type: 'confirm',
        callback: () => {
          this.deleteTodoItemByListUUID(listItem._id)
          this.deleteListItem(listItem)
          this.$message({
            desc: 'List deleted.',
            type: 'warn'
          })
        }
      })
    },
    handleSelectListItem(listItem) {
      this.setCurrentListItem(listItem)
      this.$router.push({
        path: `/main/${listItem._id}`
      })
    },
    handleSelectSpecialListItem(title) {
      this.setCurrentSpecialListItem(title)
      this.$router.push({
        path: `/main/${title}`
      })
    },
    ...mapMutations({
      setCurrentListItem: 'SET_CURRENT_LIST_ITEM',
      setCurrentSpecialListItem: 'SET_CURRENT_SPECIAL_LIST_ITEM'
    }),
    ...mapActions([
      'addListItem',
      'deleteListItem',
      'deleteTodoItemByListUUID',
      'forceStoreListItems'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.list-item-view {
  height: 100%;
  position: relative;
  background: white;

  .list-wrapper {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 44px;
    z-index: 20;
    overflow: scroll;

    .list-item {
      transition: all 0.2s;

      &.move-enter {
        transform: translate3d(0, 50%, 0);
        opacity: 0;
      }

      &.move-leave-to {
        height: 0;
        opacity: 0;
      }
    }
  }

  .add-item-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 50;
  }
}
</style>
