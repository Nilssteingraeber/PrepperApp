<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons'
import { Item } from '@/code/item/Item'
import SearchItemPopin from './SearchItemPopin.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const url = 'http://localhost:5173/api'

const example_text = ref('')

const showSearchPopins = ref(false)
const showAddRecipe = ref(false)

const randomText = () => {
    const result = fetch(url + '/items/random').then((result) => {
        result.json().then((json) => {
            example_text.value = "Looking for '" + json[0].product_name.substring(0, 30) + "' ?"
        })
    })
}

const inputText = ref('')

const showRandomText = () => {
    randomText()
}

const showSearchText = () => {
    store.commit('setSearchbarFocused', true)
    example_text.value = 'What are you looking for?'
}

watch(inputText, (newValue, oldValue) => {

    if(newValue.length > 0 && route.path !== '/products') {
        showSearchPopins.value = true
    } else {
        showSearchPopins.value = false
    }

    if (newValue.length < 3) {
        currentSearchOutput.data = {}
        return
    }

    getSearchResults(newValue)
})


const currentSearchOutput = reactive({data: {}})

const getSearchResults = (text: string) => {
    const result = fetch(url + '/items/search', { headers: { searchText: text, amount: '16' } }).then(
        (result) => {
            result.json().then((json) => {

                if((json as []).length <= 0) {
                    store.commit('setLastSearch', JSON.stringify([]))
                    currentSearchOutput.data = {}
                    return []
                }

                currentSearchOutput.data = json.slice(0, 3)
                store.commit('setLastSearch', JSON.stringify(json))
                return json
            })
        }
    )
}

const onBlur = () => {
    store.commit('setSearchbarFocused', false)
    showRandomText()
}

const isClickThrough = ref(false)

watch(
    () => store.state.searchbarFocused,
    () => {
        if (store.state.searchbarFocused) {
            isClickThrough.value = false
        } else {
            setTimeout(() => {
                isClickThrough.value = true
            }, 200)
        }

        showSearchPopins.value = route.path !== '/products'
        showAddRecipe.value = route.path !== '/recipecreator'
    }
)

const makeSearchbarClickableBeneath = computed(() => {
    return isClickThrough.value ? 'no-pointers' : ''
})


const inputSearchTextRef = ref<HTMLInputElement>(null)


watch(() => store.state.doFocusSearchbar, (newValue, oldValue) => {
    if(newValue == oldValue || newValue == false) {
        return;
    }

    focusSearchbar()

})
const focusSearchbar = () => {
    nextTick(() => {  // Ensure the DOM is updated before focusing
        if (inputSearchTextRef.value) {
            inputSearchTextRef.value.focus()
        }
    })
}


showRandomText()
</script>

<template>
    <div class="row">
        <div class="col-10">
            <input v-model="inputText" ref="inputSearchTextRef" @blur="onBlur" @focus="showSearchText" class="form-control m-2" type="search"
                :placeholder="example_text" aria-label="Search" autocomplete="off" autocorrect="off"
                autocapitalize="off" spellcheck="false" />
        </div>
        <div class="col-2">
            <button @click="focusSearchbar" class="btn btn-outline-secondary m-2" type="button">
                <OhVueIcon name="io-search-sharp"></OhVueIcon>
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="ms-3" v-if="showSearchPopins">
                <div class="float-search-results" :class="makeSearchbarClickableBeneath">
                    <div class="row mb-1" v-for="(searchItem, i) in currentSearchOutput.data">
                        <SearchItemPopin :showAddBtn="showAddRecipe" :searchIndex="i" :searchedItem="searchItem"></SearchItemPopin>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.no-pointers {
    pointer-events: none;
}

.float-search-results {
    position: absolute;
    height: 100%;
    width: 100%;
}

.tile-card {
    z-index: 100;
    background-color: white;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}
</style>
