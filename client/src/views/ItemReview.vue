<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

import store from '@/store'
import { OhVueIcon } from 'oh-vue-icons';
import { Item } from '@/code/item/Item';
import { FcRefresh } from 'oh-vue-icons/icons';


const item = reactive({ currentItemData: {} })

const itemType = ["CHEESE", "BREAD", "BEVERAGE", "SWEETS", "FROZEN", "FRUIT", "VEGETABLE", "NOODLES", "HEALTH", "MILK", "MEAT", "ICECREAM",
    "SPREADS", "INSTANTFOOD", "VEGAN", "FISH", "ALCOHOL", "SAUCE", "NUTS", "BACKING"
].sort().map((str) => str.toLowerCase())
const currentIndex = ref(1)

const currentSearchItemCode = ref(store.state.currentlyViewingItemCode)
const currentItemNumber = ref(store.state.currentlyViewingItemCode)
const currentImageIndex = ref(0)
const currentItemName = ref("")
const currentItemProducer = ref("")
const currentItemGenericName = ref("")
const currentItemQuantType = ref("") // KG, L, P
const currentItemQuant = ref("")
const currentItemCategory = ref("") // CHEESE, BREAD, BEVERAGE, SWEETS, FROZEN, FRUIT, VEGETABLE
const currentItemKeywords = ref("")
const currentImagePath = ref("")
const currentItemNutrition = ref({})
const currentItemNutritionDataPer = ref("")

const url = 'http://localhost:5173/api'

// Animation
const showUploadAni = ref(false)
const uploadAnimationState = computed(() => {
    return showUploadAni.value ? "cloud-upload-animation" : ""
})

onMounted(() => {
    refresh()
})

const INDEX = 0;
const CODE = 1;
const IMAGE_INDEX = 2;
const IMAGE_CODE = 3;


watch(() => currentImageIndex.value, (newValue, oldValue) => {
    if (currentSearchItemCode.value != 0) {
        loadData(IMAGE_CODE);
    } else {
        loadData(IMAGE_INDEX)
    }
})

watch(() => currentIndex.value, (newValue, oldValue) => {
    if (newValue != oldValue) {
        store.commit("setCurrentlyViewingItemCode", 0)
        loadData(INDEX)
    }
})

watch(() => store.state.currentlyViewingItemCode, () => {
    currentSearchItemCode.value = store.state.currentlyViewingItemCode
    refresh()
})


