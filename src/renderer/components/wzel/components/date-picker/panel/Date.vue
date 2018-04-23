<template>
  <div class="date-panel">
    <div class="date-panel-sidebar border-1px vertical" v-if="shortcut">
      <ul class="shortcut-list">
        <li class="shortcut-item" v-for="shortcut in shortcuts" :key="shortcut.name" @click="handleShortcutClick(shortcut)">
          {{ shortcut.name }}
        </li>
      </ul>
    </div>
    <div class="date-panel-body">
      <div class="date-panel-body-header border-1px horizontal">
        <span class="fa fa-angle-double-left switcher" @click="_changeYear(-1)"></span>
        <span class="fa fa-angle-left switcher" @click="_changeMonth(-1)"></span>
        <span class="header-text">
          {{ headerText }}
        </span>
        <span class="fa fa-angle-right switcher" @click="_changeMonth(1)"></span>
        <span class="fa fa-angle-double-right switcher" @click="_changeYear(1)"></span>
      </div>
      <div class="date-panel-table-container">
        <date-table :date="date" :disabled-date="disabledDate" :month="month" :value="value" :year="year" @date-pick="handleDatePick"></date-table>
      </div>
      <div class="date-panel-body-footer border-1px horizontal">
        <button-base size="small" text="Cancel" type="inverse" @click="handleCancel"></button-base>
        <button-base size="small" text="Confirm" type="primary" :has-value="true" :value="value" @click="handleConfirm"></button-base>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBase from '../../button'
import DateTable from '../base/DateTable'

import { shortcuts } from '../util/shortcuts'
import { getToday, switchMonth } from '../../../../utils/datetime'

export default {
  name: 'Date',
  components: { ButtonBase, DateTable },
  props: {
    shortcut: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      date: new Date(getToday()),
      month: null,
      shortcuts: shortcuts,
      value: '',
      year: null
    }
  },
  computed: {
    headerText() {
      if (!this.year) {
        return ''
      }
      return `${this.year} / ${this.month + 1}`
    }
  },
  watch: {
    date(newVal) {
      this._setMonthYear(newVal)
    },
    value(newVal) {
      if (!newVal) return
      newVal = new Date(newVal)
      if (!isNaN(newVal)) {
        this.date = newVal
        this.year = newVal.getFullYear()
        this.month = newVal.getMonth()
      }
    }
  },
  methods: {
    _changeMonth(val) {
      this.date = switchMonth(this.date, val)
    },
    _changeYear(val) {
      this.date = switchMonth(this.date, val * 12)
    },
    handleCancel() {
      this.$emit('pick-cancel')
    },
    handleConfirm() {
      this.$emit('pick-confirm')
    },
    handleDatePick(pickedDate) {
      this.$emit('date-pick', new Date(pickedDate.getTime()))
      this.date.setFullYear(pickedDate.getFullYear())
      this.date.setMonth(pickedDate.getMonth())
      this.date.setDate(pickedDate.getDate())
      this.date = new Date(this.date) // Trigger Vue.
    },
    handleShortcutClick(shortcut) {
      if (shortcut.value) {
        this.$emit('date-pick', shortcut.value())
      }
    },
    _setMonthYear(date) {
      this.month = date.getMonth()
      this.year = date.getFullYear()
    }
  },
  created() {
    // Init month and year.
    if (this.date && !this.year) {
      this._setMonthYear(this.date)
    }
    // Use this function to disable all dates before today.
    this.disabledDate = function(date) {
      return date && date.valueOf() < Date.now() - 86400000
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../assets/style/variables.styl';
@import '../../../../assets/style/mixins.styl';

.date-panel {
  display: flex;
  height: 100%;

  .date-panel-sidebar {
    flex: 0 0 50px;
    margin-right: 12px;
    padding-right: 12px;
    right-border($light-border-color);

    .shortcut-list {
      padding-left: 0;

      .shortcut-item {
        list-style: none;
        padding: 6px 8px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        border-radius: 4px;
        transition: all 0.2s;

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          background: $background-color-light-grey;
        }
      }
    }
  }

  .date-panel-body {
    flex: 1;
    width: 210px;

    .date-panel-body-header {
      display: flex;
      padding: 0 0 8px 0;
      bottom-border($light-border-color);
      text-align: center;

      .switcher {
        flex: 0 0 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        border-radius: 2px;
        color: $text-color-dark-grey;
        transition: all 0.2s;

        &:hover {
          background: $background-color-light-grey;
        }
      }

      .header-text {
        flex: 1;
        font-size: 14px;
        line-height: 22px;
        color: $text-color-dark-grey;
      }
    }

    .date-panel-table-container {
      padding: 12px 0 6px;
    }

    .date-panel-body-footer {
      padding: 8px 0 0;
      top-border($light-border-color);
      text-align: right;
    }
  }
}
</style>
