<script setup lang="ts">
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import { computed, reactive, ref, watch } from 'vue'

import dash from '@/assets/dash.svg'

const props = defineProps(['amountDays', 'selected', 'cycleObject', 'showInputAnimation', "reff", 'doSelectDayAnimation'])
const emit = defineEmits(['update:selected'])

const currentState = reactive({ amount: 7, select: (props.cycleObject as Cycle).selectedIndex, showInputAnimation: props.showInputAnimation, aniDirection: 0 })

const currentData = computed(() => {

  const isWeekend = (index: number) => {
    return (props.cycleObject as Cycle).getDayAtIndex(index).getDay() === 6 || (props.cycleObject as Cycle).getDayAtIndex(i).getDay() === 0
  }

  const isSunday = (index: number) => {
    return (props.cycleObject as Cycle).getDayAtIndex(index).getDay() === 0
  }

  (props.cycleObject as Cycle).setIndex(currentState.select)


  const b = []

  for (var i = 0; i < currentState.amount; i++) {
    const weekend = isWeekend(i)
    const isSelectedDay = i === currentState.select
    const dayOfWeek = (props.cycleObject as Cycle).getCurrentDateInWeek()

    let classText = isSelectedDay ? 'day-item day-selected ' : 'day-item'
    let classTextNoti = isSelectedDay ? " day-notification-active" : " day-notification"

    classText += isSunday(i) ? ' sunday' : ''
    classText += weekend ? ' weekend' : ''
    classText += props.showInputAnimation && isSelectedDay ? ' input-cycle-ani ' : ''
    classText += props.doSelectDayAnimation && isSelectedDay ? props.cycleObject.animationDirection ? ' animation-select-right' : ' animation-select-left' : ''

    console.log(classText)

    if (dayOfWeek + 1 === i)
      classText += ' day-of-week'

    b.push({
      id: i,
      className: classText,
      dayName: (props.cycleObject as Cycle).getDateStringAtIndex(i),
      isSelected: isSelectedDay,
      classNameNoti: classTextNoti
    })
  }
  return b
})

const handleClick = (id: number) => {
  currentState.select = id
  props.reff()
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
  background-color: rgb(103, 177, 128, 0.66);
  color: rgb(103, 177, 128, 0);
  border-style: none;
  min-width: 15px;
  min-height: 15px;
  padding: 8px;
  margin: 5px;
  border-radius: 7px;
  opacity: 0.7;
  transition: 0.2s;
}

.day-selected {
  background-color: rgb(103, 177, 128) !important;
  min-height: 25px;
  border-color: rgb(103, 177, 128);
  color: rgb(0, 0, 0, 1) !important;
}

.day-item:hover {
  background-color: rgb(103, 177, 128) !important;
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
    padding: 8px;
  }
}

.input-cycle-ani {
  animation-name: input-cycle-ani;
  animation-duration: 0.8s;
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
