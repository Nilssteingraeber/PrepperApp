<template>
  <div class="floating-bar">
    <table>
      <thead>
        <tr>
          <th>KW</th>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ weekNumber(week[0].date) }}</td>
          <td v-for="day in week" :key="day.date">
            <button
              @click="handleDayClick(day)"
              :class="{ selected: isSelected(day.date) }"
              class="btnDay"
            >
              {{ day.day }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/de'

export default {
  props: ['selectedDate'],
  data() {
    return {
      daysOfWeek: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      week: [] // Die Woche wird im Watch-Hook berechnet
    }
  },
  computed: {
    weekNumber(date) {
      return date.isoWeek()
    }
  },
  methods: {
    generateWeek() {
      const startOfWeek = this.selectedDate.clone().startOf('isoWeek')
      const week = []
      let date = startOfWeek.clone()

      for (let i = 0; i < 7; i++) {
        week.push({
          day: date.date(),
          date: date.clone()
        })
        date.add(1, 'day')
      }
      this.week = week
    },
    handleDayClick(day) {
      this.$emit('day-selected', day.date)
    },
    isSelected(date) {
      return date.isSame(this.selectedDate, 'day')
    }
  },
  watch: {
    selectedDate() {
      this.generateWeek()
    }
  },
  mounted() {
    this.generateWeek()
  }
}
</script>

<style scoped>
.floating-bar {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #000;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #000;
  padding: 10px;
  text-align: center;
}
.btnDay {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.selected {
  background-color: yellow;
}
</style>