const loadData = (method: number) => {

    if (method == IMAGE_INDEX) {
        fetch(url + '/items/review', { headers: { number: currentIndex.value?.toString() ?? "1" } }).then((result) => {
            result.json().then((json) => {

                // IMAGE
                let productImageUrlWeb = json.code
                let pPath = 'https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/'
                if (String(productImageUrlWeb).length <= 8) {
                    pPath += String(productImageUrlWeb) + "/"
                } else {
                    pPath += String(productImageUrlWeb).substring(0, 3) + '/'
                    pPath += String(productImageUrlWeb).substring(3, 6) + '/'
                    pPath += String(productImageUrlWeb).substring(6, 9) + '/'
                    pPath += String(productImageUrlWeb).substring(9) + '/'
                }

                if (currentImageIndex.value)
                    pPath += currentImageIndex.value.toString() + ".jpg"
                else {
                    pPath += "1" + ".jpg"
                }
                currentImagePath.value = pPath
            })
        })
    }

    if (method == IMAGE_CODE) {
        fetch(url + '/items/', { headers: { itemId: currentSearchItemCode.value?.toString() ?? "1" } }).then((result) => {
            result.json().then((json) => {

                // IMAGE
                let productImageUrlWeb = json.code
                let pPath = 'https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/'
                if (String(productImageUrlWeb).length <= 8) {
                    pPath += String(productImageUrlWeb) + "/"
                } else {
                    pPath += String(productImageUrlWeb).substring(0, 3) + '/'
                    pPath += String(productImageUrlWeb).substring(3, 6) + '/'
                    pPath += String(productImageUrlWeb).substring(6, 9) + '/'
                    pPath += String(productImageUrlWeb).substring(9) + '/'
                }

                if (currentImageIndex.value)
                    pPath += currentImageIndex.value.toString() + ".jpg"
                else {
                    pPath += "1" + ".jpg"
                }
                currentImagePath.value = pPath
            })
        })
    }

    if (method == INDEX) {

        setEverythingToNull()

        fetch(url + '/items/review', { headers: { number: currentIndex.value?.toString() ?? "1" } }).then((result) => {
            result.json().then((json) => {

                item.currentItemData = json

                currentItemName.value = currentItemName.value !== "" ? currentItemName.value : json.product_name;
                currentItemGenericName.value = currentItemGenericName.value !== "" ? currentItemGenericName.value : json.generic_name;
                currentItemNutrition.value = currentItemNutrition.value !== "" ? json.nutriments : currentItemNutrition.value;
                currentItemNutritionDataPer.value = currentItemNutritionDataPer.value !== "" ? currentItemNutritionDataPer.value : json.nutrition_data_prepared_per;
                currentItemKeywords.value = currentItemKeywords.value.length !== 0 ? currentItemKeywords.value.toString() ?? [""] : json._keywords.toString();
                currentItemProducer.value = currentItemProducer.value !== "" ? currentItemProducer.value : json.producer;
                currentItemCategory.value = currentItemCategory.value.length !== 0 ? currentItemCategory.value.toString() ?? [""] : json.category.toString();
                currentItemNumber.value = currentItemNumber.value !== "" ? currentItemNumber.value : json.code;
                currentItemQuant.value = currentItemQuant.value !== "" ? currentItemQuant.value : json.quantity_value;
                currentItemQuantType.value = currentItemQuantType.value !== "" ? currentItemQuantType.value : json.quantity_type;

                if (json.preffered_image === undefined) {
                    currentImageIndex.value = 1
                } else {
                    currentImageIndex.value = parseInt(json.preffered_image) ?? 1;
                }


                // IMAGE
                let productImageUrlWeb = json.code
                let pPath = 'https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/'
                if (String(productImageUrlWeb).length <= 8) {
                    pPath += String(productImageUrlWeb) + "/"
                } else {
                    pPath += String(productImageUrlWeb).substring(0, 3) + '/'
                    pPath += String(productImageUrlWeb).substring(3, 6) + '/'
                    pPath += String(productImageUrlWeb).substring(6, 9) + '/'
                    pPath += String(productImageUrlWeb).substring(9) + '/'
                }

                if (currentImageIndex.value)
                    pPath += currentImageIndex.value.toString() + ".jpg"
                else {
                    pPath += "1" + ".jpg"
                }
                currentImagePath.value = pPath
            })
        })
    }

    if (method == CODE) {

        setEverythingToNull()

        fetch(url + '/items/', { headers: { itemId: currentSearchItemCode.value?.toString() ?? "1" } }).then((result) => {
            result.json().then((json) => {

                item.currentItemData = json

                currentItemName.value = currentItemName.value !== "" ? currentItemName.value : json.product_name;
                currentItemGenericName.value = currentItemGenericName.value !== "" ? currentItemGenericName.value : json.generic_name;
                currentItemNutrition.value = currentItemNutrition.value !== "" ? json.nutriments : currentItemNutrition.value;
                currentItemNutritionDataPer.value = currentItemNutritionDataPer.value !== "" ? currentItemNutritionDataPer.value : json.nutrition_data_prepared_per;
                currentItemKeywords.value = currentItemKeywords.value.length !== 0 ? currentItemKeywords.value.toString() ?? [""] : json._keywords.toString();
                currentItemProducer.value = currentItemProducer.value !== "" ? currentItemProducer.value : json.producer;
                currentItemCategory.value = currentItemCategory.value.length !== 0 ? currentItemCategory.value.toString() ?? [""] : json.category.toString();
                currentItemNumber.value = currentItemNumber.value !== "" ? currentItemNumber.value : json.code;
                currentItemQuant.value = currentItemQuant.value !== "" ? currentItemQuant.value : json.quantity_value;
                currentItemQuantType.value = currentItemQuantType.value !== "" ? currentItemQuantType.value : json.quantity_type;

                if (json.preffered_image === undefined) {
                    currentImageIndex.value = 1
                } else {
                    currentImageIndex.value = parseInt(json.preffered_image) ?? 1;
                }


                // IMAGE
                let productImageUrlWeb = json.code
                let pPath = 'https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/'
                if (String(productImageUrlWeb).length <= 8) {
                    pPath += String(productImageUrlWeb) + "/"
                } else {
                    pPath += String(productImageUrlWeb).substring(0, 3) + '/'
                    pPath += String(productImageUrlWeb).substring(3, 6) + '/'
                    pPath += String(productImageUrlWeb).substring(6, 9) + '/'
                    pPath += String(productImageUrlWeb).substring(9) + '/'
                }

                if (currentImageIndex.value)
                    pPath += currentImageIndex.value.toString() + ".jpg"
                else {
                    pPath += "1" + ".jpg"
                }
                currentImagePath.value = pPath
            })
        })
    }
}

