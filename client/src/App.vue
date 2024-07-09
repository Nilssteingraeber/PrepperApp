<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HeaderProfile from './views/header/HeaderProfile.vue'
import { computed } from 'vue'
import store from './store'
const route = useRoute()

// Funktion zum Überprüfen, ob der Routenpfad aktiv ist
const isRouteActive = (routePath: string): boolean => {
  return route.path === routePath
}

const recipeCreatorAnimationClass = computed(() => {
  return store.state.isRecipeItemSelectModeActive && !isRouteActive('/recipecreator')
    ? ' sparkle-icon '
    : ''
})
</script>

<template>
  <div id="app">
    <header>
      <nav class="d-xl-block sidebar collapse navbar-collapse bg-white" id="navbarSupportedContent">
        <div class="position-sticky">
          <a class="navbar-brand d-flex justify-content-center"
            ><img src="@/assets/logo.svg" style="height: auto; width: 120px"
          /></a>

          <div class="list-group list-group-flush mx-3 mt-2">
            <RouterLink
              to="/dashboard"
              class="list-group-item list-group-item-action py-2 d-flex align-items-xl-center"
              :class="{ active: isRouteActive('/dashboard') }"
            >
              <OhVueIcon class="me-3" name="md-spacedashboard" scale="1.3" />Dashboard
            </RouterLink>
            <RouterLink
              to="/products"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/products') }"
            >
              <OhVueIcon class="me-3" name="fa-shopping-cart" scale="1.3" />Products
            </RouterLink>
            <RouterLink
              to="/recipes"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/recipes') }"
            >
              <OhVueIcon class="me-3" name="md-receipt" scale="1.3" />Recipes
            </RouterLink>
            <RouterLink
              to="/calendar"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/calendar') }"
            >
              <OhVueIcon class="me-3" name="bi-calendar3-week-fill" scale="1.3" />Calendar
            </RouterLink>
            <RouterLink
              to="/itemreview"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/itemreview') }"
            >
              <OhVueIcon class="me-3" name="io-color-wand-outline" scale="1.3" />Item Review
            </RouterLink>
            <RouterLink
              to="/recipecreator"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/recipecreator') }"
            >
              <OhVueIcon
                :class="recipeCreatorAnimationClass"
                class="me-3"
                name="io-sparkles"
                scale="1.3"
              />
              Recipe Creator
            </RouterLink>
          </div>
        </div>
      </nav>
      <HeaderProfile />
    </header>

    <main>
      <div class="container pt-4"><RouterView /></div>
    </main>
  </div>
</template>

<style>
@keyframes sparkle-icon-ani {
  0% {
    color: rgb(0, 0, 0);
    transform: scale(1);
  }

  30% {
    transform: scale(1.31);
    color: rgb(57, 180, 159);
  }

  100% {
    transform: scale(1);
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

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  z-index: 1300;
  box-shadow:
    0 2px 5px 0 rgb(0 0 0 / 5%),
    0 2px 10px 0 rgb(0 0 0 / 5%);
}

.sidebar .active {
  height: 100%;
  border-radius: 5px;
  box-shadow:
    0 2px 5px 0 rgb(0 0 0 / 16%),
    0 2px 10px 0 rgb(0 0 0 / 12%);
  z-index: 1300;
}

main {
  padding-top: 58px;
}

@media (max-width: 768px) {
  main {
    padding-top: 200px;
  }
  .navbar-brand {
    padding-top: 250px;
  }
}

@media (min-width: 768px) {
  main {
    padding-top: 120px;
  }
  .navbar-brand {
    padding-top: 170px;
  }
}

@media (min-width: 1200px) {
  main {
    padding-top: 58px;
    padding-left: 240px;
  }
  .navbar-brand {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
}

@media (max-width: 1200px) {
  .sidebar {
    width: 100%;
    z-index: 600;
  }
}
</style>
