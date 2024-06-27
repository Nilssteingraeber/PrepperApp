<script setup lang="ts">
import { reactive } from 'vue'

import store from '@/store'

const itemEntry = { name: "Holland Käse", qnt: 2, qntname: "Pieces" }

</script>

<template>
    <div class="col-3">
        <div class="checkbox">
            <input type="checkbox" style="width: 100%; min-height: 25px;">
        </div>
    </div>
    <div class="col-3">
        <div class="itemname">{{ itemEntry.name }}</div>
    </div>
    <div class="col-1"> {{ itemEntry.qnt }}</div>
    <div class="col-3"> {{ itemEntry.qntname }}</div>
</template>

<style>
.itemname {
    font-size: larger;
}

.checkbox {
    
}

.entry-input {
    outline: solid;
    margin: 50%;
}

#entry-container {
    outline: solid;
}
</style>