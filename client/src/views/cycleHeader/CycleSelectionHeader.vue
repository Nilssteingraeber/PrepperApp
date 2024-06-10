<script setup lang="ts">
import { Cycle, CycleType } from '@/code/cycle/Cycle'
import { computed, reactive, ref, watch } from 'vue'

import dash from '@/assets/dash.svg'
import CycleDaySelectionBar from './CycleDaySelectionBar.vue'

const currentCycle = new Cycle()
const reactiveData = reactive({ obj: new Cycle(), amountDays: 0, selectedDay: 0 })

reactiveData.amountDays = 7

function nextCycle() {
  reactiveData.obj = reactiveData.obj.nextCycle()
}

function previousCycle() {
  reactiveData.obj = reactiveData.obj.previousCycle()
}
</script>
<template>
  <div id="currentCycleSelection">
    <div class="col-12 shadow p-3 m-3 bg-white rounded" style="text-align: center" id="calender-calories">
      <div class="d-flex flex-row">
        <div class="col-1">
          <button @click="previousCycle" class="btn btn-outline-secondary" type="button">
            Previous Cycle
          </button>
        </div>
        <div class="col-10">
          <div class="d-flex flex-row">
            <div class="col-5" style="font-size: x-large; text-align: end">
              <label class="day-box" v-text="reactiveData.obj.getCyclePretty(true)"></label>
            </div>
            <div class="col-2" style="font-size: x-large; vertical-align: middle">
              <label style="font-size: xx-large">to</label>
            </div>
            <div class="col-5" style="font-size: x-large; text-align: justify">
              <label class="day-box" v-text="reactiveData.obj.getCyclePretty(false)"></label>
            </div>
          </div>
          <div class="d-flex flex-row">
            <div class="col-12">
              <CycleDaySelectionBar :amount-days="reactiveData.amountDays" :selected="0"></CycleDaySelectionBar>
            </div>
          </div>
        </div>
        <div class="col-1">
          <button @click="nextCycle" class="btn btn-outline-secondary" type="button">
            Next Cycle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.day-box {
  padding-top: 2%;
  padding-right: 2%;
  padding-left: 2%;
  padding-bottom: 1%;
}
</style>
