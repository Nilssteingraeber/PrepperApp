<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';


const props = defineProps(["type"])

const buttonIcon = computed(() => {

    if (props.type == "full-week") {
        return "src/assets/CycleWeek.svg"
    }

    if (props.type == "today") {
        return "src/assets/CycleToday.svg"
    }

    if (props.type == "tomorrow") {
        return "src/assets/CycleTomorrow.svg"
    }

    if (props.type == "today-week") {
        return "src/assets/CycleUntilEnd.svg"
    }
    
})

const iconText = computed(() => {

if (props.type == "full-week") {
    return "Whole Cycle"
}

if (props.type == "today") {
    return "Only today"
}

if (props.type == "tomorrow") {
    return "Until end of Cycle excluding today"
}

if (props.type == "today-week") {
    return "Until end of Cycle"
}

})

const isSelected = computed(() => {
    return store.state.selectedShoppingList == props.type ? "is-toggled" : ""
})

const isSelectedIcon = computed(() => {
    return store.state.selectedShoppingList == props.type ? "icon-toggled" : "icon"
})

const turnOn = () => {
    store.commit("setSelectedShoppingList", props.type)
    
}



</script>

<template>
    <div class="col-12">
        <button @click="turnOn" tooltip.hover :title="iconText" class="shopping-list-button box-shadow text-center" :class="isSelected" type="button">
            <img  alt="" class="shopping-list-button" :class="isSelectedIcon" :src="buttonIcon">
        </button>
    </div>
</template>

<style>

.icon {
    width: 100%;
    margin: 0px;
}


@keyframes toggle-ani {
    0% {
    transform: scale(1.0);
  }

  30% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1.0);
  }
}

@keyframes toggle-off-ani {
    0% {
    transform: scale(1.0);
  }

  30% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1.0);
  }
}

.is-toggled {
    color: white;
    animation-name: toggle-ani;
    animation-duration: 0.3s;
    outline: solid rgb(52, 175, 154) 3px !important;
    border-radius: 5px;
}

.is-toggled-off {
    animation-name: toggle-off-ani;
    animation-duration: 0.1s;
}

.shopping-list-button {
    transition: 0.1s;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: white
}
</style>