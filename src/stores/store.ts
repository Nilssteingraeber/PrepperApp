import { ref } from 'vue'
import moment from 'moment'

const selectedDate = ref(moment())

export function useDateStore() {
  return {
    selectedDate,
    setSelectedDate(date) {
      selectedDate.value = date
    }
  }
}
