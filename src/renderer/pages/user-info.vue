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
        <span class="used-date">{{ $t('message.days', { days: usedDates}) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { countDatesToTodayFrom } from '../components/wzel/utils/datetime'
import { extractPreferencesMixin } from '../utils/mixins/pref'

const i18n = {
  messages: {
    en: {
      message: {
        days: '{days} Day(s) with Today'
      }
    },
    zh: {
      message: {
        days: '使用 Today 已有 {days} 天'
      }
    }
  }
}

export default {
  name: 'UserInfoView',
  mixins: [extractPreferencesMixin],
  i18n,
  computed: {
    usedDates() {
      return countDatesToTodayFrom(this.startUsingDatetime)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/variables.styl';

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