const setEverythingToNull = () => {
    currentItemName.value = ""
    currentItemGenericName.value = ""
    currentItemNutrition.value = ""
    currentItemNutritionDataPer.value = ""
    currentItemKeywords.value = ""
    currentItemProducer.value = ""
    currentItemCategory.value = ""
    currentItemNumber.value = ""
    currentItemQuant.value = ""
    currentItemQuantType.value = ""
    currentImageIndex.value = 1;
    currentImagePath.value = ""
}

const doSave = () => {

    const categoryArray = currentItemCategory.value
    const categoryKeywords = currentItemKeywords.value

    const newItem = new Item(currentItemNumber.value, currentItemName.value, currentItemGenericName.value,
        currentItemProducer.value, categoryArray, currentItemQuant.value,
        currentItemQuantType.value, categoryKeywords, currentImageIndex.value.toString(),
        currentItemNutrition.value, currentItemNutritionDataPer.value, currentImagePath.value)

    const result = fetch(url + "/items", { method: "PUT", body: JSON.stringify(newItem), headers: { 'Content-Type': 'application/json' } }).then((result) => {

    })


    // Animation
    showUploadAni.value = true;
    setTimeout(() => {
        showUploadAni.value = false;
    }, 400)
}

const doRandom = () => {

    currentItemName.value = ""
    currentItemGenericName.value = ""
    currentItemNutrition.value = ""
    currentItemNutritionDataPer.value = ""
    currentItemKeywords.value = ""
    currentItemProducer.value = ""
    currentItemCategory.value = ""
    currentItemNumber.value = ""
    currentItemQuant.value = ""
    currentItemQuantType.value = ""

    const initRandom = (Math.floor(Math.random() * 19000))

    currentIndex.value = initRandom

    fetch(url + '/items/review', { headers: { number: initRandom.toString() } }).then((result) => {
        result.json().then((json) => {
            item.currentItemData = json

            currentItemName.value = currentItemName.value !== "" ? currentItemName.value : json.product_name;
            currentItemGenericName.value = currentItemGenericName.value !== "" ? currentItemGenericName.value : json.generic_name;
            currentItemNutrition.value = currentItemNutrition.value !== "" ? json.nutriments : currentItemNutrition.value;
            currentItemNutritionDataPer.value = currentItemNutritionDataPer.value !== "" ? currentItemNutritionDataPer.value : json.nutrition_data_prepared_per;
            currentItemKeywords.value = currentItemKeywords.value.length != 0 ? currentItemKeywords.value.toString() ?? [""] : json._keywords;
            currentItemProducer.value = currentItemProducer.value !== "" ? currentItemProducer.value : json.producer;
            currentItemCategory.value = currentItemKeywords.value.length != 0 ? currentItemCategory.value.toString() ?? [""] : json.category;
            currentItemNumber.value = currentItemNumber.value !== "" ? currentItemNumber.value : json.code;
            currentItemQuant.value = currentItemQuant.value !== "" ? currentItemQuant.value : json.quantity_value;
            currentItemQuantType.value = currentItemQuantType.value !== "" ? currentItemQuantType.value : json.quantity_type;


            // IMAGE
            let productImageUrlWeb = json.code
            let pPath = 'https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/'
            if (String(productImageUrlWeb).length <= 8) {
                pPath += String(productImageUrlWeb) + "/1.jpg"
            } else {
                pPath += String(productImageUrlWeb).substring(0, 3) + '/'
                pPath += String(productImageUrlWeb).substring(3, 6) + '/'
                pPath += String(productImageUrlWeb).substring(6, 9) + '/'
                pPath += String(productImageUrlWeb).substring(9) + '/'
            }

            pPath += currentImageIndex.value.toString() + ".jpg"
            currentImagePath.value = pPath
        })
    })
}

const refresh = () => {
    if (currentSearchItemCode.value != 0) {
        loadData(CODE);
    } else {
        loadData(INDEX)
    }
}

</script>

