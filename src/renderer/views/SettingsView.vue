<template>
  <transition name="slide">
    <div class="settings-view">
      <div class="quit" @click="handleQuitClick">
        <i class="fa fa-arrow-down"></i>
      </div>
      <div class="content">
        <div class="avatar-wrapper">
          <img :src="avatarUrl" :alt="username" @click="handleChangeAvatar">
        </div>
        <div class="username">
          <input-box ref="title" placeholder="Username" :border="false" :classes="usernameCls" :value="innerUsername" :embedded="true" @blur="handleUsernameBlur" @enter="handleUsernameEnter" @input="handleUsernameChange" />
        </div>
        <divider />
        <!-- This is the outside container of the sticky footer effect. -->
        <div class="sticky-footer">
          <div class="options-wrapper">
            <div class="options">
              <div class="option border-1px horizontal">
                <span class="desc">{{ $t('message.playSound') }}</span>
                <switcher :state="playSound" @switched="handleTogglePlaySound" />
              </div>
              <div class="option border-1px horizontal">
                <span class="desc">{{ $t('message.animation') }}</span>
                <switcher :state="openAni" @switched="handleToggleOpenAni" />
              </div>
              <div class="option border-1px horizontal">
                <span class="desc">语言</span>
                <div class="select-wrapper">
                  <wz-select :options="languageOptions"></wz-select>
                </div>
              </div>
            </div>
          </div>
          <!-- This is the sticky footer. -->
          <div class="copyright">
            {{ $t('message.copyright') }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { ipcRenderer } from 'electron'
import InputBox from '../components/InputBox'
import Divider from '../components/Divider'
import Switcher from '../components/Switcher'
import ButtonBase from '../components/ButtonBase'
import ConfirmBox from '../components/ConfirmBox'
import WzSelect from '../components/Select'
import { extractPreferencesMixin } from '../utils/mixins/pref'

const languageOptions = [
  { title: 'English' },
  {
    title: '中文'
  }
]

const i18n = {
  messages: {
    en: {
      message: {
        copyright: 'Copyright Wendell Hu 2017-18 All Rights Reserved',
        playSound: 'Play Sound',
        animation: 'Show Open Animation'
      }
    },
    zh: {
      message: {
        copyright: '版权所有 Wendell Hu 2017-18 保留所有权利',
        playSound: '播放声音',
        animation: '启动展示题图'
      }
    }
  }
}

export default {
  name: 'SettingsView',
  mixins: [extractPreferencesMixin],
  i18n,
  components: {
    InputBox,
    Divider,
    Switcher,
    ButtonBase,
    ConfirmBox,
    WzSelect
  },
  data() {
    return {
      innerUsername: this.username,
      languageOptions
    }
  },
  computed: {
    usernameCls() {
      return ['title']
    },
    ...mapGetters(['currentListItem', 'currentSpecialListItemTitle'])
  },
  created() {
    ipcRenderer.on('avatar-generated', (event, base64code) => {
      this.setAvatar(base64code)
      this.$message({
        desc: 'Avatar changed!',
        type: 'info'
      })
    })
  },
  watch: {
    username: {
      immediate: true,
      handler(newVal) {
        this.innerUsername = newVal
      }
    }
  },
  methods: {
    handleQuitClick() {
      this.$router.push({
        path: `/main/${
          this.currentSpecialListItemTitle
            ? this.currentSpecialListItemTitle
            : this.currentListItem._id
        }`
      })
    },
    handleUsernameEnter(username) {
      if (username === '') {
        this.$message({
          desc: 'Username cannot not be none.',
          type: 'alert'
        })
        this.innerUsername = this.username
      } else if (username !== this.username) {
        this.$message({
          desc: `Username changed to ${username}.`,
          type: 'info'
        })
        this.setUsername(username)
      }
    },
    handleUsernameBlur() {
      this.handleUsernameEnter(this.innerUsername)
    },
    handleUsernameChange(username) {
      this.innerUsername = username
    },
    handleTogglePlaySound(mode) {
      this.setPlaySound(mode)
    },
    handleToggleOpenAni(mode) {
      this.setOpenAni(mode)
    },
    handleChangeAvatar() {
      ipcRenderer.send('open-avatar-dialog')
    },
    handleClearDataButtonClick() {
      this.$refs.confirmBox.show()
    },
    ...mapMutations({
      setUsername: 'SET_USERNAME',
      setPlaySound: 'SET_PLAY_SOUND',
      setAvatar: 'SET_AVATAR_CODE',
      setOpenAni: 'SET_OPEN_ANI'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/mixins.styl';
@import '../assets/style/variables.styl';

.settings-view {
  full-screen();
  justify-content: center;
  background: white;

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

  .content {
    display: flex;
    flex-direction: column;
    padding: 120px 0 0 0;
    overflow: scroll;

    .avatar-wrapper {
      text-align: center;

      img {
        width: 112px;
        height: 112px;
        border-radius: 50%;
        transition: 0.2s all ease;

        &:hover {
          primary-shadow();
          transform: translateY(-6px);
        }
      }
    }

    .username {
      text-align: center;
      margin: 14px auto;
      font-size: 24px;
      font-weight: bold;
    }

    .sticky-footer {
      flex: 1;
    }

    .options-wrapper {
      padding: 0 10px;
      height: 100%;

      .options {
        padding-bottom: 100px;
      }

      .option {
        display: flex;
        height: 48px;
        align-items: center;
        bottom-border($light-border-color);

        .desc {
          flex: 1;
        }

        .switcher-component {
          flex: 0 0 48px;
        }

        .select-wrapper {
          flex: 0 0 80px;
        }
      }
    }

    .copyright {
      position: relative;
      margin-top: -28px;
      clear: both;
      text-align: center;
      font-size: 12px;
      color: $text-color-dark-grey;
    }
  }
}
</style>
