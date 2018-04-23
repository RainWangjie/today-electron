<template>
  <div class="suggestion-view">
    <div class="header">
      <h1>
        {{ $t('suggestion.suggestion') }}
      </h1>
      <p class="desc">
        {{ $t('suggestion.desc') }}
      </p>
    </div>
    <template v-if="suggestedTodo.length">
      <transition-group name="height"
                        class="suggestion-list">
        <li class="suggestion-item"
            v-for="(suggestion, index) in suggestedTodo"
            :key="index">
          <span class="title">{{ suggestion.title }}</span>
          <span class="list">{{ $t('suggestion.in') }} {{ listNameFor(suggestion) }}</span>
          <wz-button :text="$t('suggestion.add')"
                     size="small"
                     @click="acceptSuggestion(suggestion)" />
        </li>
      </transition-group>
    </template>
    <blank v-else
           :info="$t('suggestion.empty')"></blank>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import {
  clearHours,
  getCurrentDatetime,
  getToday,
  ONE_DAY
} from '../components/wzel/utils/datetime'
import WzButton from '../components/wzel/components/button'
import Blank from '../pages/blank'

/* eslint-disable no-unused-vars */
const getSuggestedTodos = function(todos) {
  let ret = []

  todos.forEach(todo => {
    const untilDuedate = clearHours(todo.dueDatetime) - getToday()
    if (
      todo.completedFlag !== true &&
      todo.dueDatetime &&
      untilDuedate <= ONE_DAY * 2 &&
      untilDuedate > 0 &&
      !todo.planDatetime
    ) {
      ret.push(todo)
    }
  })

  return ret
}

export default {
  name: 'Suggestion',
  components: { WzButton, Blank },
  data: () => ({
    suggestedTodo: []
  }),
  computed: {
    ...mapGetters(['todoItems', 'listItems'])
  },
  methods: {
    acceptSuggestion(suggestion) {
      this.setPlanDatetime({
        item: suggestion,
        date: getCurrentDatetime()
      })
    },
    listNameFor(item) {
      const puuid = item.listUUID
      let title = ''

      if (!puuid) {
        title = 'To-Do'
      } else {
        const lists = this.listItems
        lists.forEach(item => {
          if (item._id === puuid) {
            title = item.title
          }
        })
      }
      return title
    },
    refresh() {
      this.suggestedTodo = getSuggestedTodos(this.todoItems)
    },
    ...mapMutations({
      setPlanDatetime: 'SET_PLAN_DATETIME'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl'

.suggestion-view
  display flex
  flex-direction column
  width 400px
  min-height 200px
  max-height 600px
  overflow scroll
  padding 10px
  padding-bottom 0
  color black

  .header
    flex 0 0 36px

    .desc
      margin-top 8px
      font-size $text-small
      color $text-color-dark-grey

  .suggestion-list
    flex 1
    margin-top 8px

    .suggestion-item
      display flex
      margin-top 10px
      line-height 28px
      height 28px
      transition all 0.1s linear

      .title
        flex 2
        padding-right 10px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        font-size 16px

      .list
        flex 1
        font-size $text-small
        color $text-color-dark-grey

      &.height-enter, &.height-leave-to
        height 0
        opacity 0
</style>
