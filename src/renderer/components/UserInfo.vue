<template>
  <div class="user-info-co border-1px horizontal">
    <div class="content">
      <div class="avatar-wrapper">
        <img :src="avatarUrl"
             :alt="username">
      </div>
      <div class="info-wrapper">
        <div class="name"
             v-html="username"></div>
        <div class="sync">Sync server not online</div>
      </div>
      <div class="settings-wrapper"
           @click.stop="handleClickSummary">
        <i class="fa fa-fw fa-calendar"></i>
      </div>
      <div class="settings-wrapper"
           @click="handleClickSettings">
        <i class="fa fa-fw fa-gears"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { extractPreferencesMixin } from '../utils/mixins/pref'

export default {
  mixins: [extractPreferencesMixin],
  methods: {
    handleClickSummary() {
      this.$router.push({
        path: '/summary'
      })
    },
    handleClickSettings() {
      this.$router.push({
        path: '/settings'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../assets/style/mixins.styl';
  @import '../assets/style/variables.styl';

  .user-info-co {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 0 10px 0 20px;
    bottom-border(rgba(7, 17, 27, 0.1));

    .content {
      display: flex;
      align-items: center;

      .avatar-wrapper {
        flex: 0 0 36px;

        img {
          margin: 12px 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
      }

      .info-wrapper {
        flex: 1;
        flex-direction: column;
        margin-left: 10px;

        .name {
          font-size: 16px;
          line-height: 16px;
        }

        .sync {
          margin-top: 4px;
          font-size: 10px;
          line-height: 10px;
          color: $text-color-dark-grey;
        }
      }

      .settings-wrapper {
        padding: 4px;
        color: $text-color-dark-grey;
        transition: all 0.2s;

        &:hover {
          color: $primary-color;
          transform: translateY(-2px);
        }
      }
    }
  }
</style>
