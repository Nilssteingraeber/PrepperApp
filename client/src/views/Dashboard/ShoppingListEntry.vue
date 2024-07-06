<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import store from '@/store'

const props = defineProps(['entryItem'])

let itemEntry = { name: "Item", qnt: 0, qntname: "Kilo" }
let className = "loading"

const data = computed(() => {
    if (props.entryItem.item) {
        className = "false"
        itemEntry = { name: (props.entryItem.item.product_name as string)?.substring(0, 100) ?? "Hi", qnt: 1, qntname: "" }
    } else {
        className = "loading"
    }
    return { className, itemEntry }
})

const checkboxStatus = ref(props.entryItem.entry.status[props.entryItem.index] == "1" || props.entryItem.entry.status[props.entryItem.index] == "2" ? true : false) 
const isCrossed = ref(props.entryItem.entry.status[props.entryItem.index] == "2" ? true : false)

const crossedClassText = computed(() => {
    return isCrossed.value ? "crossed" : ""
})


computed(() => {
    checkboxStatus.value = props.entryItem.entry.status[props.entryItem.index];
})

watch(() => props.entryItem.entry.status[props.entryItem.index], () => {
    
})

watch(() => checkboxStatus.value, () => {
    props.entryItem.entry.status[props.entryItem.index] = checkboxStatus.value ? "1" : "0"
})

</script>

<template>
    <div class="col-12" :class="crossedClassText">
        <div class="row justify-content-start align-items-center entry" :class="data.className">
            <div class="col-3">
                <div class="row text-center">
                    <div class="col-12">
                        <div class="checkbox">
                            <input :disabled="isCrossed" v-model="checkboxStatus" type="checkbox">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="itemname">{{ data.itemEntry.name }}</div>
            </div>
            <div class="col-1"> {{ itemEntry.qnt }}</div>
        </div>
    </div>
</template>

<style>
@keyframes loading-ani {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 0.1;
    }

    100% {
        opacity: 0.5;
    }
}

.entry {
    margin-top: 20px;
    margin-bottom: 20px;
}

.crossed {
    color: rgb(0, 0, 0, 0.6);
}

.loading {
    background-color: rgb(100, 100, 150);
    animation: loading-ani;
    animation-iteration-count: infinite;
    animation-duration: 0.66s;
}

.itemname {
    font-size: larger;
}

.checkbox {
    transform: scale(2);
}

.entry-input {
    outline: solid;
    margin: 50%;
}

#entry-container {
    outline: solid;
}
</style>