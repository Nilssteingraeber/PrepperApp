<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, reactive, ref, watch } from 'vue'
import store from '@/store'
import type { Cycle } from '@/code/cycle/Cycle'
import ShoppingListEntry from './ShoppingListEntry.vue'
import { OhVueIcon } from 'oh-vue-icons'
import ShoppingListRecipeEntry from './ShoppingListRecipeEntry.vue'

const url = 'http://localhost:5173/api'
const array: string[] = []

const preData = Array.from({ length: 20 }, () => null)
const data = reactive({ list: preData as any[], timeframe: { start: new Date(), end: new Date() } })

const isEmpty = ref(true)
const showIsEmpty = ref(false)

const timestamp = computed(() => {
    return new Date().getTime
})





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

const saveAllEntries = () => {
    const allPromises = allSingleEntrieItems.list.map(async entryObject => {

        const result = fetch(`${url}/entries`, {
            method: "PUT",
            body: JSON.stringify({ entry: entryObject.entry }),
            headers: { 'Content-Type': 'application/json' }
        })
        return result
    })
    return Promise.all(allPromises)
}

const selectAll = async () => {
    allSingleEntrieItems.list.forEach(entryObject => {
        entryObject.entry.status = entryObject.entry.status.map((status) => {
            return status === "1" ? "0" : "1"
        })
    })
    await saveAllEntries()
    getAllEntries()
}

const crossSelected = async () => {
    allSingleEntrieItems.list.forEach(entryObject => {
        entryObject.entry.status = entryObject.entry.status.map(status => {
            if (status === "0") return "0"
            if (status === "1") return "2"
            return status
        })
    })
    await saveAllEntries()
    getAllEntries()
}

watch(() => store.state.shoppingListActionsPressed, () => {
    if (store.state.shoppingListActionsPressed === -1) return

    if (store.state.shoppingListActionsPressed === 1) selectAll()
    if (store.state.shoppingListActionsPressed === 2) crossSelected()
    if (store.state.shoppingListActionsPressed === 3) deleteAllCrossed()

    store.commit("setShoppingListClicked", -1)
})



const deleteAllCrossed = async () => {

    const idsToDelete = allSingleEntrieItems.list
        .filter((entryObject, index) => { return entryObject.entry.status[index] === "1" })
        .map(entryObject => entryObject.entry._id)
        
    await fetch(`${url}/entries`, {
        method: "DELETE",
        body: JSON.stringify({ ids: idsToDelete }),
        headers: { 'Content-Type': 'application/json' }
    })

    getAllEntries()
}

const updateStatus = (entryId: string, index: number) => {

}

const getAllEntries = () => {

    const allSingleEntries: any[] = []
    const allRecipeEntries: any[] = []
    const allSingleEntriesPromises: Promise<any>[] = []
    const allRecipeEntriesPromises: Promise<any>[] = []


    fetch(`${url}/entries`, {
        headers: {
            startDate: String(data.timeframe.start.getTime()),
            endDate: String(data.timeframe.end.getTime())
        }
    }).then(result => {
        result.json().then(json => {
            json.forEach(day => {
                day.forEach(entry => {
                    if (entry.dataSupplier.recipeId) {
                        allRecipeEntries.push({ entry, entry_id: entry._id })
                    } else {
                        allSingleEntries.push(entry)
                    }
                })
            })
        }).then(() => {
            allSingleEntries.forEach((entry, index) => {
                entry.itemIds.forEach(item => {
                    allSingleEntriesPromises.push(
                        fetch(`${url}/items`, { headers: { itemId: item } }).then(async result => {
                            const json = await result.json()
                            return ({ item: json, index, entry })
                        })
                    )
                })
            })

            allRecipeEntries.forEach(entryObject => {
                entryObject.entry.itemIds.forEach(item => {
                    allRecipeEntriesPromises.push(
                        fetch(`${url}/items`, { headers: { itemId: item } }).then(result => {
                            return result.json().then(json => ({ item: json, owner: entryObject.entry_id }))
                        })
                    )
                })
            })
        }).then(() => {
            let isEmptyNow = false

            Promise.all(allSingleEntriesPromises).then(value => {
                allSingleEntrieItems.list = value
                if (value.length > 0) isEmptyNow = true
            }).then(() => {
                Promise.all(allRecipeEntriesPromises).then(value => {
                    const groups = groupByOwner(value)
                    groups.forEach(group => {
                        allRecipeEntries.forEach(recipe => {
                            if (group.owner === recipe.entry_id) {
                                group.recipe_id = recipe.entry.dataSupplier.recipeId
                            }
                        })
                    })
                    allRecipeEntrieItems.list = groups
                    if (groups.length > 0) isEmptyNow = false
                })
            }).then(() => {
                isEmpty.value = false
                isEmpty.value = isEmptyNow
            })
        })
    })
}

const groupByOwner = (entries: any[]) => {
    const groupedEntries = entries.reduce((acc, { item, owner }) => {
        if (!acc[owner]) {
            acc[owner] = []
        }
        acc[owner].push(item)
        return acc
    }, {})

    return Object.keys(groupedEntries).map(owner => ({
        owner,
        items: groupedEntries[owner]
    }))
}

watch(() => [data.timeframe, store.state.cycleObject], getAllEntries)

onBeforeUnmount(saveAllEntries)





const reactiveData = reactive({entries: [], states: []})





</script>

<template>
    <div class="shopping-list">
        <div class="row">
            <div class="col">
                <div class="list-name">
                    <div class="row">
                        <div class="col-12" @click="saveAllEntries">
                            WeeklyList
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12" v-if="calcIsEmpty" v-for="(entryObject, index) in allSingleEntrieItems.list"
                :key="entryObject.item._id + entryObject.entry._id + entryObject.entry.status[index]">
                <div class="row justify-content-start align-items-center">
                    <ShoppingListEntry :entryItem="entryObject"></ShoppingListEntry>
                </div>
            </div>
            <div class="col-12" v-if="calcIsEmpty" v-for="(item, index) in allRecipeEntrieItems.list"
                :key="item.item._id + '_' + item.entry.status[index]">
                <div class="row justify-content-start align-items-center">
                    <ShoppingListRecipeEntry :item="item"></ShoppingListRecipeEntry>
                </div>
            </div>
            <div class="col-12 text-center p-5" v-if="!calcIsEmpty">
                Oh, your List is empty! Try adding some recipes or items!
            </div>
            <div class="col-12 text-center" v-if="!calcIsEmpty">
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
</style>
