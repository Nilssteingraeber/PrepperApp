<template>
  <div class="bottom-bar">
    <div class="week-view">
      <div
        v-for="day in currentWeek"
        :key="day.date"
        :class="{ selected: day.date.isSame(selectedDate, 'day') }"
        @click="handleDayClick(day)"
      >
        {{ day.date.format('ddd DD') }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { inject } from 'vue'

export default {
  setup() {
    const selectedDate = inject('selectedDate')
    const setSelectedDate = inject('setSelectedDate')

    return { selectedDate, setSelectedDate }
  },
  data() {
    return {
      currentWeek: this.getWeekDays(this.selectedDate)
    }
  },
  methods: {
    getWeekDays(date) {
      const startOfWeek = date.clone().startOf('isoWeek')
      const endOfWeek = date.clone().endOf('isoWeek')
      const days = []
      let currentDay = startOfWeek

      while (currentDay.isBefore(endOfWeek)) {
        days.push({ date: currentDay.clone() })
        currentDay.add(1, 'day')
      }

      return days
    },
    handleDayClick(day) {
      this.setSelectedDate(day.date)
    }
  },
  watch: {
    selectedDate(newValue) {
      this.currentWeek = this.getWeekDays(newValue)
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.week-view {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.week-view div {
  padding: 10px;
  cursor: pointer;
}

.week-view .selected {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}
</style>
