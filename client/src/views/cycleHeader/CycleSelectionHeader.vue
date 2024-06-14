<script setup lang="ts">
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import { computed, reactive, ref, watch, watchEffect } from 'vue'

import dash from '@/assets/dash.svg'
import CycleDaySelectionBar from './CycleDaySelectionBar.vue'
import VueFeather from 'vue-feather'
import { useTimer } from 'vue-timer-hook'

const currentCycle = new Cycle()
const reactiveData = reactive({ obj: new Cycle(), amountDays: 0, selectedDay: 0 })

const doInputAnimation = ref(false)
const doSelectDayAnimation = ref(false)
const disableAnimation = false

function showInputAnimation() {
  doInputAnimation.value = true
  setTimeout(() => {
    doInputAnimation.value = false
  }, 800)
}

function showDaySelectAnimation() {
  doSelectDayAnimation.value = true
  setTimeout(() => {
    doSelectDayAnimation.value = false
  }, 299)
}

reactiveData.amountDays = 7

defineExpose({
  nextCycle,
  previousCycle,
  showInputAnimation
})

function nextCycle() {
  reactiveData.obj = reactiveData.obj.nextCycle()
}

function previousCycle() {
  reactiveData.obj = reactiveData.obj.previousCycle()
}
</script>
<template>
  <div id="currentCycleSelection">
    <div class="d-flex flex-row justify-content-center">
      <div
        class="col-10 shadow-box cycle-bar-floating-box bg-white rounded"
        style="text-align: center"
        id="calender-calories"
      >
        <div class="d-flex flex-row">
          <div class="col-1">
            <button @click="previousCycle" class="btn cycle-btn" type="button">
              <vue-feather type="arrow-left" size="36" class="icon cycle-icon-l" />
            </button>
          </div>
          <div class="col-10">
            <div class="d-flex flex-row">
              <div class="col-4" style="font-size: x-large; text-align: end">
                <label class="day-box" v-text="reactiveData.obj.getCyclePretty(true)"></label>
              </div>
              <div class="col-4">
                <CycleDaySelectionBar
                  :amount-days="reactiveData.amountDays"
                  :selected="0"
                  :cycle-object="currentCycle"
                  :show-input-animation="doInputAnimation"
                  :reff="showDaySelectAnimation"
                  :do-select-day-animation="doSelectDayAnimation"
                ></CycleDaySelectionBar>
              </div>
              <div class="col-4" style="font-size: x-large; text-align: justify">
                <label class="day-box" v-text="reactiveData.obj.getCyclePretty(false)"></label>
              </div>
            </div>
          </div>
          <div class="col-1">
            <button @click="nextCycle" class="cycle-btn" type="button">
              <vue-feather type="arrow-right" size="36" class="icon cycle-icon-r" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.shadow-box {
  box-shadow: 1px 1px 15px rgb(0, 0, 0, 0.5);
  box-sizing: content-box;
}

.cycle-bar-floating-box {
  padding: 10px;
  margin-top: 1%;
  background: rgb(255, 255, 255);
}

.cycle-icon-l:hover {
  transition: 0.5 all;
  padding-right: 20px;
}

.cycle-icon-r:hover {
  transition: 0.5 all;
  padding-left: 20px;
}

.cycle-icon-l {
  transition: all 0.2s;
}

.cycle-icon-r {
  transition: all 0.2s;
}

.cycle-btn {
  background-color: rgb(0, 0, 0, 0);
  border-color: rgb(0, 0, 0, 0);
  max-height: 50px;
}

.day-box {
  padding-top: 5px;
  margin-left: 7%;
  margin-right: 7%;
}
</style>
