<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentRouteName = computed(() => route.name);

const links = [
    { to: "/profile", toFancy: "Profile", isSelected: false, icon: "bi-house-fill" },
    { to: "/products", toFancy: "Products", isSelected: false, icon: "hi-solid-shopping-bag" },
    { to: "/recipes", toFancy: "Recipes", isSelected: false, icon: "bi-file-text-fill" },
    { to: "/calender", toFancy: "Calendar", isSelected: false, icon: "bi-calendar-fill" },
    { to: "/itemreview", toFancy: "Item Review", isSelected: false, icon: "bi-calendar-fill" },
    { to: "/settings", toFancy: "Settings", isSelected: false, icon: "fa-cogs" }]

</script>

<template>

    <div class="col-auto stickysidebar" id="sidebar">
        <div class="vstack gap-2 m-2">
            <div v-for="item in links">
                <router-link :to="item.to" class="">
                    <div class="p-2 m-1 rounded link-button">
                        <div class="d-flex flex-row justify-content-between align-items-center">
                            <div class="col-auto">
                                <OhVueIcon :name="item.icon" scale="1.5" class="link-icon" />
                            </div>
                            <div class="col-auto d-none d-md-block">
                                <a v-text="item.toFancy" class="link-text-sidebar"></a>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style>


.link-icon {
    color: black;
    margin-right: 15px;
}

.link-button:hover {
    background-color: rgb(73, 65, 109, 0.4);
    transform: translate(5px, 0px);
    box-shadow: 0px 0px 3px rgb(0, 0, 0, 0.2);
}

.link-button {
    transition: 0.08s;
    background-color: rgb(208, 234, 230);
}

a {
    text-decoration: none;
    color: black;
    text-align: center;
    font-size: large;
    text-decoration: none;
}

.is-selected {
    color: rgb(73, 65, 109)
}

.stickysidebar {
    position: sticky;
    top: 8.2%;
    z-index: 100;
    width: 100%;
    min-width: 2%;
}
</style>