<template>
    <div class="pt-4">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <div class="row align-items-center tile-card m-2 p-2">
                        <div class="col-1">
                            <div class="mr-3">Current Index:</div>
                        </div>
                        <div class="col-2">
                            <input v-model="currentIndex" type="number"
                                class="border outline text-center form-control"></input>
                        </div>

                        <div class="col-1">
                            <button @click="doRandom" class="btn btn-outline-secondary m-2" type="button">
                                <OhVueIcon name="fa-dice" scale="1.5"></OhVueIcon>
                            </button>
                        </div>

                        <div class="col-1"></div>

                        <div class="col-4 text-center">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-3">
                                    <div class="mr-3">Search Code:</div>
                                </div>
                                <div class="col-6">
                                    <div class="row">
                                        <div class="col-10">
                                            <input v-model="currentSearchItemCode" type="input"
                                                class="border outline text-center form-control"></input>
                                        </div>
                                        <div class="col-2">
                                            <button @click="loadData(CODE)" class="btn btn-outline-secondary p-1"
                                                type="button">
                                                <OhVueIcon name="bi-cloud-download" scale="1.5"></OhVueIcon>

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-3">
                            <div class="row justify-content-end relative">
                                <div class="col-auto">
                                    <button @click="doSave" class="btn btn-outline-primary m-2 cloud-upload-btn"
                                        type="button">
                                        <div class="containers">
                                            <OhVueIcon class="" name="bi-cloud-upload" scale="1.5"></OhVueIcon>
                                            <OhVueIcon :class="uploadAnimationState" class="cloud-upload-ghost"
                                                name="bi-cloud-upload" scale="1.5"></OhVueIcon>
                                        </div>
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button @click="refresh()" class="btn btn-outline-secondary m-2" type="button">
                                        <OhVueIcon name="md-refresh" scale="1.5"></OhVueIcon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="row tile-card m-2">
                        <input v-model="currentImageIndex" type="number"
                            class="border outline text-center form-control"></input>
                        <div class="my-2"></div>
                        <input v-model="currentImagePath" type="input"
                            class="border outline text-center form-control"></input>
                        <div class="my-1"></div>
                        <img :src="currentImagePath" class="productImage pb-2">
                    </div>
                </div>
                <div class="col-8">
                    <div class="row tile-card m-2">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3">
                                    Item Code:
                                </div>
                                <div class="col-9">
                                    <input v-model="currentItemNumber" disabled="true" type="input"
                                        class="inputclass border outline text-center form-control">
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3">
                                    Itemname:
                                </div>
                                <div class="col-9">
                                    <input v-model="currentItemName" type="input"
                                        class="inputclass border outline text-center form-control">
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3">
                                    Generic Name:
                                </div>
                                <div class="col-9">
                                    <input v-model="currentItemGenericName" type="input"
                                        class="inputclass border outline text-center form-control">
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3">
                                    Producer Comp:
                                </div>
                                <div class="col-9">
                                    <input v-model="currentItemProducer" type="input"
                                        class="inputclass border outline text-center form-control">
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                        <hr>
                        <div class="col-3"></div>
                        <div class="col-9">
                            {{ itemType }}
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3">
                                    Category:
                                </div>
                                <div class="col-9">
                                    <input v-model="currentItemCategory" type="input"
                                        class="inputclass border outline text-center form-control">
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3">
                                    Qnt + [KG, L, P]:
                                </div>
                                <div class="col-4">
                                    <input v-model="currentItemQuant" type="input"
                                        class="inputclass border outline text-center form-control">
                                </div>
                                <div class="col-5">
                                    <input v-model="currentItemQuantType" type="input"
                                        class="inputclass border outline text-center form-control">
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3">
                                    Keywords:
                                </div>
                                <div class="col-9">
                                    <input v-model="currentItemKeywords" type="input"
                                        class="inputclass border outline text-center form-control">
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3">
                                    Nutrition per:
                                </div>
                                <div class="col-9">
                                    <input v-model="currentItemNutritionDataPer" disabled type="input"
                                        class="inputclass border outline text-center form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-3">
                                    Nutriments:
                                </div>
                                <div class="col-9">
                                    <input v-model="currentItemNutrition" type="input"
                                        class="inputclass border outline text-center form-control"></input>
                                </div>
                            </div>
                        </div>
                        <div class="my-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.cloud-upload-btn {
    background-color: "primary";
}

@keyframes cloud-upload-ghost-ani {
    0% {
        opacity: 1;
        transform: translate(-100%, 0%);
    }

    100% {
        opacity: 0;
        transform: translate(-100%, -400%);
    }
}

.cloud-upload-animation {
    animation: cloud-upload-ghost-ani 1s;
}

.cloud-upload-ghost {
    position: absolute;
    transform: translate(-100%);
}

.btn-download {
    transform: translate(-50%, 0);
}

.productImage {
    max-width: 100%;
    height: auto;
    border-radius: 2px;
}

.inputclass {
    width: 100%;
}

.tile-card {
    z-index: 100;
    background-color: white;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    transition: 1s;
}
</style>