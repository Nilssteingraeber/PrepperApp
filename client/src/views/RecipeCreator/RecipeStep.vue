<script setup lang="ts">
import { computed, reactive, ref, watch, defineEmits  } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';
import { Item } from '@/code/item/Item';


const props = defineProps(["stepObject"])

const emits = defineEmits(['delete-step', "step-up", "step-down"]);


const handleDelete = () => {
  emits('delete-step', props.stepObject.index);
};

const handleUp = () => {
  emits('step-up', props.stepObject.index);
};

const handleDown = () => {
    emits('step-down', props.stepObject.index);
};


</script>

<template>
    <div class="pt-2">
        <div class="col-12">
            <div class="row tile-card-animatable m-2">
                <div class="col-2">
                    <div class="row align-items-center text-center h-100">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-12">
                                    <button @click="handleUp" class="btn" type="button">
                                        <OhVueIcon name="fa-angle-up" scale="1"></OhVueIcon>
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <a class="step-index-text">{{ props.stepObject.index + 1 }}</a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <button @click="handleDown" class="btn" type="button">
                                        <OhVueIcon name="fa-angle-down" scale="1"></OhVueIcon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    {{ props.stepObject.text }}
                </div>
                <div class="col-2">
                    <div class="row justify-content-center align-items-top">
                        <div class="col-12">
                            <button @click="handleDelete" class="btn btn-edge full-w" type="button">
                                <OhVueIcon name="bi-trash" scale="1.5"></OhVueIcon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

.btn-edge {
    border-radius: 5px;
    outline: solid rgb(0, 0, 0, 0.1) 1px;
}

.step-index-text {
    padding: 5%;
    border-radius: 5px;
    outline: solid rgb(0, 0, 0, 0.1) 1px;
}

.step-card {
    z-index: 100;
    background-color: white;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    transition: 1s;
}
</style>