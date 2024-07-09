<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, reactive, ref, watch } from 'vue'
import store from '@/store'
import type { Cycle } from '@/code/cycle/Cycle'
import ShoppingListEntry from './ShoppingListEntry.vue'
import { OhVueIcon } from 'oh-vue-icons'
import ShoppingListRecipeEntry from './ShoppingListRecipeEntry.vue'
import { DataEntry } from '@/code/item/DataEntry'
import EntryItem from '@/code/item/EntryItem'

const url = 'http://localhost:5173/api'
const array: string[] = []

const preData = Array.from({ length: 20 }, () => null)
const data = reactive({ list: preData as any[], timeframe: { start: new Date(), end: new Date() } })

const isEmpty = ref(true)
const showIsEmpty = ref(false)

const timestamp = computed(() => {
    return new Date().getTime
})

const reactiveData = reactive({ entries: [] })




watch(isEmpty, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            if (isEmpty.value) showIsEmpty.value = true
        })
    } else {
        showIsEmpty.value = false
    }
})

onBeforeMount(() => {
    updateDataTimeframe()
})

const updateDataTimeframe = () => {
    const cycleObject = store.state.cycleObject as Cycle
    switch (store.state.selectedShoppingList) {
        case "tomorrow":
            data.timeframe = cycleObject.getDaterangeTomorrowEnd()
            break
        case "today":
            data.timeframe = cycleObject.getDaterangeToday()
            break
        case "full-week":
            data.timeframe = cycleObject.getDaterangeFullCycle()
            break
        case "today-week":
            data.timeframe = cycleObject.getDaterangeTodayEnd()
            break
        default:
            data.timeframe = cycleObject.getDaterangeTomorrowEnd()
            break
    }
}

const correctTimeframe = watch(() => [store.state.selectedShoppingList, store.state.cycleObjectRefresh], updateDataTimeframe)

const calcIsEmpty = computed(() => isEmpty.value)

const allSingleEntrieItems = reactive({ list: [] })
const allRecipeEntrieItems = reactive({ list: [] })


const tickAll = async () => {

    const allIds: any[] = []
    reactiveData.entries.forEach((a) => {
        allIds.push(a.entry._id)
    })

    fetch(url + '/entries/actions', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "tickAll", ids: allIds })
    }).then(() => {
        getAllEntries()
    })
}

const crossSelected = async () => {
    const allIds: any[] = []
    reactiveData.entries.forEach((a) => {
        allIds.push(a.entry._id)
    })

    fetch(url + '/entries/actions', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "crossSelected", ids: allIds })
    }).then(() => {
        getAllEntries()
    })
}

const deleteAllCrossed = async () => {

    const allIds: any[] = []
    reactiveData.entries.forEach((a) => {
        allIds.push(a.entry._id)
    })

    fetch(url + '/entries/actions', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "deleteCrossed", ids: allIds })
    }).then(() => {
        getAllEntries()
    })
}

watch(() => store.state.shoppingListActionsPressed, () => {
    if (store.state.shoppingListActionsPressed === -1) return

    if (store.state.shoppingListActionsPressed === 1) tickAll()
    if (store.state.shoppingListActionsPressed === 2) crossSelected()
    if (store.state.shoppingListActionsPressed === 3) deleteAllCrossed()

    store.commit("setShoppingListClicked", -1)
})

// START

const getAllEntries = () => {

    reactiveData.entries.length = 0

    const allEntries: any[] = []

    fetch(`${url}/entries`, {
        headers: {
            startDate: String(data.timeframe.start.getTime()),
            endDate: String(data.timeframe.end.getTime())
        }
    }).then(result => {
        result.json().then(json => {
            json.forEach((day: any[]) => {
                day.forEach((entry, index) => {
                    allEntries.push({ "entry": (entry as DataEntry), indexLoaded: index })
                })
            })
        }).then(() => {

            let sortedEntries = allEntries.sort((a, b) => {
                // Check if `recipeId` is present in `dataSupplier`
                let hasRecipeIdA = !!a.entry.dataSupplier.recipeId;
                let hasRecipeIdB = !!b.entry.dataSupplier.recipeId;

                // Compare based on presence of `recipeId`
                if (hasRecipeIdA && !hasRecipeIdB) {
                    return 1; // `a` should come after `b`
                } else if (!hasRecipeIdA && hasRecipeIdB) {
                    return -1; // `a` should come before `b`
                } else {
                    return 0; // Maintain order
                }
            });

            reactiveData.entries = sortedEntries

            if(sortedEntries.length == 0) {
                isEmpty.value = true
            } else {
                isEmpty.value = false
            }
        })
    })
}

watch(() => [data.timeframe, store.state.cycleObject], getAllEntries)

</script>

<template>
    <div class="shopping-list">
        <div class="row">
            <div class="col">
                <div class="list-name">
                    <div class="row">
                        <div class="col-12">
                            WeeklyList
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12" v-if="!isEmpty" v-for="(entryObject, index) in reactiveData.entries"
                :key="entryObject.entry">
                <div class="row justify-content-start align-items-center">
                    <ShoppingListEntry :entryObject="entryObject"></ShoppingListEntry>
                </div>
            </div>
            <div class="col-12 text-center p-5" v-if="isEmpty">
                Oh, your List is empty! Try adding some recipes or items!
            </div>
            <div class="col-12 text-center" v-if="isEmpty">
                <OhVueIcon name="bi-patch-question-fill" animation="float" scale="3" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.divider {
    background-color: rgba(52, 175, 154, 0.2);
    height: 4px;
}

.list-name {
    padding: 1%;
    font-size: large;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(52, 175, 154);
    border-radius: 5px;
}

.shopping-list {
    z-index: 100;
    background-color: white;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    margin-bottom: 15%;
    transition: 1s;
}
</style>: string(: string)(: any[])(: { _id: any }): { itemIds: any[] }: any(: any)(: any)
