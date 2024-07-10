<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HeaderProfile from './views/header/HeaderProfile.vue';
import { computed } from 'vue';
import store from './store';
const route = useRoute()

// Funktion zum Überprüfen, ob der Routenpfad aktiv ist
const isRouteActive = (routePath: string): boolean => {
  return route.path === routePath
}

const recipeCreatorAnimationClass = computed(() => {
  return store.state.isRecipeItemSelectModeActive && !isRouteActive('/recipecreator') ? " sparkle-icon " : ""
})


</script>

<template>
  <div id="app" class="container-fluid background-main">
    <div class="row">
      <div class="col-2 bg-white" style="height: 100vh;">
        <div class="sidebar pe-2">
          <div class="list-group list-group-flush px-2 stickybar container-fluid">
            <div class="row" id="logo">
              <RouterLink to="/" class="col pb-3"><img src="@/assets/logo.svg" style="height: auto; width: 75%"
                /><label id="brand-name"></label></RouterLink>
            </div>
            <RouterLink to="/dashboard" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/dashboard') }">
              <OhVueIcon class="me-3" name="md-spacedashboard" scale="1.3" /><div class="d-none d-lg-block">Dashboard</div>
            </RouterLink>
            <RouterLink to="/products" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/products') }">
              <OhVueIcon class=" me-3" name="fa-shopping-cart" scale="1.3" /><div class="d-none d-lg-block">Products</div>
            </RouterLink>
            <RouterLink to="/recipes" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/recipes') }">
              <OhVueIcon class=" me-3" name="md-receipt" scale="1.3" /><div class="d-none d-lg-block">Recipes</div>
            </RouterLink>
            <RouterLink to="/calendar" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/calendar') }">
              <OhVueIcon class=" me-3" name="bi-calendar3-week-fill" scale="1.3" /><div class="d-none d-lg-block">Calendar</div>
            </RouterLink>
            <RouterLink to="/itemreview" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/itemreview') }">
              <OhVueIcon class=" me-3" name="io-color-wand-outline" scale="1.3" /><div class="d-none d-lg-block">Item Review</div>
            </RouterLink>
            <RouterLink to="/recipecreator" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/recipecreator') }">
              <OhVueIcon :class="recipeCreatorAnimationClass" class=" me-3" name="io-sparkles" scale="1.3"/>
              <div class="d-none d-lg-block">Recipe Creator</div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="col-10" style="height: 100vh; overflow-y: hidden;">
        <HeaderProfile class="stickybar" />
        <div class="row justify-content-center"><div class="horizontal-divider"></div></div>
        <div class="row">
          <div class="col-12" style="max-height: 92vh; overflow: auto;">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

@keyframes sparkle-icon-ani {
    0% {
      color: rgb(0, 0, 0);
    transform: scale(1.0);

  }

  30% {
    transform: scale(1.31);
    color: rgb(57, 180, 159);
  }

  100% {
    transform: scale(1.0);
    color: rgb(0, 0, 0);
  }
}

.sparkle-icon {
	position: absolute;
  animation-name: sparkle-icon-ani;
  animation-duration: 1.3s;
  animation-iteration-count: infinite;
  transition: 0.3s;
  color: rgb(57, 180, 159);
}


.limit-hight {
  
}

.horizontal-divider {
  width: 100vw;
  height: 1px;
  border-radius: 100px;
  background-color: rgb(0,0,0,0.2);
  box-shadow: -5px 1px 2px 0px rgba(0, 0, 0, 0.2), 0px -1px 2px 0px rgba(245, 245, 245, 1) ;
  z-index: 2;
}

.background-main {
  max-height: 100vh;
  background-color: rgb(245, 245, 245);
}

.logo {
  width: 100%;
}

.footer {
  background-color: rgb(57, 180, 159, 0.2);
}

.top {
  position: sticky;
}

.sidebar {
  height: 100vh;
  z-index: 120;
  transition: 1s;
  box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, 0.2), 15px 0px 2px 0px rgba(245, 245, 245, 245);
}

.sidebar .active {
  height: 100%;
  border-radius: 5px;
  box-shadow:
    0 2px 5px 0 rgb(0 0 0 / 16%),
    0 2px 10px 0 rgb(0 0 0 / 12%);
    z-index: 1300;
}
</style>