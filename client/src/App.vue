<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HeaderProfile from './views/header/HeaderProfile.vue';
const route = useRoute()

// Funktion zum Überprüfen, ob der Routenpfad aktiv ist
const isRouteActive = (routePath: string): boolean => {
  return route.path === routePath
}
</script>

<template>
  <div id="app" class="container-fluid background-main">
    <div class="row" style="height: 100vh;">
      <div class="col-2 bg-white">
        <div class="sidebar pe-2">
          <div class="list-group list-group-flush px-2 stickybar">
            <div class="row" id="logo">
              <RouterLink to="/"><img alt="Prepper logo" class="logo pt-3"
                  src="@/assets/logo_prepper_right.svg" /><label id="brand-name"></label></RouterLink>
            </div>
            <div class="row mt-3"></div>
            <RouterLink to="/dashboard" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/dashboard') }">
              <OhVueIcon class="me-3" name="md-spacedashboard" scale="1.3" />Dashboard
            </RouterLink>
            <RouterLink to="/products" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/products') }">
              <OhVueIcon class=" me-3" name="fa-shopping-cart" scale="1.3" />Products
            </RouterLink>
            <RouterLink to="/recipes" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/recipes') }">
              <OhVueIcon class=" me-3" name="md-receipt" scale="1.3" />Recipes
            </RouterLink>
            <RouterLink to="/calendar" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/calendar') }">
              <OhVueIcon class=" me-3" name="bi-calendar3-week-fill" scale="1.3" />Calendar
            </RouterLink>
            <RouterLink to="/settings" class="list-group-item list-group-item-action py-2 d-flex align-items-center"
              :class="{ active: isRouteActive('/settings') }">
              <OhVueIcon class=" me-3" name="fa-cog" scale="1.3" />Settings
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="col-10 limit-hight">
        <HeaderProfile class="stickybar" />
        <div class="row justify-content-center"><div class="horizontal-divider"></div></div>
        <div class="row">
          <div class="col-12" style="max-height: 100vh; overflow: auto;">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.limit-hight {
  max-height: 100vh;
  overflow-y: hidden;
}

.horizontal-divider {
  width: 95%;
  height: 1px;
  background-color: rgb(0,0,0,0.2);
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
  z-index: 1300;
  transition: 1s;
  box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, 0.2), 15px 0px 2px 0px rgba(245, 245, 245, 245);
}

.sidebar .active {
  height: 100%;
  border-radius: 5px;
  box-shadow:
    0 2px 5px 0 rgb(0 0 0 / 16%),
    0 2px 10px 0 rgb(0 0 0 / 12%);
}
</style>