<script setup lang="ts">
import { Cycle } from '@/code/cycle/Cycle'
import { computed, reactive, ref, watch } from 'vue';

const props = defineProps({ cycle: { type: Cycle, required: true } })

const cycle = reactive(props.cycle)

watch(() => props.cycle, (newVal, oldVal) => {
    console.log("Hi")
}, {immediate: true, deep: true})

const goNext = () => {
    cycle.goNextCycle()
   
}
</script>
<template>
  <div id="currentCycleSelection">
    <div class="d-flex flex-row">
      <div class="col-1"></div>
      <div class="col-10">
        <div
          class="col-12 shadow p-3 m-3 bg-white rounded"
          style="text-align: center"
          id="calender-calories"
        >
          <div class="d-flex flex-row">
            <div class="col-2">
                <button @click="goNext()" class="btn btn-outline-secondary" type="submit">Previous Cycle</button>
            </div>
            <div class="col-8" style="font-size: x-large;">
              {{ cycle?.getCyclePretty() ?? 'Loading..' }}
            </div>
            <button @click="cycle?.goNextCycle(); " class="btn btn-outline-secondary" type="submit">Next Cycle</button>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<style>
#calender-page {
  background-color: #36a5913b;
  width: 100vw;
  height: 100vh;
}

#calender-bot {
  height: calc(100vh - 300px);
}

/*_______Progressbar______*/
.progress {
  width: 100px;
  height: 100px;
  background: none;
  position: relative;
}

.progress::after {
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 6px solid #eee;
  position: absolute;
  top: 0;
  left: 0;
}

.progress > span {
  width: 50%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 1;
}

.progress .progress-left {
  left: 0;
}

.progress .progress-bar {
  width: 100%;
  height: 100%;
  background: none;
  border-width: 6px;
  border-style: solid;
  position: absolute;
  top: 0;
}

.progress .progress-left .progress-bar {
  left: 100%;
  border-top-right-radius: 80px;
  border-bottom-right-radius: 80px;
  border-left: 0;
  -webkit-transform-origin: center left;
  transform-origin: center left;
}

.progress .progress-right {
  right: 0;
}

.progress .progress-right .progress-bar {
  left: -100%;
  border-top-left-radius: 80px;
  border-bottom-left-radius: 80px;
  border-right: 0;
  -webkit-transform-origin: center right;
  transform-origin: center right;
}

.progress .progress-value {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
