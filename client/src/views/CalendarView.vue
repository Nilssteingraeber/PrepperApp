<template>
    <div class="calendar">
      <div class="header">
        <h2>{{ currentMonth.format('MMMM YYYY') }}</h2>
        <div>
          <button @click="prevMonth" class="btn btn-primary me-2">PREV</button>
          <button @click="nextMonth" class="btn btn-primary">NXT</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>KW</th>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in calendar" :key="index">
            <td>{{ weekNumber(week[0].date) }}</td>
            <td v-for="day in week" :key="day.date">
              <button
                @click="handleDayClick(day)"
                :class="{ selected: day.date.isSame(selectedDate, 'day') }"
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
  import { inject } from 'vue'
  
  export default {
    setup() {
      const selectedDate = inject('selectedDate')
      const setSelectedDate = inject('setSelectedDate')
  
      return { selectedDate, setSelectedDate }
    },
    data() {
      return {
        currentMonth: moment(),
        daysOfWeek: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
        calendar: [] // Kalender wird im Mount- und Watch-Hook berechnet
      }
    },
    computed: {
      monthYear() {
        return this.currentMonth.format('MMMM YYYY')
      }
    },
    methods: {
      prevMonth() {
        this.currentMonth = this.currentMonth.subtract(1, 'month')
        this.generateCalendar()
      },
      nextMonth() {
        this.currentMonth = this.currentMonth.add(1, 'month')
        this.generateCalendar()
      },
      weekNumber(date) {
        return date.isoWeek()
      },
      generateCalendar() {
        const startOfMonth = this.currentMonth.clone().startOf('month').startOf('isoWeek')
        const endOfMonth = this.currentMonth.clone().endOf('month').endOf('isoWeek')
        const calendar = []
        let date = startOfMonth.clone()
  
        while (date.isBefore(endOfMonth, 'day')) {
          const week = []
          for (let i = 0; i < 7; i++) {
            week.push({
              day: date.date(),
              date: date.clone()
            })
            date.add(1, 'day')
          }
          calendar.push(week)
        }
        this.calendar = calendar
      },
      handleDayClick(day) {
        this.setSelectedDate(day.date)
      }
    },
    watch: {
      currentMonth() {
        this.generateCalendar()
      },
      selectedDate(newValue) {
        this.currentMonth = newValue.clone().startOf('month')
        this.generateCalendar()
      }
    },
    mounted() {
      this.generateCalendar()
    }
  }
  </script>
  
  <style scoped>
  .calendar {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
  .btnDay.selected {
    background-color: #007bff;
    color: white;
    border-radius: 4px;
  }
  </style>