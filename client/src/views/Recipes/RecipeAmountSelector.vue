<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons'
import { computed, ref } from 'vue'
import VueNumberInput from '@chenfengyuan/vue-number-input'

const amount = ref(1)
</script>

<template>
    <div class="container-fluid">
        <div class="d-flex flex-row">
            <div class="col-2">
                <label class="priceEuro">15</label>
                <label class="priceCent">30</label>
                <label class="priceEuro">€</label>
            </div>
            <div class="col-4">
                <div class="row">
                    <label class="priceEuro">4</label>
                    <label class="priceCent">22</label>
                    <label class="priceEuro">€</label>
                    <label class="priceCent">p.P.</label>
                </div>
            </div>
            <div class="col-4">
                <VueNumberInput controls class="num-input"></VueNumberInput>
            </div>
            <div class="col-2">
                <OhVueIcon class="icon" name="bi-people-fill" scale="2" />
            </div>
        </div>
    </div>
</template>

<style>
.num-input {
    min-width: 150px;
}

.fill {
    width: 100%;
    height: 100%;
    margin: 2%
}

.icon {
    margin: 4%;
    margin-left: 20%;
}

.priceCent {
    transform: translate(-5px);
    margin-right: -5px;
}

.priceEuro {
    margin-left: 4%;
    margin-right: 4%;
    font-size: x-large;
}
</style>
