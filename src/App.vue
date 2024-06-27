<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import NavbarComp from './components/widgets/NavbarComp.vue'

const route = useRoute()

// Funktion zum Überprüfen, ob der Routenpfad aktiv ist
const isRouteActive = (routePath: string): boolean => {
  return route.path === routePath
}
</script>

<template>
  <header>
    <div>
      <nav class="d-lg-block sidebar collapse navbar-collapse bg-white" id="navbarSupportedContent">
        <div class="position-sticky">
          <a class="navbar-brand d-flex justify-content-center py-4"
            ><img src="@/assets/logo.svg" style="height: auto; width: 120px"
          /></a>

          <div class="list-group list-group-flush mx-3 mt-2">
            <RouterLink
              to="/"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/') }"
              ><span class="material-symbols-rounded me-3"> dashboard </span>Dashboard</RouterLink
            >
            <RouterLink
              to="/product"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/product') }"
              ><span class="material-symbols-rounded me-3"> inventory_2 </span>Products</RouterLink
            >
            <RouterLink
              to="/recipes"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/recipes') }"
              ><span class="material-symbols-rounded me-3"> receipt </span>Recipes</RouterLink
            >
            <RouterLink
              to="/calendar"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/calendar') }"
              ><span class="material-symbols-rounded me-3"> calendar_month </span
              >Calender</RouterLink
            >
            <RouterLink
              to="/settings"
              class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/settings') }"
              ><span class="material-symbols-rounded me-3"> settings </span>Settings</RouterLink
            >
          </div>
        </div>
      </nav>
      <NavbarComp />
    </div>
  </header>
  <main>
    <div class="container pt-4"><RouterView /></div>
  </main>
</template>

<style scoped>
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
  border-radius: 5px;
  box-shadow:
    0 2px 5px 0 rgb(0 0 0 / 16%),
    0 2px 10px 0 rgb(0 0 0 / 12%);
}

@media (max-width: 992px) {
  .sidebar {
    width: 100%;
    z-index: 600;
  }
}

main {
  padding-top: 58px;
}

@media (min-width: 992px) {
  main {
    padding-left: 240px;
  }
}
</style>
