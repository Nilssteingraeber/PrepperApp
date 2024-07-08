<script setup lang="ts">
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import { computed, reactive, ref, watch } from 'vue'

import dash from '@/assets/dash.svg'
import store from '@/store';

const props = defineProps(['amountDays', 'selected', 'showInputAnimation', "reff", 'doSelectDayAnimation'])
const emit = defineEmits(['update:selected'])


const currentData = computed(() => {

  const isWeekend = (index: number) => {
    return (store.state.cycleObject as Cycle).getDayAtIndex(index).getDay() === 5 || (store.state.cycleObject as Cycle).getDayAtIndex(i).getDay() === 6
  }

  const isSunday = (index: number) => {
    return (store.state.cycleObject as Cycle).getDayAtIndex(index).getDay() === 6
  }

  const b = []

  for (var i = 0; i < 7; i++) {
    const weekend = isWeekend(i)
    const isSelectedDay = i === store.state.cycleObject.selectedIndex
    const dayOfWeek = (store.state.cycleObject as Cycle).getCurrentDateInWeek()

   

    let classText = isSelectedDay ? 'day-item day-selected ' : 'day-item'
    let classTextNoti = isSelectedDay ? " day-notification-active " : " day-notification "

    classText += isSunday(i) ? ' sunday' : ''
    classText += weekend ? ' weekend' : ''
    classText += props.showInputAnimation && isSelectedDay ? ' input-cycle-ani ' : ''
    classText += store.state.showCycleSelectAni && isSelectedDay ? store.state.cycleObject.animationDirection ? ' animation-select-right ' : ' animation-select-left ' : ''

    classText += (store.state.cycleObject as Cycle).getIsIndexInPast(i) && !isSelectedDay && !(dayOfWeek === i) ? " day-is-in-past " : ''

    if (dayOfWeek === i)
      classText += ' day-of-week'

    b.push({
      id: i,
      className: classText,
      dayName: (store.state.cycleObject as Cycle).getDateStringAtIndex(i),
      isSelected: isSelectedDay,
      classNameNoti: classTextNoti
    })
  }
  return b
})

const handleClick = (id: number) => {
  store.commit("refreshCycleObject")
  store.commit("setSelectedCycleIndex", id)
}
</script>

<template>
  <div class="d-flex flex-row day-container">
    <div v-for="item in currentData" :key="item.id" class="col-auto" style="z-index: 5;">
      <button :class="item.className" @click="handleClick(item.id)"
        v-text="(item.isSelected) ? item.dayName : ''"></button>
      <div :class="item.classNameNoti"></div>
    </div>
  </div>
</template>

<style>
.day-item {
  background-color: rgb(70, 34, 85);
  color: rgb(103, 177, 128, 0);
  border-style: none;
  min-width: 15px;
  min-height: 15px;
  padding: 8px;
  margin: 5px;
  border-radius: 7px;
  opacity: 0.7;
  transition: 0.2s;
  transform: translate(0, 5px);
}

.day-is-in-past {
  /* background: linear-gradient(-45deg, rgb(70, 34, 85, 0.8) 46%, rgb(70, 34, 85,0.1) 50%, rgb(70, 34, 85, 0.8) 54%); */
  background-color: rgb(70, 34, 85, 0.4);
}

.day-selected {
  background-color: rgb(0, 180, 137, 0.7);
  padding: 6px;
  border-color: rgb(103, 177, 128);
  color: rgb(0, 0, 0, 1) !important;
  transform: translate(0, 0px);
}

.day-item:hover {
  background-color: rgb(0, 180, 137, 0.8) !important;
  border-color: rgb(103, 177, 128);
}

.day-container {
  max-height: 50px;
  margin-right: 25px;
  margin-left: 25px;
}

.day-notification-active {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  transform: translate(300%, -420%);
  background-color: red;
  box-shadow: 0px 5px 7px rgb(0, 0, 0, 0.7);
  z-index: 50;
}

@keyframes current-day-ani {
  0% {
    outline-offset: 0px;
    outline-width: 0px;
    outline-color: rgb(0, 0, 0, 0.2);
  }

  100% {
    outline-offset: 7px;
    outline-width: 2px;
    outline-color: rgb(0, 0, 0, 0);
  }
}

.day-of-week {
  border-radius: 20%;
  outline-width: 2px;
  outline-style: solid;

  animation-name: current-day-ani;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
}

@keyframes input-cycle-ani {
  0% {
    padding: 8px;
  }

  20% {
    padding: 20px;
  }

  40% {
    padding: 6px;
  }

  60% {
    padding: 10px;
  }

  80% {
    padding: 7px;
  }

  100% {
    padding: 6.4px;
  }
}

.input-cycle-ani {
  animation-name: input-cycle-ani;
  animation-duration: 0.8s;
  outline-width: 0px;
}

@keyframes select-day-ani-left {
  0% {
    padding-left: 8px;
  }

  20% {
    padding-left: 15px;
  }

  50% {
    padding-left: 4px;
  }

  100% {
    padding-left: 8px;
  }
}

@keyframes select-day-ani-right {
  0% {
    padding-right: 8px;
  }

  20% {
    padding-right: 15px;
  }

  50% {
    padding-right: 4px;
  }


  100% {
    padding-right: 8px;
  }
}

.animation-select-right {
  animation-name: select-day-ani-right;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
}

.animation-select-left {
  animation-name: select-day-ani-left;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
}
</style>
