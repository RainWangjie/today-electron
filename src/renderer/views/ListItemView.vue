<template>
  <div class="list-item-view">
    <context-menu ref="contextMenu"
                  @select="handleContextMenuSelect">
    </context-menu>
    <user-info></user-info>
    <ul class="list-wrapper">
      <special-list-item v-for="item in specialListItems"
                         :key="item"
                         :title="item"
                         @select-special-list-item="handleSelectSpecialListItem">
      </special-list-item>
      <draggable v-model="draggableListItems">
        <transition-group name="move">
          <list-item class="list-item"
                     ref="listItems"
                     v-for="listItem in draggableListItems"
                     :item="listItem"
                     :key="listItem._id"
                     @contextmenu="_openContextMenu"
                     @select="handleSelectListItem" />
        </transition-group>
      </draggable>
    </ul>
    <div class="add-item-wrapper">
      <add-item @add="_openAddListDialog" />
    </div>
    <dialog-box ref="addDialog"
                :confirmText="$t('message.addConfirm')"
                :placeholder="$t('message.addPlaceholder')"
                :title="$t('message.addTitle')"
                @confirm="handleAddListItem" />
    <dialog-box ref="renameDialog"
                :confirmText="$t('message.renameConfirm')"
                :placeholder="$t('message.renamePlaceholder')"
                :title="$t('message.renameTitle')"
                @confirm="handleRenameListItem" />
    <confirm-box ref="deleteDialog"
                 :text="$t('message.deleteText')"
                 :title="$t('message.deleteTitle')"
                 @confirm="handleDeleteListItem" />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import Draggable from 'vuedraggable'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import AddItem from '../components/AddItem'
import ContextMenu from '../components/ContextMenu/index'
import ConfirmBox from '../components/ConfirmBox'
import DialogBox from '../components/DialogBox'
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
    ContextMenu,
    ConfirmBox,
    DialogBox,
    ListItem,
    SpecialListItem,
    UserInfo
  },
  data() {
    return {
      contextMenuItem: {}
    }
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
      this._openAddListDialog()
    })
  },
  methods: {
    _openAddListDialog() {
      this.$refs.addDialog.show()
    },
    _openRenameListDialog() {
      this.$refs.renameDialog.show()
    },
    _openDeleteListDialog() {
      this.$refs.deleteDialog.show()
    },
    _openContextMenu(listItem, pos) {
      this.contextMenuItem = listItem
      this.$refs.contextMenu.show(pos)
    },
    handleContextMenuSelect(eventName) {
      if (eventName === 'rename') {
        this._openRenameListDialog()
      }
      if (eventName === 'delete') {
        this._openDeleteListDialog()
      }
    },
    handleAddListItem(listTitle) {
      this.addListItem({ title: listTitle })
      this.$router.push({
        path: `/main/${this.currentListItem._id}`
      })
    },
    handleDeleteListItem() {
      this.deleteTodoItemByListUUID(this.contextMenuItem._id)
      this.deleteListItem(this.contextMenuItem)
      this.$message({
        desc: 'List deleted.',
        type: 'warn'
      })
      this.contextMenuItem = null
    },
    handleRenameListItem(newTitle) {
      this.contextMenuItem.title = newTitle
      this.forceStoreListItems()
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
