<template>
  <div class="user-info-view">
    <div class="content">
      <div class="avatar-wrapper">
        <img :src="avatarUrl"
             :alt="username">
      </div>
      <div class="username">
        {{ username }}
      </div>
      <div class="used-date-wrapper">
        <span class="used-date">{{ usedDates }}</span> Day(s) with Today
      </div>
    </div>
  </div>
</template>

<script>
import { countDatesToTodayFrom } from '../utils/datetime'
import { extractPreferencesMixin } from '../utils/mixins/pref'

export default {
  name: 'UserInfoView',
  mixins: [extractPreferencesMixin],
  computed: {
    usedDates() {
      return countDatesToTodayFrom(this.startUsingDatetime)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../assets/style/variables.styl';

  .user-info-view {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box; // Some hack to make the content div looks like more 'center'.
    padding-bottom: 100px;
    flex-direction: column;
    justify-content: center;

    .content {
      display: flex;
      flex-direction: column;
      margin: auto;

      .avatar-wrapper {
        text-align: center;

        img {
          width: 72px;
          height: 72px;
          border-radius: 50%;
        }
      }

      .username {
        margin: 14px auto;
        font-size: 24px;
        font-weight: bold;
      }

      .used-date-wrapper {
        text-align: center;
        font-size: 14px;
        line-height: 18px;
        color: $text-color-dark-grey;

        .used-date {
          color: $primary-color;
        }
      }
    }
  }
</style>
