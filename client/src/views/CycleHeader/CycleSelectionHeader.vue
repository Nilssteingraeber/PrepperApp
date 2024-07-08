<script setup lang="ts">
import { Cycle } from '@/code/cycle/Cycle'
import { computed, reactive, ref, watch } from 'vue'
import CycleDaySelectionBar from './CycleDaySelectionBar.vue'
import VueFeather from 'vue-feather'
import store from '@/store';
import { OhVueIcon } from 'oh-vue-icons';

const doInputAnimation = ref(false)
const doSelectDayAnimation = ref(false)
const disableAnimation = false


watch(() => (store.state.cycleInputAni), () => {
  showInputAnimation()
})

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
  }, 300)
}

defineExpose({
  nextCycle,
  previousCycle,
  showInputAnimation
})

function nextCycle() {
  store.commit("refreshCycleObject")
  store.commit("nextCycle")
}

function previousCycle() {
  store.commit("refreshCycleObject")
  store.commit("previousCycle")
}

const glowClass = ref("")

watch(() => store.state.cycleInputAni, () => {
  glowClass.value = "show-glow-ani"

  setTimeout(() => {
    glowClass.value = ""
  }, 850)
})

const isSelectionModeActive = computed(() => {
    return store.state.isRecipeItemSelectModeActive ? true : false
})

</script>
<template>
  <div>
    <div class="d-flex flex-row justify-content-center">
      <div class="col-auto align-self-center">
        <button @click="previousCycle" class="btn" type="button">
          <OhVueIcon name="md-navigatenext-round" flip="horizontal" class="cycle-bar-floating-box shadow-box rounded" :class="glowClass" scale="2"/>
        </button>
      </div>
      <div class="col-auto shadow-box cycle-bar-floating-box bg-white middle-btn px-4 py-2" :class="glowClass" style="text-align: center">
        <div class="d-flex flex-row align-items-center">
          <div class="col-auto d-none d-md-block">
            <div class="day-box">
              <label class="text-responsive day-text" v-text="store.state.cycleObject.getCyclePretty(true)"></label>
            </div>
          </div>
          <div class="col-auto">
            <CycleDaySelectionBar :amount-days="store.state.cycleObject.amountDays" :selected="0"
              :show-input-animation="doInputAnimation" :reff="showDaySelectAnimation"
              :do-select-day-animation="doSelectDayAnimation"></CycleDaySelectionBar>
          </div>
          <div class="col-auto d-none d-md-block">
            <label class="day-box text-responsive" v-text="store.state.cycleObject.getCyclePretty(false)"></label>
          </div>
        </div>
        <div class="d-flex flex-row align-items-center">
          <div class="col-12 d-block d-md-none">
            <div class="row align-items-between">
              <div class="col-5">
                <label class="day-box" v-text="store.state.cycleObject.getCyclePretty(true)"></label>
              </div>
              <div class="col-2"></div>
              <div class="col-5">
                <label class="day-box" v-text="store.state.cycleObject.getCyclePretty(false)"></label>
              </div>
            </div>
          </div>
        </div>
        <!-- <a v-if="isSelectionModeActive" class="notification-bar" style="font-style: italic;"> Recipe Item Selection active! </a> -->
      </div>
      <div class="col-auto align-self-center">
        <button @click="nextCycle" class="btn" type="button">
          <OhVueIcon name="md-navigatenext-round" class="cycle-bar-floating-box shadow-box rounded" :class="glowClass" scale="2"/>
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


@keyframes show-glow-ani {
  0% {
    box-shadow: 0px 0px 0px 2px rgb(57, 180, 159, 0.0) , 0px 0px 2px rgba(0, 0, 0, 0.25);
  }

  20% {
    box-shadow: 0px 0px 0px 5px rgb(57, 180, 159, 0.6) , 0px 0px 2px rgba(0, 0, 0, 0.25);
    margin: 6px;
  }

  40% {
    margin: -3px;
  }

  70% {
    margin: 2px;
  }

  100% {
    box-shadow: 0px 0px 0px 5px rgb(57, 180, 159, 0.0), 0px 0px 2px rgba(0, 0, 0, 0.25);
    margin: 0px;
  }
}

.show-glow-ani {
  animation: show-glow-ani 0.6s;
  animation-iteration-count: 1;
}

.shadow-box {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.cycle-bar-floating-box {
  padding-top: 0.5%;
  padding-right: 1.5%;
  padding-left: 1.5%;
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
