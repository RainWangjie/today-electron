<template>
  <div class="suggestion-view">
    <div class="header">
      <h1>
        {{ $t('message.suggestion') }}
      </h1>
      <p class="desc">
        {{ $t('message.desc') }}
      </p>
    </div>
    <transition-group name="height"
                      class="suggestion-list">
      <li class="suggestion-item"
          v-for="(suggestion, index) in suggestedTodo"
          :key="index">
        <span class="title">{{ suggestion.title }}</span>
        <span class="list">{{ $t('message.in') }} {{ listNameFor(suggestion) }}</span>
        <button-base :text="$t('message.add')"
                     size="small"
                     @click="handleSelectSuggestion(suggestion)"></button-base>
      </li>
    </transition-group>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  import { clearHours, getCurrentDatetime, getToday, ONE_DAY } from '../utils/datetime'
  import ButtonBase from '../components/button'

  export default {
    name: 'SuggestionView',
    components: { ButtonBase },
    i18n: {
      messages: {
        en: {
          message: {
            suggestion: 'Suggestions',
            desc: `Don't know what to do first? Please consider about our suggestions.`,
            in: 'in',
            add: 'Add'
          }
        },
        zh: {
          message: {
            suggestion: '建议',
            desc: `拿不准现在该做什么？请考虑我们的建议。`,
            in: '位于',
            add: '添加'
          }
        }
      }
    },
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
          const timeInterval = clearHours(element.dueDatetime) - getToday()
          if (
            element.completedFlag !== true && // Maybe null or false.
            element.dueDatetime &&
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
@import '../assets/style/variables.styl';

.suggestion-view {
  min-width: 350px;
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
      margin: 10px 0;
      line-height: 28px;
      align-items: center;
      transition: all 0.2s linear;

      .title {
        flex: 2;
      }

      .list {
        flex: 1;
        font-size: $text-small;
        line-height: 14px;
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
