<template>
  <div class="item-header-component">
    <div class="background-image-wrapper">
      <img class="background-image" :src="backgroundImage">
    </div>
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
        {{ $t('message.sort') }}
        <i class="fa fa-sort"></i>
      </span>
      <div class="dropdown-wrapper">
        <dropdown ref="sortModeDropdown" transition-type="topright">
          <ul class="mode-items">
            <li class="mode-item" :class="{'current': sortMode === mode.mode}" v-for="mode in sortModes" :key="mode.mode" @click="handleSortModeChange(mode.mode)">
              {{ $t(`message.mode_${mode.mode}`) }}
            </li>
          </ul>
        </dropdown>
      </div>
    </div>
    <transition name="fade">
      <div class="suggest-wrapper" @click="_openSuggestionDialog" v-if="currentSpecialListItemTitle && currentSpecialListItemTitle === 'Today'">
        <div class="btn-wrapper">
          <i class="fa fa-lightbulb-o"></i>
          {{ $t('message.suggestion') }}
        </div>
        <div class="dropdown-wrapper">
          <dropdown ref="suggestionDropdown" transition-type="topright">
            <suggestion-view ref="suggestion" />
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
  { mode: 'none' },
  { mode: 'plan' },
  { mode: 'due' },
  { mode: 'complete' }
]

const i18n = {
  messages: {
    en: {
      message: {
        sort: 'Sort',
        suggestion: 'Suggestion',
        mode_none: 'Default',
        mode_plan: 'Plan Datetime',
        mode_due: 'Due Datetime',
        mode_complete: 'Complete Status'
      }
    },
    zh: {
      message: {
        sort: '排序',
        suggestion: '建议',
        mode_none: '默认',
        mode_plan: '计划时间',
        mode_due: '截止时间',
        mode_complete: '完成状态'
      }
    }
  }
}

export default {
  name: 'TodoHeader',
  components: { Dropdown, SuggestionView },
  i18n,
  data() {
    return {
      sortModes
    }
  },
  computed: {
    showDate() {
      return this.currentSpecialListItemTitle === 'Today'
    },
    title() {
      let title = this.currentSpecialListItemTitle
      if (!title) {
        title = this.currentListItem.title
      }
      return title
    },
    formattedToday() {
      return getFormattedDate(this.today)
    },
    backgroundImage() {
      return 'static/images/unsplash/today.jpg'
    },
    ...mapGetters([
      'currentListItem',
      'currentSpecialListItemTitle',
      'sortMode',
      'today'
    ])
  },
  methods: {
    _openSuggestionDialog() {
      this.$refs.suggestionDropdown.show()
      this.$refs.suggestion.refresh()
    },
    _openSortModeSelector() {
      this.$refs.sortModeDropdown.show()
    },
    handleSortModeChange(mode) {
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

  .background-image-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .background-image {
    width: 100%;
  }

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
      standard-shadow();

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
