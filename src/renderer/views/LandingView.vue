<template>
  <transition name="fade">
    <div class="landing-view" v-show="showFlag">
      <div class="content">
        here should be a picture
      </div>
    </div>
  </transition>
</template>

<script>
// TODO: I'm going to create several beautiful animations here with popmotion!
// Maybe I can use popmotion to improve my components too?

import { extractPreferencesMixin } from '../utils/mixins/pref'
import { showMixin } from '../utils/mixins/show'

export default {
  name: 'LandingView',
  mixins: [extractPreferencesMixin, showMixin],
  mounted() {
    if (this.openAni) this.show()
    setTimeout(() => {
      this.$router.push({
        path: `${this.initFlag ? '/main/today' : '/welcome'}`
      })
    }, this.openAni ? 1500 : 0)
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/style/mixins.styl';

.landing-view {
  full-screen();
  vertical-flex();
  transition-fade();

  .content {
    margin: auto;
    width: 300px;
    height: 300px;
    text-align: center;
  }
}
</style>
