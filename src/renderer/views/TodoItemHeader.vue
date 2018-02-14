<template>
  <div class="item-header-component">
    <div class="current-list-item">
      <h1 class="title">
        {{ title }}
      </h1>
      <p class="today" v-if="showDate">
        {{ formattedToday }}
      </p>
    </div>
    <div class="sort-mode-wrapper" @click="_openSortModeSelector">
      <span class="displayer">
        Sort
        <i class="fa fa-sort"></i>
      </span>
      <div class="dropdown-wrapper">
        <dropdown ref="sortModeDropdown" transition-type="topright">
          <ul class="mode-items">
            <li class="mode-item" :class="{'current': sortMode === mode.mode}"
                v-for="mode in sortModes" :key="mode.mode"
                @click="handleSortModeChange(mode.mode)">
              {{ mode.desc }}
            </li>
          </ul>
        </dropdown>
      </div>
    </div>
    <transition name="fade">
      <div class="suggest-wrapper" @click="_openSuggestionDialog"
           v-if="currentSpecialListItemTitle && currentSpecialListItemTitle === 'Today'">
        <div class="btn-wrapper">
          <i class="fa fa-lightbulb-o"></i>
          Suggest
        </div>
        <div class="dropdown-wrapper">
          <dropdown ref="suggestionDropdown" transition-type="topright">
            <suggestion-view ref="suggestion"></suggestion-view>
          </dropdown>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  import SuggestionView from './SuggestionView'
  import Dropdown from '../components/Dropdown'
  import { getFormattedDate } from '../utils/datetime'

  const sortModes = [
    { mode: 'none', desc: 'Default' },
    { mode: 'plan', desc: 'Plan Datetime' },
    { mode: 'due', desc: 'Due Datetime' },
    { mode: 'complete', desc: 'Complete Status' }
  ]

  export default {
    name: 'TodoHeader',
    components: { Dropdown, SuggestionView },
    data () {
      return {
        sortModes
      }
    },
    computed: {
      showDate () {
        return this.currentSpecialListItemTitle === 'Today'
      },
      title () {
        let title = this.currentSpecialListItemTitle
        if (!title) {
          title = this.currentListItem.title
        }
        return title
      },
      formattedToday () {
        return getFormattedDate(this.today)
      },
      ...mapGetters([
        'currentListItem',
        'currentSpecialListItemTitle',
        'sortMode',
        'today'
      ])
    },
    methods: {
      _openSuggestionDialog () {
        this.$refs.suggestionDropdown.show()
        this.$refs.suggestion.refresh()
      },
      _openSortModeSelector () {
        this.$refs.sortModeDropdown.show()
      },
      handleSortModeChange (mode) {
        this.setSortMode(mode)
        this.$refs.sortModeDropdown.hide()
      },
      ...mapMutations({
        setSortMode: 'SET_SORT_MODE'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/style/mixins.styl';
  @import '../assets/style/variables.styl';

  .item-header-component {
    position: relative;
    width: 100%;
    height: 100%;
    background: $background-color-grey;
    z-index: 50;

    .current-list-item {
      position: absolute;
      left: 20px;
      bottom: 16px;
      color: white;

      .title {
        font-size: 24px;
        line-height: 24px;
      }

      .today {
        margin-top: 4px;
      }
    }

    .suggest-wrapper {
      position: absolute;
      top: 16px;
      right: 24px;
      transition: opacity 0.2s ease;

      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }

      .btn-wrapper {
        padding: 8px 12px;
        background: white;
        border-radius: 4px;
        color: $orange-color;
        transition: all 0.2s ease;
        standard-shadow()

        i {
          margin-right: 4px;
        }

        &:hover {
          color: $orange-color-highlighted;
          transform: translate3d(0, -4px, 0);
        }
      }

      .dropdown-wrapper {
        position: absolute;
        top: 36px;
        right: 0;
      }
    }

    .sort-mode-wrapper {
      position: absolute;
      right: 24px;
      bottom: 16px;
      color: white;

      .dropdown-wrapper {
        position: absolute;
        right: 0;
        top: 20px;

        .mode-items {
          width: 140px;

          .mode-item {
            padding: 4px 0 4px 8px;
            line-height: 24px;
            font-size: 14px;
            border-radius: 4px;
            transition: all 0.2s;
            color: black;

            &:hover {
              background: $background-color-light-grey;
            }

            &.current {
              color: $primary-color;
            }
          }
        }
      }
    }
  }
</style>
