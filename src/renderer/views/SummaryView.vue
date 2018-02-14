<template>
  <transition name="slide">
    <div class="summary-view">
      <split-frame>
        <user-info-view slot="left-panel"></user-info-view>
        <calendar-view slot="right-panel"></calendar-view>
      </split-frame>
      <div class="quit"
           @click="handleQuitClick">
        <i class="fa fa-arrow-down"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import CalendarView from './CalendarView.vue'
  import UserInfoView from './UserInfoView.vue'

  import SplitFrame from '../components/SplitFrame.vue'

  export default {
    name: 'summary-view',
    components: {
      CalendarView,
      SplitFrame,
      UserInfoView
    },
    computed: {
      ...mapGetters([ 'currentListItem', 'currentSpecialListItemTitle' ])
    },
    methods: {
      handleQuitClick () {
        let nextRoute
        if (this.currentSpecialListItemTitle) {
          nextRoute = `/main/${this.currentSpecialListItemTitle}`
        } else {
          nextRoute = `/main/${this.currentListItem._id}`
        }
        this.$router.push({
          path: nextRoute
        })
      },
      ...mapActions([ 'doSummary' ])
    },
    mounted () {
      this.doSummary()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/style/mixins.styl';
  @import '../assets/style/variables.styl';

  .summary-view {
    width: 100%;
    height: 100%;
    background: white;
    position: relative;

    &.slide-enter-active, &.slide-leave-active {
      transition: 0.2s all;
    }

    &.slide-enter-active {
      transition-delay: 0.2s;
    }

    &.slide-enter, &.slide-leave-to {
      transform: translate3d(0, 15%, 0);
      opacity: 0;
    }

    .quit {
      position: absolute;
      left: 20px;
      top: 14px;
      padding: 8px;
      transition: all 0.2s;
      color: $text-color-dark-grey;

      &:hover {
        color: $red-color;
        transform: translateY(-2px);
      }
    }
  }
</style>
