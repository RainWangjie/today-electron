<template>
  <div class="suggestion-view">
    <div class="header">
      <h1>
        Suggestions
      </h1>
      <p class="desc">
        Don't know what to do first? Please consider about our suggestions.
      </p>
    </div>
    <transition-group name="height" class="suggestion-list">
      <li class="suggestion-item" v-for="(suggestion, index) in suggestedTodo" :key="index">
        <span class="title">{{ suggestion.title }}</span>
        <span class="list">{{ listNameFor(suggestion) }}</span>
        <button-base text="Add" size="small" @click="handleSelectSuggestion(suggestion)"></button-base>
      </li>
    </transition-group>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  import { clearHours, getCurrentDatetime, getToday, ONE_DAY } from '../utils/datetime'
  import ButtonBase from '../components/ButtonBase'

  export default {
    name: 'SuggestionView',
    components: { ButtonBase },
    data: () => ({
      suggestedTodo: []
    }),
    computed: {
      ...mapGetters([ 'todoItems', 'listItems' ])
    },
    methods: {
      handleSelectSuggestion (suggestion) {
        this.setPlanDatetime({ item: suggestion, date: getCurrentDatetime() })
      },
      listNameFor (item) {
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
      refresh () {
        const ret = []
        this.todoItems.forEach(element => {
          const timeInterval = clearHours(element.planDatetime) - getToday()
          if (
            element.completedFlag !== true && // Maybe null or false.
            element.planDatetime &&
            timeInterval <= ONE_DAY * 2 &&
            timeInterval > 0
          ) {
            ret.push(element)
          }
        })
        this.suggestedTodo = ret
      },
      ...mapMutations({
        setPlanDatetime: 'SET_PLAN_DATETIME'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/style/variables.styl'

  .suggestion-view {
    width: 300px;
    padding: 10px;
    color: black;

    .header {
      .desc {
        margin-top: 8px;
        font-size: $text-small;
        color: $text-color-dark-grey;
      }
    }

    .suggestion-list {
      margin-top: 8px;

      .suggestion-item {
        display: flex;
        margin: 4px 0;
        height: 28px;
        line-height: 28px;
        transition: all 0.2s linear;

        .title {
          flex: 2;
        }

        .list {
          flex: 1;
          font-size: $text-small;
          color: $text-color-dark-grey;
        }

        &.height-leave-to {
          height: 0;
          opacity: 0;
        }
      }
    }
  }
</style>
