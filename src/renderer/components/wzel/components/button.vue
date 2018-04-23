<template>
  <div class="wz-button" :class="classes" @click="handleClick">
    {{ text }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'wz-button',
  props: {
    hasValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    },
    value: {
      type: [String, Boolean, Number, Object, Date],
      default: ''
    }
  },
  computed: {
    isEnabled() {
      if (!this.hasValue) return true
      return this.value
    },
    classes() {
      return [!this.isEnabled ? 'disabled' : '', `${this.size}`, `${this.type}`]
    }
  },
  methods: {
    handleClick() {
      if (this.isEnabled) this.$emit('click')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../assets/style/variables.styl';

  .wz-button {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    box-sizing: border-box;
    border-radius: 4px;
    background: $primary-color;
    transition: all 0.2s linear;

    // Sizes.
    &.big {
      width 144px
      height 48px
      line-height 48px
      font-size 22px
    }

    &.medium {
      width: 82px;
      height: 34px;
      line-height: 34px;
      font-size: 14px;
    }

    &.small {
      width: 50px;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }

    // Types.
    &.primary {
      color: white;
      background: $primary-color;

      &:hover {
        background: $primary-color-highlighted;
      }
    }

    &.secondary {
      color: white;
      background: $background-color-disabled-grey;

      &:hover {
        background: $background-color-disabled-grey-highlighted;
      }
    }

    &.danger {
      color: white
      background: $danger-color

      &:hover {
        background: $danger-color-highlighted
      }
    }

    &.disabled {
      color: white;
      background: $background-color-disabled-grey !important;
    }

    &.inverse {
      color: $primary-color;
      border: 1px solid $primary-color;
      background: white;

      :hover {
        border: 1px solid $primary-color-highlighted;
      }
    }

    &.danger {
      color: white
      background: $danger-color;

      &:hover {
        background: $danger-color-highlighted;
      }
    }
  }
</style>
