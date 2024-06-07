<script setup lang="ts">
import { Cycle } from '@/code/cycle/Cycle'
import { computed, reactive, ref, watch } from 'vue';

const props = defineProps({ cycle: { type: Cycle, required: true } })

const cycle = reactive(props.cycle)

watch(() => props.cycle, (newVal, oldVal) => {
    console.log("Hi")
}, {immediate: true, deep: true})
</script>
<template>
  <div id="currentCycleSelection">

        <div class="col-12 shadow p-3 m-3 bg-white rounded" style="text-align: center" id="calender-calories">
          <div class="d-flex flex-row">
            <div class="col-1">
                <button @click="cycle?.goPreviousCycle();" class="btn btn-outline-secondary" type="button">Previous Cycle</button>
            </div>
            <div class="h3 col">
              <input type="text" id="date-area" value="" disabled style="border: 0;">
            </div>
            <div class="col-1">
              <button @click="cycle?.goNextCycle();" class="btn btn-outline-secondary" type="button">Next Cycle</button>
            </div>
          </div>
        </div>
      </div>

</template>