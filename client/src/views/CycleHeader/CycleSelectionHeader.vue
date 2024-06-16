<script setup lang="ts">
import { Cycle } from '@/code/cycle/Cycle'
import { reactive, ref } from 'vue'
import CycleDaySelectionBar from './CycleDaySelectionBar.vue'
import VueFeather from 'vue-feather'

const currentCycle = new Cycle()

const props = defineProps(["cycle"])

const reactiveData = reactive({ obj: new Cycle(), amountDays: 0, selectedDay: props.cycle.selectedIndex })

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
  <div>
    <div class="d-flex flex-row justify-content-center">
      <div class="col-auto shadow-box cycle-bar-floating-box bg-white left-btn" style="text-align: center">
        <button @click="previousCycle" class="btn cycle-btn cycle-icon-l" type="button">
          <vue-feather type="arrow-left" size="24" class="icon" />
        </button>
      </div>
      <div class="col-auto shadow-box cycle-bar-floating-box bg-white middle-btn" style="text-align: center">
        <div class="d-flex flex-row align-items-center">
          <div class="col-auto d-none d-md-block">
            <div class="day-box">
              <label class="text-responsive day-text" v-text="reactiveData.obj.getCyclePretty(true)"></label>
            </div>
          </div>
          <div class="col-auto">
            <CycleDaySelectionBar :amount-days="reactiveData.amountDays" :selected="0" :cycle-object="currentCycle"
              :show-input-animation="doInputAnimation" :reff="showDaySelectAnimation"
              :do-select-day-animation="doSelectDayAnimation"></CycleDaySelectionBar>
          </div>
          <div class="col-auto d-none d-md-block">
            <label class="day-box text-responsive" v-text="reactiveData.obj.getCyclePretty(false)"></label>
          </div>
        </div>
        <div class="d-flex flex-row align-items-center">
          <div class="col-12 d-block d-md-none">
            <div class="row align-items-between">
              <div class="col-5">
                <label class="day-box" v-text="reactiveData.obj.getCyclePretty(true)"></label>
              </div>
              <div class="col-2"></div>
              <div class="col-5">
                <label class="day-box" v-text="reactiveData.obj.getCyclePretty(false)"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-auto shadow-box cycle-bar-floating-box bg-white right-btn" style="text-align: center">
        <button @click="nextCycle" class="btn cycle-btn cycle-icon-r" type="button">
          <vue-feather type="arrow-right" size="24" class="icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.middle-btn {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.left-btn {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-right: 1.5%;
}

.right-btn {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-left: 1.5%;
}

.cycle-btn {
  width: 100%;
  height: 100%;
}

.icon {
  width: 100%;
  height: 100%;
}

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
  margin-right: 10px;
}

.cycle-icon-r:hover {
  margin-right: 10px;
}

.cycle-icon-l {
  transition: all 0.2s;
}

.cycle-icon-r {
  transition: all 0.2s;
  z-index: 1100;
}

.day-box {
  margin: 2%;
  transition: 1s;
  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 1) inset;
  z-index: 10;
  overflow: hidden;
}

.day-text {
  transition: 0.3s;
  transform: translate(0%, 0px);
  z-index: 9;
}



.text-responsive {
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 992px) {
    font-size: 18px;
  }

  @media (min-width: 1200px) {
    font-size: 20px;
  }
}
</style>
