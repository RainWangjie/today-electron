<template>
  <div class="list-item-view">
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
                     @contextmenu="_handleContextMenu"
                     @select="handleSelectListItem" />
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

import AddItem from './add-list-btn'
import ListItem from './list-item'
import SpecialListItem from './special-list-item'
import UserInfo from './user-info'

const specialListItems = ['Today', 'To-Do']

const commands = [
  {
    title: 'rename',
    icon: 'fa-pencil',
    hook: 'rename',
    type: ''
  },
  {
    title: 'delete',
    icon: 'fa-trash',
    hook: 'delete',
    type: 'danger'
  }
]

export default {
  name: 'list',
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

    // i18n to context menu commands
    commands.forEach(command => {
      command.title = this.$t(`list.commands.${command.title}`)
    })

    ipcRenderer.on('create-new-list', event => {
      this._addListItem()
    })
  },
  methods: {
    _addListItem() {
      this.$dialog({
        header: this.$t('list.addTitle'),
        text: this.$t('list.addPlaceholder'),
        footerConfirm: this.$t('list.addConfirm'),
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
        commands,
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
      this.$dialog({
        header: this.$t('list.renameTitle'),
        text: this.$t('list.renamePlaceholder'),
        callback: title => {
          if (title) {
            listItem.title = title
            this.forceStoreListItems()
          }
        }
      })
    },
    _deleteListItem(listItem) {
      this.$confirm({
        header: this.$t('list.deleteTitle'),
        text: this.$t('list.deleteText'),
        callback: () => {
          this.deleteTodoItemByListUUID(listItem._id)
          this.deleteListItem(listItem)
          this.$message({
            desc: this.$t('listDeleted'),
            type: 'info'
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
.list-item-view
  height 100%
  position relative
  background white

  .list-wrapper
    position absolute
    width 100%
    top 60px
    bottom 44px
    z-index 20
    overflow scroll

    .list-item
      transition all 0.2s

      &.move-enter
        transform translate3d(0, 50%, 0)
        opacity 0

      &.move-leave-to
        height 0
        opacity 0

  .add-item-wrapper
    position absolute
    bottom 0
    left 0
    width 100%
    z-index 50
</style>
